import {addToCartDB} from "../database";
import {removeFromCartDB} from "../database";

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
    cartProductsList(state, product) {
      state.products.splice(0, state.products.length, ...product);
      // console.log(product.id);
    },

    addToCart(state, product) {
      console.log("Search existing product in store");
      let findProduct = state.products.find((data) => data.id === product.id);

      if (!findProduct) {
        product.quantity = 1;
        state.products.push(product);
      } else {
        findProduct.quantity += 1;
      }
      console.log("end search in store");

      addToCartDB();
    },

    async removeFromCart(state, product) {
      console.log("Search existing product in store");
      let findProduct = state.products.find(
        (data) => data.title === product.title
      );

      if (findProduct && findProduct.quantity > 1) {
        findProduct.quantity = findProduct.quantity - 1;
      } else if (findProduct.quantity == 1) {
        state.products.splice(state.products.indexOf(findProduct), 1);
      }
      console.log("End search in store");
      // state.products = []
      removeFromCartDB();
    },
  },
};
