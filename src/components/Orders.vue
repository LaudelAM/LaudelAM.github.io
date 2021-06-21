<template>
  <b-container fluid="xl">
    <b-row no-gutters>
      <b-col class="d-block-flex" md="6">
        <p class="card-text" variant="bg-transparent text-dark">
          Order# {{ order.orderNumber }}
        </p>
        <p class="card-text" variant="bg-transparent text-dark">R{{ order.total }}</p>
      </b-col>
      <b-col class="d-block-flex" md="6">
        <b-link href="#">View Products</b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import Order from "./Order.vue";
import { db } from "../database";
export default {
  name: "Orders",

  props: {
    order: Object,
  },

  // components: {
  //   Order,
  // },

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
  },

  methods: {
    async userOrders() {
      let ordersCollection = await db.collection("orders").doc(this.getUser.email);
      let doc = await ordersCollection.get();
      let productPerOrder = [];

      if (doc.exists) {
        let order = doc.data().Orders;
        productPerOrder = order.productsPerOrder;
        return productPerOrder;
      }
    },
  },
};
</script>
