<template>
  <v-container fluid>
    <v-row no-gutters class="pa-4">
      <!-- Blocks input -->
      <v-col cols="12" sm="6">
        <v-card class="pa-2 mx-2 sheet">
          <!-- Draggable dynamic cards -->
          <draggable
            :list="column.blocks"
            v-bind="dragOptions"
            group="people"
            @change="log"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <v-row
                v-for="(block, idx) in column.blocks"
                no-gutters
                class="pa-1 my-1"
                :key="idx + 0"
              >
                <v-col cols="12">
                  <v-sheet elevation="10" class="px-1">
                    <!-- URL adder -->
                    <div v-if="block.url" class="px-2 py-2">
                      <!-- Whether a block is active or inactive -->
                      <statuschips :column="column" :index="idx"></statuschips>

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
                              <v-progress-circular
                                v-if="loading"
                                size="24"
                                color="info"
                                indeterminate
                              ></v-progress-circular>
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
                      <statuschips :column="column" :index="idx"></statuschips>

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
                              <editor @input="set" class="white f-color"></editor>
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
                      <statuschips :column="column" :index="idx"></statuschips>

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
                      <statuschips :column="column" :index="idx"></statuschips>

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
        <v-card class="pa-2 mx-2 sheet" elevation="0">
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
            <v-card-title class="py-0 pt-1 pb-2 wd-break">{{ column.name }}</v-card-title>
          </v-row>

          <!-- Blocks start -->
          <v-card
            id="block"
            class="mb-4"
            v-for="(block, idx) in column.blocks"
            :key="idx"
            elevation="10"
          >
            <!-- Title -->
            <v-row no-gutters align="start">
              <v-col cols="10" class="pa-0 ma-0">
                <v-card-title class="block-title py-0 pt-2 pb-2 pr-0 wd-break">{{ block.name }}</v-card-title>
              </v-col>

              <v-col cols="2" class="pa-0 ma-0" align="end">
                <v-btn icon class="pt-2">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- Url inside block -->
            <div class="pb-2" v-if="block.url">
              <linkPreview :url="block.url.value" :size="block.size ? block.size : 'medium' "></linkPreview>
            </div>

            <!-- Notes -->
            <div v-if="block.notes" class="px-4 pb-4">
              <div v-html="content" class="notes px-1"></div>
            </div>

            <!-- Listing of files -->
            <div v-if="block.files"></div>

            <!-- Listing of blocks -->
            <div v-if="block.task">
              <v-card-subtitle>{{ block.description }}</v-card-subtitle>
            </div>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import linkPreview from "../components/linkPreview";
import editor from "../components/Editor";
import draggable from "vuedraggable";
import statuschips from "../components/statusChips";

export default {
  name: "Settings",

  components: {
    linkPreview,
    editor,
    draggable,
    statuschips
  },

  data() {
    return {
      dialog: false,
      chips: {},
      edit: false,
      drag: false,
      content: "",
      blocks: [],
      selection: 0,
      gg: false,
      loading: false,
      panel: [0, 1],
      sizes: ["large", "medium", "small"],
      tags: ["Url/Link", "Notes", "Files", "Task"],
      column: {
        name: "Homework",
        active: true,
        blocks: []
      },
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
    set(val) {
      this.content = val;
    },
    addBlock() {
      /* eslint-disable */
      if (this.selection == 0) {
        // Url selection
        var block = JSON.parse(JSON.stringify(this.urlBlockTemplate));
        this.column.blocks.push(block);
      } else if (this.selection == 1) {
        // Notes selection
        var block = JSON.parse(JSON.stringify(this.notesBlockTemplate));
        this.column.blocks.push(block);
      } else if (this.selection == 2) {
        // Docs selection
        var block = JSON.parse(JSON.stringify(this.filesBlockTemplate));
        this.column.blocks.push(block);
      } else if (this.selection == 3) {
        // Files selection
        var block = JSON.parse(JSON.stringify(this.taskBlockTemplate));
        this.column.blocks.push(block);
      }
    },
    removeBlock(idx) {
      this.column.blocks.splice(idx, 1);
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

