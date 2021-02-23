<template>
  <div class="container justify-content-center">
    <div
      id="signupbox"
      style="display: none; margin-top: 50px"
      class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
    ></div>
    <div class="panel panel-info p-4">
      <div class="panel-heading">
        <div class="panel-title text-center">Sign Up</div>
      </div>
      <div class="panel-body">
        <form id="signupform" class="form-horizontal" role="form">
          <div id="signupalert" style="display: none" class="alert alert-danger">
            <p>Error:</p>
            <span></span>
          </div>

          <div class="form-group">
            <label for="email" class="col-md-3 control-label">Email</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                name="email"
                v-model="input.email"
                placeholder="Email Address"
                pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="firstname" class="col-md-3 control-label">First Name</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control text-capitalize"
                name="firstname"
                v-model="input.firstname"
                placeholder="First Name"
                pattern="[^\d]+"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="lastname" class="col-md-3 control-label">Last Name</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control text-capitalize"
                name="lastname"
                v-model="input.lastname"
                placeholder="Last Name"
                pattern="[^\d]+"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="col-md-3 control-label">Password</label>
            <div class="col-md-9">
              <input
                type="password"
                class="form-control"
                name="password"
                v-model="input.password"
                placeholder="Password"
                pattern="[\dA-Za-z]{6,}"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <!-- Button -->
            <div class="col-md-offset-3 col-md-9">
              <button
                id="btn-signup"
                type="button"
                class="btn btn-success"
                v-on:click="submit"
              >
                <i class="icon-hand-right"></i> Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
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
