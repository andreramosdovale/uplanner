<template>
    <div id="app">
        <Header/>
        <main id="main">
            <router-view/>
        </main>
        <Footer/>
    </div>
</template>

<script>
import { baseApiUrl } from "./global";
import Store from "./store";
import axios from "axios";
import Header from "@/components/templates/Header";
import Footer from "@/components/templates/Footer";

export default {
    name: 'App',
    components: {
        Footer,
        Header,
    },
    data() {
        return {
            renderComponent: true,
            info: null,
        }
    },
    created() {
        this.session();
    },
    watch: {
        renderComponent: {
            handler() {
                this.session()
            },
            deep: true
        }
    },
    methods: {
        session: function () {
            if(Store.state.logado){
                let token = Store.getters.getToken;
                axios.post(baseApiUrl + '/auth/login',
                    {
                        'token': token
                    })
                    .then(response => {
                        this.info = response.data;
                    })
                    .catch(err => {
                        console.error(err);
                        axios.post(baseApiUrl + '/users/logout',
                            {
                                'token': ''+token,
                            })
                            .then(() => {
                                this.$store.commit('changeLogin');
                                this.$store.commit('removeToken', Store.getters.getToken);
                                this.$router.push('/login');
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    });

            }
        },
    },
}
</script>

<style>
body, ul, li, h1, h2, p {
    padding: 0;
    margin: 0;
}

ul {
    list-style: none;
}

body {
    font-family: "Roboto", sans-serif;
    color: #345;
}

a{
    color: #345;
    text-decoration: none;
}

img {
    max-width: 100%;
    display: block;
}

.btn {
    display: block;
    padding: 10px 30px;
    background: #87f;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    font-size: 1rem;
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
    transition: all .3s;
    border: none;
    font-family: "Roboto", sans-serif;
    cursor: pointer;
}

.btn:hover {
    background: #65d;
    transform: scale(1.1);
}

#app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

#main {
    flex: 1;
}


label {
    margin-bottom: 5px;
}

input {
    border-radius: 4px;
    border: 1px solid white;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
    transition: all 0.3s;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
    margin-bottom: 15px;
}

input:hover, input:focus {
    outline: none;
    box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
    border-color: #87f;
}

.v-enter, .v-leave-to {
    opacity: 0;
}

.v-enter {
    transform: translate3d(0, -20px, 0);
}

.v-leave-to {
    transform: translate3d(0, 20px, 0);
}

.v-enter-active, .v-leave-active {
    transition: all 0.3s;
}
</style>