import Vue from "vue";
import Vuex from "vuex";
import products from "./products";
import cart from "./cart";
import authentication from "./authentication";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    products,
    cart,
    authentication,
  },
  plugins: [createPersistedState()],
});
