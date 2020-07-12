import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import io from "socket.io-client";
import VueChatScroll from "vue-chat-scroll";
import { Howl } from 'howler';

Vue.use(VueChatScroll);

Vue.prototype.$api = (process.env.VUE_APP_ENV ? 'http://localhost:5443' : 'https://weskool.team:5443' );
Vue.prototype.$uploads = (process.env.VUE_APP_ENV ? 'http://localhost:6443' : 'https://weskool.team:6443' );
Vue.prototype.$downloads = (process.env.VUE_APP_ENV ? 'http://localhost:7443' : 'https://weskool.team:7443' );
Vue.config.devtools=false

// Add axios to the global object
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$openSocket = function () {

  // Main socket path
  Vue.prototype.$socket = io.connect(Vue.prototype.$api);

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
    var sound = new Howl({
      src: require('./assets/sounds/newMessage.ogg')
    })
    sound.play()
  });

  socket.on("newChat", function (chat) {
    store.commit("receiveChat", chat )
    var sound = new Howl({
      src: require('./assets/sounds/newChat.ogg')
    })
    sound.play()
  });

  // TODO: Use this logic for read receipts
  socket.on("markSeenResponse", function (response) {
    // console.log(response)
    if (response.success == true) {
      store.commit("updateChatStatus", response.data )
    }
  });

  socket.on("summaries", function (response) {
    if (response.success == true) {
      store.commit("updateSummaries", response.data)
    }
  })

}

// The requested pathname by the user
var requested = window.location.pathname;

// Verify login status
Vue.prototype.$http.create({ withCredentials: true })
  .post(`${Vue.prototype.$api}/api/login/verify`)
  .then(response => {
    // console.log(response)
    if (response.data.authorized) {

      if (response.data.details.admin) {
        store.dispatch("adminAuth")
      } else {
        store.dispatch("adminDeAuth")
      }

      store.commit("setUserDetails", response.data.details);
      store.dispatch("auth");
      // Websocket
      Vue.prototype.$openSocket()

      if (requested == "/login") {
        router.push({ path: `/dashboard` }).catch(e => {
          console.log(e)
        })
      } else {
        router.push({ path: `${requested}` }).catch(e => {
          console.log(e)
        })
      }
    } else {
      store.dispatch("deauth");
    }
  })
  .catch(function (error) { // eslint-disable-line
    store.dispatch("deauth");
  })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
