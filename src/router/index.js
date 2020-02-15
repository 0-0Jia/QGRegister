import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index/pageA'
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: 'pageA',
        name: 'pageA',
        component: () => import('../views/index/pageA/pageA.vue')
      },
      {
        path: 'pageB',
        name: 'pageB',
        component: () => import('../views/index/pageB/pageB.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes,
  base: '/'
})

export default router
