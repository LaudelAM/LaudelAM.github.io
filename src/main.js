import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import {router} from "./router";
import {store} from "./stores";

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
