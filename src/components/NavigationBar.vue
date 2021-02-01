<template>
  <div>
    <b-navbar class="text-secondary" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">LOGO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- Links -->
          <b-nav-item>
            <router-link class="text-light" to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="text-light" to="/products">Products</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="text-light" to="/about">About</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="text-light" to="/contact">Contact</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="userLoggedIn != true" class="ml-auto">
          <b-nav-item>
            <router-link class="text-light" to="/register">Register</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="text-light" to="/login">Login</router-link>
          </b-nav-item>

          <b-button
            size="sm"
            @click="navigateToCart"
            variant="light"
            class="my-2 my-md-0"
          >
            <b-icon icon="cart-fill" aria-label="Help">My cart</b-icon>
          </b-button>
        </b-navbar-nav>
        <!--  -->
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item>
            <a class="nav-link text-light" @click="logout" href="#">Logout</a>
          </b-nav-item>

          <b-button
            size="sm"
            @click="navigateToCart"
            variant="light"
            class="my-2 my-md-0"
          >
            <b-icon icon="cart-fill" aria-label="Help">My cart</b-icon>
          </b-button>
        </b-navbar-nav>
        <!--  -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },

    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    navigateToCart() {
      this.$router.push("/cart");
    },

    logout() {
      this.$store.commit("logUserOut");
      this.$store.getters.isLoggedIn;
      this.$router.push("/").catch((err) => err);
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
