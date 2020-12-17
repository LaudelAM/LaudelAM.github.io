import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default {
  state: () => ({
    cartProducts: [],
  }),
  mutations: {
      addToCart(state, product){
        state.cartProducts.push(product)
      },

      removeFromCart(state, product){
        const findProduct = state.cartProducts.find(
          (data) => data.title === product.title
        );
        state.cartProducts.splice(state.cartProducts.indexOf(findProduct), 1);
      }
  },
  actions: {},
  getters: {
    productsInCart(state) {
      return state.cartProducts
    },
  },
};
