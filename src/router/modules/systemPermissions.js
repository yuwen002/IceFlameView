const Layout = () => import('@/layout/index.vue')

export default [
  {
    path: '',
    component: Layout,
    name: '权限管理',
    meta: {
      title: '权限管理',
    },
    icon: 'icon-home',
    children: [
      {
        path: '',
        name: '管理员角色列表',
        component: '',
        meta: {
          title: '管理员角色列表',
          affix: true,
        },
      },
    ],
  },
]
