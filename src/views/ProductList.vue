<template>
  <!--  -->
  <div class="row no-gutters justify-content-center">
    <div class="d-block-flex col-10 justify-content-center">
      <b-nav-form class="align-self-center">
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
      <div class="row row-cols-lg-4 row-cols-md-4 row-cols-sm-2 row-cols-xs-2">
        <div
          class="col mb-4"
          style="border: none"
          v-for="(productInDb, index) of productsInDb"
          :key="index"
        >
          <ProductDetail v-bind:product="productInDb" />
        </div>
      </div>
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="10"
        align="center"
        use-router
      ></b-pagination-nav>
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
      // productsSearched: [],
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

    // getSearchedProducts() {
    //   return this.searchProduct;
    // },

    rows() {
      return this.productsInDb.length;
    },

    // getPaginatedItems() {
    //   return this.paginatedItems;
    // },
  },

  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
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
        console.log(this.products);
        // return this.products;
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
