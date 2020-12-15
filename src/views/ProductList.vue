<template>
<div style="margin:0;" class="d-flex flex-column align-items-center justify-content-center" >
        <h2 >Product List</h2>
        <ProductDetail />
</div>
</template>

<script>
import ProductDetail from '../components/ProductDetail.vue'
//import CartList from './components/CartList.vue'
// import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
    ProductDetail,
    //CartList
    },

    name: 'ProductList',
    
    methods:{
        // ...mapActions (['fetchProducts']),

        // created() {
        //     this.fetchProducts()
        // },

        // onClick(product){
        //     console.log(product)
        //     this.cartProducts.push(product)
        // },

        // removeFromCart(product){
        //     const findProduct = this.cartProducts.find(data => data.productLabel === product.productLabel)
        //     this.cartProducts.splice(this.cartProducts.indexOf(findProduct), 1)
        //  },

    },
}
</script>

<style scoped>

</style>