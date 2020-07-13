<template>
  <div>
    <v-row no-gutters>
      <v-card-title>Select users</v-card-title>
      <v-spacer></v-spacer>
      <v-card-title>
        <v-btn small outlined color="success" @click="share()">
          Share
          <v-icon right>mdi-share</v-icon>
        </v-btn>
      </v-card-title>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    share() {
        
    }
  }
};
</script>
