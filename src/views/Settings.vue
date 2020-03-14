<template>
  <v-content>
    <v-switch v-model="miniDrawer" :label="`Drawer mini: ${ miniDrawer ? 'On' : 'Off' }`"></v-switch>
    <v-switch v-model="expandHover" :label="`Expand on hover: ${ expandHover ? 'On' : 'Off' }`"></v-switch>
  </v-content>
</template>


<script>
export default {
  data() {
    return {
      //f
    };
  },

  methods: {},

  computed: {
    // Using computed setter and getters

    // Navigation drawer switch
    miniDrawer: {
      set() {
        //   commit mutation. Change value
        this.$store.commit("switchMini");
      },
      get() {
        //   get state
        return this.$store.state.miniDrawer;
      }
    },

    // Expand on hover switch
    expandHover: {
      set() {
        //   commit mutation. Change value
        this.$store.commit("switchHover");
      },
      get() {
        //   get state
        return this.$store.state.expandOnHover;
      }
    },

  }
};
</script>
