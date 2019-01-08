<template>
    <div id="app">
        <Login v-if="this.$route.path=='/'"/>
        <div v-if="this.$route.path!='/'">
            <Header></Header>
            <router-view></router-view>
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import Login from "./views/login/login.vue";
import Header from "./common/header.vue";
import Footer from "./common/footer.vue";
export default {
    name: "App",
    components: {
        Login,
        Header,
        Footer
    }
};
</script>

<style>
</style>
