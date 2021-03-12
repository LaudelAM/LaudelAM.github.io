<template>
  <!--  -->
  <div class="card h-100">
    <img :src="product.image" class="card-img-thumbnail img-responsive" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-center">{{ product.category }}</li>
      <li class="list-group-item text-left">
        R{{ product.price }}
        <b-button
          size="sm"
          @click="addToCart"
          variant="light"
          style="float: right"
          class="my-2 my-md-0"
        >
          <b-icon icon="cart-plus-fill" aria-label="Help" style="border: none"
            >Add to cart</b-icon
          >
        </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
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

  computed: {
    userLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    addToCart() {
      console.log(this.product);
      this.$store.commit("addToCart", this.product);
      Toast.fire({
        icon: "success",
        title: "Product added to cart",
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
