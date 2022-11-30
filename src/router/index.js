import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    name: "Home",
  },
  {
    path: "/buyCart",
    component: () => import("../views/BuyCart.vue"),
    name: "BuyCart",
  },
  {
    path: "/product",
    component: () => import("../views/Product.vue"),
    name: "Product",
  },
  {
    path: "/scene",
    component: () => import("../views/Scene.vue"),
    name: "Scene",
  },
];

const router = createRouter({
  // 使用hash路由
  history: createWebHashHistory(),
  routes
});

export default router;
