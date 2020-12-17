<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <h2>Cart</h2>
    <ul class="d-block p-2 text-dark">
      <li
        class="list-group-item1"
        v-for="(productToCart, index) in productsToCart"
        :key="index"
      >
        <CartItem :product="productToCart"/>
      </li>
    </ul>
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
  },
};
</script>

<style scoped>
.list-group-item1 {
  list-style-type: none;
}
</style>
