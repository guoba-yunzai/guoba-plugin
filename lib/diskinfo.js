/**
*	diskinfo
*
*	Returns disk information array for linux and windows
*	Tested on centos and windows vista
*
*	@author	Benoit Gauthier <bgauthier075@gmail.com>
*/

import os from 'os';
import util from 'util';
import {exec} from 'child_process';

/**
*	Returns an array of drives or calls callback
*
*	@param 	callback	A callback function that will receive
*						the array of drives, set null if no callback
*/
export const getDrivesCallback = function(callback) {
	var aDrives = [];

	switch (os.platform().toLowerCase()) {
        case 'win32':

			// Windows 32
			// Tested on Vista

			// Run command to get list of drives
			var oProcess = exec(
				'wmic logicaldisk get VolumeName,Caption,FreeSpace,Size,VolumeSerialNumber,Description  /format:list',
				{
					encoding: 'buffer',
					windowsHide: true,
				},
				function (err, stdout, stderr) {
					if (err) return callback(err, null);
					// windows下解决中文乱码问题
					stdout = new TextDecoder('gbk').decode(stdout)
					var aLines = stdout.split('\r\r\n');
					var bNew = false;
					var sCaption = '', sDescription = '', sFreeSpace = '', sSize = '', sVolume = '', sVolumeName = '';
					// For each line get information
					// Format is Key=Value
					for(var i = 0; i < aLines.length; i++) {
						if (aLines[i] != '') {
							var aTokens = aLines[i].split('=');
							switch  (aTokens[0]) {
								case 'Caption':
									sCaption = aTokens[1];
									bNew = true;
									break;
								case 'Description':
									sDescription = aTokens[1];
									break;
								case 'FreeSpace':
									sFreeSpace = aTokens[1];
									break;
								case 'Size':
									sSize = aTokens[1];
									break;
								case 'VolumeSerialNumber':
									sVolume = aTokens[1];
									break;
								// 新增卷名
								case 'VolumeName':
									sVolumeName = aTokens[1];
									break;
							}

						} else {
							// Empty line
							// If we get an empty line and bNew is true then we have retrieved
							// all information for one drive, add to array and reset variables
							if (bNew) {
								sSize = parseFloat(sSize);
								if (isNaN(sSize)) {
									sSize = 0;
								}
								sFreeSpace = parseFloat(sFreeSpace);
								if (isNaN(sFreeSpace)) {
									sFreeSpace = 0;
								}

								var sUsed = (sSize - sFreeSpace);
								var sPercent = '0%';
								if (sSize != '' && parseFloat(sSize) > 0) {
									sPercent = Math.round((parseFloat(sUsed) / parseFloat(sSize)) * 100) + '%';
								}
								aDrives[aDrives.length] = {
														filesystem:	sDescription,
														blocks:		sSize,
														used:		sUsed,
														available:	sFreeSpace,
														capacity:	sPercent,
														volumeName:	sVolumeName,
														mounted:	sCaption
													  };
								bNew = false;
								sCaption = ''; sDescription = ''; sFreeSpace = ''; sSize = ''; sVolume = ''; sVolumeName = '';
							}

						}
					}
					// Check if we have callback
					if (callback != null) {
						callback(null, aDrives);
					}
					return aDrives;
				}
			);

			break;

        case 'linux':
			// Linux
			// Tested on CentOS
        default:

			// Run command to get list of drives
			var oProcess = exec(
				'df -P | awk \'NR > 1\'',
				function (err, stdout, stderr) {
					if (err) return callback(err, null);
					var aLines = stdout.split('\n');
					// For each line get drive info and add to array
					for(var i = 0; i < aLines.length; i++) {
						var sLine = aLines[i];
						if (sLine != '') {
							sLine = sLine.replace(/ +(?= )/g,'');
							var aTokens = sLine.split(' ');
							aDrives[aDrives.length] = {
														filesystem:	aTokens[0],
														blocks:		aTokens[1],
														used:		aTokens[2],
														available:	aTokens[3],
														capacity:	aTokens[4],
														mounted:	aTokens[5]
													  };

						}
					}
					// Check if we have a callback
					if (callback != null) {
						callback(null, aDrives);
					}
					return aDrives;
				}
			);

    }

}

export const getDrives = util.promisify(getDrivesCallback)
