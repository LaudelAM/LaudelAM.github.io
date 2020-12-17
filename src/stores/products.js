import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex)

export default {
  state: () => ({
    myProducts: []
  }),
  mutations: {
    setProductsList(state, products) {
      state.myProducts = products;
    },
  },
  actions: {},
  getters: {
    allProducts(state) {
      return state.myProducts;
    },
  },
};
