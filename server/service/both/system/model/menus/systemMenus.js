// noinspection JSUnusedGlobalSymbols
export const SystemMenus = {
  // 首页菜单
  home: {
    path: '/home',
    name: 'Home',
    component: '/guoba/home/index',
    meta: {
      title: '首页',
      icon: 'bx:bx-home',
    },
  },
  // 账号管理
  account: {
    path: '/account',
    name: 'Account',
    component: '/guoba/system/account/index',
    meta: {
      title: '账号管理',
      icon: 'ant-design:user-outlined',
    },
  },
  // 配置管理
  config: {
    path: '/config',
    name: 'Config',
    component: '/guoba/config/index',
    meta: {
      title: '配置管理',
      icon: 'ion:settings-outline',
    },
  },
  // 关于
  about: {
    path: '/about',
    name: 'about',
    component: '/guoba/about/index',
    meta: {
      title: '关于',
      icon: 'cib:about-me',
    },
  },
}