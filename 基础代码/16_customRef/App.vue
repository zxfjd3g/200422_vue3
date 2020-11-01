<template>
  <h2>App</h2>
  <input v-model="keyword" placeholder="搜索关键字"/>
  <p>{{keyword}}</p>
</template>

<script lang="ts">
import { ref } from 'vue'
/*
customRef:
  创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制

需求: 自定义 ref 实现 debounce
*/
export default {

  setup () {
    const keyword = ref('')

    return {
      keyword
    }
  },
}
</script>
