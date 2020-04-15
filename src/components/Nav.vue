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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Weskool</v-toolbar-title>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      drawer: null
    };
  },

  methods: {
    logout() {

      var instance = this;

      this.$http
        .create({ withCredentials: true })
        .post("http://localhost:5443/api/logout")
        .then(function(response) {
          if (response.data.success === true) {
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
  created() {}
};
</script>