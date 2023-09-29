import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./styles.sass";
import EventBus from "./event-bus";

Vue.config.productionTip = false;

Vue.prototype.$bus = EventBus;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
