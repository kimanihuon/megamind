<template>
  <v-container fluid>
    <v-switch v-model="miniDrawer" :label="`Drawer mini: ${ miniDrawer ? 'On' : 'Off' }`"></v-switch>
    <v-switch v-model="expandHover" :label="`Expand on hover: ${ expandHover ? 'On' : 'Off' }`"></v-switch>
    <v-switch v-model="darkMode" :label="`Enable dark mode: ${ darkMode ? 'On' : 'Off' }`"></v-switch>

  </v-container>
</template>


<script>
export default {
  name: "Settings",

  components: {

  },

  data() {
    return {
            
    };
  },

  methods: {

  },

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

    // Expand on hover switch
    darkMode: {
      set() {
        //   commit mutation. Change value
        this.$store.commit("switchDark");
        this.$vuetify.theme.dark = this.$store.state.darkMode;
      },
      get() {
        //   get state
        return this.$store.state.darkMode;
      }
    }
  }
};
</script>

<style lang="css" scoped>
/* Targetting the image tag with the v-html attribute */
.notes >>> img {
  width: 100%;
  height: auto;
}

.f-color {
  color: black;
}

.wd-break {
  /* Instead use this non-standard one: */
  word-break: break-word;
}

.sheet {
  background-color: rgba(151, 152, 153, 0.3);
}

#block {
  border-radius: 8px;
}

.block-title {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgb(184, 181, 181);
}

.v-card__subtitle {
  margin-top: -14px;
}

/* id is used when we have to apply CSS property to one attribute only. 
class is used when we have to use CSS property in 
many locations within the same page or different. */
</style>

