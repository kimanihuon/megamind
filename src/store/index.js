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

      active: {},

      // *Remember to use user ID for the 'for' and 'to' fields
      singleChats: [
        // Chat 1
        {
          id: 1,
          from: 12,
          name: 'Quincy Jones',
          active: true,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          messages: [
            {
              id: 1, from: 'notme', contents: { text: 'Hello', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'notme', contents: { text: 'Mbona haukunishow', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'me', contents: { text: 'Nilikuambia kitambo sana ni wewe hukuskia', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'notme', contents: { text: 'We uko na ufala msee', image: '', timestamp: '' }
            },
          ],
        },
        // Chat 2
        {
          id: 2,
          from: 13,
          active: true,
          name: 'Ali Mwere Connors',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          messages: [
            {
              id: 1, from: 'notme', contents: { text: 'Hello', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'notme', contents: { text: 'Vipi bro, umefanya assignment ?', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'me', contents: { text: 'Zi mehn, iko due lini ?', image: '', timestamp: '' }
            },
          ],
        },
        // Chat 3
        {
          id: 3,
          from: 14,
          active: false,
          name: 'Ran Carlson',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          messages: [
            {
              id: 1, from: 'notme', contents: { text: 'Hello', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'notme', contents: { text: 'Wacha kuniignore bro', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'notme', contents: { text: 'Yow?', image: '', timestamp: '' }
            },
          ],
        },
        // Chat 4
        {
          id: 4,
          from: 14,
          active: true,
          name: 'Renee Carlson',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          messages: [
            {
              id: 1, from: 'me', contents: { text: 'Hello', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'me', contents: { text: 'I am so in love with you', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'me', contents: { text: 'Nimekufanyia homework', image: '', timestamp: '' }
            },
          ],
        },
        // Chat 5
        {
          id: 5,
          from: 15,
          active: true,
          name: 'Quincy Marley',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          messages: [
            {
              id: 1, from: 'notme', contents: { text: 'Hi Quincy', image: '', timestamp: '' }
            },
            {
              id: 2, from: 'notme', contents: { text: "I won't make it today, did you record the notes ?", image: '', timestamp: '' }
            },
            {
              id: 2, from: 'me', contents: { text: 'Mbona haukunishow', image: '', timestamp: '' }
            },
          ],
        },
        // Chat 6
        {
          id: 6,
          from: 16,
          active: false,
          name: 'Travis Howard',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          messages: [
            {
              id: 1, from: 'notme', contents: { text: 'Hello', image: '', timestamp: '' }
            }
          ],
        },
        // Chat 7
        {
          id: 7,
          from: 18,
          active: true,
          name: 'Cindy Baker',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          messages: [
            {
              id: 2, from: 'me', contents: { text: 'The lec wants to see us in room 4', image: '', timestamp: '' }
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
    // Chat view
    selectChat(state, chat) {
      state.chat.active = chat;
    }
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
