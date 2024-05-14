import {GuobaSupportMap, PluginsMap} from '#guoba.platform'
import {getPluginIconPath, parseShowInMenu} from '../../../../../utils/pluginUtils.js'

const pluginsStoreMenu = {
  path: '/plugins',
  name: 'PluginsStore',
  component: '/guoba/plugins/index',
  meta: {
    title: '插件管理',
    // icon: 'uil:store',
    icon: 'clarity:plugin-line',
  },
}

const pluginsIndexMenu = {
  path: '/plugins/index',
  name: 'PluginsIndex',
  component: '/guoba/plugins/index',
  meta: {
    title: '插件列表',
    icon: 'ic:round-view-list',
  },
}

// 插件的菜单
// noinspection JSUnusedGlobalSymbols
export async function usePluginsMenu() {
  const pluginMenus = []
  // 遍历所有插件
  GuobaSupportMap.forEach((value, name) => {
    if (!parseShowInMenu(value)) {
      return
    }

    pluginMenus.push({
      path: `/plugin/@/${name}`,
      name: 'PluginDetail_' + name,
      component: `/guoba/plugins/plugin-detail/index`,
      meta: {
        title: value.pluginInfo?.title ?? name,
        icon: value.pluginInfo?.icon ?? 'clarity:plugin-line',
        ignoreRoute: true,
      },
      guobaMeta: {
        plugin: {
          name: name,
          icon: value.pluginInfo?.icon,
          iconColor: value.pluginInfo?.iconColor,
          iconPath: getPluginIconPath(value.pluginInfo),
        },
      }
    })
  })
  if (pluginMenus.length > 0) {
    pluginMenus.push({
      path: `/plugin/@/:name`,
      name: 'PluginDetail',
      component: `/guoba/plugins/plugin-detail/index`,
      meta: {
        title: '插件详情',
        hideMenu: true,
      },
    })
  }
  // 喵喵插件额外功能
  pluginMenus.push(...(await useMiaoPluginMenu()))

  if (pluginMenus.length > 0) {
    return [
      pluginsStoreMenu,
      {
        path: '/plugin/@',
        name: 'PluginDetailParent',
        component: '/guoba/plugins/index',
        meta: {
          title: '插件配置',
          // icon: 'clarity:plugin-line',
          // icon: 'arcticons:game-plugins',
          icon: 'ion:settings-outline',
        },
        // 重定向到
        redirect: pluginsIndexMenu.path,
        children: [
          // pluginsIndexMenu,
          ...pluginMenus,
        ],
      }
    ]
  } else {
    return [pluginsStoreMenu]
  }
}

const miaoMenu = {
  path: '/plugin/extra/miao-plugin',
  name: 'MiaoPlugin',
  component: '/guoba/plugins/extra-config/miao-plugin/index',
  meta: {
    title: '喵喵帮助',
    icon: 'twemoji:heart-with-ribbon',
  },
}

const miaoV1Menu = {
  path: miaoMenu.path,
  name: miaoMenu.name,
  component: '/guoba/plugins/extra-config/miao-plugin-v1/index',
  meta: {
    ...miaoMenu.meta,
  },
}

// 喵喵帮助菜单
async function useMiaoPluginMenu() {
  // 判断是否安装了喵喵插件
  if (PluginsMap.get('miao-plugin')) {
    // 判断喵喵插件版本
    try {
      let miaoVersion = (await import('../../../../../../../miao-plugin/components/Version.js')).default
      if (miaoVersion.version.startsWith('1')) {
        return [miaoV1Menu]
      } else {
        return [miaoMenu]
      }
    } catch (e) {
      logger.error(e)
    }
  }
  return []
}
