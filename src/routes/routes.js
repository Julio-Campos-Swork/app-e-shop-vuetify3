import { createRouter, createWebHistory } from "vue-router";

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
    path: '/userProfile',
    name: 'userProfile',
    component: () => import("../views/UserPage.vue")
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

  }

];
export const router = createRouter({
  history:createWebHistory(),
  routes,
})
