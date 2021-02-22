<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <p>Here are {{ getUser.name }} details</p>

    <!-- -->
  </div>
</template>

<script>
export default {
  name: "UserProfile",

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
