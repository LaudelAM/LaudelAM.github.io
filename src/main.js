import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {router} from "./router";
import {store} from "./stores";
import {db} from "./database";
import "firebase/auth";
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {BootstrapVueIcons} from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueSweetalert2);
Vue.use(VueSidebarMenu)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  db,
  // app,
  render: (h) => h(App),
}).$mount("#app");
