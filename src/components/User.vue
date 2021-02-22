<template>
  <div class="card mb-3" style="max-width: 540px; border: none">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="https://picsum.photos/id/237/200/300" class="card-img" alt="dog" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Information</h5>
          <p class="card-text">Name:</p>
          <p class="card-text">Surname:</p>
          <p class="card-text">Email address:</p>
        </div>
        <button id="btn-edit" type="button" class="btn btn-success" v-on:click="edit">
          <i class="icon-hand-right"></i> Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../database";
export default {
  name: "UserProfile",

  data() {
    return {
      userProfile: Object,
    };
  },

  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },

    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    getFirstname() {
      this.fetchUserProfile;
    },
  },

  methods: {
    async fetchUserProfile(user) {
      let userProfile = db.collection("users").doc(user.email);
      let doc = await userProfile.get();

      if (doc.exists) {
        let result = doc.data();
        console.log("Fetched profile ->", result);

        console.log("End Fetch profile from DB");
        return result;
      }
    },
  },
};
</script>
