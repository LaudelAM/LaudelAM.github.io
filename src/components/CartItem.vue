<template>
  <div class="card mb-2 mr-4 h-100" style="border: none">
    <div class="row no-gutters">
      <div class="col-sm-4">
        <img
          class="card-img-thumbnail mx-auto d-block"
          :src="product.image"
          alt="Responsive image"
          style="width: 100%"
        />
      </div>
      <div class="col-sm-8">
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">R{{ product.price }}</p>
          <b-badge href="#" variant="dark m-3" @click="removeProduct">Remove</b-badge>
          <b-badge variant="light ">Qty [ {{ product.quantity }} ]</b-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../database";
import firebase from "firebase/app";

export default {
  name: "CartItem",

  props: {
    product: Object,
  },

  computed: {},

  methods: {
    removeProduct() {
      // this.$store.commit("removeFromCart", this.product);
      this.deleteProduct(this.product);
    },

    async deleteProduct(product) {
      console.log("start checking");
      let cartProductRef = db.collection("cart").doc(product.id);
      let doc = await cartProductRef.get();
      let productInCart = doc.data();

      console.log("end checking, existant product", productInCart);

      if (doc.exists && doc.data().quantity > 0) {
        // Atomically decrement the quantity of the product by 1.
        try {
          cartProductRef.update({
            quantity: firebase.firestore.FieldValue.increment(-1),
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        db.collection("cart")
          .doc(product.id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>
