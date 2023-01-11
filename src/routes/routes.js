import { createRouter, createWebHistory } from "vue-router";
import {useAuthUser} from '../middleware/useAuthUser'
const auth = useAuthUser()
const routes = [
  {
    path: '/',
    name:'Index',
    component: () => import('../views/Index.vue')
  },
  {
  path: '/home',
  name: "Home" ,
  component: () => import("../views/Home.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/LoginRegister.vue")
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import("../views/Shop.vue")
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import('../views/ShopCart.vue')

  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import('../views/RestorePassword.vue')

  },
  {
    path: '/updatePassword',
    name: 'UpdatePassword',
    component: () => import('../views/updatePassword.vue')
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import("../views/UserPage.vue")
  },
  {
    path: "/category",
    name: 'category',
    component: () => import("../views/Categories.vue"),

  },
  { path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },

];

export const router = createRouter({
  history:createWebHistory(),
  routes,
})

// router.beforeEach(async (to, from, next) => {
// await auth.isLoggedIn()
// // console.log(auth.auth.value)
//   if(auth.auth.value != 'authenticated') next({ name: 'login' })

//  else next()
// })
