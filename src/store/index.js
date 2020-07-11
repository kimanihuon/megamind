import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    auth: false,
    navDrawer: { state: true },
    dash: {
      color: "#263238",
      colors: ["#1A237E", "#1B5E20", "#FF4081", "#673AB7", "#455A64", "#263238"],
    },
    tracks: [],
    navIcons: [
      { name: "notify", icon: "mdi-bell", link: "", color: "" },
      { name: "options", icon: "mdi-dots-vertical", link: "", color: "" },
    ],
    searchResults: [],
    self: {},
    adminAuthorized: {
      state: false
    },
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

      // chat index tracker
      chatIndexCache: {},

      // Default chat structure
      struct: {
        messageStructure: { to: "", from: null, contents: { text: "", image: [], timestamp: "" } },
        participants: [],
        messages: []
      },
    },
    notifications: {
      chat: [],
      chatIdCache: {},
      tracks: []
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
    insertResults(state, payload) {
      state.searchResults = [...payload]
    },

    // Make non-existent chat active
    makeActive(state, payload) {

      // Duplicate the object
      var structure = JSON.parse(JSON.stringify(state.chat.struct));
      structure.participants = [state.selfMini, payload];
      structure.messageStructure.from = state.self._id
      structure.messageStructure.to = payload._id
      structure.messages = []

      // update active chat object
      state.chat.activeChat = structure;
    },

    // Clear notifications
    clearNotifications(state) {
      state.notifications.chat.length = 0;
      state.notifications.chatIdCache = {};
    },

    // Update chat status
    updateChatStatus(state, chatDetails) {
      state.self.chats[chatDetails.index].seen = true;
      state.self.chats[chatDetails.index].unread = 0;
    },

    // Insert timestamp to chat
    insertTimestamp(state) {
      state.chat.activeChat.messageStructure.contents.timestamp = Date.now();
    },

    createChat(state, payload) {

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

    receiveChat(state, chat) {
      state.self.chats.unshift(chat)
      state.notifications.chat.unshift(chat)

      // cache the chat ID so as not to flood array
      state.notifications.chatIdCache[chat._id] = true
    },

    updateChat(state, payload) {
      state.self.chats[state.chat.chatIndex].messages.push(payload);

      // Clear active chat contents
      state.chat.activeChat.messageStructure.contents.text = '';
      state.chat.activeChat.messageStructure.contents.images = [];
      state.chat.activeChat.messageStructure.contents.timestamp = '';
    },

    newMessage(state, message) {

      // console.log(state.self.chats)

      for (let i = 0; i < state.self.chats.length; i++) {
        if (message._id == state.self.chats[i]._id) {

          // Increment counter
          state.self.chats[i].unread += 1
          state.self.chats[i].seen = false
          state.self.chats[i].messages.push(message.messageStructure)

          // console.log(state.self.chats)

          // If message hasn't already been saved
          if (!state.notifications.chatIdCache[state.self.chats[i]._id]) {
            state.notifications.chat.unshift(state.self.chats[i])
            state.notifications.chatIdCache[state.self.chats[i]._id] = true
          }
          break
        }
      }
    },

    appendEmoji(state, payload) {
      state.chat.activeChat.messageStructure.contents.text = state.chat.activeChat.messageStructure.contents.text.concat(payload)
    },

    updateProfile(state, payload) {
      state.self.name = payload.name;
      state.self.phone = payload.phone;
      state.self.email = payload.email;
      state.self.about = payload.about;
    },

    updateDashList(state, payload) {
      state.dash.columns = payload
    },

    createTrack(state, payload) {
      payload.owner = state.self._id;
      state.self.tracks.push(payload);
    },

    saveTrack(state, payload) {
      state.self.tracks[payload.index] = payload.column;
    },

    updateTracks(state, payload) {
      state.self.tracks = JSON.parse(JSON.stringify(payload))
    },

    deleteTrack(state, payload) {
      state.self.tracks.splice(payload.index, 1)
    },

    changeDrawerState(state) {
      state.navDrawer.state = !state.navDrawer.state
    },

    updateProfileImage(state, url) {
      state.self.avatar = url;
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
