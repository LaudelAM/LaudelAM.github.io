// import {db} from "../database";

export default {
  state: () => ({
    products: [],
  }),
  mutations: {
    setProductsList(state, product) {
      state.products = product;
      // console.log(product.id);
    },
  },

  actions: {},

  getters: {
    allProducts(state) {
      return state.products;
    },
  },
};
