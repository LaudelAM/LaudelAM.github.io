import Vuex from "vuex";
import products from "./products";
import cart from "./cart";

export const store = new Vuex.Store({
  modules: {
    products,
    cart,
  },
});
