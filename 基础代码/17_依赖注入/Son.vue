<template>
  <h2>子组件</h2>
  <hr>
  <GrandSon/>
</template>

<script lang="ts">
import GrandSon from './GrandSon.vue'
export default {
  components: {
    GrandSon
  },
}
</script>