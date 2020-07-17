<template>
  <div>
    <v-row no-gutters>
      <v-card-title>Select users</v-card-title>
      <v-spacer></v-spacer>
      <v-card-title>
        <v-btn small outlined color="success" @click="share()">
          Share
          <v-icon right>mdi-share</v-icon>
        </v-btn>
      </v-card-title>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['trackId'],
  methods: {
    send(user) {
      var chat = this.$store.state.chat.struct;
      var messageObj = JSON.parse(JSON.stringify(chat));

      var allChats = this.$store.state.self.chats;

      // Check if it's an existing chat
      for (let i = 0; i < allChats.length; i++) {
        if (allChats[i].participants[0]._id == user._id || allChats[i].participants[1]._id == user._id) {
          messageObj._id = allChats[i]._id;
          break;
        } 
      }

      // Set participants if they don't exist
      if (!messageObj._id) {
        messageObj.participants[0] = this.$store.state.selfMini;
        messageObj.participants[1] = user;
      }
      
      messageObj.messageStructure.contents.timestamp = Date.now();
      messageObj.messageStructure.contents.text = `<a href="${this.$site}/tracks?id=${this.trackId}">${this.$site}/tracks?id=${this.trackId}</a>`;
      messageObj.intent = 'newShare'

      // If the first participant is self then send to the other participant, else send to the first
      messageObj.messageStructure.to = user._id;
      messageObj.messageStructure.from = this.$store.state.self._id;

      this.$socket.emit("send", messageObj);
    },
    share() {
      var selected = this.$store.state.shareList.selected;
      if (selected.length < 1) {
        this.$emit('shared', { success: false, message: 'No user selected' })
        return
      }
      for (let i = 0; i < selected.length; i++) {
        this.send(selected[i])
      }
      this.$emit('shared', { success: true })
    }
  },
  mounted(){}
};
</script>
