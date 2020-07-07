<template>
  <div>
    <!-- Dialog with embeded sites -->
    <v-dialog v-model="frameState">
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-toolbar-title>iFrame Page</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="frameState = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <iframe
        v-if="frameState"
        :src="site"
        allow="autoplay; encrypted-media"
        frameborder="0"
        allowfullscreen
        height="500"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </v-dialog>

    <!-- Main card -->
    <v-card :max-width="cardWidth" color="#263238" class="mx-auto pa-2 pt-1">
      <v-row no-gutters justify="end">
        
        <!-- Youtube Playlist icon -->
        <v-tooltip v-if="playlistCheck() && youtubeCheck()" right>
          <template v-slot:activator="{ on }">
            <v-icon color="red" v-on="on">mdi-playlist-play</v-icon>
          </template>
          <span>Youtube playlist</span>
        </v-tooltip>      

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-share</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </v-row>

      <v-row no-gutters justify="center">
        <v-progress-circular indeterminate :size="50" color="primary" v-if="!response && validUrl"></v-progress-circular>
      </v-row>

      <v-row no-gutters v-if="response">
        <!-- site image -->
        <v-img :src="response.images[0]" :height="imageHeight" dark>
          <!-- Youtube play button -->
          <v-row
            v-if="youtubeCheck() === true"
            no-gutters
            justify="center"
            align="center"
            class="fill-height"
          >
            <v-col justify="center" align="center">
              <v-btn x-large icon class="mx-2" @click="openIframe()">
                <v-icon x-large color="red">mdi-youtube</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <!-- Url Open button -->
          <v-row
            v-if="youtubeCheck() !== true"
            no-gutters
            justify="center"
            align="center"
            class="fill-height"
          >
            <v-col justify="center" align="center">
              <v-btn medium fab class="mx-2" @click="openIframe()">
                <v-icon x-large color="blue">mdi-open-in-app</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-img>

        <!-- Title and description -->
        <v-card
          outlined
          width="100%"
          class="pa-0 px-1 ma-0"
          v-if="size == 'large' || size == 'medium'"
        >
          <v-col class="pa-0">
            <v-row no-gutters>
              <v-col align="center">
                <v-card-title class="px-0 justify-center pv-desc">{{ response.title }}</v-card-title>
                <v-card-subtitle class="px-0 pv-desc">{{ response.description }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-col>
        </v-card>

        <!-- Url link -->
        <v-row no-gutters v-if="size == 'large'">
          <v-col align="center">
            <v-card-subtitle class="py-2 px-0 link">
              <a :href="url" class="link">{{ url }}</a>
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-row>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "linkPreview",

  props: {
    url: {
      type: String,
      default: "https://www.youtube.com/watch?v=jNQXAC9IVRw"
    },

    cardWidth: {
      type: String,
      default: "300px"
    },

    size: {
      type: String,
      default: "small"
    },

    imageHeight: {
      type: String,
      default: "150px"
    },

    onButtonClick: {
      type: Function,
      default: undefined
    },
    showButton: {
      type: Boolean,
      default: true
    },
    apiUrl: {
      type: String,
      default: "https://linkpreview-api.herokuapp.com/"
    }
  },

  data() {
    return {
      showTooltip: false,
      playlist: false,
      response: null,
      validUrl: false,
      frameState: false,
      site: ""
    };
  },
  watch: {
    /* eslint-disable */
    url: function(value) {
      this.response = null;
      this.getLinkPreview();
    }
  },
  created() {
    this.getLinkPreview();
  },
  methods: {
    viewMore: function() {
      if (this.onButtonClick !== undefined) {
        this.onButtonClick(this.response);
      } else {
        const win = window.open(this.url, "_blank");
        win.focus();
      }
    },
    isValidUrl: function(url) {
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
      this.validUrl = regex.test(url);
      return this.validUrl;
    },
    getLinkPreview: function() {
      if (this.isValidUrl(this.url)) {
        this.httpRequest(
          response => {
            this.response = JSON.parse(response);
            // console.log(this.response);
          },
          () => {
            this.response = null;
            this.validUrl = false;
          }
        );
      }
    },
    httpRequest: function(success, error) {
      const http = new XMLHttpRequest();
      const params = "url=" + this.url;
      http.open("POST", this.apiUrl, true);
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
          success(http.responseText);
        }
        if (http.readyState === 4 && http.status === 500) {
          error();
        }
      };
      http.send(params);
    },
    youtubeCheck: function() {
      const regex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/;
      return regex.test(this.url);
    },
    playlistCheck() {
      var url = new URL(this.url);
      var list = url.searchParams.get("list");
      if (list) {
        return `https://www.youtube.com/embed/videoseries?list=${list}`;
      } else {
        return false;
      }
    },
    openIframe: function() {
      var str = this.url;

      if (this.youtubeCheck) {
        var list = this.playlistCheck();

        // Youtube embed playlist check
        if (list) {
          var res = list;
        } else {
          var res = str.replace("com/watch?v=", "com/embed/");
        }
      }

      this.site = res;
      this.frameState = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.pv-desc {
  /* Instead use this non-standard one: */
  word-break: break-word;
}

.card {
  border: thin dotted rgb(0, 4, 255);
}

.link a {
  text-decoration: none;
  overflow-wrap: break-word;
  word-wrap: break-word;
  /* Instead use this non-standard one: */
  word-break: break-word;
}

.link a:hover {
  text-decoration: underline;
}
</style>
