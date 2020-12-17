import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

export default {
  state: () => ({
    products: []
  }),
  mutations: {
    setProductsList(state, product) {
      state.products = product;
    },
  },
  actions: {},
  getters: {
    allProducts(state) {
      return state.products;
    },
  },
};
