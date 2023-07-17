const Layout = () => import('@/layout/index.vue')
const ModifyPassword = () => import('@/views/home/modify_password.vue')
export default [
  {
    path: '',
    component: Layout,
    name: 'systemPermissionsExclude',
    cn_name: '权限排除',
    meta: {
      title: '权限排除',
    },
    icon: 'icon-home',
    children: [
      {
        path: '/master/modify_password',
        name: 'modifyPassword',
        cn_name: '管理员用户列表',
        component: ModifyPassword,
        meta: {
          title: '管理员用户列表',
        },
      },
    ],
  }
]
