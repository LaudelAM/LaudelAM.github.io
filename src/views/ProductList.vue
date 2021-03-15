<template>
  <!--  -->
  <div class="d-flex flex-row no-gutters justify-content-center p-2">
    <div class="col-10">
      <!-- Search input -->
      <b-nav-form class="col-md-6 mr-auto">
        <b-form-input
          size="md"
          class="mr-sm-6"
          v-model="searchInput"
          placeholder="Men, Women, Electronics..."
        ></b-form-input>
        <b-button
          size="sm"
          class="my-2 my-sm-0"
          v-on:click="searchProducts"
          type="submit"
        >
          <b-icon icon="search" aria-label="Help">Search</b-icon></b-button
        >
      </b-nav-form>

      <!-- Populate products -->
      <div class="row row-cols-lg-4 row-cols-md-4 row-cols-sm-2 row-cols-xs-2">
        <div
          id="my-products"
          :items="displayedProducts"
          :per-page="perPage"
          :current-page="currentPage"
          class="col mb-4"
          style="border: none"
          v-for="(productInDb, index) of displayedProducts"
          :key="index"
        >
          <ProductDetail v-bind:product="productInDb" />
        </div>
      </div>

      <b-pagination
        v-model="currentPage"
        align="center"
        pills
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-products"
      ></b-pagination>
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
      searchInput: "",
      currentPage: 1,
      perPage: 8,
    };
  },

  computed: {
    getProducts() {
      return this.$store.getters.allProducts;
    },

    productsInDb() {
      return this.products;
    },

    rows() {
      return this.productsInDb.length;
    },

    displayedProducts() {
      return this.paginate(this.products);
    },
  },

  methods: {
    async searchProducts() {
      try {
        this.products = [];
        let result = await db.collection("products").get();
        // this.firstBatch();
        result.docs.forEach((doc) => {
          let product = doc.data();
          if (
            product.title.toLowerCase().match(this.searchInput.toLowerCase()) ||
            product.category.toLowerCase().match(this.searchInput.toLowerCase())
          )
            this.products.push(product);
        });
        console.log(this.products);
      } catch (e) {
        console.log(e);
      }
    },

    async fetchProducts() {
      try {
        const { docs } = await query.get();
        this.products = docs.map((doc) => {
          const { id } = doc;
          const data = doc.data();

          return { id, ...data };
        });
      } catch (error) {
        throw new Error("Something gone wrong!");
      }
    },

    paginate(products) {
      let from = this.currentPage * this.perPage - this.perPage;
      let to = this.currentPage * this.perPage;
      return products.slice(from, to);
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
