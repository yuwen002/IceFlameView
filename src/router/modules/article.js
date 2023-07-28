const Layout = () => import('@/layout/index.vue')
const SinglePageList = () => import("@/views/article/show_single_page.vue")
export default [
  {
    path: '',
    component: Layout,
    name: 'articleManagement',
    cn_name: '文章管理',
    meta: {
      title: '文章管理',
    },
    icon: 'Document',
    children: [
      {
        path: '/article/single_page/list',
        name: 'singlePageList',
        cn_name: '单页列表',
        component: SinglePageList,
        meta: {
          title: '单页列表',
        },
      },
    ],
  }
]

