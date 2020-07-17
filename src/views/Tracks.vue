<template>
  <v-container>
    <!-- Progress bar -->
    <progressIndicator v-if="fetching.state"></progressIndicator>

    <!-- Track -->
    <trackView :column="singleTrack" :index="1" v-if="!fetching.state && requestSuccess.state"></trackView>

    <!-- Error -->
    <v-row
      v-if="!fetching.state && !requestSuccess.state"
      no-gutters
      align="center"
      class="fill-height"
    >
      <v-col align="center">
        <v-card flat max-width="500" color="transparent">
          <v-card-subtitle
            class="welcome"
          >Unable to find track. Could have been made private or was deleted</v-card-subtitle>
          <v-img src="@/assets/icons/error.svg" height="200" width="200"></v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- No tracks -->
    <v-row
      v-if="!fetchingAll.state && !fetchingAllSuccess.state"
      no-gutters
      align="center"
      class="fill-height"
    >
      <v-col align="center">
        <v-card flat max-width="500" color="transparent">
          <v-card-subtitle
            class="welcome"
          >Under construction. We're still working on this part :)</v-card-subtitle>
          <v-img src="@/assets/icons/under-construction.svg" height="200" width="200"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchTrack, fetchAllTracks } from "../controllers/api";

export default {
  name: "tracks",
  components: {
    progressIndicator: () =>
      import(
        /* webpackChunkName: "progressIndicator" */ "@/components/global/progress.vue"
      ),
    trackView: () =>
      import(
        /* webpackChunkName: "trackView" */ "@/components/tracks/track.vue"
      )
  },
  data() {
    return {
      fetching: { state: true },
      fetchingAll: { state: true },
      fetchingAllSuccess: { state: false },
      requestSuccess: { state: false },
      single: true
    };
  },
  computed: {
    singleTrack() {
      return this.$store.state.publicTracks.single;
    }
  },
  mounted() {
    var instance = this;
    if (this.$route.query.id) {
      this.single = true;
      fetchTrack(this).then(res => {
        if (res === true) {
          instance.fetching.state = false;
          instance.requestSuccess.state = true;
        } else {
          instance.requestSuccess.state = false;
          instance.fetching.state = false;
        }
      });
    } else {
      fetchAllTracks(this);
      this.fetchingAll = false;
      this.fetchingAllSuccess = false;
    }
  }
};
</script>

<style lang="css" scoped>
</style>
