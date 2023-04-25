const Layout = () => import('@/layout/index.vue')

const SystemMasterList = () =>
  import('@/views/system-permissions/show_system_master.vue')
const SystemMasterAdd = () =>
  import('@/views/system-permissions/add_system_master.vue')

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
        path: '/master/list',
        name: '管理员用户列表',
        component: SystemMasterList,
        meta: {
          title: '管理员用户列表',
        },
      },
      {
        path: '/master/list',
        name: '新建管理员用户',
        component: SystemMasterList,
        meta: {
          title: '新建管理员用户',
        },
        hidden: true,
      },
      // {
      //   path: '',
      //   name: '管理员角色列表',
      //   component: '',
      //   meta: {
      //     title: '管理员角色列表',
      //     affix: true,
      //   },
      // },
      // {
      //   path: '',
      //   name: '管理员角色绑定列表',
      //   component: '',
      //   meta: {
      //     title: '管理员角色绑定列表',
      //   },
      // },
      // {
      //   path: '',
      //   name: '权限列表',
      //   component: '',
      //   meta: {
      //     title: '权限列表',
      //   },
      // },
      // {
      //   path: '/master/add',
      //   name: '添加管理员用户',
      //   component: SystemMasterAdd,
      //   meta: {
      //     title: '添加管理员用户',
      //   },
      // },
      // {
      //   path: '',
      //   name: '访问类型列表',
      //   component: '',
      //   meta: {
      //     title: '访问类型列表',
      //   },
      // },
      // {
      //   path: '',
      //   name: '访问日志列表',
      //   component: '',
      //   meta: {
      //     title: '访问日志列表',
      //   },
      // },
    ],
  },
]
