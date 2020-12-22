<template>
  <div>
    <div class="card" style="width: 180px">
      <img
        class="card-img-top img-thumbnail"
        :src="product.image"
        alt="Card image"
        style="width: 100%"
      />
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
      </div>
      <ul class="list-group">
        <li class="d-flex flex-wrap justify-content-center">
          {{ product.price }}
        </li>
        <li class="d-flex flex-wrap justify-content-center">{{ product.category }}</li>
      </ul>
      <div class="card-body d-flex align-items-center justify-content-center">
        <b-button href="#" variant="outline-primary" @click="addToCart"
          >Add to Cart</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",

  props: {
    product: Object,
  },

  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.product);
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 200px;
}
</style>
