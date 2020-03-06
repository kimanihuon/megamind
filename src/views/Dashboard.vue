<template>
  <v-container >
    <!-- Other option: clipped -->
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-chat</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- other option: clipped-left -->
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Weskool</v-toolbar-title>
    </v-app-bar>

    <v-container class="fill-height" fluid></v-container>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
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

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
