import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ListView from '../views/ListView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'List',
    component: ListView
  },
  {
    path: '/compare',
    name: 'About',
    component: () => import(/* webpackChunkName: "table" */ '../views/TableView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
