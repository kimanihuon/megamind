<template>
  <div>
    <!-- Active and archived blocks buttons -->
    <v-row no-gutters align="center">
      <!-- Active blocks button -->
      <v-chip
        class="my-2 mx-2"
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
        class="my-2"
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
          <v-list-item v-for="(item, i) in items" :key="i" @click="log">
            <v-icon small left>
              {{ item.icon }}
            </v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["column"],

  data() {
    return {
      items: [
        { title: "Edit", icon: "mdi-circle-edit-outline" },
        { title: "Share", icon: "mdi-share-variant" },
        { title: "Delete", icon: "mdi-trash-can-outline" },
        { title: "Duplicate", icon: "mdi-content-duplicate" }
      ],
      chipColor: "indigo",
      chipColorArchive: "red"
    };
  },
  methods: {
    log() {}
  }
};
</script>
