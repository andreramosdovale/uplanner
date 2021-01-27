import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        logado: false,
    },
    plugins: [
        createPersistedState()
    ],
    mutations: {
        addToken(state, token) {
            state.token = token
        },
        removeToken(state) {
            state.token = null
        },
        changeLogin(state) {
            state.logado = !state.logado;
        },
    },
    getters: {
        getLogin: state => {
            return state.logado
        },
        getToken: state => {
            return state.token
        },
    }
})
