<template>
  <div class="d-flex p-2 bd-highlight">
    <ul class="col-9 d-flex flex-wrap justify-content-start">
      <li
        class="d-flex flex-fill justify-content-center col-sm-6"
        v-for="(productToCart, index) in productsToCart"
        :key="index"
      >
        <CartItem :product="productToCart" />
      </li>
    </ul>

    <div class="col-3">I'm on the other side</div>
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
