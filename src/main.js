import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from './plugins/vuetify';
import Vuelidate from './plugins/vuelidate';

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  Vuelidate,
  render: h => h(App)
}).$mount("#app");
