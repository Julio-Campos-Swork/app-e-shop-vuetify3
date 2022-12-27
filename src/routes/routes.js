import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/index',
    name:'Index',
    component: () => import('../views/Index.vue')
  },
  {
  path: '/home',
  name: "Home" ,
  component: () => import("../views/Home.vue")
  },
];
export const router = createRouter({
  history:createWebHistory(),
  routes,
})
