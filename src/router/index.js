import Vue from "vue";
import VueRouter from "vue-router";

import ProductList from "@/views/ProductList.vue";
import CartList from "@/views/CartList.vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import UserProfile from "@/views/UserProfile.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/products",
      name: "ProductList",
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
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/userProfile",
      component: UserProfile,
    },
  ],
});
