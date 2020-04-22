<template>
  <div>
    <VueEditor v-model="content" class="edicol"></VueEditor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor/dist/vue2-editor.core.js";

export default {
  components: { VueEditor },

  data() {
    return {
      content: "",
    };
  },
  
  watch: {
    content(value) {
      this.$emit('input', value)
    }
  }

};
</script>

<style lang="scss">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.bubble.css";
@import "~quill/dist/quill.snow.css";

// [class^="ql-"] {
//   color: aqua;
// }

</style>

