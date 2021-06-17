import {updateOrders} from "../database";

export default {
  state: () => ({
    orderN: [],
  }),

  getters: {
    getOrders(state) {
      return state.orderN;
    },
  },

  mutations: {
    setProductsPerOrder(state, order) {
      state.orderN.push(order);
      updateOrders();
    },
  },
};
