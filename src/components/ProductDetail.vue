<template>
  <div class="card h-100 shadow-sm">
    <!--  -->
    <!--  -->
    <div class="card-img-thumbnail img-responsive">
      <img :src="product.image" alt="..." />
    </div>

    <div class="card-body">
      <h6 class="card-title">
        {{ product.title }}
      </h6>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-center">
        <b-button
          v-b-popover.hover="product.description"
          variant="bg-transparent text-dark"
          title="Description"
          >See Description</b-button
        >
      </li>
      <li class="list-group-item text-left">
        <strong>R{{ product.price }}</strong>

        <b-button
          size="sm"
          @click="addToCart"
          variant="info"
          style="float: right"
          class="my-2 my-md-0"
        >
          Add to cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart3"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
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

  data() {
    return {
      show: false,
    };
  },

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
      // console.log(this.product);
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
