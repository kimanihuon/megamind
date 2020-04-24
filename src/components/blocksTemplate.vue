<template>
  <div>
    <!-- Blocks start -->
    <v-card id="block" class="mb-4" elevation="10">
      <!-- Title -->
      <v-row no-gutters align="center">
        <v-col cols="10" class="pa-0 ma-0">
          <v-card-title class="block-title py-0 pt-2 pb-2 pr-0 wd-break">{{ block.name }}</v-card-title>
        </v-col>

        <v-col cols="2" class="pa-0 ma-0" align="end">
          <!-- Menu options button -->
          <v-menu close-on-click bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i" @click="log">
                <v-icon small left>{{ item.icon }}</v-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>

      <!-- Url inside block -->
      <div class="pb-2 px-2 pt-1" v-if="block.url">
        <linkPreview :url="block.url.value" :size="block.size ? block.size : 'medium' "></linkPreview>
      </div>

      <!-- Notes -->
      <div v-if="block.notes" class="px-4 pb-4">
        <div v-html="block.content" class="notes px-1"></div>
      </div>

      <!-- Listing of files -->
      <div v-if="block.files"></div>

      <!-- Listing of blocks -->
      <div v-if="block.task">
        <v-card-subtitle>{{ block.description }}</v-card-subtitle>
      </div>
    </v-card>
  </div>
</template>

<script>
import linkPreview from "../components/linkPreview";

export default {
  props: ["block"],

  components: {
    linkPreview
  },

  data() {
    return {
      items: [
        { title: "Edit", icon: "mdi-circle-edit-outline" },
        { title: "Delete", icon: "mdi-trash-can-outline" },
        { title: "Save", icon: "mdi-content-save-outline" }
      ]
    };
  },

  methods: {
    log() {}
  }
};
</script>

<style lang="scss" scoped>
/* Targetting the image tag with the v-html attribute */
.notes >>> img {
  width: 100%;
  height: auto;
}

.f-color {
  color: black;
}

.wd-break {
  /* Instead use this non-standard one: */
  word-break: break-word;
}

.sheet {
  background-color: rgba(151, 152, 153, 0.3);
}

#block {
  border-radius: 8px;
}

.block-title {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgb(184, 181, 181);
}

.v-card__subtitle {
  margin-top: -14px;
}

/* id is used when we have to apply CSS property to one attribute only. 
class is used when we have to use CSS property in 
many locations within the same page or different. */

/* Draggable styling */
.block-title {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: rgb(184, 181, 181);
}

.v-chip.v-chip--outlined.v-chip.v-chip {
  background-color: chartreuse;
}

#block {
  border-radius: 8px;
}

.v-card__subtitle {
  margin-top: -14px;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}

.scroll {
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 92vh;
}

::-webkit-scrollbar {
  height: 0.4rem;
  width: 0.4rem;
}

::-webkit-scrollbar-track {
  background: #1e1e24;
}

::-webkit-scrollbar-thumb {
  background: #1c0369;
}
</style>
