<template>
  <button v-if="showClearCompletedbButton" @click="clearCompleted">Clear Completed</button>
</template>

<script>
    export default {
        name: "TodoClearCompleted",
        props: {
          showClearCompletedbButton: {
           type: Boolean,
           required: true
          }
        },
      methods: {
        clearCompleted() {
          eventBus.$emit('clearCompletedTodos')
        }
      }
    }
</script>

<style scoped>

</style>
