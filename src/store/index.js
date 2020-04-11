import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    auth: false,
    searchResults: [],
    self: {},
    selfMini: {},
    darkMode: true,
    miniDrawer: false,
    expandOnHover: false,
    pages: [
      { name: "Dashboard", icon: "mdi-desktop-mac-dashboard", link: "/dashboard" },
      { name: "Chat", icon: "mdi-chat", link: "/chat" },
      { name: "Profile", icon: "mdi-account", link: "/profile" },
      { name: "Settings", icon: "mdi-cog", link: "/settings" },
      { name: "ATC", icon: "mdi-network", link: "/atc" }
    ],
    chat: {

      // Index of current active chat
      chatIndex: null,

      // Active chat
      activeChat: {},
      
      // Default chat structure
      struct: {
        messageStructure: { to: "", from: null, contents: { text: "", image: [], timestamp: "" } },
        participants: [],
        messages: []
      },
    }
  },
  mutations: {
    authenticate(state) {
      state.auth = true;
    },
    deauthenticate(state) {
      state.auth = false;
      state.self = {};
      state.selfMini = {};
      state.chat.chatIndex = null;
      state.chat.activeChat = {};
    },
    setUserDetails(state, payload) {
      state.self = payload
      var mini = JSON.parse(JSON.stringify(payload))
      state.selfMini = { _id: mini._id, username: mini.username, avatar: mini.avatar }
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
    selectChat(state, idx) {
      state.chat.chatIndex = idx;
      state.chat.activeChat = state.self.chats[idx]
    },
    // Insert message to the existing list of messages
    insertMessage(state) {
      var idx = state.chat.chatIndex;
      // Chat that we want to change
      var chat = state.chat.singleChats[idx];

      // Set necessary variables
      chat.messageStructure.from = state.self.id
      chat.messageStructure.contents.timestamp = Date.now();

      // Function to duplicate the object
      var newMessage = function duplicate(object) {
        let newObject = JSON.parse(JSON.stringify(object));
        return newObject;
      }

      // Duplicate the message and update messages
      chat.messages.push(newMessage);

      // Empty the text box
      chat.messageStructure.contents.text = null;
    },

    // Bind message text input to chat
    updateMessage(state, payload) {
      state.chat.activeChat.messageStructure.contents.text = payload.value
    },

    // Search results for search as you type
    insertResults(state, payload){
      state.searchResults = [...payload]
    },

    // Make non-existent chat active
    makeActive(state, payload){

      // Duplicate the object
      var structure = JSON.parse(JSON.stringify(state.chat.struct));
      structure.participants = [state.selfMini, payload];
      structure.messageStructure.from = state.self._id
      structure.messageStructure.to = payload._id
      structure.messages = []

      // update active chat object
      state.chat.activeChat = structure;
    },

    // Insert timestamp to chat
    insertTimestamp(state) {
      state.chat.activeChat.messageStructure.contents.timestamp = Date.now();
    },

    createChat(state, payload){

      state.self.chats.push(payload);
      
      // Length the chats array
      let len = state.self.chats.length
      // len - 1 = to the index of the last chat
      state.chat.activeChat = state.self.chats[len - 1];
      state.chat.chatIndex = len - 1

      // Clear active chat contents
      state.chat.activeChat.messageStructure.contents.text = '';
      state.chat.activeChat.messageStructure.contents.images = [];
      state.chat.activeChat.messageStructure.contents.timestamp = '';

    },

    receiveChat(state, payload){
      state.self.chats.push(payload)
    },

    updateChat(state, payload) {
      state.self.chats[state.chat.chatIndex].messages.push(payload);
      
      // Clear active chat contents
      state.chat.activeChat.messageStructure.contents.text = '';
      state.chat.activeChat.messageStructure.contents.images = [];
      state.chat.activeChat.messageStructure.contents.timestamp = '';
    },

    newMessage(state, payload) {
      for (let i = 0; i < state.self.chats.length; i++) {
        if (payload._id == state.self.chats[i]._id) {
          state.self.chats[i].messages.push(payload.messageStructure)
          break
        }
      }
    },

    appendEmoji(state, payload) {
      state.chat.activeChat.messageStructure.contents.text = state.chat.activeChat.messageStructure.contents.text.concat(payload)
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
