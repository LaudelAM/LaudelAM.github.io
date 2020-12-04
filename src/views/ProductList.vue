<template>
<div class="d-flex flex-column align-items-center justify-content-center">
            <h2 >Product List</h2>
            <p v-if="products.length === 0">No Product(s) have been added yet - please start adding some!</p>
            <ul class="d-flex flex-wrap">
                <li class="d-flex flex-wrap m-2" v-for="(product, index) in products" :key="index">
                    <ProductDetail v-bind:product="product" v-on:toProdList="onClick"/>
                </li>              
            </ul> 
</div>
</template>

<script>
import ProductDetail from '../components/ProductDetail.vue'
//import CartList from './components/CartList.vue'

export default {
    components: {
    ProductDetail,
    //CartList
    },

    name: 'ProductList',

    data(){
        return{
            products: [{
                    link: "https://picsum.photos/seed/picsum/200/300",
                    productLabel: 'Product1',
                },
                {
                    link: "https://picsum.photos/200/300",
                    productLabel: 'Product2',
                },
                {
                    link: "https://picsum.photos/200/300?grayscale",
                    productLabel: 'Product3',
                },
                {
                    link: "https://picsum.photos/200/300/?blur=2",
                    productLabel: 'Product4',
                },
            ],
            cartProducts: []
        }
    },

    methods:{
        onClick(product){
            console.log(product)
            this.cartProducts.push(product)
        },

        removeFromCart(product){
            const findProduct = this.cartProducts.find(data => data.productLabel === product.productLabel)
            this.cartProducts.splice(this.cartProducts.indexOf(findProduct), 1)
         },
    }
}
</script>

<style scoped>


</style>