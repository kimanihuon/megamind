import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    auth: false,
    darkMode: true,
    miniDrawer: false,
    expandOnHover: false,
    pages: [
      { name: "Dashboard", icon: "mdi-desktop-mac-dashboard", link: "/dashboard" },
      { name: "Chat", icon: "mdi-chat", link: "/chat" },
      { name: "Profile", icon: "mdi-account", link: "/profile" },
      { name: "Settings", icon: "mdi-cog", link: "/settings" }
    ],
    chat: {

      singleChats: [
        // Chat 1
        {
          id: 1,
          messages: [
            {
              id: 1, to: 'James', from: { id: 1, name: 'Quincy Jones', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' }, contents: [
                { text: 'Hello', image: '', timestamp: '' }
              ]
            },
          ],
        },
        // Chat 2
        {
          id: 2,
          messages: [
            {
              id: 1, to: 'Michael', from: { id: 1, name: 'Havier', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' }, contents: [
                { text: 'Is vipi', image: '', timestamp: '' }
              ]
            },
          ],
        },
      ],

      groupChats: [
        // Group 1
        {
          id: 1,
          name: "",
          members: [
            {
              id: 1, active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            },
            {
              id: 2, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
            },
            {
              id: 3, active: true, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
            },
            {
              id: 4, active: true, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
            },
          ],
          messages: [
            {
              id: 1, active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', messages: [
                { id: "", type: 'From', content: 'Hello', timestamp: '' }
              ]
            },
            {
              id: 2, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', messages: [
                { id: "", type: 'From', content: 'Hello', timestamp: '' }
              ]
            },
            {
              id: 3, active: true, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', messages: [
                { id: "", type: 'From', content: 'Hello', timestamp: '' }
              ]
            },
            {
              id: 4, active: true, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', messages: [
                { id: "", type: 'From', content: 'Hello', timestamp: '' }
              ]
            },
          ],
        },

        // Group 2
        {
          id: 1,
          name: "",
          members: [
            {
              id: 1, active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            },
            {
              id: 2, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
            },
            {
              id: 3, active: true, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
            },
            {
              id: 4, active: true, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
            },
          ],
          messages: [
            {
              id: 1, active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', messages: [
                { id: "", type: 'From', content: 'Hello', timestamp: '' }
              ]
            },
            {
              id: 2, active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', messages: [
                { id: "", type: 'From', content: 'Hello', timestamp: '' }
              ]
            },
            {
              id: 3, active: true, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', messages: [
                { id: "", type: 'From', content: 'Hello', timestamp: '' }
              ]
            },
            {
              id: 4, active: true, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', messages: [
                { id: "", type: 'From', content: 'Hello', timestamp: '' }
              ]
            },
          ],
        }
      ],


    }
  },
  mutations: {
    authenticate(state) {
      state.auth = true;
    },
    deauthenticate(state) {
      state.auth = false;
    },
    switchMini(state) {
      state.miniDrawer = !state.miniDrawer;
    },
    switchHover(state) {
      state.expandOnHover = !state.expandOnHover;
    },
    switchDark(state) {
      state.darkMode = !state.darkMode;
    },
  },
  actions: {
    auth(context) {
      context.commit('authenticate');
    },
    deauth(context) {
      context.commit('deauthenticate');
    }
  },
  modules: {},
  getters: {
    // 
  }
});
