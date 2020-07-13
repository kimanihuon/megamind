<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="users"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
  >
    <template v-slot:item.avatar="{ item }">
      <v-avatar size="40">
        <img :src="item.avatar" :alt="item.username" />
      </v-avatar>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      singleSelect: false,
      headers: this.$store.state.shareList.headers
    };
  },
  computed: {
    selected: {
      get() {
        return this.$store.state.shareList.selected;
      },
      set(value) {
        console.log(value);
        this.$store.commit("updateShareUsers", value);
      }
    },
    users() {
      return this.$store.state.shareList.users;
    }
  }
};
</script>

<style scoped>
</style>
