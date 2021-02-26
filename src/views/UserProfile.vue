<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="card mb-3 p-4 w-50" style="border: none">
      <h5 class="card-header text-center">Profile Information</h5>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTxYGdcuCvhkHUPzFkrnC-Emi7gWvIjOUUgQ&usqp=CAU"
        class="card-img-thumbnail align-self-center rounded mb-2"
        alt="Profile picture"
      />
      <!--  -->
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputFirstname" class="text-capitalize">Firstname</label>
            <input
              type="firstname"
              class="form-control text-capitalize"
              v-model="input.firstname"
              pattern="[^\d]+"
              id="inputFirstname"
              value="getFirstname"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputLastname" class="text-capitalize">Lastname</label>
            <input
              type="lastname"
              class="form-control text-capitalize"
              v-model="input.lastname"
              pattern="[^\d]+"
              id="inputLastname"
              value="getLastname"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="input.email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              id="inputEmail"
              value="getEmail"
            />
          </div>

          <div class="form-group col-md-6">
            <label for="inputAddress">Residential Address</label>
            <input
              type="text"
              class="form-control text-capitalize"
              v-model="input.address"
              id="inputAddress"
              value="getAddress"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="saveUserProfile">
          Save
        </button>
        <router-link class="text-primary" style="float: right" to="/passwordChange"
          >Change password here</router-link
        >
      </form>
    </div>
    <!-- -->
  </div>
</template>

<script>
import { db } from "../database";
import firebase from "firebase/app";
import "firebase/auth";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default {
  name: "UserProfile",

  data() {
    return {
      input: {
        firstname: null,
        lastname: null,
        email: null,
        address: null,
      },
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
      return this.input.firstname;
    },

    getLastname() {
      return this.input.lastname;
    },

    getEmail() {
      return this.input.email;
    },

    getAddress() {
      return this.input.address;
    },
  },

  methods: {
    async fetchUserProfile() {
      let userRef = db.collection("users").doc(this.getUser.email);
      let doc = await userRef.get();

      if (doc.exists) {
        this.input = doc.data();
      }
    },

    async saveUserProfile() {
      //Update profile in DB
      console.log("Start updating profile in DB");
      let userRef = await db.collection("users").doc(this.getUser.email);

      userRef.update({
        firstname: this.input.firstname,
        lastname: this.input.lastname,
        email: this.input.email,
        address: this.input.address,
      });
      console.log("End updating profile in DB", userRef);

      //Update Credentials
      console.log("Start updating credentials");
      let user = await firebase.auth().currentUser;

      user.updateEmail(this.input.email);
      user.updateProfile({
        displayName: this.input.firstname + " " + this.input.lastname,
      });
      console.log("End updating credentials");
      Toast.fire({
        icon: "success",
        title: "Profile updated",
      });
    },
  },

  mounted() {
    this.fetchUserProfile();
  },
};
</script>
