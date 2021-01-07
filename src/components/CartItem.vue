<template>
  <div class="card mb-3" style="max-width: 300px; border: none">
    <div class="row" style="border: none">
      <div class="col-sm d-flex">
        <img
          class="card-img-thumbnail mx-auto d-block"
          :src="product.image"
          alt="Responsive image"
          style="width: 100%"
        />
      </div>
      <div class="col-sm d-flex">
        <div class="card-body flex-fill">
          <p class="card-title">{{ product.title }}</p>
          <p class="card-text">
            {{ product.category }}
          </p>
          <p class="card-text">
            <small class="text">R{{ product.price }}</small>
          </p>
          <p class="card-text">
            <a class="btn btn-primary" @click="removeProduct">X</a>
          </p>
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
