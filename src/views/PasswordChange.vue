<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="card mb-3 p-8 w-50" style="border: none">
      <h5 class="card-header text-center mt-4">Password Change</h5>
      <form>
        <div
          class="form-group d-flex flex-column mt-4 align-items-center justify-content-center"
        >
          <div class="d-block-flex">
            <label for="inputAddress">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="input.password"
              pattern="[\dA-Za-z]{6,}"
              id="inputPassword"
              placeholder="Password"
              value="input.password"
            />
          </div>
          <div class="d-block-flex mt-2">
            <label for="inputAddress">New Password</label>
            <input
              type="password"
              class="form-control"
              v-model="input.newPassword"
              pattern="[\dA-Za-z]{6,}"
              id="inputPasswordConfirm"
              placeholder="New Password"
              value="input.newPassword"
            />
          </div>
          <button type="success" class="btn btn-primary mt-4" v-on:click="updatePassword">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { db } from "../database";
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
  name: "PasswordChange",

  data() {
    return {
      input: {
        password: null,
        newPassword: null,
      },
    };
  },

  methods: {
    async userReauthentication() {
      let user = await firebase.auth().currentUser;
      // Prompt the user to re-provide their sign-in credentials
      let email = user.email;
      try {
        let response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, this.input.password);

        return response;
      } catch (e) {
        //   alert(error.message);
        Toast.fire({
          icon: "error",
          title: e.message,
        });
      }
    },

    async updatePassword() {
      let userCredential = await this.userReauthentication();
      let user = userCredential.user;

      let credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.input.password
      );

      user.reauthenticateWithCredential(credential);
      user = await firebase.auth().currentUser;

      await user
        .updatePassword(this.input.newPassword)
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Password updated!",
            showConfirmButton: false,
          });

          this.$router.replace({ path: "/userProfile" });
        })
        .catch((error) => {
          Toast.fire({
            icon: "error",
            title: error,
          });
        });
    },
  },
};
</script>
