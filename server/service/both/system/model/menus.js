import {GuobaSupportMap, PluginsMap} from '#guoba.platform'
import {isV2} from '#guoba.utils'

// 首页菜单
const homeMenu = {
  path: '/home',
  name: 'Home',
  component: '/guoba/home/index',
  meta: {
    title: '首页',
    icon: 'bx:bx-home',
  },
}

// 账号管理
const accountMenu = {
  path: '/account',
  name: 'Account',
  component: '/guoba/system/account/index',
  meta: {
    title: '账号管理',
    icon: 'ant-design:user-outlined',
  },
}

const configMenu = {
  path: 'config',
  name: 'Config',
  component: '/guoba/config/index',
  meta: {
    title: '配置管理',
    icon: 'ion:settings-outline',
  },
}

const aboutMenu = {
  path: 'about',
  name: 'about',
  component: '/guoba/about/index',
  meta: {
    title: '关于',
    icon: 'cib:about-me',
  },
}

export async function useMenus() {
  if (isV2) return useV2Menu()
  let menus = []
  menus.push(homeMenu)
  menus.push(configMenu)
  menus.push(...(await usePluginsMenu()))
  menus.push(accountMenu)
  menus.push(aboutMenu)
  return menus
}

const pluginsMenu = {
  path: 'plugins',
  name: 'Plugins',
  component: '/guoba/plugins/index',
  meta: {
    title: '插件管理',
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
async function usePluginsMenu() {
  const pluginMenus = []
  // 遍历所有插件
  GuobaSupportMap.forEach((value, name) => {
    let showInMenu = value.pluginInfo?.showInMenu ?? 'auto'
    if (showInMenu === false || showInMenu === 'false') {
      return
    }
    if (showInMenu === true || showInMenu === 'true') {
      showInMenu = true
    }
    if (showInMenu === 'auto') {
      showInMenu = value.configInfo?.schemas?.length >= 3
    }
    if (!showInMenu) {
      return
    }
    pluginMenus.push({
      path: `/plugin/${name}`,
      name: 'PluginDetail_' + name,
      component: `/guoba/plugins/plugin-detail/index`,
      meta: {
        title: value.pluginInfo?.title ?? name,
        icon: value.pluginInfo?.icon ?? 'clarity:plugin-line',
        ignoreRoute: true,
      },
    })
  })
  if (pluginMenus.length > 0) {
    pluginMenus.push({
      path: `/plugin/:name`,
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
      {
        ...pluginsMenu,
        children: [
          pluginsIndexMenu,
          ...pluginMenus,
        ],
      }
    ]
  } else {
    return [pluginsMenu]
  }
}

const miaoV1Menu = {
  path: '/plugin-extra/miao-plugin',
  name: 'MiaoPlugin',
  component: '/guoba/plugins/extra-config/miao-plugin-v1/index',
  meta: {
    title: '喵喵帮助',
    icon: 'twemoji:heart-with-ribbon',
  },
}

const miaoMenu = {
  path: '/plugin-extra/miao-plugin',
  name: 'MiaoPlugin',
  component: '/guoba/plugins/extra-config/miao-plugin/index',
  meta: {
    title: '喵喵帮助',
    icon: 'twemoji:heart-with-ribbon',
  },
}

// 喵喵帮助菜单
async function useMiaoPluginMenu() {
  // 判断是否安装了喵喵插件
  if (PluginsMap.get('miao-plugin')) {
    // 判断喵喵插件版本
    try {
      let miaoVersion = (await import('../../../../../../miao-plugin/components/Version.js')).default
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

async function useV2Menu() {
  return []
}
