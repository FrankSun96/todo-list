<template>
  <div>
    <label><input type="checkbox" :checked="!anyRemaining" @change="allChecked">Check All</label>
  </div>
</template>

<script>
    export default {
        name: "TodoCheckAll",
        props: {
          anyRemaining: {
            type: Boolean,
            require: true
          }
        },
        methods: {
          allChecked() {
            eventBus.$emit('checkAllChanged')
          }
        }

    }
</script>

<style scoped>

</style>
