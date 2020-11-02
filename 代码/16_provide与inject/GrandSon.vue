<template>
  <h3 :style="{color}">孙子组件: {{color}}</h3>
  
</template>

<script lang="ts">
import { inject } from 'vue'
export default {
  setup() {
    // 注入父辈组件提供的数据
    const color = inject('color')

    return {
      color
    }
  }
}
</script>