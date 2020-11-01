<template>
  <h2>{{state}}</h2>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
/* 
toRaw: 
  得到reactive代理对象的目标数据对象
markRaw: 
  标记一个对象，使其永远不会转换为代理。返回对象本身
  应用场景:
    有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
    当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。
*/
import {
  reactive, 
  toRaw,
  markRaw,
} from 'vue'
export default {
  setup () {
    const state = reactive<any>({
      name: 'tom',
      age: 25,
    })

    const testToRaw = () => {
    }

    const testMarkRaw = () => {
    }

    return {
      state,
      testToRaw,
      testMarkRaw,
    }
  }
}
</script>
