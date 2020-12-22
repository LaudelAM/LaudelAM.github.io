<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center"
    style="margin: 0"
  >
    <h2>Product List</h2>
    <ul class="d-flex flex-wrap">
      <li
        class="d-flex flex-wrap m-2"
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
