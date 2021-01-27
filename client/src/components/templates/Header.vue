<template>
    <header>
        <nav>
            <router-link to="/" class="logo">
                <h1>uplanner</h1>
            </router-link>
            <router-link to="/login" class="btn" v-if="$store.getters.getLogin === false">Login</router-link>
            <router-link to="/logout" class="btn" @click="logout" v-else>Logout</router-link>
        </nav>
    </header>
</template>

<script>
import axios from "axios";
import {baseApiUrl} from "@/global";
import store from "@/store";

export default {
    name: "Header",
    methods: {
        logout() {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + store
                }
            }

            axios.post(baseApiUrl + '/users/logout',config)
                .then(response => {
                    if(response.data) {
                        this.$store.commit('changeLogin');
                        this.$router.push('/login');
                        this.$store.commit('removeToken');
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
    }
}
</script>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    box-shadow: 0 2px 4px rgba(30,60,90,0.1);
}

h1 {
    color: #87f;
    text-transform: uppercase;
    margin-bottom: 10px;
}

.logo {
    padding: 10px 0;
}

</style>