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
          @input="paginate"
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
// import products from "../stores/products";
// import { fetchProducts } from "../database";
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
    this.paginate(this.currentPage);
  },

  methods: {
    async paginate(page) {
      try {
        this.products = [];
        let startAfter = this.perPage * (page - 1);
        this.getTotal();

        let result = db.collection("products").orderBy("id");
        let prod = await result.startAfter(startAfter).limit(this.perPage).get();

        prod.docs.forEach((doc) => {
          let prod = doc.data();
          this.products.push(prod);
        });

        // console.log(this.products);
        return this.products;
      } catch (e) {
        console.log(e);
      }
    },

    getTotal() {
      db.collection("products")
        .get()
        .then((res) => {
          this.total = res.size;
          this.pages = Math.ceil(this.total / this.perPage);
        });
    },

    async searchProducts() {
      try {
        this.products = [];
        let result = await db.collection("products").orderBy("id").get();

        result.docs.forEach((doc) => {
          let product = doc.data();
          if (
            product.title.toLowerCase().match(this.searchInput.toLowerCase()) ||
            product.category.toLowerCase().match(this.searchInput.toLowerCase())
          )
            this.products.push(product);
        });
        this.total = this.products.length;
        this.pages = Math.ceil(this.total / this.perPage);

        console.log(this.products);
        return this.products;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
