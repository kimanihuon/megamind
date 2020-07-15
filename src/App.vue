<template>
  <v-app>
    <!-- Nav and Drawer -->
    <Nav v-if="auth"></Nav>

    <!-- View -->
    <v-main style="padding-top: 24px;">
      <router-view></router-view>
    </v-main>

    <!-- Footer -->
    <v-footer v-if="!auth" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Nav from "./components/Nav";

export default {
  name: "App",

  components: {
    Nav
  },

  data: () => ({
    // Current window path
    path: window.location.pathname
  }),

  computed: {
    auth() {
      // Whether user is logged in
      return this.$store.state.auth;
    }
  },

  mounted() {
    this.$vuetify.theme.dark = this.$store.state.darkMode;
  }
  
};
</script>

<style lang="scss" scoped>
.content {
  padding: 0px 0px 0px;
}
</style>
