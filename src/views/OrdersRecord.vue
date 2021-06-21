<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3" class="d-block-flex">
        <div class="col-md col-sm sidebar1">
          <b-col class="text-center w-100">
            <b-img
              src="https://www.pinclipart.com/picdir/middle/154-1548998_png-file-fa-user-circle-icon-clipart.png"
              fluid-grow
              alt="Responsive image"
            ></b-img>
          </b-col>
          <br />
          <div class="left-navigation">
            <ul class="list">
              <li>
                <router-link class="text-dark" to="/userProfile"
                  >Profile Details</router-link
                >
              </li>
              <li>
                <router-link class="text-dark" to="/ordersRecord">Orders</router-link>
              </li>
            </ul>
          </div>
        </div>
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
    //   some
    async fetchOrders() {
      let ordersCollection = await db.collection("orders").doc(this.getUser.email);
      let doc = await ordersCollection.get();

      if (doc.exists) {
        let order = doc.data().Orders;
        return order;
      }
    },
  },

  async mounted() {
    this.orders = await this.fetchOrders();
  },
};
</script>
<style>
.sidebar1 {
  background: #faf9f9;
  /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(#fcfbfb, #f8f8f7, #fcfcfa);
  /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(#fcfbfb, #f8f8f7, #fcfcfa);
  /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(#fcfbfb, #f8f8f7, #fcfcfa);
  /* For Firefox 3.6 to 15 */
  background: linear-gradient(#fcfbfb, #f8f8f7, #fcfcfa);
  /* Standard syntax */
  padding: 0px;
  min-height: 100%;
}
.logo {
  max-height: 130px;
}
.logo > img {
  margin-top: 30px;
  padding: 3px;
  border: 3px solid white;
  border-radius: 100%;
}
.list {
  color: #fff;
  list-style: none;
  padding-left: 0px;
}
.list::first-line {
  color: rgba(255, 255, 255, 0.5);
}
.list > li,
h5 {
  padding: 5px 0px 5px 40px;
}
.list > li:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 5px solid rgb(3, 3, 3);
  color: rgb(8, 8, 8);
  font-weight: bolder;
  padding-left: 35px;
}
</style>
