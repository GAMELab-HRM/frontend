import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLayout from "../views/layouts/AppLayout"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    component: AppLayout
  },
  {
    path: '/hello',
    component: AppLayout,
    name: 'Hello',
    children:[
      {
        path: '/WS_10',
        name: 'WS_10',
        component: () => import("@/views/WS_10")
      },
      {
        path: '/WS_10/add',
        name: 'WS_10_add',
        component: () => import("@/views/WS_10_add")        
      },
      {
        path: '/MRS',
        name: 'MRS',
        component: () => import("@/views/MRS")
      },
      {
        path: '/MRS/add',
        name: 'MRS_add',
        component: () => import("@/views/MRS_add")        
      },
      {
        path: '/RDC',
        name: 'RDC',
        component: () => import("@/views/RDC")
      },
      {
        path: '/RDC/add',
        name: 'RDC_add',
        component: () => import("@/views/RDC_add")        
      },
      {
        path: '/Hiatal_hernia',
        name: 'Hiatal_hernia',
        component: () => import("@/views/Hiatal_hernia")
      },
      {
        path: '/Hiatal_hernia/add',
        name: 'Hiatal_hernia_add',
        component: () => import("@/views/Hiatal_hernia_add")        
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
