<template>
  <b-container fluid="xl">
    <b-row no-gutters>
      <b-col class="d-block-flex" md="6">
        <div class="mr-auto">
          <p class="card-text" variant="bg-transparent text-dark">
            Order #{{ order.orderNumber }}
          </p>
        </div>
        <div class="mr-auto">
          <p class="card-text" variant="bg-transparent text-dark">
            Total: R{{ order.total }}
          </p>
        </div>
        <div class="mr-auto">
          <p class="card-text" variant="bg-transparent text-dark">
            Date: {{ order.date }}
          </p>
        </div>
      </b-col>
      <b-col class="d-block-flex" md="6">
        <b-link href="#" @click="fetchOrders(order.orderNumber)">View Products</b-link>
        <b-modal ref="my-modal" :title="order.orderNumber" scrollable>
          <div class="d-block-flex text-center">
            <div
              class="col-md col-sm"
              style="border: none"
              v-for="(order, index) of orders"
              :key="index"
            >
              <Order v-bind:product="order" />
            </div>
          </div>
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { db } from "../database";
import Order from "../components/Order.vue";
export default {
  name: "Orders",

  props: {
    order: Object,
  },

  data() {
    return {
      orders: [],
    };
  },

  components: {
    Order,
  },

  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
  },

  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },

    async fetchOrders(orderNumber) {
      let ordersCollection = await db.collection("orders").doc(this.getUser.email);
      let query = await ordersCollection.get();

      this.showModal();

      if (query.exists) {
        let order = query.data().Orders;
        for (let i = 0; i < order.length; i++) {
          if (order[i].orderNumber == orderNumber) order = order[i].productsPerOrder;
        }
        return (this.orders = order);
      }

      // this.$store.commit("emptyOrders");
    },
  },
};
</script>
