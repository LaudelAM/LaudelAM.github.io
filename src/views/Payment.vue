<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="card mb-3 p-2 w-75" style="border: none">
      <h5 class="card-header text-center">ORDER STATUS</h5>
      <!--  -->
      <div class="d-flex justify-content-center p-2">
        <div class="col justify-content-center">
          <!-- <div class="row no-gutters row-cols-md-2 row-cols-sm"> -->
          <div
            class="col-md col-sm"
            style="border: none"
            v-for="(order, index) of orders"
            :key="index"
          >
            <Order v-bind:product="order" />
          </div>
        </div>
      </div>
      <div class="text-center">
        <label class="text-success"><strong>PAYMENT SUCCESSFUL</strong> </label>
      </div>
    </div>
    <!-- -->
  </div>
</template>

<script>
import Order from "../components/Order.vue";
import { db } from "../database";
// import firebase from "firebase/app";

export default {
  components: {
    Order,
  },

  data() {
    return {
      orders: [],
    };
  },

  computed: {
    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    getUser() {
      return this.$store.getters.getUser;
    },
  },

  async created() {
    this.orders = await this.userOrders();
    // console.log("after payment:", this.orders);
  },

  methods: {
    async userOrders() {
      let ordersCollection = await db.collection("orders").doc(this.getUser.email);
      let doc = await ordersCollection.get();
      let userLastOrder = [];
      // this.method();

      if (doc.exists) {
        let order = doc.data().Orders;
        userLastOrder = order[order.length - 1].productsPerOrder;
        this.$store.commit("clearCart");
        return userLastOrder;
      }
    },
  },
};
</script>
