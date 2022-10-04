

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import axios from "axios";
import store from "../store";


Vue.use(VueRouter)


//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component: () => import('../views/UserCenter')
      },
      // {
      //   path: '/sys/users',
      //   name: 'SysUser',
      //   component: User
      // },
      //
      // {
      //   path: '/sys/roles',
      //   name: 'SysRole',
      //   component: Role
      // },
      // {
      //   path: '/sys/menus',
      //   name: 'SysMenu',
      //   component: Menu
      // },

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

router.beforeEach((to, from, next) => {

  let hasRoute = store.state.menus.hasRoute


  if (!hasRoute){
    //获取菜单
    axios.get('/sys/menu/nav',{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then(res =>{

      console.log(res.data.data)
      //  拿到menuList
      store.commit("setMenuList",res.data.data.nav)


      //  拿到用户权限

      store.commit("setPermList",res.data.data.authority)


      // console.log(store.state.menus.menuList)
      //获取当前路由管理
      let newRouters = router.options.routes

      res.data.data.nav.forEach(menu =>{
        if (menu.children){
          menu.children.forEach(e =>{
            //  转换成路由

            let route = menuToRoute(e)


            //  将路由 添加到路由管理中
            if (route){
              newRouters[0].children.push(route)
            }

          })
        }
      })
      router.addRoutes(newRouters)
      console.log(newRouters)

      hasRoute = true
      store.commit("changeRouteStatus",hasRoute)
      console.log(hasRoute)
    })
  }

  next()
})

//导航转成路由
const  menuToRoute= (menu)=>{
  if(!menu.component){
    return null
  }
  let route = {
    name:menu.name,
    path:menu.path,
    meta: {
      icon:menu.icon,
      title:menu.title
    }
  }
  route.component = () => import('@/views/'+ menu.component+'.vue')
  return route
}


export default router
