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

                <v-list-item v-for="item in items" :key="item.title" @click="activate()">
                  <v-list-item-avatar size="48">
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.title" class="py-1"></v-list-item-title>
                    <v-list-item-subtitle class="font-weight-light">{{ item.message }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-chat-outline</v-icon>
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
                  <v-img src="https://cdn.vuetifyjs.com/images/lists/4.jpg"></v-img>
                </v-avatar>
                <v-toolbar-title>Jimmy</v-toolbar-title>
              </v-row>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- Chat layout -->
            <v-layout d-flex column class="chat-list px-3 pb-12">
              <v-list class="pb-4">
                <!-- Single message sent -->
                <v-row class="my-6 px-4" justify="end">
                  <v-card class="mx-2 bubble" color="#0277BD" max-width="500" id="bubble">
                    <v-card-subtitle
                      class="body-2 white--text"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</v-card-subtitle>
                  </v-card>
                </v-row>
                <!-- Single message received -->
                <v-row class="my-6 px-4" justify="start">
                  <v-card class="mx-2 bubbleleft" color="#F5F5F5" max-width="500" id="bubbleleft">
                    <v-card-subtitle
                      class="body-2 black--text"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet accusantium consequuntur blanditiis reiciendis nihil nobis sed consequatur id fugiat aliquam, mollitia adipisci, quaerat voluptates temporibus consectetur enim fugit delectus ipsam?</v-card-subtitle>
                  </v-card>
                </v-row>
                <!-- Message end -->

                <!-- Single message sent -->
                <v-row class="my-6 px-4" justify="end">
                  <v-card class="mx-2 bubble" color="#0277BD" max-width="500" id="bubble">
                    <v-card-subtitle
                      class="body-2 white--text"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</v-card-subtitle>
                  </v-card>
                </v-row>
                <!-- Single message received -->
                <v-row class="my-6 px-4" justify="start">
                  <v-card class="mx-2 bubbleleft" color="#F5F5F5" max-width="500" id="bubbleleft">
                    <v-card-subtitle
                      class="body-2 black--text"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet accusantium consequuntur blanditiis reiciendis nihil nobis sed consequatur id fugiat aliquam, mollitia adipisci, quaerat voluptates temporibus consectetur enim fugit delectus ipsam?</v-card-subtitle>
                  </v-card>
                </v-row>
                <!-- Message end -->
                <!-- Single message sent -->
                <v-row class="my-6 px-4" justify="end">
                  <v-card class="mx-2 bubble" color="#0277BD" max-width="500" id="bubble">
                    <v-card-subtitle
                      class="body-2 white--text"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</v-card-subtitle>
                  </v-card>
                </v-row>
                <!-- Single message received -->
                <v-row class="my-6 px-4" justify="start">
                  <v-card class="mx-2 bubbleleft" color="#F5F5F5" max-width="500" id="bubbleleft">
                    <v-card-subtitle
                      class="body-2 black--text"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet accusantium consequuntur blanditiis reiciendis nihil nobis sed consequatur id fugiat aliquam, mollitia adipisci, quaerat voluptates temporibus consectetur enim fugit delectus ipsam?</v-card-subtitle>
                  </v-card>
                </v-row>
                <!-- Message end -->
                <!-- Single message sent -->
                <v-row class="my-6 px-4" justify="end">
                  <v-card class="mx-2 bubble" color="#0277BD" max-width="500" id="bubble">
                    <v-card-subtitle
                      class="body-2 white--text"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</v-card-subtitle>
                  </v-card>
                </v-row>
                <!-- Single message received -->
                <v-row class="my-6 px-4" justify="start">
                  <v-card class="mx-2 bubbleleft" color="#F5F5F5" max-width="500" id="bubbleleft">
                    <v-card-subtitle
                      class="body-2 black--text"
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet accusantium consequuntur blanditiis reiciendis nihil nobis sed consequatur id fugiat aliquam, mollitia adipisci, quaerat voluptates temporibus consectetur enim fugit delectus ipsam?</v-card-subtitle>
                  </v-card>
                </v-row>
                <!-- Message end -->
              </v-list>
            </v-layout>

            <!-- Message input -->
            <v-row no-gutters id="message-input" >
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
    //
  },
  methods: {
    activate() {
      //
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

.list::-webkit-scrollbar, .chat-list::-webkit-scrollbar {
  width: 5px;
  height: 4px;
}
.list::-webkit-scrollbar-track, .chat-list::-webkit-scrollbar-track {
  background: #e8f0fd;
}

.list::-webkit-scrollbar-thumb, .chat-list::-webkit-scrollbar-thumb {
  background: #6f6f70;
}

.list, .chat-list {
  scrollbar-face-color: #83a5ee;
  scrollbar-track-color: #e8f0fd;
}
</style>
