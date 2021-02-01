export default {
  state: () => ({
    products: [],
  }),

  mutations: {
      addToCart(state, product){
        state.products.push(product);
      },

      removeFromCart(state, product){
        const findProduct = state.products.find(
          (data) => data.title === product.title
        );
        state.products.splice(state.products.indexOf(findProduct), 1);
      },

      subtotal(state){
        state.products.reduce((acc, product) => acc + product.price, 0);
      }

  },
  
  actions: {},
  getters: {
    productsInCart(state) {
      return state.products;
    },
  },
};
