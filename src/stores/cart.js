import Swal from "sweetalert2";

export default {
  state: () => ({
    products: [],
    subtotal: 0,
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
      } else {
        findProduct.quantity += 1;
        Swal.fire({
          icon: "success",
          title: "Product added to your cart",
          showConfirmButton: false,
          timer: 500,
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

      if (findProduct && findProduct.quantity > 1) {
        findProduct.quantity = findProduct.quantity - 1;
      } else if (findProduct.quantity == 1) {
        state.products.splice(state.products.indexOf(findProduct), 1);
      }
    },

    subtotalCalculation(state) {
      state.subtotal = state.products.reduce(
        (accumulator, current) =>
          accumulator + (current.price * current.quantity),
        0
      );
    },
  },

  getters: {
    productsInCart(state) {
      return state.products;
    },

    getSubtotal(state) {
      return state.subtotal
    },
  },
};
