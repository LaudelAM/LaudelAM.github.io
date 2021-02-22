<template>
  <div class="card d-flex" style="width: 200px">
    <img
      class="card-img-top mx-auto d-block"
      :src="product.image"
      alt="Card image"
      style="width: 100%"
    />

    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
    </div>

    <ul class="list-group">
      <li class="d-flex flex-wrap justify-content-center">R{{ product.price }}</li>
      <li class="d-flex flex-wrap justify-content-center">
        {{ product.category }}
      </li>
      <b-badge href="#" variant="dark" @click="addToCart">Add to Cart</b-badge>
    </ul>
  </div>

  <!--  -->
</template>

<script>
import { db } from "../database";

export default {
  name: "ProductDetail",

  props: {
    product: Object,
  },

  methods: {
    addToCart() {
      // this.$store.commit("addToCart", this.product);
      this.addToCartDb(this.product);
      this.$swal({
        icon: "success",
        title: "Product added to your cart",
        showConfirmButton: false,
        timer: 500,
      });
    },

    addToCartDb(product) {
      // Get product in collection "products"
      let docRef = db.collection("products").doc(product.id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            let product = doc.data();
            console.log("Document data:", product);

            // Add a new document in collection "cart"
            db.collection("cart")
              .doc(product.id)
              .set({
                image: product.image,
                title: product.title,
                category: product.category,
                price: product.price,
                quantity: (product.quantity = 1),
              })
              .then(() => {
                console.log("Document successfully written!");
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
            return product;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
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
