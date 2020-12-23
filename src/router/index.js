import Vue from "vue";
import VueRouter from "vue-router";

import ProductList from "@/views/ProductList.vue";
import CartList from "@/views/CartList.vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "",
      component: Home,
    },
    {
      path: "/products",
      component: ProductList,
    },
    {
      path: "/cart",
      component: CartList,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/contact",
      component: Contact,
    },
  ],
});
