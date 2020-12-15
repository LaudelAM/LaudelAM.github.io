export default {
  state: () => ({
    products: [],
  }),
  mutations: {
    setProductsList(state, products) {
      state.products = products;
    },
  },
  actions: {},
  getters: {
    allProducts(state) {
      return state.products;
    },
  },
};
