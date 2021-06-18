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
          <h5 class="card-title">{{ product.title }}</h5>
          <p
            class="card-text text-truncate"
            v-b-popover.hover="product.description"
            variant="bg-transparent text-dark"
          >
            <strong>See Description:</strong><br />
            {{ product.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orders",

  props: {
    product: Object,
  },
};
</script>
