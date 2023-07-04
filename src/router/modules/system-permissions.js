const Layout = () => import('@/layout/index.vue')

const SystemMasterList = () =>
  import('@/views/system-permissions/show_system_master.vue')
const SystemMasterAdd = () =>
  import('@/views/system-permissions/add_system_master.vue')

const AuthPermissionList = () =>
  import('@/views/system-permissions/show_auth_permission.vue')
const AuthPermissionAdd = () =>
  import('@/views/system-permissions/add_auth_permission.vue')

const AuthRoleList = () => import('@/views/system-permissions/show_auth_role.vue')
const AuthRoleAdd = () => import('@/views/system-permissions/add_auth_role.vue')

const AuthRoleRelationList = () => import('@/views/system-permissions/show_auth_role_relation.vue')
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
        hidden: true,
      },
      {
        path: '/auth/permission/list',
        name: 'authPermissionList',
        cn_name: '权限列表',
        component: AuthPermissionList,
        meta: {
          title: '权限列表',
        },
      },
      {
        path: '/auth/permission/add',
        name: 'authPermissionAdd',
        cn_name: '添加权限',
        component: AuthPermissionAdd,
        meta: {
          title: '添加权限',
        },
        hidden: true,
      },
      {
        path: '/auth/role/list',
        name: 'authRoleList',
        cn_name: '管理员角色列表',
        component: AuthRoleList,
        meta: {
          title: '角色列表',
        },
      },
      {
        path: '/auth/role/add',
        name: 'authRoleAdd',
        cn_name: '添加管理员角色',
        component: AuthRoleAdd,
        meta: {
          title: '添加管理员角色',
        },
        hidden: true,
      },
      {
        path: '/auth/role_relation/list',
        name: 'authRoleRelationList',
        cn_name: '管理员角色绑定列表',
        component: AuthRoleRelationList,
        meta: {
          title: '管理员角色绑定列表',
        },
      },
    ],
  },
]
