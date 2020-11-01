<template>
  <h2>App</h2>
  <h3>foo: {{state.foo}}</h3>
  <h3>foo: {{state.foo}}</h3>


</template>

<script lang="ts">
import { reactive } from 'vue'
/*
toRefs:
  将响应式对象中所有属性包装为ref对象, 并返回包含这些ref对象的普通对象
  应用: 当从合成函数返回响应式对象时，toRefs 非常有用，
        这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
*/
export default {

  setup () {

    const state = reactive({
      foo: 'a',
      bar: 'b',
    })

    return {
      state
    }
  },
}

</script>
