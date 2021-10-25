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
        path: '/basic_test',
        name: 'basic_test',
        component: () => import("@/views/basic_test")
      },
      {
        path: '/basic_test/add',
        name: 'basic_test_add',
        component: () => import("@/views/basic_test_add")        
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
