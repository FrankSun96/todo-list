<template>
  <button v-if="showClearCompletedbButton" @click="clearCompleted">Clear Completed</button>
</template>

<script>
    export default {
        name: "TodoClearCompleted",
        computed: {
          showClearCompletedbButton() {
            return this.$store.getters.showClearCompletedbButton
          }
        },
      methods: {
        clearCompleted() {
          this.$store.dispatch('clearCompleted')
        }
      }
    }
</script>

<style scoped>

</style>
