<template>
    <div>
        <section class="login">
            <h1>Login</h1>
            <form>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="email">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" v-model="password">
                <button class="btn" @click.prevent="logar">Logar</button>
            </form>
            <CreateLogin/>
        </section>
    </div>
</template>

<script>

import CreateLogin from "@/components/templates/CreateLogin";
import { baseApiUrl } from "@/global";
import axios from "axios"

export default {
    name: "Login",
    components: {CreateLogin},
    data() {
        return {
            email: '',
            password: '',
        }
    },
    created() {

    },
    methods: {
        logar() {
            console.log(this.email)
            axios.post(baseApiUrl + '/auth/login',
            {
                    "email": this.email,
                    "password": this.password,
                })
                .then(response => {
                    console.log(this.email)
                    if(response.data) {
                        this.$store.commit('changeLogin');
                        this.$router.push('/');
                        this.$store.commit('addToken', response.data);
                        console.log(response)
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
.login {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
}

form {
    display: grid;
}

.btn {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
}

h1 {
    text-align: center;
    font-size: 2rem;
    margin: 40px 0;
    color: #87f;
}
</style>