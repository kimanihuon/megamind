<template>
  <div>
    <v-card :max-width="cardWidth" class="mx-auto pa-2 pt-1">
      <v-row no-gutters justify="end">
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
        <v-img :src="response.images[0]" :height="imageHeight" dark></v-img>

        <v-card outlined width="100%" class="pa-0 ma-0">
          <v-col class="pa-0">
            <v-row no-gutters>
              <v-col align="center">
                <v-card-title class="px-0 justify-center">{{ response.title }}</v-card-title>
                <v-card-subtitle class="px-0">{{ response.description }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-col>
        </v-card>

        <v-row no-gutters>
          <v-col align="center">
            <v-card-subtitle class="py-2 px-0 link">
              <a :href="url">{{ url }}</a>
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
      default: ""
    },
    cardWidth: {
      type: String,
      default: "300px"
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
      response: null,
      validUrl: false
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
    }
  }
};
</script>

<style lang="scss" scoped>
.link a {
  text-decoration: none;
}

.link a:hover {
  text-decoration: underline;
}
</style>
