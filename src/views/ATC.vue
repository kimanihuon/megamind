<template>
  <v-container>
    <linkPreview url="https://twitter.com/benshapiro"></linkPreview>
    <br />
    <div id="dropzone">
      <form
        class="dropzone needsclick"
        id="demo-upload"
        action="/upload"
        enctype="multipart/form-data"
      >
        <div class="fallback">
          <input name="file" type="file" multiple />
        </div>
      </form>
    </div>
  </v-container>
</template>

<script>
import linkPreview from "../components/linkPreview";
import Dropzone from "dropzone/dist/dropzone";
import "dropzone/dist/dropzone.css";

export default {
  name: "atc",

  components: {
    linkPreview
  },

  data() {
    return {};
  },

  mounted() {
    // Dropzone class:
    /* eslint-disable */
    Dropzone.autoDiscover = false;
    var myDropzone = new Dropzone("#demo-upload", {
      url: "http://localhost:5555/upload"
    });
    myDropzone.on("complete", function(file) {
      myDropzone.removeFile(file);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>
