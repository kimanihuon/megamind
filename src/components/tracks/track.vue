<template>
  <v-container fluid class="pa-0 ma-0 fill-height">
    <!-- If tracks exists. Else -->
    <v-row no-gutters class="scroll" id="cscroll" v-if="tracks.length > 0">
      <!-- User search dialog -->
      <v-dialog v-model="userSearchDialog" max-width="600px">
        <v-card class="px-2 pb-2">
          <shareHeader></shareHeader>
          <userSearch></userSearch>
          <userTable></userTable>
        </v-card>
      </v-dialog>

      <!-- Image display dialog -->
      <v-dialog v-model="img">
        <v-img :src="this.image"></v-img>
      </v-dialog>

      <!-- Card main card -->
      <v-card class="pa-2 sheet" elevation="0">
        <!-- Track header -->

        <!-- Active and archived blocks buttons -->
        <trackstatuschips
          :Public="true"
          :track="column"
          :index="index"
          @toggle="toggle(...arguments)"
          @share="share(...arguments)"
        ></trackstatuschips>

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
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import blocksTemplate from "@/components/blocksTemplate";
import trackstatuschips from "@/components/tracks/statusChipsPublic";
export default {
  props: ['column', 'index'],
  components: {
    draggable,
    blocksTemplate,
    trackstatuschips,
    userSearch: () =>
      import(
        /* webpackChunkName: "userSearch" */ "@/components/tracks/userSearch"
      ),
    userTable: () =>
      import(
        /* webpackChunkName: "userTable" */ "@/components/tracks/userTable"
      ),
    shareHeader: () =>
      import(
        /* webpackChunkName: "shareHeader" */ "@/components/tracks/shareHeader"
      )
  },
  data() {
    return {
      image: "",
      img: false,
      save: false,
      dialog: false,
      dialogColumn: {},
      userSearchDialog: false,
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
    toggle(args) {
      this.activateColumn(args.column, args.index);
    },
    activateColumn(column, idx) {
      this.dialogColumn = column;
      this.dialogIndex = idx;
      this.dialog = true;
    },
    share(track) {
      this.userSearchDialog = true;
      track;
    },
    log: function(evt) {
      window.console.log(evt);
    },
  }
};
</script>
