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

      <v-btn class="px-2 mx-3" v-if="admin" small color="red" outlined to="/admin">Admin</v-btn>

      <!-- Nav bar buttons -->
      <!-- Track creator -->
      <trackCreator></trackCreator>

      <!-- Notifications icon -->
      <v-menu v-if="authorized" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color v-on="on" v-bind="attrs">
            <v-badge
              :content="chatNotifications.length"
              :value="chatNotifications.length > 0"
              color="purple"
              overlap
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list v-if="chatNotifications.length > 0">
          <chatPreview></chatPreview>
          <div class="d-flex justify-center">
            <v-btn class="ma-2" outlined color="red" small @click="clearNotifications()">Clear</v-btn>
          </div>
        </v-list>

        <!-- When there are no new notifications -->
        <v-list>
          <v-list-item v-if="chatNotifications.length < 1">
            <v-list-item-subtitle>No new notifications</v-list-item-subtitle>
          </v-list-item>
        </v-list>
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
  name: "Navbar",
  components: {
    chatPreview: () =>
      import(/* webpackChunkName: "chatNavPreview" */ "./chat/chatPreview"),
    trackCreator: () =>
      import(/* webpackChunkName: "trackCreatorNav" */ "./nav/trackCreator")
  },
  data() {
    return {
      loading: false,
      drawer: true,
      fav: true,
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
              "Cannot logout, server side error. Try clearing your cookies"
            );
          }
        })
        .catch(function(error) {
          console.log(error);
          window.alert(
            "Cannot logout, Browser error. Try clearing your cookies instead"
          );
        });
    },
    clearNotifications() {
      this.$store.commit("clearNotifications");
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
    },
    chatNotifications() {
      return this.$store.state.notifications.chat;
    },
    path() {
      return this.$route.path;
    },
    authorized() {
      return this.$store.state.auth;
    },
    admin() {
      return this.$store.state.admin.authorized;
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
