<template>
  <div>
    <a href="#" class="btn btn-primary" @click="removeProduct">X</a>
    {{ itemCart.title }}
  </div>
</template>

<script>
export default {
  name: "CartItem",

  props: {
    itemCart: Object,
  },

  methods: {
    removeProduct() {
      this.$store.commit("removeFromCart", this.itemCart);
    },
  },
};
</script>

<style scoped></style>
