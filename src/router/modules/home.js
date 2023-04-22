/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2022-09-24 19:27:21
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
// home.js
const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')

export default [
  {
    path: '/',
    component: Layout,
    name: '中台',
    meta: {
      title: '中台',
    },
    icon: 'icon-home',
    children: [
      {
        path: '',
        name: '111',
        component: Home,
        meta: {
          title: '111',
          affix: true,
        },
      },
      {
        path: '',
        name: '222',
        component: Home,
        meta: {
          title: '222',
          affix: true,
        },
      },
    ],
  },
]
