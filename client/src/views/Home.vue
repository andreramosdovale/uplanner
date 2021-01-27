<template>
    <section class="contas">
        constas: {{ contas }}
<!--        <div v-if="contas && contas.length" class="contas">-->
<!--            <div class="produto" v-for="(produto, index) in produtos" :key="index">-->
<!--                <router-link :to="{name: 'produto', params: {id: produto.id}}">-->
<!--                    <img v-if="produto.fotos" :src="produto.fotos[0].src" :alt="produto.fotos[0].titulo">-->
<!--                    <p class="preco">{{produto.preco | numeroPreco}}</p>-->
<!--                    <h2 class="titulo">{{produto.nome}}</h2>-->
<!--                    <p>{{produto.descricao}}</p>-->
<!--                </router-link>-->
<!--            </div>-->
<!--            <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"/>-->
<!--        </div>-->
<!--        <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">-->
<!--            <p class="sem-resultados">Busca sem resultados. Tente buscar outro termo.</p>-->
<!--        </div>-->
<!--        <PaginaCarregando key="carregando" v-else/>-->
<!--        <div>-->
    </section>
</template>

<script>
import axios from "axios";
import store from "@/store";
import {baseApiUrl} from "@/global";

export default {
    name: "Home",
    data() {
        return {
            contas: null,
        };
    },
    methods: {
        listAccounts() {
            console.log('Bearer ' + store.getters.getToken)
            axios.post(baseApiUrl + '/account/listAccount',{
                headers: {
                    'Authorization': 'Bearer ' + store.getters.getToken
                }
            })
            .then(response => {
                if(response.data) {
                    console.log(response.data)
                    this.contas = response.data
                    // this.$store.commit('changeLogin');
                    // this.$router.push('/');
                    // this.$store.commit('addToken', response.data);
                    // console.log(response)
                }
            })
            .catch(err => {
                console.error(err);
            });
        }
    },
    watch: {},
    created() {
        this.listAccounts();
    }
}
</script>

<style scoped>

</style>