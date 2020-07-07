<template>
  <v-container fluid>
    <v-row no-gutters class="pa-4">
      <!-- Saving dialog -->
      <v-dialog v-model="saving" hide-overlay persistent width="300">
        <v-card color="indigo" dark>
          <v-card-text>
            Saving ...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- Blocks input -->
      <v-col cols="12" sm="6">
        <v-card class="pa-2 mx-2 sheet">
          <trackstatuschips :column="column" :index="index"></trackstatuschips>

          <!-- Track title editor -->
          <v-row no-gutters class="pa-1 my-1">
            <v-col cols="12">
              <v-sheet elevation="10" class="px-1">
                <div class="px-2 py-2">
                  <!-- Title text input -->
                  <v-row no-gutters class="py-2">
                    <v-text-field
                      v-model="column.name"
                      :hide-details="true"
                      label="Track title"
                      outlined
                      dense
                    ></v-text-field>
                  </v-row>
                </div>
              </v-sheet>
            </v-col>
          </v-row>

          <!-- Draggable active blocks -->
          <previewDraggableBlocks
            v-if="column.active"
            :column="column"
            :idx="idx"
            :type="'blocks'"
            @addBlock="addBlock"
            @removeBlock="removeBlock(...arguments)"
          ></previewDraggableBlocks>

          <!-- Draggable archived blocks -->
          <previewDraggableBlocks
            v-if="!column.active"
            :column="column"
            :idx="idx"
            :type="'archived'"
            @addBlock="addBlock"
            @removeBlock="removeBlock(...arguments)"
          ></previewDraggableBlocks>

          <!-- Block type Selector -->
          <v-row no-gutters class="pa-1 mt-2">
            <v-col cols="12">
              <v-sheet elevation="10" class="py-2 px-1">
                <v-chip-group v-model="selection" mandatory active-class="primary--text">
                  <v-row no-gutters justify="space-around">
                    <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
                  </v-row>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>

          <!-- Add block -->
          <v-row no-gutters justify="center" class>
            <v-btn medium icon color="grey" @click="addBlock()">
              <v-icon medium>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>

      <!-- Preview -->
      <v-col cols="12" sm="6">
        <!-- Preview -->
        <v-card class="pa-2 mx-2 sheet" elevation="0">
          <trackstatuschips :column="column" :index="index"></trackstatuschips>

          <!-- Track title -->
          <v-row no-gutters>
            <v-card-title class="py-0 pt-1 pb-2 wd-break">{{ column.name }}</v-card-title>
          </v-row>

          <!-- Display active blocks -->
          <div v-if="column.active">
            <div v-for="(block, idx) in column.blocks" :key="idx">
              <blocksTemplate :block="block"></blocksTemplate>
            </div>
          </div>

          <!-- Display archived blocks -->
          <div v-if="!column.active">
            <div v-for="(block, idx) in column.archived" :key="idx">
              <blocksTemplate :block="block"></blocksTemplate>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import blocksTemplate from "../components/blocksTemplate";
import trackstatuschips from "../components/trackStatusChips";
import previewDraggableBlocks from "../components/draggableBlocks";
import apiClient from "../controllers/api";

export default {
  props: ["save", "track", "idx"],

  components: {
    blocksTemplate,
    trackstatuschips,
    previewDraggableBlocks
  },

  data() {
    return {
      column: JSON.parse(JSON.stringify(this.track)),
      index: this.idx,
      dialog: false,
      chips: {},
      edit: false,
      drag: false,
      selection: 0,
      loading: false,
      saving: false,
      sizes: ["large", "medium", "small"],

      // Remember maybe file
      tags: ["Url/Link", "Notes", "Task"],
      // column: {
      //   name: "Homework",
      //   active: true,
      //   blocks: []
      // },
      // Block template
      urlBlockTemplate: {
        name: "Title",
        url: { state: true, value: "https://www.youtube.com/watch?v=jNQXAC9IVRw" },
        active: true,
        size: "medium"
      },
      notesBlockTemplate: {
        name: "Title",
        notes: true,
        content: "",
        active: true,
        expandedEditor: false
      },

      filesBlockTemplate: {
        name: "Title",
        files: true,
        active: true
      },

      taskBlockTemplate: {
        name: "Title",
        description: "",
        task: true,
        active: true
      }
    };
  },

  methods: {
    set(idx, val) {
      this.column.blocks[idx].content = val;
    },
    addBlock() {
      var type;
      var block;

      if (this.column.active) {
        type = "blocks";
      } else {
        type = "archived";
      }

      if (this.selection == 0) {
        // Url selection
        block = JSON.parse(JSON.stringify(this.urlBlockTemplate));
        this.column[type].push(block);
      } else if (this.selection == 1) {
        // Notes selection
        block = JSON.parse(JSON.stringify(this.notesBlockTemplate));
        this.column[type].push(block);
      } else if (this.selection == 2) {
        // Docs selection
        block = JSON.parse(JSON.stringify(this.filesBlockTemplate));
        this.column[type].push(block);
      } else if (this.selection == 3) {
        // Files selection
        block = JSON.parse(JSON.stringify(this.taskBlockTemplate));
        this.column[type].push(block);
      }
    },
    removeBlock(idx) {
      var type;
      if (this.column.active) {
        type = "blocks";
      } else {
        type = "archived";
      }
      this.column[type].splice(idx, 1);
    },
    log: function(evt) {
      window.console.log(evt);
    }
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

  watch: {
    save() {
      apiClient.save(this, window);
    },
    track(track) {
      this.column = JSON.parse(JSON.stringify(track));
    },
    idx(idx) {
      this.index = idx;
    }
  }
};
</script>

<style lang="css" scoped>
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

