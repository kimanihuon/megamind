<template>
  <v-container>
    <!-- Chats list layout -->
    <!-- chats actual -->
    <v-list v-if="chats.length" subheader>
      <v-subheader>Single chats</v-subheader>

      <v-list-item v-for="(chat, idx) in chats" :key="idx" @click="activate(idx)">
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      self: this.$store.state.self
    };
  },
  computed: {
    // chatNotifications
    chats() {
      return this.$store.state.notifications.chat;
    }
  },
  methods: {
    activate(idx) {
      var globalChats = this.$store.state.self.chats;

      for (let i = 0; i < globalChats.length; i++) {
        if (this.chats[idx]._id === globalChats[i]._id) {
          if (this.$route.path !== "/chat") {
            // refresh through page load
            this.$router.push({ path: `/chat`, query: { chatIdx: i } });
          } else {
            // Refresh through store
            this.$store.commit("selectChat", i);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  overflow: auto;
}
</style>
