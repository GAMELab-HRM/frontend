import Vue from 'vue'
import VueRouter from 'vue-router'
import ws_10 from '../views/WS_10'
import WS_10_add from '../views/WS_10_add.vue'
import MRS from '../views/MRS.vue'
import MRS_add from '../views/MRS_add.vue'
import RDC from '../views/RDC.vue'
import RDC_add from '../views/RDC_add.vue'
import Hiatal_hernia from '../views/Hiatal_hernia.vue'
import Hiatal_hernia_add from '../views/Hiatal_hernia_add.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/WS_10',
    name: 'WS_10',
    component: ws_10
  },
  {
    path: '/WS_10/add',
    name: 'WS_10_add',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: WS_10_add,
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/MRS',
    name: 'MRS',
    component: MRS
  },
  {
    path: '/MRS/add',
    name: 'MRS_add',
    component: MRS_add
  },
  {
    path: "/RDC",
    name: "RDC",
    component: RDC
  },
  {
    path: "/RDC/add",
    name: "RDC_add",
    component: RDC_add
  },
  {
    path: "/Hiatal_hernia",
    name: 'Hiatal_hernia',
    component: Hiatal_hernia
  },
  {
    path: "/Hiatal_hernia/add",
    name: 'Hiatal_hernia_add',
    component: Hiatal_hernia_add
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
