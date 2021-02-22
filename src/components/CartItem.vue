<template>
  <div class="card mb-2" style="width: 350px; border: none">
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

    deleteProduct(product) {
      db.collection("cart")
        .doc(product.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
};
</script>

<style scoped></style>
