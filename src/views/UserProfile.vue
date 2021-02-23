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
              :placeholder="[[getFirstname]]"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputLastname" class="text-capitalize">Lastname</label>
            <input
              type="lasttname"
              class="form-control text-capitalize"
              v-model="input.lastname"
              pattern="[^\d]+"
              id="inputLastname"
              :placeholder="[[getLastname]]"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="input.email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              id="inputEmail4"
              :placeholder="[[getEmail]]"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="input.password"
              pattern="[\dA-Za-z]{6,}"
              id="inputPassword"
              placeholder="password"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Residential Address</label>
          <input
            type="text"
            class="form-control text-capitalize"
            v-model="input.address"
            id="inputAddress"
            :placeholder="[[getAddress]]"
          />
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="saveUserProfile">
          Save
        </button>
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
      userProfile: Object,
      input: {
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        password: "",
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
      return this.userProfile.firstname;
    },

    getLastname() {
      return this.userProfile.lastname;
    },

    getEmail() {
      return this.userProfile.email;
    },

    getAddress() {
      return this.userProfile.address;
    },
  },

  methods: {
    async fetchUserProfile() {
      let userRef = db.collection("users").doc(this.getUser.email);
      let doc = await userRef.get();

      if (doc.exists) {
        this.userProfile = doc.data();
      }
    },

    async saveUserProfile() {
      if (
        this.input.firstname == "" ||
        /[0-9]+/g.test(this.input.firstname) ||
        this.input.lastname == "" ||
        /[0-9]+/g.test(this.input.lastname) ||
        this.input.email == "" ||
        this.input.password == "" ||
        /[^A-Za-z0-9]+/g.test(this.input.password) ||
        this.input.password.length < 6
      ) {
        Toast.fire({
          icon: "warning",
          title: "Please fill in the missing detail(s)",
        });
      } else {
        console.log("Start updating profile to DB");
        let userRef = db.collection("users").doc(this.getUser.email);
        await userRef.set({
          firstname: this.input.firstname,
          lastname: this.input.lastname,
          email: this.input.email,
          address: this.input.address,
        });
        console.log("End updating profile to DB");

        console.log("Start updating credentials");
        let user = await firebase.auth().currentUser;

        user.updateEmail(this.input.email);
        user.updatePassword(this.input.password);
        user.updateProfile({
          displayName: this.input.firstname + " " + this.input.lastname,
        });
        console.log("End updating credentials");
      }
    },
  },

  mounted() {
    this.fetchUserProfile();
  },
};
</script>
