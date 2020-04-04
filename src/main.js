import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import io from "socket.io-client";

// Add axios to the global object
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

// The requested pathname by the user
var requested = window.location.pathname;

// Verify login status
Vue.prototype.$http.create({ withCredentials: true })
  .post("http://localhost:5443/api/login/verify")
  .then(response => {
    // console.log(response)
    if (response.data.authorized) {

      store.commit("setUserDetails", response.data.details);
      store.dispatch("auth");
      // Websocket
      Vue.prototype.$socket = io.connect("http://localhost:5443");
      
      if (requested == "/login") {
        router.push({ path: `/dashboard` })
      } else {
        router.push({ path: `${requested}` })
      }
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
