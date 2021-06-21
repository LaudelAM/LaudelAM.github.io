<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3" class="d-block-flex">
        <div class="col-md col-sm sidebar1">
          <b-col class="text-center w-100">
            <b-img
              src="https://www.pinclipart.com/picdir/middle/154-1548998_png-file-fa-user-circle-icon-clipart.png"
              fluid-grow
              alt="Responsive image"
            ></b-img>
          </b-col>
          <br />
          <div class="left-navigation">
            <ul class="list">
              <li>
                <router-link class="text-dark" to="/userProfile"
                  >Profile Details</router-link
                >
              </li>
              <li>
                <router-link class="text-dark" to="/ordersRecord">Orders</router-link>
              </li>
            </ul>
          </div>
        </div>
      </b-col>
      <b-col cols="9">
        <b-card
          ref="details"
          class="text-center w-100"
          header="USER INFORMATION"
          header-tag="header"
        >
          <b-form>
            <b-form-row>
              <b-form-group
                id="input-group-1"
                class="col-xs col-md-6"
                label="Firstname:"
                label-for="inputFirstname"
              >
                <b-form-input
                  id="inputFirstname"
                  class="form-control text-capitalize"
                  pattern="[^\d]+"
                  v-model="input.firstname"
                  value="getFirstname"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                class="col-xs col-md-6"
                label="Lastname:"
                label-for="inputLastname"
              >
                <b-form-input
                  id="inputLastname"
                  class="form-control text-capitalize"
                  pattern="[^\d]+"
                  v-model="input.lastname"
                  value="getLastname"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                class="col-xs col-md-6"
                label="Residential Address:"
                label-for="inputAddress"
              >
                <b-form-input
                  id="inputAddress"
                  class="form-control text-capitalize"
                  v-model="input.address"
                  value="getAddress"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                class="col-xs col-md-6"
                label="Email address:"
                label-for="inputEmail"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="inputEmail"
                  pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                  v-model="input.email"
                  type="email"
                  value="getEmail"
                  required
                ></b-form-input>
              </b-form-group>
            </b-form-row>
            <b-button
              type="submit"
              variant="primary"
              style="float: left"
              v-on:click="saveUserProfile"
              >Save</b-button
            >
            <router-link class="text-primary" style="float: right" to="/passwordChange"
              >Change password here</router-link
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
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
<style>
.sidebar1 {
  background: #faf9f9;
  /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(#fcfbfb, #f8f8f7, #fcfcfa);
  /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(#fcfbfb, #f8f8f7, #fcfcfa);
  /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(#fcfbfb, #f8f8f7, #fcfcfa);
  /* For Firefox 3.6 to 15 */
  background: linear-gradient(#fcfbfb, #f8f8f7, #fcfcfa);
  /* Standard syntax */
  padding: 0px;
  min-height: 100%;
}
.logo {
  max-height: 130px;
}
.logo > img {
  margin-top: 30px;
  padding: 3px;
  border: 3px solid white;
  border-radius: 100%;
}
.list {
  color: #fff;
  list-style: none;
  padding-left: 0px;
}
.list::first-line {
  color: rgba(255, 255, 255, 0.5);
}
.list > li,
h5 {
  padding: 5px 0px 5px 40px;
}
.list > li:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 5px solid rgb(3, 3, 3);
  color: rgb(8, 8, 8);
  font-weight: bolder;
  padding-left: 35px;
}
</style>
