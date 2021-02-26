<template>
  <!--  -->
  <div class="card h-100">
    <img :src="product.image" class="card-img-thumbnail img-responsive" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-center">R{{ product.price }}</li>
      <li class="list-group-item text-center">{{ product.category }}</li>
    </ul>
    <div class="card-body">
      <!-- <a href="#" class="card-link">Card link</a> -->
      <b-button size="sm" @click="addToCart" variant="light" class="my-2 my-md-0">
        <b-icon icon="cart-plus-fill" aria-label="Help" style="border: none"
          >Add to cart</b-icon
        >
      </b-button>
      <!-- <a href="#" class="card-link">Another link</a> -->
      <!-- <b-button size="sm" variant="light" class="my-2 my-md-0" style="float: left">
        <b-icon icon="suit-heart" aria-label="Help">Like</b-icon>
      </b-button> -->
    </div>
  </div>
</template>

<script>
import { db } from "../database";
import firebase from "firebase/app";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 700,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default {
  name: "ProductDetail",

  props: {
    product: Object,
  },

  methods: {
    addToCart() {
      // this.$store.commit("addToCart", this.product);
      this.addToCartDb(this.product);
      Toast.fire({
        icon: "success",
        title: "Product added to cart",
      });
    },

    async addToCartDb(product) {
      console.log("start checking");
      let cartProductRef = db.collection("cart").doc(product.id);
      let doc = await cartProductRef.get();
      let productInCart = doc.data();

      console.log("end checking, existant product", productInCart);

      if (doc.exists && productInCart.quantity >= 1) {
        // Atomically increment the quantity of the city by 1.
        try {
          cartProductRef.update({
            quantity: firebase.firestore.FieldValue.increment(1),
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        let productRe = db.collection("products").doc(product.id);
        let doc = await productRe.get();
        let productData = doc.data();
        //Saving product to firestore database
        console.log("Start saving to Cart", productData);

        await cartProductRef.set({
          image: product.image,
          title: product.title,
          category: product.category,
          price: product.price,
          quantity: (product.quantity = 1),
        });
        console.log("end saving to cart");
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 200px;
}
</style>
