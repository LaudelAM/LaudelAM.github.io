export default {
  state: () => ({
    products: [],
  }),

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

  mutations: {
    addToCart(state, product) {
      let findProduct = state.products.find((data) => data.id === product.id);

      if (!findProduct) {
        product.quantity = 1;
        state.products.push(product);
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
};
