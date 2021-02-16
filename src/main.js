import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {router} from "./router";
import {store} from "./stores";
import {db} from "./database";
import "firebase/auth";
import Vuelidate from "vuelidate";

// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {BootstrapVueIcons} from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueSweetalert2);
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  db,
  render: (h) => h(App),
}).$mount("#app");
