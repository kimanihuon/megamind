<template>
  <div>
    <v-row no-gutters justify="space-around">
      <!-- Chips -->
      <v-col cols="11">
        <v-sheet class="mx-auto py-1 pl-2" elevation="5" max-width="600">
          <v-chip-group v-model="selection" show-arrows>
            <v-chip
              text-color="white"
              :outlined="tag.outlined(column.active, column.private)"
              :color="tag.color(column.active, column.private)"
              small
              @click="toggle(column, tag.name(column.private))"
              v-for="tag in tags"
              :key="tag.name(column.private)"
            >
              <v-icon small left>{{ tag.icon }}</v-icon>
              {{ tag.name(column.private) }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
      <!-- Menu options -->
      <v-col cols="1">
        <v-menu close-on-click bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" @click="action(item.title)">
              <v-icon small left>{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <!-- Menu options button -->
  </div>
</template>

<script>
export default {
  props: ["column", "index"],

  data() {
    return {
      items: [
        { title: "Edit", icon: "mdi-circle-edit-outline" },
        { title: "Share", icon: "mdi-share-variant" },
        { title: "Delete", icon: "mdi-trash-can-outline" }
        // { title: "Duplicate", icon: "mdi-content-duplicate" }
      ],
      selection: [],
      tags: [
        // Active
        {
          name: function() {
            return "Active";
          },
          active: true,
          icon: "mdi-white-balance-sunny",
          // eslint-disable-next-line no-use-before-define
          outlined: function(columnState, privacyState) {
            privacyState;
            if (columnState) {
              return false;
            } else {
              return true;
            }
          },
          color: function(columnActive, privacyState) {
            privacyState;
            if (columnActive) {
              return "indigo";
            } else {
              return "red";
            }
          }
        },
        // Archive
        {
          name: function() {
            return "Archive";
          },
          archive: true,
          icon: "mdi-power-sleep",
          outlined: function(columnActive, privacyState) {
            privacyState;
            if (columnActive) {
              return true;
            } else {
              return false;
            }
          },
          color: function(columnActive, privacyState) {
            privacyState;
            if (columnActive) {
              return "indigo";
            } else {
              return "red";
            }
          }
        },
        // Privacy
        {
          name: function(privacyState) {
            if (privacyState) {
              return "Private";
            } else {
              return "Public";
            }
          },
          privacy: true,
          icon: "mdi-earth",
          outlined: function(columnActive, privacyState) {
            columnActive;
            if (privacyState) {
              return true;
            } else {
              return false;
            }
          },
          color: function(columnActive, privacyState) {
            columnActive;
            if (privacyState) {
              return "#0091EA";
            } else {
              return "#33691E";
            }
          }
        }
      ],
      chipColor: "indigo",
      chipColorArchive: "red",
      privateColor: "#0091EA",
      publicColor: "#33691E"
    };
  },
  methods: {
    action(name) {
      if (name === "Delete") {
        var instance = this;
        this.$http
          .create({ withCredentials: true })
          .post(`${this.$api}/api/track/delete`, { _id: this.column._id })
          .then(function(response) {
            if (response.data.success === true) {
              instance.$store.commit("deleteTrack", {
                _id: instance.column._id,
                index: instance.index
              });
              instance.$emit("deleted", true);
            } else {
              window.alert("Oops! something happened. You might be offline");
            }
          })
          .catch(function(error) {
            console.log(error);
            window.alert("Oops! something happened. You might be offline");
          });
      }
      if (name === "Edit") {
        this.$emit("toggle", { column: this.column, index: this.index });
      }
      if (name === "Share") {
        this.$emit("share", { trackId: this.column._id });
      }
    },
    toggle(track, status) {
      if (status === "Active") {
        track.active = true;
      } else if (status === "Archive") {
        track.active = false;
      } else {
        this.$socket.emit("updateTrack", {
          id: track._id,
          data: { private: !track.private }
        });
        track.private = !track.private;
      }
    }
  }
};
</script>