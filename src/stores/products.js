export default {
  state: () => ({
    productsStore: []
  }),

  mutations: {
    setProductsList(state, product) {
        let findProduct = state.productsStore.find(
          (data) => data.id === product.id
        );
        if(!findProduct)
      state.productsStore.push(product);
    },
  },

  getters: {
    allProducts(state) {
      return state.productsStore;
    },
  },
};
