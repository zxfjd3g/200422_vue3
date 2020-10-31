<template>
  <h1>父组件</h1>
  <button>红</button>
  <button>黄</button>
  <button>蓝</button>
  
</template>

<script lang="ts">
import Son from './Son.vue'
export default {
  name: 'ProvideInject',
  components: {
    Son
  },
  setup() {
    
    return {
    }
  }
}
</script>
