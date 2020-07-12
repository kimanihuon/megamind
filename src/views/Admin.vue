<template>
  <v-container>
    <div v-if="!authorized">Unauthorized</div>
    <div v-if="authorized">
      <!-- List of selected summaries -->
      <v-row>
        <v-col cols="12" sm="4" md="3" v-for="(summary, i) in summaries" :key="i">
          <summaryBlock :details="summary" @select="select(...arguments)"></summaryBlock>
        </v-col>
      </v-row>

      <v-divider class="my-6"></v-divider>

      <!-- List of selected summaries -->
      <v-row>
        <summaryBreakdown :summary="activeSummary"></summaryBreakdown>
      </v-row>
    </div>
  </v-container>
</template>

<script>

export default {
  name: "admin",

  components: {
    summaryBlock: () =>
      import(
        /* webpackChunkName: "summaryBlock" */ "../components/admin/summary"
      ),
    summaryBreakdown: () =>
      import(
        /* webpackChunkName: "summaryBreakdown" */ "../components/admin/summaryBreakdown"
      )
  },

  data() {
    return {
      authorized: this.$store.state.admin.authorized,
      activeSummary: "Users",
      summaries: [
        {
          icon: "mdi-account-group",
          color: "blue",
          title: "Users",
          update: ""
        },
        {
          icon: "mdi-format-list-bulleted-square",
          color: "indigo",
          title: "Tracks",
          update: ""
        },
        { icon: "mdi-forum", color: "primary", title: "Chats", update: "" },
        {
          icon: "mdi-toggle-switch",
          color: "green",
          title: "Online",
          update: ""
        }
      ]
    };
  },
  methods: {
    select(summary) {
      // Change active summary
      this.activeSummary = summary;
    }
  },
  mounted() {
    if (!this.$store.state.summaries.retrieved && this.authorized) {
      this.$socket.emit("summaries", { single: true, title: null })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
