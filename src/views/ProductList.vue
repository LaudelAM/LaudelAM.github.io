<template>
  <!--  -->
  <div class="d-flex justify-content-center p-2">
    <!-- <div class="col-2 justify-content-center mt-5">
      <p>Some content here</p>
    </div> -->
    <div class="col-10 justify-content-center">
      <div class="d-flex flex-row no-gutters">
        <!-- Search input -->
        <form class="form-inline col-4">
          <input
            class="form-control mr-sm"
            type="search"
            placeholder="Keyword search"
            v-model="searchInput"
            aria-label="Search"
          />
          <button
            class="btn btn-light my-sm-0"
            v-on:click="fetchProducts(currentPage)"
            type="submit"
          >
            <b-icon icon="search" aria-label="Help">Search</b-icon>
          </button>
        </form>
        <!-- Sorting -->
        <div class="input-group col-md-4 ml-auto">
          <div class="input-group">
            <select
              class="custom-select"
              @change="fetchProducts(currentPage)"
              id="inputGroupSelect"
            >
              <option selected>Choose...</option>
              <option value="1">Title</option>
              <option value="2">Category</option>
              <option value="3">Price: low to high</option>
              <option value="4">Price: high to low</option>
            </select>
            <div class="input-group-append">
              <label class="input-group-text" for="inputGroupSelect">Sort By</label>
            </div>
          </div>
        </div>
      </div>
      <!--  -->

      <!-- Populate products -->
      <div>
        <div class="row row-cols-lg-4 row-cols-md-4 row-cols-sm-2 row-cols-xs-2">
          <div
            id="my-products"
            :items="productsInDb"
            :per-page="perPage"
            :current-page="currentPage"
            class="col mb-4"
            style="border: none"
            v-for="(productInDb, index) of productsInDb"
            :key="index"
          >
            <ProductDetail v-bind:product="productInDb" />
          </div>
        </div>

        <b-pagination
          v-model="currentPage"
          align="center"
          pills
          :total-rows="total"
          :per-page="perPage"
          @input="fetchProducts"
          aria-controls="my-products"
        ></b-pagination>
      </div>
    </div>

    <!-- </div> -->
  </div>
</template>

<script>
import ProductDetail from "../components/ProductDetail.vue";
// import axios from "axios";
import { db } from "../database";
// import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite-min.css";

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
      total: 0,
      pages: 0,
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

  created() {
    this.fetchProducts(this.currentPage);
  },

  methods: {
    async fetchProducts(page) {
      try {
        this.products = [];
        let productsRef = db.collection("products");

        // if (document.getElementById("inputGroupSelect").innerHTML == 0) {
        let startAt = this.perPage * (page - 1);
        let endAt = startAt + this.perPage;
        let input = this.capitalizeFirstLetter(this.searchInput);

        let query = await productsRef
          .where("title", ">=", input)
          .where("title", "<=", input + "\uf8ff")
          .get();

        // this.processQuery(page, query, this.products);

        query.docs.forEach((doc) => {
          let product = doc.data();
          this.products.push(product);
          // this.$store.commit("setProductsList", product);
        });

        this.total = this.products.length;
        this.pages = Math.ceil(this.total / this.perPage);

        if (document.getElementById("inputGroupSelect").value == 1) {
          this.products = this.products.sort((a, b) => (a.title > b.title ? 1 : -1));
          this.products = this.products.slice(startAt, endAt);

          return this.products;
        } else if (document.getElementById("inputGroupSelect").value == 2) {
          this.products = this.products.sort((a, b) =>
            a.category > b.category ? 1 : -1
          );
          this.products = this.products.slice(startAt, endAt);

          return this.products;
        } else if (document.getElementById("inputGroupSelect").value == 3) {
          this.products = this.products.sort((a, b) => (a.price > b.price ? 1 : -1));
          this.products = this.products.slice(startAt, endAt);

          return this.products;
        } else if (document.getElementById("inputGroupSelect").value == 4) {
          this.products = this.products
            .sort((a, b) => (a.price > b.price ? 1 : -1))
            .reverse();
          this.products = this.products.slice(startAt, endAt);

          return this.products;
        } else {
          this.products = this.products.slice(startAt, endAt);

          return this.products;
        }
      } catch (e) {
        console.log(e);
      }
    },

    capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped></style>
