<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3" class="d-block-flex">
        <template>
          <div>
            <b-col class="text-center w-75 mb-4">
              <b-img
                center
                src="https://icons-for-free.com/iconfiles/png/512/avatar+human+man+profile+icon-1320085876716628234.png"
                fluid-grow
                alt="Responsive image"
              ></b-img>
            </b-col>
            <nav class="mb-3">
              <b-nav vertical>
                <b-nav-item to="/userProfile">Profile Details</b-nav-item>
                <b-nav-item to="/ordersRecord">Orders</b-nav-item>
              </b-nav>
            </nav>
          </div>
        </template>
      </b-col>
      <b-col cols="9">
        <b-card
          ref="details"
          class="text-center w-100"
          header="ORDERS"
          header-tag="header"
        >
          <div
            class="col-md col-sm"
            style="border: none"
            v-for="(order, index) of orders"
            :key="index"
          >
            <Orders v-bind:order="order" />
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from "../database";
import Orders from "../components/Orders.vue";
import "firebase/auth";

export default {
  name: "UserProfile",

  components: {
    Orders,
  },

  data() {
    return {
      orders: [],
    };
  },

  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },

    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    async fetchOrders() {
      let ordersCollection = await db.collection("orders").doc(this.getUser.email);
      let query = await ordersCollection.get();

      if (query.exists) {
        let order = query.data().Orders;
        return order;
      }
      //   this.$store.commit("emptyOrders");
    },
  },

  async mounted() {
    this.orders = await this.fetchOrders();
  },
};
</script>
