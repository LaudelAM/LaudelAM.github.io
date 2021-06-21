<template>
  <b-navbar class="text-secondary fixed" toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#"
      ><router-link class="text-light" to="/">LOGO</router-link></b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- Links -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="userLoggedIn != true" class="ml-auto">
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
        <b-nav-item>
          <router-link class="text-light" to="/register">Sign up</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="text-light glyphicon glyphicon-user" to="/login"
            >Login</router-link
          >
        </b-nav-item>

        <b-button size="sm" @click="navigateToCart" variant="light" class="my-2 my-md-0">
          My cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
          <sup
            ><span class="badge badge-info">{{ cartProductList.length }}</span></sup
          >
        </b-button>
      </b-navbar-nav>
      <!--  -->
      <b-navbar-nav v-else class="ml-auto">
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
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template class="text-light" #button-content>
            <em><b-icon icon="person-fill"></b-icon>{{ getUser.name }}</em>
          </template>
          <b-dropdown-item>
            <router-link class="text-dark" to="/userProfile">Profile</router-link>
          </b-dropdown-item>
          <!-- <b-dropdown-item>
            <router-link class="text-dark" to="/userProfile">Orders</router-link>
          </b-dropdown-item> -->
          <b-dropdown-item @click="logout" href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-button size="sm" @click="navigateToCart" variant="light" class="my-2 my-md-0">
          My cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
          <sup
            ><span class="badge badge-info">{{ cartProductList.length }}</span></sup
          >
        </b-button>
      </b-navbar-nav>
      <!--  -->
    </b-collapse>
  </b-navbar>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Swal from "sweetalert2";
import { updateStoreFromDB } from "../database";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default {
  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },

    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    cartProductList() {
      return this.$store.getters.productsInCart;
    },
  },

  methods: {
    navigateToCart() {
      if (this.userLoggedIn == true) {
        updateStoreFromDB();
        this.$router.push("/cart").catch((err) => err);
      } else {
        this.$router.push("/cart").catch((err) => err);
      }
    },

    logout() {
      this.$store.commit("logUserOut");

      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          Toast.fire({
            icon: "success",
            title: "Logged out",
          });
        })
        .catch((error) => {
          // An error happened.
          this.$swal({
            icon: "warning",
            title: error.message,
            showConfirmButton: true,
          });
        });

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
