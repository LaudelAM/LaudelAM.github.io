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
              />
            </div>
          </div>

          <div class="form-group">
            <label for="firstname" class="col-md-3 control-label">First Name</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                name="firstname"
                v-model="input.firstname"
                placeholder="First Name"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="lastname" class="col-md-3 control-label">Last Name</label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                name="lastname"
                v-model="input.lastname"
                placeholder="Last Name"
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
export default {
  data() {
    return {
      input: { firstname: "", lastname: "", email: "", password: "" },
    };
  },

  methods: {
    submit() {
      let user = this.registerUser(
        this.input.firstname,
        this.input.lastname,
        this.input.email,
        this.input.password
      );
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

      if (user == null) {
        Toast.fire({
          icon: "warning",
          title: "Please fill in the missing detail(s)",
        });
      } else {
        Toast.fire({
          icon: "success",
          title: "Successfully registered",
        });
      }
    },

    registerUser(firstname, lastname, email, password) {
      let user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      };

      if (firstname == "" || lastname == "" || email == "" || password == "") {
        return null;
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => {
            res.user.updateProfile({
              displayName: user.firstname + " " + user.lastname,
            });
            // ...
          })
          .then(() => {
            this.$router.push("/login");
          })
          .catch((error) => {
            this.$swal({
              icon: "warning",
              title: error.message,
              showConfirmButton: true,
            });
            // ..
          });
        return user;
      }
    },
  },
};
</script>
