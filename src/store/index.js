import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    auth: false
  },
  mutations: {
    authenticate(state){
      state.auth = true;
    },
    deauthenticate(state){
      state.auth = false;
    }
  },
  actions: {
    auth(context){
      context.commit('authenticate');
    },
    deauth(context){
      context.commit('deauthenticate');
    }
  },
  modules: {}
});
