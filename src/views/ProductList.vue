<template>
  <div class="container">
    <div class="row justify-content-center">
      <div
        class="col-3 col-md-3 col-sm-6 col-xs p-2"
        v-for="(productInDb, index) of productsInDb"
        :key="index"
      >
        <ProductDetail v-bind:product="productInDb" />
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import ProductDetail from "../components/ProductDetail.vue";
import axios from "axios";
import { db } from "../database";

const query = db.collection("products");

export default {
  components: {
    ProductDetail,
  },

  name: "ProductList",

  data() {
    return {
      products: [],
    };
  },

  computed: {
    getProducts() {
      return this.$store.getters.allProducts;
    },

    productsInDb() {
      return this.products;
    },
  },

  methods: {
    async fetchProducts() {
      try {
        const { docs } = await query.get();

        this.products = docs.map((doc) => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });
        console.log("Loaded products", this.products);
      } catch (error) {
        throw new Error("Something gone wrong!");
      }
    },
  },

  mounted() {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      this.$store.commit("setProductsList", response.data);
    });

    this.fetchProducts();
  },
};
</script>

<style scoped></style>
