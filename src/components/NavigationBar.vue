<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">LOGO</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggler="collapse"
          data-targer="#navbarResponsive"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <!-- Left aligned nav items -->
          <ul class="navbar-nav mr-auto offset-sm-1">
            <li class="nav-item">
              <router-link class="text-light" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="text-light" to="/products">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="text-light" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="text-light" to="/contact">Contact</router-link>
            </li>
          </ul>

          <!-- Right aligned nav items -->
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="na-link" href="#">Signup</a>
            </li>
            <li class="nav-item">
              <a class="na-link" href="#">Sign in</a>
            </li>
            <b-button @click="navigateToCart" size="sm" class="my-2 my-md-0"
              >Cart</b-button
            >
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    navigateToCart() {
      this.$router.push("/cart");
    },
  },
};
</script>
<style scoped>
.navbar-nav > li {
  padding-left: 5px;
  padding-right: 5px;
}

.navbar-nav > li {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
