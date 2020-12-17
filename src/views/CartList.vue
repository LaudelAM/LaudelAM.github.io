<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <h2>Cart</h2>
    <ul class="d-block p-2 text-dark">
      <li
        class="list-group-item1"
        v-for="(productToCart, index) in productsToCart"
        :key="index"
      >
        <CartItem :itemCart="productToCart" v-on:toCartList="onClick" />
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

  props: {
    items: Array,
  },

  computed: {
    productsToCart() {
      return this.$store.getters.productsInCart;
    },
  },

  methods: {
    onClick(product) {
      //console.log(product)
      this.$emit("prodToApp", product);
    },
  },
};
</script>

<style scoped>
.list-group-item1 {
  list-style-type: none;
}
</style>
