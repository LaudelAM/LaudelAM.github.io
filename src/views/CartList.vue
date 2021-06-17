<template>
  <div class="d-flex justify-content-center p-2">
    <div class="col-9 justify-content-center">
      <!-- <div class="row no-gutters row-cols-md-2 row-cols-sm"> -->
      <div
        class="col-md col-sm"
        style="border: none"
        v-for="(getProductInCart, index) of getProductsInCart"
        :key="index"
      >
        <CartItem v-bind:product="getProductInCart" />
      </div>
      <!-- </div> -->
    </div>
    <!--  -->
    <div class="col-md-3 col-sm p-3">
      <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item" style="border: none">
            Subtotal
            <span class="badge badge-light float-right">R{{ subtotal }}</span>
          </li>
          <li class="list-group-item" style="border: none">
            VAT
            <span class="badge badge-light float-right">14%</span>
          </li>
          <li class="list-group-item" style="border: none">
            Total
            <span class="badge badge-light float-right">R{{ getTotal }}</span>
          </li>
        </ul>
      </div>

      <!-- eslint-disable no-irregular-whitespace -->
      <form
        v-if="userLoggedIn == true && getTotal != 0"
        action="https://sandbox.payfast.co.za​/eng/process"
        method="post"
      >
        <input type="hidden" name="merchant_id" value="10000100" />
        <input type="hidden" name="merchant_key" value="46f0cd694581a" />
        <input
          type="hidden"
          name="return_url"
          value="https://laudelam.github.io/#/payment"
        />
        <input
          type="hidden"
          name="cancel_url"
          value="https://laudelam.github.io/#/products"
        />
        <input type="hidden" name="amount" v-model="getTotal" />
        <input type="hidden" name="item_name" v-model="newOrder.orderNumber" />
        <button type="submit" class="btn btn-secondary btn-sm btn-block mt-2">
          Pay Now
        </button>
      </form>

      <button
        v-else
        v-on:click="checkoutProduct"
        type="submit"
        class="btn btn-secondary btn-sm btn-block mt-2"
      >
        Pay Now
      </button>
      <!-- {{ getOrders }} -->
    </div>
  </div>
</template>

<script>
import CartItem from "../components/CartItem.vue";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  // timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default {
  components: {
    CartItem,
  },

  data() {
    return {
      products: [],
      newOrder: {
        orderNumber: "",
        productsPerOrder: "",
        total: "",
      },
    };
  },

  computed: {
    getProductsInCart() {
      return this.$store.getters.productsInCart;
    },

    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    getUser() {
      return this.$store.getters.getUser;
    },

    subtotal() {
      return this.roundToTwo(this.$store.getters.subtotal);
    },

    getTotal() {
      let total = this.roundToTwo(this.$store.getters.total);
      return total;
    },

    getOrders() {
      return this.$store.getters.getOrders;
    },
  },

  mounted() {
    if (this.userLoggedIn) this.getSignature();
  },

  methods: {
    roundToTwo(num) {
      return +(Math.round(num + "e+2") + "e-2");
    },

    checkoutProduct() {
      if (this.userLoggedIn != true) {
        Toast.fire({
          icon: "info",
          title: "Please Login or Sign up",
          showConfirmButton: true,
        }).then(() => {
          this.$router.push("/login");
        });
      }
    },

    //Generate order number
    getOrderNumber(orderNumber) {
      let number = Date.now().toString();
      // pad with extra random digit
      number += number + Math.floor(Math.random() * 10);
      // format
      orderNumber = [number.slice(0, 4), number.slice(4, 10)].join("-");
      return orderNumber;
    },
    //Generate signature for transaction security
    getSignature() {
      const generateMD5 = (obj, secret = "secret") => {
        let str = "";
        for (let val in obj) {
          str += obj[val];
        }
        str += secret;
        return CryptoJS.MD5(str).toString();
      };

      let orderNum = this.getOrderNumber(this.newOrder.orderNumber);
      let productsPerOrder = this.getProductsInCart;
      let total = this.getTotal;
      this.newOrder = {
        orderNumber: orderNum,
        productsPerOrder: productsPerOrder,
        total: total,
      };

      this.$store.commit("setProductsPerOrder", this.newOrder);

      let data = {
        //merchant details
        merchant_id: "10000100",
        merchant_key: "46f0cd694581a",
        return_url: "https://laudelam.github.io/#/payment",
        cancel_url: "https://laudelam.github.io/#/products",
        //transaction details
        amount: total,
        item_name: orderNum,
      };

      let signature = generateMD5(data);
      // console.log("Signature:", signature);

      return signature;
    },
  },
};
</script>

<style scoped>
.list-group-item1 {
  list-style-type: none;
}
</style>
