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
      {
        path: "",
        name: "管理员角色绑定列表",
        component: '',
        meta: {
          title: "管理员角色绑定列表",
        },
      },
      {
        path: "",
        name: "权限列表",
        component: '',
        meta: {
          title: "权限列表",
        },
      },
      {
        path: "",
        name: "管理员用户列表",
        component: '',
        meta: {
          title: "管理员用户列表",
        },
      },
      {
        path: "",
        name: "访问类型列表",
        component: '',
        meta: {
          title: "访问类型列表",
        },
      },
      {
        path: "",
        name: "访问日志列表",
        component: '',
        meta: {
          title: "访问日志列表",
        },
      },
    ],
  },
]
