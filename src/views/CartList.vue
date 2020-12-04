<template>
    <div class="d-flex flex-column align-items-center justify-content-center">
            <h2>Cart</h2><br>
            <ul class="d-flex flex-wrap">
                <li class="list-group-item1" v-for="(item, index) in items" :key="index">
                    <CartItem :itemCart="item" v-on:toCartList="onClick"/>
                </li>
            </ul> 
    </div>
</template>

<script>
import CartItem from '../components/CartItem.vue'

export default {
    components: {
        CartItem
    },

    props:{
        items: Array
    },
    methods:{
        onClick(product){
            //console.log(product)
            this.$emit('prodToApp', product)
        }
    }
}
</script>

<style scoped>
.list-group-item1{
    list-style-type: none;
}
</style>