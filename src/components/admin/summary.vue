<template>
  <div>
    <v-card class="mx-auto" max-width="344" outlined @click="select(details.title)">
      <v-row no-gutters class="ma-2 pb-0">
        <v-col class>
          <v-btn class fab dark :color="details.color">
            <v-icon large dark>{{ details.icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col align="right">
          <v-card-subtitle class="pa-0 pr-4 font-weight-light">{{ details.title }}</v-card-subtitle>
          <v-card-subtitle class="pt-0 pb-0 headline">{{ summaries[makeLowercase(details.title)].value }}</v-card-subtitle>
        </v-col>
      </v-row>

      <v-divider class="mx-3"></v-divider>

      <v-row no-gutters>
        <v-col>
          <v-card-text class="font-italic font-weight-light">
            <v-icon small>mdi-clock-outline</v-icon>
            {{ time(summaries[makeLowercase(details.title)].time) }}
          </v-card-text>
        </v-col>

        <v-col align="right">
          <v-card-text class="font-italic font-weight-light">
            <v-btn x-small icon :color="details.color">
              <v-icon size="25">mdi-sync</v-icon>
            </v-btn>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["details"],
  data() {
    return {
      summaries: this.$store.state.summaries
    };
  },
  methods: {
    select(summary) {
      this.$emit("select", summary);
    },
    makeLowercase(str){
      return str.toLowerCase()
    },
    time(time){
      return moment(time).fromNow()
    }
  }
};
</script>
