<template>
  <!--  -->
  <div class="card mr-2 h-100" style="border: none">
    <div class="row no-gutters">
      <div class="image hover-overlay ripple col-md-2">
        <img
          class="card-img-thumbnail mx-auto d-block"
          :src="product.image"
          alt="..."
          style="width: 100%"
        />
      </div>
      <div class="col-md-10">
        <div class="card-body justify-content-center">
          <h5 class="card-title">{{ product.title }}</h5>
          <p
            class="card-text text-truncate"
            v-b-popover.hover="product.description"
            variant="bg-transparent text-dark"
          >
            <strong>See Description:</strong><br />
            {{ product.description }}
          </p>

          <div class="d-flex flex-row row-cols-sm-2">
            <div class="col-sm-4">
              <p class="card-text">
                <strong>R{{ product.price }}</strong>
              </p>
            </div>
            <div class="d-inline-flex col-sm-9">
              <b-button variant="dark ml-auto" size="sm" @click="removeProduct"
                >Remove</b-button
              >

              <div class="col-xs col-sm-2 col-md-2 col-lg-4 ml-auto">
                <b-input-group size="sm">
                  <b-input-group-prepend>
                    <b-btn variant="dark" @click="decrement()">-</b-btn>
                  </b-input-group-prepend>

                  <b-form-input
                    readonly
                    type="number"
                    style="text-align: center"
                    variant="text-center"
                    min="0.00"
                    :value="product.quantity"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-btn variant="dark" @click="increment()">+</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </div>
            </div>
          </div>
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
    getProducts() {
      return this.$store.getters.productsInCart;
    },
  },

  methods: {
    removeProduct() {
      this.$store.commit("removeFromCart", this.product);
    },

    increment() {
      this.$store.commit("incrementProductQuantity", this.product);
    },

    decrement() {
      this.$store.commit("decrementProductQuantity", this.product);
    },
  },
};
</script>
