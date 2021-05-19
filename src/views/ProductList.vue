<template>
  <!--  -->
  <div class="d-flex justify-content-center p-2">
    <!-- Side navigation -->
    <!-- <div class="col-2">
      <nav class="sidenav">
        <ul class="main-buttons">
          <li>
            <i class="fa fa-circle fa-2x"></i>
            Category
            <ul class="hidden">
              <li>TK-421</li>
              <li>why aren't</li>
              <li>you at</li>
              <li>your post?</li>
            </ul>
          </li>
        </ul>
      </nav>
    </div> -->
    <div class="col-10 justify-content-center">
      <div class="d-flex flex-row no-gutters">
        <!-- Search input -->
        <form class="form-inline col-4">
          <input
            class="form-control mr-sm"
            type="search"
            placeholder="Search Keyword "
            v-model="searchInput"
            aria-label="Search"
          />
          <button
            class="btn btn-light my-sm-0"
            v-on:click="processOperation()"
            type="submit"
          >
            <b-icon icon="search" aria-label="Help">Search</b-icon>
          </button>
        </form>
        <!-- Sorting -->
        <div class="input-group col-xs-1 col-md-3 col-3 ml-auto">
          <div class="input-group">
            <select
              class="custom-select"
              @change="processOperation()"
              ref="inputGroupSelect"
            >
              <option selected>Sort By...</option>
              <option value="1">Price: low to high</option>
              <option value="2">Price: high to low</option>
            </select>
            <!-- <div class="input-group-append">
              <label class="input-group-text" for="inputGroupSelect">Sort By</label>
            </div> -->
          </div>
        </div>
      </div>
      <!--  -->

      <!-- Populate products -->
      <div>
        <div class="row row-cols-md-4 row-cols-lg-4">
          <div
            id="my-products"
            :items="getDbProducts"
            :per-page="perPage"
            :current-page="currentPage"
            class="col-xs col-sm col-md col mb-4"
            v-for="(getDbProduct, index) of getDbProducts"
            :key="index"
          >
            <ProductDetail v-bind:product="getDbProduct" />
          </div>
        </div>

        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              tabindex="-1"
              v-on:click="previousPage()"
              aria-disabled="true"
              >Previous</a
            >
          </li>
          <li class="page-item">
            <a class="page-link" v-on:click="processOperation()" href="#">Next</a>
          </li>
        </ul>

        <!-- <b-pagination
          v-model="currentPage"
          align="center"
          pills
          :per-page="perPage"
          prev-text="Prev"
          next-text="Next"
          @input="processOperation"
          aria-controls="my-products"
        ></b-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
import ProductDetail from "../components/ProductDetail.vue";
import { db } from "../database";
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
      lastItem: null,
      firstItem: null,
    };
  },

  computed: {
    getStoreProducts() {
      return this.$store.getters.allProducts;
    },

    getDbProducts() {
      let productsData = [];
      this.products.forEach((doc) => {
        let product = doc.data();
        productsData.push(product);
      });
      return productsData;
    },
  },

  methods: {
    async fetchProducts(searchKeyword, productsPerPage, lastItem) {
      let products = [];
      try {
        let productsCollection = db.collection("products");
        searchKeyword = searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1);
        // let optionChoice = this.$refs.inputGroupSelect.value;

        if (searchKeyword && searchKeyword.length > 0) {
          productsCollection = productsCollection.where("title", ">=", searchKeyword);
          productsCollection = productsCollection.where(
            "title",
            "<=",
            searchKeyword + "\uf8ff"
          );
        }

        productsCollection = productsCollection.orderBy("title", "asc");
        productsCollection = productsCollection.limit(productsPerPage);
        if (lastItem) productsCollection = productsCollection.startAfter(lastItem);

        let results = await productsCollection.get();

        products = results.docs;

        // this.getCategory()
      } catch (e) {
        console.log(e);
      }
      return products;
    },

    async processOperation() {
      // this.products = [];
      this.products = await this.fetchProducts(
        this.searchInput,
        this.perPage,
        this.lastItem
      );

      this.firstItem = this.products[this.products.length - this.perPage];
      this.lastItem = this.products[this.products.length - 1];
    },

    async previousPage() {
      let products = [];
      try {
        let productsCollection = db.collection("products");
        let searchKeyword = this.searchInput;
        searchKeyword = searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1);
        // let optionChoice = this.$refs.inputGroupSelect.value;

        if (searchKeyword && searchKeyword.length > 0) {
          productsCollection = productsCollection.where("title", ">=", searchKeyword);
          productsCollection = productsCollection.where(
            "title",
            "<=",
            searchKeyword + "\uf8ff"
          );
        }

        productsCollection = productsCollection.orderBy("title", "asc");
        productsCollection = productsCollection.limitToLast(this.perPage);

        if (this.firstItem)
          productsCollection = productsCollection.endBefore(this.firstItem);

        let results = await productsCollection.get();
        // console.log("after", productsPerPage);

        products = results.docs;

        this.lastItem = products[products.length - 1];
        this.firstItem = products[products.length - this.perPage];
        // this.getCategory()
      } catch (e) {
        console.log(e);
      }
      return (this.products = products);
    },
  },

  async mounted() {
    this.processOperation();
  },
};
</script>

<style scoped></style>
