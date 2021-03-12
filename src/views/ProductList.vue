<template>
  <!--  -->
  <div class="row no-gutters justify-content-center">
    <b-nav-form>
      <b-form-input
        size="sm"
        class="mr-sm-2"
        v-model="searchInput"
        placeholder="Search product"
      ></b-form-input>
      <b-button size="sm" class="my-2 my-sm-0" type="submit">
        <b-icon icon="search" aria-label="Help">Search</b-icon></b-button
      >
    </b-nav-form>

    <div class="col-10 align-items-center justify-content-center">
      <div class="row row-cols-md-4 row-cols-sm-2">
        <div
          class="col mb-4"
          style="border: none"
          v-for="(productInDb, index) of searchProduct"
          :key="index"
        >
          <ProductDetail v-bind:product="productInDb" />
        </div>
      </div>
      <b-pagination
        align="center"
        v-model="currentPage"
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
      // paginatedItems: [],
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

    searchProduct() {
      return this.productsInDb.filter((productInDb) => {
        return productInDb.title.toLowerCase().match(this.searchInput.toLowerCase());
      });
    },

    // getPaginatedItems() {
    //   return this.paginatedItems;
    // },
  },

  methods: {
    // paginate(page_size, page_number) {
    //   let productsToParse = this.productsInDb;
    //   this.paginatedItems = productsToParse.slice(
    //     page_number * page_size,
    //     (page_number + 1) * page_size
    //   );
    // },

    // onPageChanged(page) {
    //   this.paginate(this.perPage, page - 1);
    // },

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

    // this.paginate(this.perPage, 0);
  },
};
</script>

<style scoped></style>
