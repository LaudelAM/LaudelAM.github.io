<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="card mb-3 p-2 w-50" style="border: none">
      <h5 class="card-header text-center">ORDER STATUS</h5>
      <!--  -->
      <form v-if="userLoggedIn == true" class="pt-5">
        <div class="form-row">
          <div class="form-group col-sm col-md col-lg">
            <label for="inputFirstname" class="text-capitalize"
              >Order Number: {{ getOrders.number }}</label
            >
          </div>
          <div class="form-group col-sm col-md col-lg">
            <label for="inputEmail">Products</label>
          </div>
          <div class="form-group col-sm col-md col-lg">
            <label for="inputPassword">Total: {{ getOrders.total }}</label>
          </div>
        </div>
        <div class="text-center">
          <label class="text-success"><strong>PAYMENT SUCCESSFUL</strong> </label>
        </div>
      </form>
      <div v-else class="text-center pt-10">
        <label class="text-success"><strong>PAYMENT SUCCESSFUL</strong> </label>
      </div>
    </div>
    <!-- -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },

  computed: {
    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    getOrders() {
      return this.$store.getters.getOrders;
    },
  },
};
</script>
