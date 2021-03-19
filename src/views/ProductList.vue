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
          :items="paginatedProducts"
          :per-page="perPage"
          :current-page="currentPage"
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
        :total-rows="totalPages"
        :per-page="perPage"
        @input="paginate"
        aria-controls="my-products"
      ></b-pagination>
      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>
  </div>
</template>

<script>
import ProductDetail from "../components/ProductDetail.vue";
import axios from "axios";
import { db } from "../database";
// import products from "../stores/products";

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
      paginatedProducts: [],
      currentPage: 1,
      perPage: 8,
      totalPages: 0,
      pages: 0,
    };
  },

  computed: {
    numberOfPages() {
      return this.productsInDb.length / this.perPage;
    },

    getProducts() {
      return this.$store.getters.allProducts;
    },

    productsInDb() {
      return this.products;
    },

    paginateProducts() {
      return this.paginatedProducts;
    },

    getPage() {
      return this.paginate(this.getCurrentPage);
    },
  },

  created() {
    this.showPage();
  },

  methods: {
    async searchProducts() {
      try {
        this.products = [];
        let result = await db.collection("products").get();

        result.docs.forEach((doc) => {
          let product = doc.data();
          if (
            product.title.toLowerCase().match(this.searchInput.toLowerCase()) ||
            product.category.toLowerCase().match(this.searchInput.toLowerCase())
          )
            this.products.push(product);
        });
      } catch (e) {
        console.log(e);
      }
    },

    showPage() {
      db.collection("products")
        .get()
        .then((res) => {
          this.totalPages = res.size;
          this.pages = Math.ceil(this.totalPages / this.perPage);
        });

      db.collection("products")
        .limit(this.perPage)
        .orderBy("id", "asc")
        .get()
        .then((query) => {
          query.forEach((item) => {
            this.paginatedProducts.push(item.data());
          });
          console.log(this.paginatedProducts);
        });
    },

    async paginate() {
      try {
        this.paginatedProducts = [];
        let startAt = this.currentPage * this.perPage - this.perPage + 1;
        // let endAt = this.getCurrentPage * this.perPage - this.perPage + this.perPage;

        let result = db.collection("products").orderBy("id", "asc");

        let prod = await result.limit(this.perPage).startAt(startAt).get();

        prod.docs.forEach((doc) => {
          let prod = doc.data();
          this.paginatedProducts.push(prod);
        });

        console.log(this.paginatedProducts);
        return this.paginatedProducts;
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
