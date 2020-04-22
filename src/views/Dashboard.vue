<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <!-- If tracks exists. Else -->
    <v-row no-gutters class="scroll" id="cscroll" v-if="tracks.length > 0">
      <v-col
        v-for="(column, idx) in tracks"
        :key="idx"
        cols="12"
        sm="4"
        :md="navDrawer.state ? 4 : 3"
        class="py-4 px-4"
      >
        <!-- Card main card -->
        <v-card class="pa-2 sheet" elevation="0">
          <!-- Track header -->
          <!-- Active and archived blocks buttons -->
          <v-row no-gutters align="center">
            <!-- Active blocks button -->
            <v-chip
              class="my-2 mx-2"
              color="indigo"
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
              color="indigo"
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
            <v-btn icon @click="log(chips)">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-row>

          <!-- Track title -->
          <v-row no-gutters>
            <v-card-title class="py-0 pt-1 pb-2">{{ column.name }}</v-card-title>
          </v-row>

          <!-- Draggable cards -->
          <draggable
            :list="column.items"
            v-bind="dragOptions"
            group="people"
            @change="log"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <!-- Card one -->
              <v-card
                v-for="(task, idx) in column.items"
                :key="idx + 0"
                id="block"
                class="mx-auto mb-4"
                outlined
                text
              >
                <!-- Title -->
                <v-row no-gutters align="start">
                  <v-col cols="10" class="pa-0 ma-0">
                    <v-card-title
                      class="block-title py-0 pt-2 pr-0"
                      @dblclick="edit = true"
                      v-if="edit === false"
                    >{{ task.name }}</v-card-title>
                  </v-col>

                  <v-col cols="2" class="pa-0 ma-0" align="end">
                    <v-btn icon class="pt-2">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <div v-for="(item, idx) in task" :key="idx">
                  <!-- Url inside block -->
                  <div class="px-2 pb-2" v-if="item.url">
                    <linkPreview :url="item.url"></linkPreview>
                  </div>

                  <!-- Listing of files -->
                  <div v-if="item.files"></div>

                  <!-- Notes -->
                  <div v-if="item.notes"></div>
                </div>
              </v-card>
            </transition-group>
          </draggable>

          <v-row justify="space-around" no-gutters>
            <!-- Add multiple block/task button -->
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on }">
                <!-- Add block button -->
                <v-btn medium icon color="grey" v-on="on">
                  <v-icon medium>mdi-plus-circle-multiple-outline</v-icon>
                </v-btn>
              </template>
              <v-toolbar dense dark color="indigo">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Track editor and preview</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="dialog = false">Save</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card>
                <blockCreator></blockCreator>
              </v-card>
            </v-dialog>

            <!-- Add one -->
            <v-btn medium icon color="grey">
              <v-icon medium>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Get started button -->
    <v-row v-if="tracks.length < 1" no-gutters align="center" class="fill-height">
      <v-col align="center">
        <p>Create a track to get started</p>
      </v-col>
    </v-row>
  </v-container>

  <!-- <iframe
    v-if="item.src"
    width="280"
    height="147"
    src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>-->
</template>

<script>
import draggable from "vuedraggable";
import linkPreview from "../components/linkPreview";
import blockCreator from "../components/blocksCreator";

export default {
  name: "Dashboard",

  components: {
    draggable,
    linkPreview,
    blockCreator
  },

  data() {
    return {
      dialog: false,
      chips: {},
      edit: false,
      drag: false,
      trackState: this.$store.state.tracks,
      navDrawer: this.$store.state.navDrawer,
      tracks: []
    };
  },

  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "people",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },

  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    updateVal() {
      this.edit = false;
    }
  },

  mounted() {
    // console.log(this.$store.state.self)
  },

  watch: {
    trackState: function() {
      this.tracks = JSON.parse(JSON.stringify(this.trackState));
    }
  }
};
</script>

<style lang="scss" scoped>
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

.contain {
  margin-top: 10px;
  margin-bottom: 10px;
}

.sheet {
  background-color: rgba(151, 152, 153, 0.3);
}
</style>


