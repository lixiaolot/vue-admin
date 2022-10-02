import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import User from '../components/sys/User'
import Role from '../components/sys/Role'
import Menu from '../components/sys/Menu'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/users',
        name: 'SysUser',
        component: User
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component: () => import('../components/UserCenter')
      },
      {
        path: '/role',
        name: 'SysRole',
        component: Role
      },
      {
        path: '/menus',
        name: 'SysMenu',
        component: Menu
      },

    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
