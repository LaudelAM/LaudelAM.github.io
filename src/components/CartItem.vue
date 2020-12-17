<template>
  <div>
    <a href="#" class="btn btn-primary" @click="removeProduct">X</a>
    {{ product.title }}
  </div>
</template>

<script>
export default {
  name: "CartItem",

  props: {
    product: Object,
  },

  methods: {
    removeProduct() {
      this.$store.commit("removeFromCart", this.product);
    },
  },
};
</script>

<style scoped></style>
