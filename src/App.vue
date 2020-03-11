<template>
  <v-app>
    <!-- Nav and Drawer -->
    <Nav v-if="auth"> </Nav>

    <!-- View -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- Footer -->
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Nav from './components/Nav'

export default {
  name: "App",

  components: {
    Nav
  },

  data: () => ({

  }),

  computed: {
    auth(){
      return this.$store.state.auth;
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
  }

};
</script>
