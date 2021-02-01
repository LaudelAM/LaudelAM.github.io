<template>
  <div class="card mb-3" style="width: 300px; border: none">
    <div class="row no-gutters">
      <div class="col-sm-5">
        <img
          class="card-img-thumbnail mx-auto d-block"
          :src="product.image"
          alt="Responsive image"
          style="width: 100%"
        />
      </div>
      <div class="col-sm-7">
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">R{{ product.price }}</p>
          <b-badge href="#" variant="dark" @click="removeProduct">Remove</b-badge>
        </div>
      </div>
    </div>
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
