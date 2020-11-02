<template>
  <h2>App</h2>

  <input type="text">
  ---
  <input type="text" ref="inputRef">
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
/* 
ref获取元素: 利用ref函数获取组件中的标签元素
功能需求: 让输入框自动获取焦点
*/

export default {
  setup() {

    // 定义用来存储input标签的ref对象
    const inputRef = ref<HTMLElement|null>(null)

    // 初始显示后
    onMounted(() => {
      // 通过ref查找到input, 调用focus()获取焦点
      inputRef.value && inputRef.value.focus()
    })

    return {
      inputRef
    }
  },
}
</script>
