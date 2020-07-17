<template>
  <div>
    <!-- Add track icon -->
    <v-menu
      v-if="authorized"
      v-model="trackAdder"
      :close-on-content-click="false"
      :nudge-bottom="25"
      :nudge-left="130"
      max-width="300"
      min-width="265"
      absolute
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn icon color="indigo" v-on="on">
          <v-icon>mdi-plus-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content class="text-center">
              <v-list-item-title>CREATE NEW TRACK</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <!-- Track name -->
          <v-list-item class="pt-1">
            <v-text-field v-model="track.name" label="Track name"></v-text-field>
          </v-list-item>
        </v-list>

        <v-row no-gutters justify="space-around" class="pb-2">
          <v-btn
            small
            outlined
            color="#2196F3"
            :loading="creatingPrivate"
            @click="createTrack('private')"
          >
            private
            <v-icon right>mdi-plus-thick</v-icon>
          </v-btn>
          <v-btn
            small
            outlined
            color="#FF1744"
            :loading="creatingPublic"
            @click="createTrack('public')"
          >
            public
            <v-icon right>mdi-plus-thick</v-icon>
          </v-btn>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import apiClient from "@/controllers/api.js";

export default {
  data() {
    return {
      creatingPublic: false,
      creatingPrivate: false,
      trackAdder: false,
      taskAdder: false,
      track: {
        name: "",
        private: true,
        active: true,
        owner: this.$store.state.self._id,
        blocks: [],
        archived: []
      }
    };
  },
  computed: {
    authorized() {
      return this.$store.state.auth;
    }
  },
  methods: {
    createTrack(status) {
      apiClient.createTrack(this, window, status);
    }
  }
};
</script>
