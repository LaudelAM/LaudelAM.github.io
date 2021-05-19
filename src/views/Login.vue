<template>
  <div class="container">
    <div class="d-flex flex-column align-items-center justify-content-center">
      <div class="card mb-3 p-8 w-50" style="border: none">
        <h5 class="card-header text-center mt-4">Login</h5>
        <form>
          <div
            class="form-group d-flex flex-column mt-2 align-items-center justify-content-center"
          >
            <div class="d-block-flex">
              <label for="inputAddress">Email</label>
              <input
                type="text"
                class="form-control"
                v-model="input.email"
                pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                id="inputEmail"
                placeholder="Email"
                value="input.email"
              />
            </div>
            <div class="d-block-flex mt-2">
              <label for="inputAddress">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="input.password"
                pattern="[\dA-Za-z]{6,}"
                id="inputPasswordConfirm"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <div class="d-inline-flex col-sm controls mt-2">
                <a
                  id="btn-login"
                  href="#"
                  class="btn btn-success mr-4"
                  v-on:click="submit"
                  >Login
                </a>
                <router-link class="text-link" to="/register">Register</router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import firebase from "firebase/app";
import "firebase/auth";
// import { db } from "../database";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export default {
  data() {
    return {
      input: { email: "", password: "" },
      isAuthenticated: false,
    };
  },

  methods: {
    async submit() {
      let user = null;
      if (
        this.input.email == "" ||
        this.input.password == "" ||
        /[^A-Za-z0-9]+/g.test(this.input.password) ||
        this.input.password.length < 6
      ) {
        Toast.fire({
          icon: "error",
          title: "Oops... Check you credentials!!",
          showConfirmButton: false,
        });
      } else {
        user = await this.authenticate(this.input.email, this.input.password);

        if (user != null) {
          this.$store.commit("setUser", user);

          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
            showConfirmButton: false,
          });

          this.$router.replace({ name: "Home" });
        } else {
          Toast.fire({
            icon: "error",
            title: "Couldn't authenticate <br> Please check your email or password :)",
          });
        }
      }
    },

    async authenticate(email, password) {
      try {
        let userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        console.log(userCredential);

        let user = userCredential.user;

        if (user) {
          // User is signed in.
          user = {
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid,
          };
        }
        return user;
      } catch (e) {
        console.log(e.message);
        return null;
      }
    },
  },
};
</script>
