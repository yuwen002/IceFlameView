const Layout = () => import('@/layout/index.vue')

const SystemMasterList = () =>
  import('@/views/system-permissions/show_system_master.vue')
const SystemMasterAdd = () =>
  import('@/views/system-permissions/add_system_master.vue')

export default [
  {
    path: '',
    component: Layout,
    name: 'systemManagement',
    cn_name: '权限管理',
    meta: {
      title: '系统管理',
    },
    icon: 'icon-home',
    children: [
      {
        path: '/master/list',
        name: 'systemMasterList',
        cn_name: '管理员用户列表',
        component: SystemMasterList,
        meta: {
          title: '管理员用户列表',
        },
      },
      {
        path: '/master/add',
        name: 'systemMasterAdd',
        cn_name: '新建管理员用户',
        component: SystemMasterAdd,
        meta: {
          title: '新建管理员用户',
        },
        // hidden: true,
      },
    ],
  },
]
