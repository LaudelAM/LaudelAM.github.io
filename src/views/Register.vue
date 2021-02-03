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
                v-model="user.email"
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
                v-model="user.firstname"
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
                v-model="user.lastname"
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
                v-model="user.password"
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
                v-on:click="registerUser"
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
export default {
  data() {
    return {
      user: { firstname: "", lastname: "", email: "", password: "" },
    };
  },

  methods: {
    registerUser() {
      if (
        this.user.firstname == "" ||
        this.user.lastname == "" ||
        this.user.email == "" ||
        this.user.password == ""
      ) {
        // alert("Please fill in the form");
        this.$swal({
          icon: "warning",
          title: "Please fill in the form",
          showConfirmButton: true,
        });
      } else {
        // alert("You have been successfully registered");
        this.$swal({
          icon: "success",
          title: "Successfully registered",
          showConfirmButton: true,
          footer: "<a href>Click here to login?</a>",
        });
      }
    },
  },
};
</script>
