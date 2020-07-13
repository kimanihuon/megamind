<template>
  <div>
    <!-- Active and archived blocks buttons -->
    <v-row no-gutters align="center">
      <!-- Active blocks button -->
      <v-chip
        class="my-2 mx-1 px-1"
        :color="column.active ? chipColor : chipColorArchive"
        :outlined="!column.active ? true : false"
        text-color="white"
        small
        @click="column.active = true"
      >
        <v-avatar left>
          <v-icon small>mdi-white-balance-sunny</v-icon>
        </v-avatar>Active
      </v-chip>

      <!-- Archived blocks button -->
      <v-chip
        class="my-2 mx-1 px-1"
        :color="column.active ? chipColor : chipColorArchive"
        :outlined="column.active ? true : false"
        text-color="white"
        small
        @click="column.active = false"
      >
        <v-avatar left>
          <v-icon small>mdi-power-sleep</v-icon>
        </v-avatar>Archive
      </v-chip>

      <v-spacer></v-spacer>

      <!-- Menu options button -->
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
    </v-row>
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
        { title: "Delete", icon: "mdi-trash-can-outline" },
        // { title: "Duplicate", icon: "mdi-content-duplicate" }
      ],
      chipColor: "indigo",
      chipColorArchive: "red"
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
        this.$emit("toggle", {column: this.column, index: this.index});
      }
      if (name === "Share") {
        this.$emit("share", { trackId: this.column._id })
      }
    }
  }
};
</script>
