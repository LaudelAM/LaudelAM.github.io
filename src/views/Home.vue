<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <p>This is Home</p>
    <p v-if="userLoggedIn == true">Welcome {{ getUser.name }}</p>
    <!-- -->
    <div>
      <!-- <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide
          v-for="(getAllProduct, index) of getAllProducts"
          :key="index"
          :caption="getAllProduct.title"
          :text="getAllProduct.description"
          :img-src="getAllProduct.image"
        ></b-carousel-slide>
      </b-carousel> -->
      <!-- <p>{{ getAllProducts }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },

    getAllProducts() {
      return this.$store.getters.allProducts;
    },

    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
