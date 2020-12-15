<template>
<div>
    <ul class="d-flex flex-wrap">
                <li class="d-flex flex-wrap m-2" v-for="getProduct in getProducts" :key="getProduct.id">
                     <div class="card" style="width: 180px;">
                        <img class="card-img-top img-thumbnail"  :src="getProduct.image" alt="Card image" style="width:100%">
                        <div class="card-body">
                            <h5 class="card-title">{{getProduct.title}}</h5>
                        </div>
                        <ul class="list-group">
                            <li class="d-flex flex-wrap">{{getProduct.price}}</li>
                            <li class="d-flex flex-wrap">{{getProduct.category}}</li>
                        </ul>
                        <div class="card-body d-flex align-items-center justify-content-center">
                            <b-link href="#" class="btn btn-primary" @click="addToCart">Add to Cart</b-link>
                        </div>
                    </div>
                </li>
    </ul>
        
</div>        
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductDetail',

    props: {
        product: Object
    },

    computed: {
        getProducts(){
            return this.$store.getters.allProducts
        },
    },

    mounted(){
        this.$store.dispatch("fetchProducts")
    },

        async fetchProducts(state) {
            //
            try {
                const res = await axios.get("https://fakestoreapi.com/products"); //Storing products
                state.products = res.data;
            } catch (e) {
                console.error(e);
            }
        },

    methods: {
        addToCart() {
            //console.log(this.product)
            this.$emit('toProdList', this.product)
        },
    }
}
</script>

<style scoped>
img{
    width:100%;
    height: 200px;
}


</style>