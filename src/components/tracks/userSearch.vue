<template>
  <div>
    <!-- Search bar -->
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
                <v-list-item-title v-if="typeof result.name !== 'undefined'">{{ result.name }}</v-list-item-title>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: null,
      menu: false,
      waiting: false,
      valid: true,
      maxInput: 10,
      socket: this.$socket,
      self: this.$store.state.self,
      alreadyInserted: this.$store.state.shareList.inserted
    };
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults;
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
    selectUser(user) {
      if (user._id == this.self._id) {
        alert(":) That's you");
        return;
      }

      if (!this.alreadyInserted[user._id]) {
        this.$store.commit("addToSharelist", user);
      }
    }
  }
};
</script>

<style lang="scss">
</style>

