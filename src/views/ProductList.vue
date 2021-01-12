<template>
  <div class="container" style="border: none">
    <div class="row">
      <div
        class="col-lg-3 col-md-3 col-sm-6 justify-content-center p-2"
        v-for="(getProduct, index) of getProducts"
        :key="index"
      >
        <ProductDetail v-bind:product="getProduct" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductDetail from "../components/ProductDetail.vue";
import axios from "axios";

export default {
  components: {
    ProductDetail,
  },

  name: "ProductList",

  computed: {
    getProducts() {
      return this.$store.getters.allProducts;
    },
  },

  mounted() {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      this.$store.commit("setProductsList", response.data);
    });
  },
};
</script>

<style scoped></style>
