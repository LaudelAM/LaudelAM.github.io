<template>
  <!--  -->
  <div class="row no-gutters justify-content-center">
    <!-- <div class="col-2 align-items-center justify-content-center p-4">
      <h6 class="card-header text-center">Some Content here</h6>
    </div> -->

    <div class="col-10 align-items-center justify-content-center">
      <div class="row row-cols-md-4 row-cols-sm-2">
        <div
          class="col mb-4"
          style="border: none"
          v-for="(productInDb, index) of productsInDb"
          :key="index"
        >
          <ProductDetail v-bind:product="productInDb" />
        </div>
      </div>
    </div>
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
          // console.log("fetched products:", data);
          return { id, ...data };
        });
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
