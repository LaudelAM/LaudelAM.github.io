<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="card mb-3 p-4 w-50" style="border: none">
      <h5 class="card-header text-center">Sign up</h5>
      <!--  -->
      <form>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputFirstname" class="text-capitalize">Firstname</label>
            <input
              type="firstname"
              class="form-control"
              style="text-transform: capitalize"
              v-model="input.firstname"
              id="inputFirstname"
              placeholder="Firstname"
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
              placeholder="Lastname"
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
              placeholder="Email address"
            />
          </div>

          <div class="form-group col-md-6">
            <label for="inputPassword">Password</label>
            <input
              type="password"
              class="form-control text-capitalize"
              v-model="input.password"
              id="inputPassword"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="text-center">
          <button
            id="btn-signup"
            type="button"
            class="btn btn-success"
            v-on:click="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
    <!-- -->
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Swal from "sweetalert2";
import { db } from "../database";

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
  data() {
    return {
      input: { firstname: "", lastname: "", email: "", password: "" },
    };
  },

  methods: {
    async submit() {
      // let user = null;
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
          title: "Please fill in the missing detail(s) or check for the red signals",
        });
      } else {
        let user = await this.registerUser(
          this.input.firstname,
          this.input.lastname,
          this.input.email,
          this.input.password
        );
        if (!user) {
          Toast.fire({
            icon: "warning",
            title:
              "Registration unsuccessful. <br> This email adrress is used by another account ",
          });
        } else {
          console.log(user);
          Toast.fire({
            icon: "success",
            title: "Welcome" + " " + user.firstname + " " + user.lastname,
          });
          //
          this.$router.push("/login");
        }
      }
    },

    async registerUser(firstname, lastname, email, password) {
      //Check for existing user and return null if found user
      console.log("start checking");
      let user = db.collection("users").doc(email);
      let doc = await user.get();
      let result = doc.data();

      console.log("end checking, existant user", result);

      if (result) {
        return null;
      }

      // Save credentials to firebase
      console.log("Start saving credentials");
      let response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      response.user.updateProfile({ displayName: firstname + " " + lastname });
      console.log("End saving credentials");

      //Saving to firestore database
      console.log("Start Create profile to DB");
      let userRef = await db.collection("users").doc(email);
      doc = await userRef.set({
        firstname: firstname,
        lastname: lastname,
        email: email,
      });
      console.log("End Create profile to DB");

      //Fetching User profile
      console.log("Start Fetch profile from DB");
      let userProfile = db.collection("users").doc(email);
      doc = await userProfile.get();

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
