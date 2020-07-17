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

Vue.prototype.$api = (process.env.VUE_APP_ENV ? 'http://localhost:5443' : 'https://weskool.team:5443');
Vue.prototype.$uploads = (process.env.VUE_APP_ENV ? 'http://localhost:6443' : 'https://weskool.team:6443');
Vue.prototype.$downloads = (process.env.VUE_APP_ENV ? 'http://localhost:7443' : 'https://weskool.team:7443');
Vue.prototype.$site = (process.env.VUE_APP_ENV ? 'http://localhost:8080' : 'https://weskool.team');
Vue.prototype.$http = axios;

Vue.config.productionTip = false;
Vue.config.devtools = false
Vue.prototype.$socket = io.connect(Vue.prototype.$api);
Vue.prototype.$openSocket = function () {

  if (store.state.socketConnected) {
    console.log("Web socket is already connected")
    return
  } 

  var socket = this.$socket;

  store.commit("socketConnected");

  socket.on("response", function (response) {
    store.commit("insertResults", response);
    // console.log(instance.$store.state.searchResults);
  });

  socket.on("sentResponse", function (response) {
    if (response.success === true && response.type == "new") {
      store.commit("createChat", response.data);
    } else if (response.success === true && response.type == "existing" && response.intent == "newMessage") {
      store.commit("updateChat", response.data);
    } else if (response.success === true && response.type == "existing" && response.intent == "newShare") {
      store.commit("updateShare", { _id: response.chatId, message: response.data });
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
    store.commit("receiveChat", chat)
    var sound = new Howl({
      src: require('./assets/sounds/newChat.ogg')
    })
    sound.play()
  });

  // TODO: Use this logic for read receipts
  socket.on("markSeenResponse", function (response) {
    // console.log(response)
    if (response.success == true) {
      store.commit("updateChatStatus", response.data)
    }
  });

  socket.on("summaries", function (response) {
    if (response.success == true) {
      store.commit("updateSummaries", response.data)
    }
  });

  socket.on("trackUpdated", function (response){
    if (response.success == true) {
      console.log('success')
      // 
    } else {
      // 
    }
  })

}

// The requested pathname by the user
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
