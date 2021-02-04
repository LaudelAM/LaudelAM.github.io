export default {
  state: () => ({
    products: [],
  }),

  mutations: {
    addToCart(state, product) {
      let findProduct = state.products.find((data) => data.id === product.id);
      // state.products.product = product.quantity = 1;
      if (!findProduct) {
        state.products.push(product);
        product.quantity = 1
      } else {
        findProduct.quantity += 1;
      }
    },

    removeFromCart(state, product) {
      const findProduct = state.products.find(
        (data) => data.title === product.title
      );

      if (findProduct && findProduct.quantity > 1) {
        findProduct.quantity = findProduct.quantity - 1;
      } else if (findProduct.quantity == 1) {
        state.products.splice(state.products.indexOf(findProduct), 1);
      }
    },
  },

  getters: {
    productsInCart(state) {
      return state.products;
    },

    subtotalCalculation(state) {
      let subtotal = state.products.reduce(
        (accumulator, current) =>
          accumulator + current.price * current.quantity,
        0
      );
      return subtotal;
    },
  },
};
