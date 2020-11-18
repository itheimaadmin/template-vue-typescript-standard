import Layout from '../pages/layout.vue'

export default [
  {
    path: '/user',
    component: Layout,
    children: [
      {
        name: 'index',
        path: 'index',
        component: () => import('../pages/user/index.vue')
      }
    ]
  }
]
