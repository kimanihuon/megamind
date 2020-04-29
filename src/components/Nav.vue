<template>
  <v-container>
    <!-- Other option: clipped -->
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :mini-variant="miniVariant"
      :expand-on-hover="expandOnHover"
    >
      <v-list dense>
        <!-- Drawer items -->
        <v-list-item link v-for="(item, i) in pages" :key="i" :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block outlined @click="logout()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- other option: clipped-left -->
    <v-app-bar flat app clipped-left dense>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Weskool</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Nav bar buttons -->

      <!-- Add track icon -->
      <v-menu
        v-model="trackAdder"
        :close-on-content-click="false"
        :nudge-bottom="25"
        :nudge-left="130"
        max-width="300"
        min-width="265"
        absolute
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn icon color="indigo" v-on="on">
            <v-icon>mdi-plus-outline</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-content class="text-center">
                <v-list-item-title>CREATE NEW TRACK</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <!-- Track name -->
            <v-list-item class="pt-1">
              <v-text-field v-model="track.name" label="Track name"></v-text-field>
            </v-list-item>
          </v-list>

          <v-row no-gutters justify="center" class="pb-2">
            <v-card-actions>
              <v-btn color="indigo" @click="trackAdder = false, createTrack()">
                create
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-menu>

      <!-- Add task icon -->
      <v-btn icon color="indigo">
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <!-- Notifications icon -->
      <v-menu
        v-model="notifications"
        :close-on-content-click="false"
        :nudge-width="200"
        absolute
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn icon color v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
      </v-menu>

      <!-- Options icon -->
      <v-menu
        v-model="options"
        :close-on-content-click="false"
        :nudge-width="200"
        absolute
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn icon color v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      drawer: true,
      track: {
        name: "",
        active: true,
        blocks: [],
        archived: []
      },
      fav: true,
      trackAdder: false,
      taskAdder: false,
      notifications: false,
      options: false,
      message: false,
      hints: true,
      x: 0,
      y: 0,
      icons: this.$store.state.navIcons
    };
  },

  methods: {
    logout() {
      var instance = this;

      this.$http
        .create({ withCredentials: true })
        .post(`${this.$api}/api/logout`)
        .then(function(response) {
          if (response.data.success === true) {
            instance.$socket.emit("logout", instance.$store.state.self._id);
            instance.$store.dispatch("deauth");
            instance.$router.push({ name: "login" });
          } else {
            window.alert(
              "Cannot logout, server configuration error. Try clearing your cookies"
            );
          }
        })
        .catch(function(error) {
          // console.log(error)
          error;
          window.alert(
            "Cannot logout, Browser error. Try clearing your cookies instead"
          );
        });
    },
    createTrack() {
      // *TODO: database call to create track
      var track = JSON.parse(JSON.stringify(this.track));
      this.$store.commit("createTrack", track);
      this.track.name = "";
    }
  },

  computed: {
    pages() {
      return this.$store.state.pages;
    },
    miniVariant() {
      return this.$store.state.miniDrawer;
    },
    expandOnHover() {
      return this.$store.state.expandOnHover;
    }
  },

  watch: {
    // Watching for changes in the drawer variable
    drawer: function() {
      this.$store.commit("changeDrawerState");
    }
  },

  created() {}
};
</script>