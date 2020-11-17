import Layout from '../pages/layout.vue'

export default [
  {
    path: '/developer',
    component: Layout,
    children: [
      // 首页
      {
        name: 'home',
        path: 'home',
        component: () => import('../pages/home/index.vue')
      }
    ]
  }
]
