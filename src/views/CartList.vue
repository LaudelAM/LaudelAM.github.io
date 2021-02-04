<template>
  <div class="container" style="border: solid transparent">
    <div class="row">
      <div class="col-9">
        <div class="row row-cols-2 justify-content-center">
          <div
            class="col-sm"
            v-for="(productToCart, index) in productsToCart"
            :key="index"
          >
            <CartItem :product="productToCart" />
          </div>
        </div>
      </div>

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
  </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";

export default {
  components: {
    CartItem,
  },

  computed: {
    productsToCart() {
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
  },

  methods: {
    roundToTwo(num) {
      return +(Math.round(num + "e+2") + "e-2");
    },

    checkoutProduct() {
      if (this.userLoggedIn != true) {
        this.$swal({
          icon: "info",
          title: "Please login or register",
          showConfirmButton: true,
        });
      } else {
        this.$swal({
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
