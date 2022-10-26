import {isV2} from '../../../../../utils/adapter.js'

const {PluginsMap} = await Guoba.GI('@/utils/common.js')

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

const pluginsMenu = {
  path: 'plugins',
  name: 'Plugins',
  component: '/guoba/plugins/index',
  meta: {
    title: '插件管理',
    icon: 'clarity:plugin-line',
  },
}

const miaoV1Menu = {
  path: 'plugins/miao-plugin',
  name: 'MiaoPlugin',
  component: '/guoba/plugins/extra-config/miao-plugin-v1/index',
  meta: {
    title: '喵喵帮助',
    icon: 'twemoji:heart-with-ribbon',
  },
}

const miaoMenu = {
  path: 'plugins/miao-plugin',
  name: 'MiaoPlugin',
  component: '/guoba/plugins/extra-config/miao-plugin/index',
  meta: {
    title: '喵喵帮助',
    icon: 'twemoji:heart-with-ribbon',
  },
}

const aboutMenu = {
  path: 'about',
  name: 'about',
  component: '/guoba/about/index',
  meta: {
    title: '关于',
    icon: 'simple-icons:about-dot-me',
  },
}

export async function useMenus() {
  if (isV2) return useV2Menu()
  let menus = []
  menus.push(homeMenu)
  menus.push(configMenu)
  menus.push(pluginsMenu)
  // 判断是否安装了喵喵插件
  if (PluginsMap.get('miao-plugin')) {
    // 判断喵喵插件版本
    try {
      let miaoVersion = (await import('../../../../../../miao-plugin/components/Version.js')).default
      if (miaoVersion.version.startsWith('1')) {
        menus.push(miaoV1Menu)
      } else {
        menus.push(miaoMenu)
      }
    } catch (e) {
      logger.error(e)
    }
  }
  menus.push(accountMenu)
  menus.push(aboutMenu)
  return menus
}

async function useV2Menu() {
  return []
}
