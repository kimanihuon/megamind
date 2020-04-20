<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters class="scroll" id="cscroll">
      <v-col
        v-for="(column, idx) in columns"
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
                v-for="(item) in column.items"
                :key="item.name"
                id="block"
                class="mx-auto mb-4"
                outlined
                text
              >
                <!-- Title -->
                <v-row no-gutters align="start">
                  <v-col cols="10" class="pa-0 ma-0">
                    <v-card-title
                      class="title py-0 pt-2 pr-0"
                      @dblclick="edit = true"
                      v-if="edit === false"
                    >{{ item.name }}</v-card-title>
                  </v-col>

                  <v-col cols="2" class="pa-0 ma-0" align="end">
                    <v-btn icon class="pt-2">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-card-subtitle>Listen to your favorite artists and albums.</v-card-subtitle>
              </v-card>
            </transition-group>
          </draggable>

          <!-- Add block button -->
          <v-row no-gutters justify="center">
            <v-btn large icon color="grey" @click="log(navDrawer)">
              <v-icon large>mdi-plus-circle-outline</v-icon>
            </v-btn>
          </v-row>
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

export default {
  name: "Dashboard",

  components: {
    draggable
  },

  data() {
    return {
      navDrawer: this.$store.state.navDrawer,
      chips: {},
      edit: false,
      drag: false,
      columns: JSON.parse(JSON.stringify(this.$store.state.dash.columns))
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
    commitChanges() {
      this.$store.commit("updateDashList", this.columns);
    }
  },

  mounted() {
    // console.log(this.$store.state.self)
  }
};
</script>

<style lang="scss" scoped>
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


