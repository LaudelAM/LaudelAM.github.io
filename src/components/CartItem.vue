<template>
    <div >
        {{itemCart.productLabel}}
        <a href="#" class="btn btn-primary" @click="removeProduct">X</a>
    </div>
</template>

<script>
export default {
    name: 'CartItem',

    props:{
        itemCart: Object
    },

    methods: {
        removeProduct() {
            this.$emit('toCartList', this.itemCart)
        },
    }
}
</script>

<style scoped>

</style>