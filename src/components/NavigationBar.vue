<template>
    <div>
        <b-navbar class="text-secondary" toggleable="lg" type="dark" variant="info">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse  id="nav-collapse" is-nav>
            <b-navbar-nav >
                <!-- Links -->
                            <b-nav-item>
                                <router-link class="text-light" to="/">Home</router-link>
                            </b-nav-item>
                            <b-nav-item>
                                <router-link class="text-light" to="/products">Products</router-link>
                            </b-nav-item>
                            <b-nav-item>
                                <router-link class="text-light" to="/about">About</router-link>
                            </b-nav-item>
                            <b-nav-item>
                                <router-link class="text-light" to="/contact">Contact</router-link>
                            </b-nav-item>
            </b-navbar-nav>

            <b-navbar-brand class="col-md-3 offset-md-3" href="#">Logo</b-navbar-brand>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-button @click="navigateToCart" size="sm" class="my-2 my-md-0" >Cart</b-button>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default({
    methods:{
        navigateToCart(){
            this.$router.push('/cart')
        }
    }
})
</script>