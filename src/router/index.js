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
import PasswordChange from "@/views/PasswordChange.vue";
import Payment from "@/views/Payment.vue";
import OrdersRecord from "@/views/OrdersRecord.vue";

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
             name: "CartList",
             component: CartList,
           },
           {
             path: "/about",
             name: "About",
             component: About,
           },
           {
             path: "/contact",
             name: "Contact",
             component: Contact,
           },
           {
             path: "/login",
             name: "Login",
             component: Login,
           },
           {
             path: "/register",
             name: "Register",
             component: Register,
           },
           {
             path: "/userProfile",
             name: "UserProfile",
             component: UserProfile,
           },
           {
             path: "/passwordChange",
             name: "PasswordChange",
             component: PasswordChange,
           },
           {
            path: "/payment",
            name: "Payment",
            component: Payment,
          },
          {
            path: "/ordersRecord",
            name: "OrdersRecord",
            component: OrdersRecord,
          },
         ],
       });
