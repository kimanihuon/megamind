import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import io from "socket.io-client";
import VueChatScroll from "vue-chat-scroll";

Vue.use(VueChatScroll)

// Add axios to the global object
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$openSocket = function () {
  Vue.prototype.$socket = io.connect("http://localhost:5443");

  var socket = this.$socket;

  socket.on("response", function (response) {
    store.commit("insertResults", response);
    // console.log(instance.$store.state.searchResults);
  });

  socket.on("sentResponse", function (response) {
    if (response.success === true && response.type == "new") {
      store.commit("createChat", response.data);
    } else if (response.success === true && response.type == "existing") {
      store.commit("updateChat", response.data);
    }
  });

  socket.on("newMessage", function (chat) {
    store.commit("newMessage", chat)
  });

  socket.on("chatUpdate", function (response) {
    response
  })

}

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
      Vue.prototype.$openSocket()

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
