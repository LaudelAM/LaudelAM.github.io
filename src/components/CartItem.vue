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
          <b-badge variant="light ">Qty [ {{ productQuantity }} ]</b-badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",

  props: {
    product: Object,
  },

  computed: {
    productQuantity() {
      return this.product.quantity;
    },
  },

  methods: {
    removeProduct() {
      this.$store.commit("removeFromCart", this.product);
    },
  },
};
</script>
