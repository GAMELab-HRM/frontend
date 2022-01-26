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
    path: '/login',
    name: 'Login',
    component: () => import("@/views/login/index.vue")
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
        path: '/basic_test/upload_files',
        name: 'upload_files',
        component: () => import("@/views/upload_files")
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
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
