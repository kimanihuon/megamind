<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <!-- If tracks exists. Else -->
    <v-row no-gutters class="scroll" id="cscroll" v-if="tracks.length > 0">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dense dark color="indigo">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Track editor and preview</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save = !save">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card>
          <blockCreator :idx="dialogIndex" :track="dialogColumn" :save="save" @saved="trackSaved"></blockCreator>
        </v-card>
      </v-dialog>

      <!-- Image display dialog -->
      <v-dialog v-model="img">
        <v-img :src="this.image"></v-img>
      </v-dialog>

      <v-col
        v-for="(column, cidx) in editableTracks"
        :key="cidx"
        cols="12"
        sm="4"
        :md="navDrawer.state ? 4 : 3"
        class="py-4 px-4"
      >
        <!-- Card main card -->
        <v-card class="pa-2 sheet" elevation="0">
          <!-- Track header -->

          <!-- Active and archived blocks buttons -->
          <trackstatuschips :column="column" :index="cidx"></trackstatuschips>

          <!-- Track title -->
          <v-row no-gutters>
            <v-card-title class="py-0 pt-1 pb-2">{{ column.name }}</v-card-title>
          </v-row>

          <!-- Draggable active cards -->
          <draggable
            v-if="column.active"
            v-model="column.blocks"
            v-bind="dragOptions"
            :empty-insert-threshold="100"
            @change="log"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <div v-for="(block, bidx) in (column.blocks)" :key="bidx+0">
                <blocksTemplate :block="block"></blocksTemplate>
              </div>
            </transition-group>
          </draggable>

          <!-- Draggable Inactive cards -->
          <draggable
            v-if="!column.active"
            v-model="column.archived"
            v-bind="dragOptions"
            :empty-insert-threshold="100"
            @change="log"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <div v-for="(block, bidx) in (column.archived)" :key="bidx+0">
                <blocksTemplate :block="block"></blocksTemplate>
              </div>
            </transition-group>
          </draggable>

          <v-row justify="space-around" no-gutters>
            <!-- Edit multiple button -->
            <v-btn medium icon color="grey" @click="activateColumn(column, cidx)">
              <v-icon medium>mdi-pencil-box-multiple-outline</v-icon>
            </v-btn>

            <!-- Add one -->
            <!-- <v-btn medium icon color="grey" @click="addOne()">
              <v-icon medium>mdi-plus-circle-outline</v-icon>
            </v-btn> -->
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Get started button -->
    <v-row v-if="tracks.length < 1" no-gutters align="center" class="fill-height">
      <v-col align="center">
        <v-card flat max-width="500" color="transparent">
          <v-card-subtitle class="welcome">Create a track to get started</v-card-subtitle>
          <v-img src="@/assets/icons/people.svg" height="200" width="200"></v-img>
        </v-card>
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
import blockCreator from "../components/blocksCreator";
import blocksTemplate from "../components/blocksTemplate";
import trackstatuschips from "../components/trackStatusChips";

export default {
  name: "Dashboard",

  metaInfo: {
    title: "Dashboard and learning tracks",
    titleTemplate: "%s | Weskool learning path sharing",
    meta: [
      { charset: "utf-8" },
      { name: "description", content: "Weskool Login" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },

  components: {
    draggable,
    blockCreator,
    blocksTemplate,
    trackstatuschips
  },

  data() {
    return {
      image: "",
      img: false,
      save: false,
      dialog: false,
      dialogColumn: {},
      dialogIndex: 0,
      chipColor: "indigo",
      chipColorArchive: "red",
      chips: {},
      edit: false,
      drag: false,
      editableTracks: JSON.parse(JSON.stringify(this.$store.state.self.tracks)),
      tracks: this.$store.state.self.tracks,
      navDrawer: this.$store.state.navDrawer
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
    },
    trackSaved() {
      this.dialog = false;
    },
    activateColumn(column, idx) {
      this.dialogColumn = column;
      this.dialogIndex = idx;
      this.dialog = true;
    },
    addOne() {}
  },

  created() {
    window.onclick = e => {
      if (e.target.tagName === "IMG") {
        // console.log(e.target.src)
        this.image = e.target.src;
        this.img = true;
      }

      // console.log(e.target);
      // console.log(e.target.tagName);
    };
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "saveTrack" || mutation.type === "createTrack") {
        this.editableTracks = JSON.parse(JSON.stringify(state.self.tracks));
      }

      if (mutation.type === "deleteTrack") {
        console.log("boom");
        this.editableTracks = JSON.parse(JSON.stringify(state.self.tracks));
      }
    });
    // console.log(this.$store.state.self)
  },

  watch: {
    editableTracks: {
      deep: true,
      handler(change) {
        this.$store.commit("updateTracks", change);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.welcome {
  font-size: 20px;
}

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


