<template>
        <div class="card" style="width:180px">
            <img class="card-img-top" :src="product.link" alt="Card image" style="width:100%">
            <div class="card-body">
                <h4 class="card-title">{{product.productLabel}}</h4>
                <b-link href="#" class="btn btn-primary" @click="addToCart">Add to Cart</b-link>
            </div>
        </div>
        
</template>

<script>
export default {
    name: 'ProductDetail',

    props: {
        product: Object
    },

    methods: {
        addToCart() {
            //console.log(this.product)
            this.$emit('toProdList', this.product)
        }
    }
}
</script>

<style scoped>
img{
    width:100%;
    height: 200px;
}


</style>