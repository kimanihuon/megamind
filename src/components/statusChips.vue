<template>
  <div>
    <!-- Active and archived blocks buttons -->
    <v-row no-gutters align="center">
      <!-- Active blocks button -->
      <v-chip
        class="my-2 mx-2"
        :color="column.blocks[index].active ? chipColor : chipColorArchive"
        :outlined="!column.blocks[index].active ? true : false"
        text-color="white"
        small
        @click="column.blocks[index].active  = true"
      >
        <v-avatar left>
          <v-icon small>mdi-white-balance-sunny</v-icon>
        </v-avatar>Active
      </v-chip>

      <!-- Archived blocks button -->
      <v-chip
        class="my-2"
        :color="column.blocks[index].active ? chipColor : chipColorArchive"
        :outlined="column.blocks[index].active  ? true : false"
        text-color="white"
        small
        @click="column.blocks[index].active = false"
      >
        <v-avatar left>
          <v-icon small>mdi-power-sleep</v-icon>
        </v-avatar>Archive
      </v-chip>

      <v-spacer></v-spacer>

      <!-- Menu options button -->
      <v-btn icon @click="log(chips)">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["column", "index"],

  data() {
    return {
        chipColor: "green",
        chipColorArchive: "red"
    };
  },

  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
