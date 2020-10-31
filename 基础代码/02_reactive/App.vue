<template>
  <h2>name: ???</h2>
  <h2>age: ???</h2>
  <h2>wife: ???</h2>
  <hr>
  <button>更新</button>
</template>

<script lang="ts">
/* 
reactive: 
  作用: 定义多个数据的响应式
  const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
  响应式转换是“深层的”：会影响对象内部所有嵌套的属性
  内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
*/
export default {
  
}
</script>
