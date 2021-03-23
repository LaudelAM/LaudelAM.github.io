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
          placeholder="Name, Category"
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
          :items="paginateProducts"
          :per-page="perPage"
          :current-page="paginateProducts"
          class="col mb-4"
          style="border: none"
          v-for="(paginateProduct, index) of paginateProducts"
          :key="index"
        >
          <ProductDetail v-bind:product="paginateProduct" />
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
      <!-- <p>{{ getNew }}</p> -->
    </div>
  </div>
</template>

<script>
import ProductDetail from "../components/ProductDetail.vue";
// import axios from "axios";
import { db } from "../database";
// import products from "../stores/products";
// import { fetchDataFromDB } from "../database";
// import products from "../stores/products";

export default {
  components: {
    ProductDetail,
  },

  name: "ProductList",

  data() {
    return {
      products: [],
      searchInput: "",
      paginatedProducts: [],
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

    paginateProducts() {
      return this.paginatedProducts;
    },
  },

  created() {
    this.fetchProducts();
  },

  methods: {
    // async fetchDataFromDB() {
    //   try {
    //     this.products = [];
    //     let startAt = this.currentPage * this.perPage - this.perPage;
    //     let endtAt = this.currentPage * this.perPage - this.perPage + this.perPage;

    //     let result = await db.collection("productsNew").doc("data").get();
    //     this.total = result.data().items.length;
    //     this.pages = Math.ceil(this.total / this.perPage);

    //     for (let i = startAt; i < endtAt; i++) {
    //       let product = result.data().items[i];
    //       if (product != null) this.products.push(product);
    //     }
    //     console.log(this.products);

    //     return this.products;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },

    async searchProducts() {
      try {
        this.paginatedProducts = [];
        let result = await db.collection("productsNew").doc("data").get();
        let product = result.data().items;

        for (let i = 0; i < product.length; i++) {
          if (
            product[i].name.toLowerCase().match(this.searchInput.toLowerCase()) ||
            product[i].category.toLowerCase().match(this.searchInput.toLowerCase())
          ) {
            let searchedProduct = product[i];
            this.paginatedProducts.push(searchedProduct);
          }
        }
        this.total = this.paginatedProducts.length;
        console.log(this.total);
        this.pages = Math.ceil(this.total / this.perPage);

        return this.paginatedProducts;
      } catch (e) {
        console.log(e);
      }
    },

    async fetchProducts() {
      try {
        this.paginatedProducts = [];
        let startAt = this.currentPage * this.perPage - this.perPage;
        let endtAt = this.currentPage * this.perPage - this.perPage + this.perPage;

        let result = await db.collection("productsNew").doc("data").get();
        let product = result.data().items;
        this.total = product.length;
        this.pages = Math.ceil(this.total / this.perPage);

        for (let i = startAt; i < endtAt; i++) {
          if (product[i] != null) this.paginatedProducts.push(product[i]);
        }

        // console.log(this.paginatedProducts);
        return this.paginatedProducts;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
