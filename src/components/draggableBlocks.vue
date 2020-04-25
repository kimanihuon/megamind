<template>
  <div>
    <!-- Draggable dynamic cards -->
    <draggable
      :list="column[type]"
      v-bind="dragOptions"
      group="people"
      @change="log"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <v-row v-for="(block, idx) in column[type]" no-gutters class="pa-1 my-1" :key="idx + 0">
          <v-col cols="12">
            <v-sheet elevation="10" class="px-1">
              <!-- URL adder -->
              <div v-if="block.url" class="px-2 py-2">
                <!-- Whether a block is active or inactive -->
                <statuschips :column="column" :index="idx" :type="type"></statuschips>

                <!-- Title input -->
                <v-row no-gutters class="py-2">
                  <v-text-field
                    autocomplete="off"
                    v-model="block.name"
                    :hide-details="true"
                    label="Title"
                    outlined
                    dense
                  ></v-text-field>
                </v-row>

                <!-- Url input -->
                <v-row no-gutters class="py-2">
                  <v-text-field
                    autocomplete="off"
                    v-model="block.url.value"
                    outlined
                    dense
                    :hide-details="true"
                    label="Url"
                    type="text"
                  >
                    <!-- Appended icon -->
                    <template v-slot:append>
                      <v-fade-transition leave-absolute>
                        <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
                        <v-icon v-else>mdi-link-variant</v-icon>
                      </v-fade-transition>
                    </template>

                    <!-- <template v-slot:append-outer>
                        <v-btn icon @click="reloadUrl()">
                          <v-icon>mdi-reload</v-icon>
                        </v-btn>
                    </template>-->
                  </v-text-field>
                </v-row>

                <v-row no-gutters class="py-2">
                  <v-select
                    v-model="block.size"
                    dense
                    outlined
                    :hide-details="true"
                    :items="sizes"
                    label="Size"
                  ></v-select>
                </v-row>

                <!-- Remove block button -->
                <v-row no-gutters justify="center">
                  <v-btn icon @click="removeBlock(idx)">
                    <v-icon color="red">mdi-minus-circle-outline</v-icon>
                  </v-btn>
                </v-row>
              </div>

              <!-- Notes adder -->
              <div v-if="block.notes" class="px-2 py-2">
                <!-- Whether a block is active or inactive -->
                <statuschips :column="column" :index="idx" :type="type"></statuschips>

                <!-- Title input -->
                <v-row no-gutters class="py-2">
                  <v-text-field
                    v-model="block.name"
                    :hide-details="true"
                    label="Title"
                    outlined
                    dense
                  ></v-text-field>
                </v-row>

                <!-- Notes input -->
                <v-row no-gutters class="py-2">
                  <v-expansion-panels v-model="panel">
                    <v-expansion-panel>
                      <v-expansion-panel-header>Add your notes here</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <!-- Editor -->
                        <editor @input="set(idx, ...arguments)" class="white f-color"></editor>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row>

                <!-- Remove block button -->
                <v-row no-gutters justify="center">
                  <v-btn icon @click="removeBlock(idx)">
                    <v-icon color="red">mdi-minus-circle-outline</v-icon>
                  </v-btn>
                </v-row>
              </div>

              <!-- File adder -->
              <div v-if="block.files" class="px-2 py-2">
                <!-- Whether a block is active or inactive -->
                <statuschips :column="column" :index="idx" :type="type"></statuschips>

                <!-- Title input -->
                <v-row no-gutters class="py-2">
                  <v-text-field
                    v-model="block.name"
                    :hide-details="true"
                    label="Title"
                    outlined
                    dense
                  ></v-text-field>
                </v-row>
                <!-- Remove block button -->
                <v-row no-gutters justify="center">
                  <v-btn icon @click="removeBlock(idx)">
                    <v-icon color="red">mdi-minus-circle-outline</v-icon>
                  </v-btn>
                </v-row>
              </div>

              <!-- Task adder -->
              <div v-if="block.task" class="px-2 py-2">
                <!-- Whether a block is active or inactive -->
                <statuschips :column="column" :index="idx" :type="type"></statuschips>

                <!-- Title input -->
                <v-row no-gutters class="py-2">
                  <v-text-field
                    v-model="block.name"
                    :hide-details="true"
                    label="Title"
                    outlined
                    dense
                  ></v-text-field>
                </v-row>

                <!-- Title input -->
                <v-row no-gutters class="py-2">
                  <v-textarea
                    v-model="block.description"
                    :hide-details="true"
                    label="Description"
                    auto-grow
                    rows="1"
                    outlined
                    dense
                  ></v-textarea>
                </v-row>

                <!-- Remove block button -->
                <v-row no-gutters justify="center">
                  <v-btn icon @click="removeBlock(idx)">
                    <v-icon color="red">mdi-minus-circle-outline</v-icon>
                  </v-btn>
                </v-row>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
export default {};
</script>

<script>
import editor from "../components/Editor";
import draggable from "vuedraggable";
import statuschips from "../components/statusChips";
import blocksTemplate from "../components/blocksTemplate";
import trackstatuschips from "../components/trackStatusChips";

export default {
  props: ["column", "idx", "type"],

  components: {
    blocksTemplate,
    editor,
    draggable,
    statuschips,
    trackstatuschips
  },

  data() {
    return {
      index: this.idx,
      dialog: false,
      chips: {},
      edit: false,
      drag: false,
      selection: 0,
      panel: [0, 1],
      loading: false,
      sizes: ["large", "medium", "small"],
      tags: ["Url/Link", "Notes", "Files", "Task"],
      // column: {
      //   name: "Homework",
      //   active: true,
      //   blocks: []
      // },
      // Block template
      urlBlockTemplate: {
        name: "",
        url: { state: true, value: "https://" },
        active: true,
        size: "medium"
      },
      notesBlockTemplate: {
        name: "",
        notes: true,
        content: "",
        active: true
      },

      filesBlockTemplate: {
        name: "",
        files: true,
        active: true
      },

      taskBlockTemplate: {
        name: "",
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
      this.$emit('addBlock')
    },
    removeBlock(idx) {
      this.$emit('removeBlock', idx)
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
    idx(idx) {
      this.index = idx;
    }
  }
};
</script>

<style lang="css" scoped>
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


