<template>
  <div>
    <div class="card" style="width: 180px">
      <img
        class="card-img-top img-thumbnail"
        :src="productItem.image"
        alt="Card image"
        style="width: 100%"
      />
      <div class="card-body">
        <h5 class="card-title">{{productItem.title}}</h5>
      </div>
      <ul class="list-group">
        <li class="d-flex flex-wrap justify-content-center">
          {{ productItem.price }}
        </li>
        <li class="d-flex flex-wrap">{{productItem.category}}</li>
      </ul>
      <div class="card-body d-flex align-items-center justify-content-center">
        <b-link class="btn btn-primary" @click="addToCart">Add to Cart</b-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",

  props: {
    productItem: Object,
  },

  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.productItem);
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
