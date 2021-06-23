<template>
  <!--  -->
  <div class="card mr-2 h-100" style="border: none">
    <div class="row no-gutters">
      <div class="image hover-overlay ripple col-md-2">
        <img
          class="card-img-thumbnail mx-auto d-block"
          :src="product.image"
          alt="..."
          style="width: 50%"
        />
      </div>
      <div class="col-md-10">
        <div class="card-body justify-content-center">
          <h6 class="card-title">{{ product.title }}</h6>
          <p class="card-text">
            <strong>R{{ product.price }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",

  props: {
    product: Object,
  },
};
</script>
