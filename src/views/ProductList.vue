<template>
  <div class="row align-items-center p-2 justify-content-center">
    <ul class="d-flex flex-wrap justify-content-center">
      <li
        class="d-flex justify-content-center col-sm-3 p-2"
        v-for="(getProduct, index) of getProducts"
        :key="index"
      >
        <ProductDetail v-bind:product="getProduct" />
      </li>
    </ul>
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
