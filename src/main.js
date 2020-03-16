import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

// Add axios to the global object
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

// Verify login status
Vue.prototype.$http.create({ withCredentials: true })
  .post("http://localhost:5443/api/login/verify")
  .then(response => {
    // console.log(response)
    if (response.data.authorized) {
      store.dispatch("auth");
      router.push({ name: 'dashboard' })
    } else {
      store.dispatch("deauth");
    }
  })
  .catch(function (error) {
    store.dispatch("deauth");
    // handle error
    console.log(error);

  })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
