import Vue from "vue";
import Vuex from "vuex";
import products from "./products";
import cart from "./cart";
import orders from "./orders";
import authentication from "./authentication";
import createPersistedState from "vuex-persistedstate";
import {vuexfireMutations} from "vuexfire";
import {firestorePlugin} from "vuefire";


Vue.use(firestorePlugin);
Vue.use(Vuex);


export const store = new Vuex.Store({
  mutations: {
    // other mutations
    ...vuexfireMutations,
  },

  modules: {
    products,
    cart,
    authentication,
    orders
  },
  plugins: [createPersistedState()],
});
