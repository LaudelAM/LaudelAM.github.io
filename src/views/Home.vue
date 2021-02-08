<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <p>This is Home</p>
    <p v-if="userLoggedIn == true">Welcome {{ getUser.name }}</p>
    <!-- -->
  </div>
</template>

<script>
export default {
  name: "Home",

  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },

    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>
