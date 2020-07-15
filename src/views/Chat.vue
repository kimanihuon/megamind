<template>
  <v-container fluid class="pa-0 ma-0">
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
              <!-- Place holder for empty chats -->
              <v-row v-if="!chats.length" no-gutters align="center">
                <v-col align="center">
                  <v-card flat>
                    <v-card-subtitle class="welcome">Find users and chat</v-card-subtitle>
                    <v-img src="@/assets/icons/talk.svg" height="100" width="100"></v-img>
                  </v-card>
                </v-col>
              </v-row>

              <!-- chats actual -->
              <v-list v-if="chats.length" subheader>
                <v-subheader>Single chats</v-subheader>

                <v-list-item
                  v-for="(chat, idx) in chats"
                  :key="idx"
                  @click="activate(idx, chat._id)"
                >
                  <v-list-item-avatar size="48">
                    <v-img
                      :src="chat.participants[0].username == self.username ? chat.participants[1].avatar : chat.participants[0].avatar"
                    ></v-img>
                  </v-list-item-avatar>

                  <!-- chat[0] is always the receiver and chat[1] is always the sender -->
                  <!-- {{ chat.participants[0].username }} -->

                  <v-list-item-content>
                    <v-list-item-title
                      v-text="chat.participants[0].username == self.username ? chat.participants[1].username : chat.participants[0].username"
                      class="py-1"
                    ></v-list-item-title>

                    <!-- Display Latest message snippet by popping th latest message from the array -->
                    <v-list-item-subtitle
                      class="font-weight-light"
                    >{{ chat.messages.slice(-1).pop().from == self._id ? 'me: ' + chat.messages.slice(-1).pop().contents.text : chat.messages.slice(-1).pop().contents.text }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <!-- If there's an unread message and if it's not the sender -->
                    <v-badge
                      :content="chat.unread"
                      :value="chat.unread > 0 && chat.participants[0].username !== self.username"
                      color="blue"
                      overlap
                    >
                      <v-icon :color="chat.seen ? 'grey' : 'deep-purple accent-4' ">mdi-chat-outline</v-icon>
                    </v-badge>
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
                <v-avatar size="40" class="mr-4">
                  <v-img
                    :src="activeChat.participants[0].username == self.username ? activeChat.participants[1].avatar : activeChat.participants[0].avatar"
                  ></v-img>
                </v-avatar>
                <v-toolbar-title>{{ activeChat.participants[0].username == self.username ? activeChat.participants[1].username : activeChat.participants[0].username }}</v-toolbar-title>
              </v-row>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- Chat layout -->
            <v-layout d-flex column class="chat-list px-3 pb-12" v-chat-scroll="{always: false}">
              <v-list class="c-list">
                <!-- Single message -->
                <v-row
                  v-for="(message, idx) in activeChat.messages"
                  :key="idx"
                  class="my-1 px-6"
                  :justify="message.from == self._id ? 'end' : 'start'"
                >
                  <v-card
                    :class=" message.from == self._id ? 'mx-2 bubble' : 'mx-2 bubbleleft'"
                    :color="message.from == self._id ? '#c1e3e1' : '#F5F5F5'"
                    max-width="500"
                    :id="message.from == self._id ? 'bubble' : 'bubbleleft' "
                  >
                    <v-row no-gutters align="start" class="bubble-child">
                      <v-card-subtitle
                        :class=" message.from == self._id ? 'body-2 black--text' : 'body-2 black--text'"
                      >
                        <span v-html="message.contents.text" v-if="regTest(message.contents.text)"></span>
                        <span v-if="!regTest(message.contents.text)">{{ message.contents.text }}</span>
                      </v-card-subtitle>

                      <v-col class="pa-0 ma-0">
                        <v-card-subtitle
                          class="stamp blue-grey--text text--lighten-2"
                        >{{ timeStamp(message.contents.timestamp) }}</v-card-subtitle>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-row>
              </v-list>
            </v-layout>

            <!-- Message input -->
            <v-row no-gutters id="message-input" justify="center" align="center">
              <v-card width="100%" flat class="pr-3 py-3">
                <v-row no-gutters align="center">
                  <!-- Emoji picker -->
                  <v-menu v-model="emojiMenu" :close-on-content-click="false" top offset-y>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="indigo" v-on="on">
                        <v-icon medium>mdi-emoticon-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <vemojipicker @select="appendEmoji"></vemojipicker>
                    </v-card>
                  </v-menu>
                  <!-- Message input -->
                  <v-textarea
                    id="msgbox"
                    v-model.lazy="messageInput"
                    autocomplete="off"
                    placeholder="Enter message ..."
                    hide-details
                    auto-grow
                    rows="1"
                    dense
                    @keyup.enter.native="send()"
                  ></v-textarea>
                </v-row>
              </v-card>
            </v-row>
          </v-card>

          <!-- If no chosen site -->
          <v-row
            v-if="typeof activeChat.participants == 'undefined'"
            align="center"
            no-gutters
            class="fill-height"
          >
            <v-col align="center">
              <v-card flat>
                <v-card-subtitle class="welcome">Start a conversation</v-card-subtitle>
                <v-img src="@/assets/icons/chat.svg" height="100" width="100"></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import vemojipicker from "v-emoji-picker";
import moment from "moment";

export default {
  name: "Chat",

  metaInfo: {
    title: "Chat and resource sharing",
    titleTemplate: "%s | Weskool learning path sharing",
    meta: [
      { charset: "utf-8" },
      { name: "description", content: "Weskool Login" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },

  data() {
    return {
      timeout: "",
      msgbox: "",
      emojiMenu: false,
      newChat: false,
      socket: this.$socket,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      searchTerm: null,
      maxInput: 10,
      waiting: false,
      valid: true,
      idx: this.$store.state.chat.chatIndex,
      self: this.$store.state.self
    };
  },

  components: {
    vemojipicker
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
        this.updateMessage(value);
      },
      get() {
        return this.activeChat.messageStructure.contents.text;
      }
    }
  },
  methods: {
    typing() {
      // Get the input box
      this.msgbox = document.getElementById("msgbox");
      // Init a timeout variable to be used below
      // this.timeout = null;
      // // Listen for keystroke events
      // this.msgbox.addEventListener('keyup', function (e) {
      //     e
      //     // Clear the timeout if it has already been set.
      //     // This will prevent the previous task from executing
      //     // if it has been less than <MILLISECONDS>
      //     clearTimeout(this.timeout);
      //     // Make a new timeout set to go off in 1000ms (1 second)
      //     this.timeout = setTimeout(function () {
      //         console.log('Input Value:' + this.msgbox.value);
      //     }, 1000);
      // });
    },
    updateMessage(value) {
      this.$store.commit("updateMessage", { value: value });
    },
    appendEmoji(emoji) {
      this.$store.commit("appendEmoji", emoji.data);
    },
    selectUser(user) {
      if (user._id == this.self._id) {
        alert(":) That's you");
        return;
      }

      var chats = this.$store.state.self.chats;
      var found = false;

      // Check whether the selected user already has an existing chat
      for (let i = 0; i < chats.length; i++) {
        var chat = chats[i];
        if (
          chat.participants[1]._id == user._id ||
          chat.participants[0]._id == user._id
        ) {
          this.$store.commit("selectChat", i);
          found = true;
          break;
        }
      }

      if (!found) {
        this.$store.commit("makeActive", user);
      }
    },
    activate(idx, chatId) {
      // Set the index of the chat we want to display
      this.$store.commit("selectChat", idx);

      // Update chat seen database state
      this.socket.emit("markSeen", { chatId: chatId, index: idx });
    },
    send() {
      var chat = this.$store.state.chat.activeChat;
      var instance = this;

      // chat index
      if (
        chat.messageStructure.contents.text &&
        chat.messageStructure.contents.text.length > 0
      ) {
        // Temporarily store the message to trim()
        var temp = chat.messageStructure.contents.text;
        temp = temp.trim();
        if (temp.length > 0) {
          // Check if it's an existing chat
          if (chat._id) {
            this.$store.commit("insertTimestamp");
            var messageObj = JSON.parse(JSON.stringify(chat));

            // If the first participant is self then send to the other participant, else send to the first
            messageObj.messageStructure.to =
              this.self._id == messageObj.participants[0]._id
                ? messageObj.participants[1]._id
                : messageObj.participants[0]._id;

            messageObj.messageStructure.from = this.self._id;

            delete messageObj.messages;
            delete messageObj.messageStructure._id;
            delete messageObj.messageStructure.contents._id;
            this.socket.emit("send", messageObj);
            this.$store.commit("clearMessageInput");
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
    },
    timeStamp(stamp) {
      return moment(stamp)
        .format("h:mm a")
        .toUpperCase();
    },
    regTest(str) {
      var patt = /<a href=/i;
      if (str.match(patt)) {
        return true;
      } else {
        return false;
      }
    }
  },

  mounted() {
    if (this.$route.query.chatIdx) {
      this.activate(this.$route.query.chatIdx);
    }
  }
};
</script>

<style lang="scss" scoped>
$margin: 8px;
$rightBubble: #c1e3e1;
$leftBubble: #f5f5f5;


.welcome {
  font-size: 18px;
}

.class-list {
  max-height: 80px;
}

.move-up {
  margin-top: -10px;
}

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
  border-radius: 10px;
}

.bubble-child {
  padding-top: 8px;
  padding-right: 0px;
  padding-bottom: 6px;
  padding-left: 0px;
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

.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding-top: 0px;
  padding-right: 12px;
  padding-bottom: 0px;
  padding-left: 12px;
}

.stamp {
  padding-top: 1px;
  padding-right: 8px;
  padding-bottom: 0px;
  padding-left: 0px;

  text-align: right;
  font-size: 11px;
  font-weight: 700;
}

.chat-list {
  height: 85vh;
  overflow: auto;
  overflow-y: auto;
}

.c-list {
  padding-bottom: 70px;
  -webkit-padding-after: 40px;
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
