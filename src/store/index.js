import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    auth: false,
    navDrawer: {state: true},
    dash: {
      color: "#263238",
      colors: ["#1A237E", "#1B5E20", "#FF4081", "#673AB7", "#455A64", "#263238"],
      classes: [{ id: 1, name: "Networking" }, { id: 2, name: "Operating Systems" }, { id: 3, name: "Software Engineering" }, { id: 4, name: "Data Structures" }, { id: 5, name: "Linear Algebra" }],
      assignments: [{ id: 1, due: "1/4/2020", name: "Functions of CPU" }, { id: 1, due: "1/4/2020", name: "Matrices" }, { id: 1, due: "1/4/2020", name: "Network structures" }],
      messages: [{ id: 1, name: "Jimmy", message: "Hi", status: false, time: 11223445, media: "" }, { name: "Jane", message: "New assignment", status: true, time: 11223445, media: "" }],
      friends: [{ id: 1, name: "John Doe", username: "jdoe11", email: "doe@mail.com", number: "0789654321" }, { id: 2, name: "Jane Doe", username: "jdoe11", email: "doe@mail.com", number: "0789654321" }],
      people: [{ id: 1, name: "Elon Musk", username: "jdoe11", email: "doe@mail.com", number: "0789654321" }, { id: 2, name: "Kylian Mbappe", username: "jdoe11", email: "doe@mail.com", number: "0789654321" }],
      notifications: [{ id: 1, name: "New message", type: "messages", }],
      columns: [
        { name: "Homework", active: false, items: [{ name: 'Walkthrough', src: "https://www.youtube.com/embed?v=OC93pNSrRP8" }, { id: 1, name: "John Doe", username: "jdoe11", email: "doe@mail.com", number: "0789654321" }] },
        { name: "Assignments", active: true, items: [{ id: 1, name: "Elon Musk", username: "jdoe11", email: "doe@mail.com", number: "0789654321" }, { id: 2, name: "Kylian Mbappe", username: "jdoe11", email: "doe@mail.com", number: "0789654321" }] },
        { name: "Meetings", active: true, items: [{ id: 1, name: "New message", type: "messages", }, { id: 1, name: "Networking" }, { id: 2, name: "Operating Systems" }, { id: 3, name: "Software Engineering" }, { id: 4, name: "Data Structures" }, { id: 5, name: "Linear Algebra" }] },
        { name: "Music", active: false, items: [{ id: 1, name: "Future", type: "messages", }, { id: 1, name: "Sean paul" }, { id: 2, name: "Miley cyrus" }, { id: 3, name: "Beyonce" }] },
      ]
    },
    tracks: [],
    navIcons: [

      { name: "notify", icon: "mdi-bell", link: "", color: "#00C853" },
      { name: "options", icon: "mdi-dots-vertical", link: "", color: "" },
    ],
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
    },
    trackTemplate: {
      name: '',
      owner: '',
      total: 0,
      tasks: []
    },
    taskTemplate: {
      name: '',
      collaborators: '',
      date: '',
      items: []
    },
    itemTemplate: {
      title: '',
      url: '',
      images: [],
      videos: [],
      documents: []
    },

    // An array of tracks
    // ... Structure of the tracks

    // Array of tracks
    trackArrayTemplate: [{
      // Array of tasks
      track1: [{
        // Array of items
        task1: [{
          item1: [{}]
        }]
      }]
    }]

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

    receiveChat(state, payload) {
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

    createTrack(state, payload){
      let tasks = [];
      for (let i = 0; i < payload.tasks; i++) {
        tasks.push(JSON.parse(JSON.stringify(state.taskTemplate)))
      }

      var obj = {
        name: payload.name,
        tasks: tasks,
        owner: state.self._id,
        total: payload.tasks
      }

      state.tracks.push(obj);

    },

    changeDrawerState(state){
      state.navDrawer.state = !state.navDrawer.state
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
