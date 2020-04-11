<template>
    <v-content>
        <p> {{ self.username }} </p>
        <p> {{ self._id }} </p>
    </v-content>
</template>

<script>
export default {
    data(){
        return {
            self: this.$store.state.self
        }
    }
}
</script>
