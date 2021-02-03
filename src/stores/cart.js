import Swal from "sweetalert2";

export default {
  state: () => ({
    products: [],
  }),

  mutations: {
    addToCart(state, product) {
      let findProduct = state.products.find((data) => data.id === product.id);

      if (!findProduct) {
        state.products.push(product);
        // alert("Product added to your cart, press [OK] to continue shopping");
        Swal.fire({
          icon: "success",
          title: "Product added to your cart",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },

    addQuantityProperty(state, product) {
      state.products.product = product.quantity = 1;
    },

    removeFromCart(state, product) {
      const findProduct = state.products.find(
        (data) => data.title === product.title
      );
      state.products.splice(state.products.indexOf(findProduct), 1);
    },

    // subtotal(state) {
    //   state.products.reduce((acc, product) => acc + product.price, 0);
    // },
  },

  getters: {
    productsInCart(state) {
      return state.products;
    },

    productQuantity(state, product){
      return state.products.filter((obj) => obj.id === product.id)
        .length;
    },
  },
};
