<template>
  <div class="container">
    <div
      id="loginbox"
      style="margin-top: 50px"
      class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
    >
      <div class="panel panel-info p-2">
        <div class="panel-heading">
          <div class="panel-title">Sign In</div>
          <div style="float: right; font-size: 80%; position: relative; top: -10px">
            <a href="#">Forgot password?</a>
          </div>
        </div>

        <div style="padding-top: 30px" class="panel-body">
          <div
            style="display: none"
            id="login-alert"
            class="alert alert-danger col-sm-12"
          ></div>

          <form id="loginform" class="form-horizontal" role="form">
            <div style="margin-bottom: 25px" class="input-group">
              <span class="input-group-addon"
                ><i class="glyphicon glyphicon-user"></i
              ></span>
              <input
                id="login-username"
                type="text"
                class="form-control"
                name="username"
                v-model.trim="input.email"
                placeholder="email"
              />
            </div>

            <div style="margin-bottom: 25px" class="input-group">
              <span class="input-group-addon"
                ><i class="glyphicon glyphicon-lock"></i
              ></span>
              <input
                id="login-password"
                type="password"
                class="form-control"
                name="password"
                v-model.trim="input.password"
                placeholder="password"
              />
            </div>

            <div style="margin-top: 10px" class="form-group">
              <!-- Button -->

              <div class="col-sm-12 controls">
                <a id="btn-login" href="#" class="btn btn-success" v-on:click="submit"
                  >Login
                </a>
              </div>
            </div>
          </form>
        </div>
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
  timer: 2000,
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

        if (user) {
          console.log(user);
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
            title: "There is no such user <br> Please register if new user. :)",
          });
        }
      }
    },

    async authenticate(email, password) {
      let response = await firebase.auth().signInWithEmailAndPassword(email, password);
      let user = response.user;

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
    },
  },
};
</script>
