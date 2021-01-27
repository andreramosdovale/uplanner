import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from "./store";
import router from "./router";

Vue.config.productionTip = false

Vue.filter("monetaryValue", value => {
  value = Number(value);
  if (!isNaN(value)) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  } else {
    return "";
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
