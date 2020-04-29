<template>
  <v-container>
    <div id="dropzone">
      <form class="dropzone needsclick" id="demo-upload" enctype="multipart/form-data">
        <div class="dz-message needsclick">
          <v-col>
            <v-icon large>mdi-cloud-upload</v-icon>
            <p>Drop files here or click to upload.</p>
          </v-col>
        </div>
      </form>
    </div>
  </v-container>
</template>

<script>
import Dropzone from "dropzone/dist/dropzone";
import "dropzone/dist/dropzone.css";

export default {
  name: "atc",

  metaInfo: {
    title: "ATC",
    titleTemplate: "%s | Weskool learning path sharing",
    meta: [
      { charset: "utf-8" },
      { name: "description", content: "Weskool Login" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },

  components: {},

  data() {
    return {};
  },

  mounted() {
    // Dropzone class:
    /* eslint-disable */
    Dropzone.autoDiscover = false;

    var dropzone = new Dropzone("#demo-upload", {
      paramName: "file",
      maxFiles: 10,
      maxFilesize: 20,
      url: "http://localhost:6443/upload",
      withCredentials: true,
      addRemoveLinks: true
    });

    dropzone.on("success", function(file, resp) {
      // console.log(resp)
    });

    dropzone.on("addedfile", function(file) {
      //
    });

    dropzone.on("removedfile", function(file) {
      //
    });
  }
};
</script>

<style lang="scss" scoped>
.dropzone {
  background: rgb(109, 102, 102);
  border-radius: 5px;
  border: 2px dashed rgb(0, 135, 247);
  border-image: none;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
</style>
