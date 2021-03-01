<template>
  <div class="row no-gutters justify-content-center">
    <div class="col-9 pr-2 justify-content-center">
      <div class="row no-gutters row-cols-md-2 row-cols-sm-2">
        <div
          class="col mb-2"
          style="border: none"
          v-for="(getProductInCart, index) of getProductsInCart"
          :key="index"
        >
          <CartItem v-bind:product="getProductInCart" />
        </div>
      </div>
    </div>
    <!--  -->
    <!--  -->
    <div class="col-3 p-3">
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" style="border: none">
            Subtotal
            <span class="badge badge-light float-right">R{{ subtotal }}</span>
          </li>
          <li class="list-group-item" style="border: none">
            VAT
            <span class="badge badge-light float-right">14%</span>
          </li>
          <li class="list-group-item" style="border: none">
            Total
            <span class="badge badge-light float-right">R{{ getTotal }}</span>
          </li>
        </ul>
      </div>
      <button
        type="button"
        v-on:click="checkoutProduct"
        class="btn btn-secondary btn-sm btn-block mt-2"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  // timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export default {
  components: {
    CartItem,
  },

  data() {
    return {
      products: [],
    };
  },

  computed: {
    getProductsInCart() {
      return this.$store.getters.productsInCart;
    },

    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    subtotal() {
      return this.roundToTwo(this.$store.getters.subtotalCalculation);
    },

    getTotal() {
      let total = this.subtotal + (this.subtotal * 14) / 100;
      return this.roundToTwo(total);
    },

    // productsInCart() {
    //   return this.products;
    // },

    // getProducts() {
    //   this.products = this.$store.getters.productsInCart
    //   return this.products;
    // },
  },

  methods: {
    roundToTwo(num) {
      return +(Math.round(num + "e+2") + "e-2");
    },

    checkoutProduct() {
      if (this.userLoggedIn != true) {
        Toast.fire({
          icon: "info",
          title: "Please login or register",
          showConfirmButton: true,
        });
      } else {
        Toast.fire({
          icon: "info",
          title: "No data to process",
          showConfirmButton: true,
        });
      }
    },
  },
};
</script>

<style scoped>
.list-group-item1 {
  list-style-type: none;
}
</style>
