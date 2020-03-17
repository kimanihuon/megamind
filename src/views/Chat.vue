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
              <v-toolbar-title>Topics</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-app-bar>

            <v-layout d-flex column class="list">
              <v-list subheader>
                <v-subheader>Recent chat</v-subheader>

                <v-list-item v-for="(chat, idx) in chats" :key="idx" @click="activate(chat)">
                  <v-list-item-avatar size="48">
                    <v-img :src="chat.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="chat.name" class="py-1"></v-list-item-title>
                    <v-list-item-subtitle
                      class="font-weight-light"
                    >{{ chat.messages.slice(-1).pop().from == me.id ? 'me: ' + chat.messages.slice(-1).pop().contents.text : chat.messages.slice(-1).pop().contents.text }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">mdi-chat-outline</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>

              <v-list subheader>
                <v-subheader>Previous chats</v-subheader>

                <v-list-item v-for="item in items2" :key="item.title" @click="activate()">
                  <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-layout>
          </v-card>
        </v-col>

        <!-- Chat side -->
        <v-col cols="8">
          <v-card class="chat">
            <!-- Toolbar -->
            <v-toolbar color dense>
              <v-row no-gutters justify="start" align="center">
                <!-- Tool bar icon -->
                <v-avatar color="teal" size="40" class="mr-4">
                  <v-img :src="selectedChat.avatar"></v-img>
                </v-avatar>
                <v-toolbar-title>{{ selectedChat.name }}</v-toolbar-title>
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
                  v-for="(message, idx) in selectedChat.messages"
                  :key="idx"
                  class="my-6 px-4"
                  :justify="message.from == me.id ? 'end' : 'start'"
                >
                  <v-card :class=" message.from == me.id ? 'mx-2 bubble' : 'mx-2 bubbleleft'" :color="message.from == me.id ? '#0277BD' : '#F5F5F5'" max-width="500" :id="message.from == me.id ? 'bubble' : 'bubbleleft' ">
                    <v-card-subtitle :class=" message.from == me.id ? 'body-2 white--text' : 'body-2 black--text'">{{ message.contents.text }}</v-card-subtitle>
                  </v-card>
                </v-row>
              </v-list>
            </v-layout>

            <!-- Message input -->
            <v-row no-gutters id="message-input">
              <v-card width="100%" flat class="px-4 pt-3">
                <v-text-field placeholder="Enter message ..." rounded filled dense></v-text-field>
              </v-card>
            </v-row>
          </v-card>
        </v-col>

      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          active: true,
          title: "Jason Oner",
          message: "Change your Google+ profile photo",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          active: true,
          title: "Ranee Carlson",
          message: "Mbona unakua ivo kweni tuliongea aje",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Cindy Baker",
          message: "I have the report you asked for kuja na dow ya kuprint",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Ali Connors",
          message: "Itakuaje",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        },
        {
          title: "Ali Mwere Connors",
          message: "Itakuaje",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        },
        {
          active: true,
          title: "Ran Carlson",
          message: "Mbona unakua ivo kweni tuliongea aje",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          active: true,
          title: "Renee Carlson",
          message: "Mbona unakua ivo kweni tuliongea aje",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        }
      ],
      items2: [
        {
          title: "Travis Howard",
          message: "",
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
        }
      ],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: false
    };
  },
  computed: {
    chats() {
      return this.$store.state.chat.singleChats;
    },
    selectedChat() {
      return this.$store.state.chat.active;
    },
    me() {
      return { id: "me" };
    }
  },
  methods: {
    activate(chat) {
      // console.log(chat)
      this.$store.commit("selectChat", chat);
    }
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
