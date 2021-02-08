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

            <!-- <div class="input-group">
              <div class="checkbox">
                <label>
                  <input id="login-remember" type="checkbox" name="remember" value="1" />
                  Remember me
                </label>
              </div>
            </div> -->

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
export default {
  data() {
    return {
      input: { email: "", password: "" },
      isAuthenticated: false,
    };
  },

  methods: {
    submit() {
      let user = this.authenticate(this.input.email, this.input.password);
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

      if (user == null) {
        this.$swal({
          icon: "error",
          title: "Oops...",
        });
      } else {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
          showConfirmButton: false,
        });

        this.$store.commit("setUser", user);
        this.$router.replace({ name: "Home" });
      }
    },

    authenticate(email, password) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      if (email == "" && password == "") {
        return null;
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            // Signed in
            // ...
          })
          .catch((error) => {
            Toast.fire({
              icon: "error",
              title: error.message,
            });
            // ..
          });

        let user = firebase.auth().currentUser;

        if (user) {
          // User is signed in.
          user = {
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            uid: user.uid,
          };
        }
        // console.log(user);
        return user;
      }
    },
  },
};
</script>
