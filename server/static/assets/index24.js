import{k as a,l as e,e as t,c2 as l}from"./index.js";function o(o,s=4){let u=[];return o.installed?u.push(a(t("a-tag"),{color:"green"},{default:()=>[e("已安装")]})):u.push(a(t("a-tag"),null,{default:()=>[e("未安装")]})),o.hasConfig&&u.push(a(t("a-tag"),{color:"purple"},{default:()=>[e("可配置")]})),o.isV3&&u.push(a(t("a-tag"),{color:"blue"},{default:()=>[e("V3")]})),o.isV2&&u.push(a(t("a-tag"),{color:"orange"},{default:()=>[e("V2")]})),o.isDeleted&&u.push(a(t("a-tag"),{color:"red"},{default:()=>[e("已失效")]})),a(t("a-space"),{size:s},"function"==typeof(r=u)||"[object Object]"===Object.prototype.toString.call(r)&&!l(r)?u:{default:()=>[u]});var r}export{o as g};
