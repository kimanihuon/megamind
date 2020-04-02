<template>
  <v-container fluid class="pa-0 ma-0 test">
    <!-- Main card -->
    <!-- Tile to remove rounded edges -->
    <v-card height="92.5vh" tile>
      <v-row no-gutters>
        <!-- Chat Summaries side -->
        <v-col cols="4">
          <v-card>
            <!-- Toolbar -->
            <v-app-bar color="purple" dense dark>
              <!-- Pop down menu -->
              <v-menu v-model="menu" :close-on-content-click="true" :nudge-width="0" offset-y>
                <template v-slot:activator="{ on }">
                  <!-- The hide details removes the extra space taken at the bottom for error display -->
                  <v-text-field
                    aria-autocomplete="off"
                    autocomplete="off"
                    v-on="on"
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                    outlined
                    filled
                    dense
                    clearable
                    v-model="searchTerm"
                    :maxlength="maxInput"
                    @input="input()"
                  ></v-text-field>
                </template>

                <!-- Search user list -->
                <v-card max-width="300">
                  <v-card-subtitle v-if="searchResults.length < 1" class="text-center">No results</v-card-subtitle>
                  <v-list v-if="searchResults.length > 0">
                    <v-list-item
                      v-for="(result, idx) in searchResults"
                      :key="idx"
                      @click="selectUser(result)"
                    >
                      <v-list-item-avatar>
                        <img :src="result.avatar" alt="John" />
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title
                          v-if="typeof result.name !== 'undefined'"
                        >{{ result.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ result.username }}</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn :class="'green--text'" icon>
                          <v-icon>mdi-emoticon-happy-outline</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-app-bar>

            <!-- Chats list layout -->
            <v-layout d-flex column class="list">
              <v-list subheader>
                <v-subheader>Single chats</v-subheader>

                <v-list-item v-for="(chat, idx) in chats" :key="idx" @click="activate(idx)">
                  <v-list-item-avatar size="48">
                    <v-img :src="chat.participants[1].avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="chat.participants[1].username" class="py-1"></v-list-item-title>

                    <!-- Display Latest message snippet by popping th latest message from the array -->
                    <v-list-item-subtitle
                      class="font-weight-light"
                    >{{ chat.messages.slice(-1).pop().from == self._id ? 'me: ' + chat.messages.slice(-1).pop().contents.text : chat.messages.slice(-1).pop().contents.text }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">mdi-chat-outline</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-layout>
          </v-card>
        </v-col>

        <!-- Chat side -->
        <v-col cols="8">
          <v-card v-if="typeof activeChat.participants !== 'undefined'" class="chat">
            <!-- Toolbar -->
            <v-toolbar color dense>
              <v-row no-gutters justify="start" align="center">
                <!-- Tool bar icon -->
                <v-avatar color="teal" size="40" class="mr-4">
                  <v-img :src="activeChat.participants[1].avatar"></v-img>
                </v-avatar>
                <v-toolbar-title>{{ activeChat.participants[1].username }}</v-toolbar-title>
              </v-row>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- Chat layout -->
            <v-layout d-flex column class="chat-list px-3 pb-12">
              <v-list class="pb-4">
                <!-- Single message -->
                <v-row
                  v-for="(message, idx) in activeChat.messages"
                  :key="idx"
                  class="my-6 px-4"
                  :justify="message.from == self._id ? 'end' : 'start'"
                >
                  <v-card
                    :class=" message.from == self._id ? 'mx-2 bubble' : 'mx-2 bubbleleft'"
                    :color="message.from == self._id ? '#0277BD' : '#F5F5F5'"
                    max-width="500"
                    :id="message.from == self._id ? 'bubble' : 'bubbleleft' "
                  >
                    <v-card-subtitle
                      :class=" message.from == self._id ? 'body-2 white--text' : 'body-2 black--text'"
                    >{{ message.contents.text }}</v-card-subtitle>
                  </v-card>
                </v-row>
              </v-list>
            </v-layout>

            <!-- Message input -->
            <v-row no-gutters id="message-input">
              <v-card width="100%" flat class="px-4 py-3">
                <v-text-field
                  v-model="messageInput"
                  placeholder="Enter message ..."
                  hide-details
                  rounded
                  filled
                  dense
                  @keyup.enter.native="send()"
                ></v-text-field>
              </v-card>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
// socket.on("response", function(data) {
//   console.log(data);
// });

export default {
  data() {
    return {
      newChat: false,
      socket: this.$socket,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      searchTerm: null,
      maxInput: 16,
      waiting: false,
      valid: true,
      self: this.$store.state.self
    };
  },
  computed: {
    chats() {
      return this.$store.state.self.chats;
    },
    activeChat() {
      return this.$store.state.chat.activeChat;
    },
    selectedChat() {
      var idx = this.$store.state.chat.chatIndex;
      // If message has been selected
      if (idx !== null) {
        return this.$store.state.self.chats[idx];
      }
      // else return empty object
      return {};
    },
    searchResults() {
      return this.$store.state.searchResults;
    },
    messageInput: {
      set(value) {
        // commit mutation. Change value
        this.$store.commit("updateMessage", {
          value: value
        });
      },
      get() {
        return this.activeChat.messageStructure.contents.text;
      }
    },
    me() {
      return this.$store.state.self;
    }
  },
  methods: {
    selectUser(user) {
      var chats = this.$store.state.self.chats;
      var found = false;

      // Check whether the selected user already has an existing chat
      for (let i = 0; i < chats.length; i++) {
        var chat = chats[i];
        if (chat.participants[1]._id == user._id) {
          this.$store.commit("selectChat", i);
          found = true;
          break;
        }
      }

      if (!found) {
        this.$store.commit("makeActive", user);
      }
    },
    activate(idx) {
      // Set the index of the chat we want to display
      this.$store.commit("selectChat", idx);
    },
    send() {
      var message = this.$store.state.chat.activeChat.messageStructure;
      var instance = this;

      // chat index
      if (message.contents.text !== null) {
        // Temporarily store the message to trim()
        var temp = message.contents.text;
        temp = temp.trim();
        if (temp.length > 0) {
          // Check if it's an existing chat
          if (message._id) {

            this.$store.commit("insertTimestamp");
            var messageObj = JSON.parse(JSON.stringify(instance.$store.state.chat.activeChat));
            delete messageObj.messages
            delete messageObj.messageStructure._id
            delete messageObj.messageStructure.contents._id
            this.socket.emit("send", messageObj);

          } else {
            this.$store.commit("insertTimestamp");
            this.socket.emit("send", instance.$store.state.chat.activeChat);
          }

          // // Insert message and clear
          // this.$store.commit("insertMessage");

          // this.$http
          //   .create({ withCredentials: true })
          //   .post("http://localhost:5443/api/send", {});
        }
      }
    },
    log() {
      console.log("ended");
    },
    input() {
      var input = this.searchTerm;

      if (!this.waiting) {
        if (input !== null) {
          input = input.trim();
          if (input.length > 0) {
            this.socket.emit("input", {
              input: input
            });
          }
        }
      }
    }
  },
  created() {
    var socket = this.socket;
    var instance = this;
    socket.on("response", function(response) {
      instance.$store.commit("insertResults", response);
      // console.log(instance.$store.state.searchResults);
    });

    socket.on("sentResponse", function(response) {
      if (response.success === true && response.type == "new") {
        instance.$store.commit("createChat", response.data);
      } else if (response.success === true && response.type == "existing") {
        instance.$store.commit("updateChat", response.data);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
$margin: 8px;
$rightBubble: #0277bd;
$leftBubble: #f5f5f5;

.input {
  height: 40px;
}

#message-input {
  position: absolute;
  bottom: 0;
  width: 100%;
}

#bubble,
#bubbleleft {
  border-radius: 20px;
}

.bubbleleft:after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: $margin solid transparent;
  border-right-color: $leftBubble;
  border-left: 0;
  margin-top: -$margin;
  margin-left: -$margin;
}

.bubble:after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: $margin solid transparent;
  border-left-color: $rightBubble;
  border-right: 0;
  margin-top: -$margin;
  margin-right: -$margin;
}

.chat-list {
  height: 85vh;
  overflow: auto;
}

.list {
  height: 85vh;
  overflow: auto;
}

.list::-webkit-scrollbar,
.chat-list::-webkit-scrollbar {
  width: 5px;
  height: 4px;
}
.list::-webkit-scrollbar-track,
.chat-list::-webkit-scrollbar-track {
  background: #e8f0fd;
}

.list::-webkit-scrollbar-thumb,
.chat-list::-webkit-scrollbar-thumb {
  background: #6f6f70;
}

.list,
.chat-list {
  scrollbar-face-color: #83a5ee;
  scrollbar-track-color: #e8f0fd;
}
</style>
