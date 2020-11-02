<template>
  <h2>App</h2>
  <h3>bar: {{bar}}</h3>
  <h3>foo: {{foo}}</h3>
  <h3>bar2: {{bar2}}</h3>
  <h3>foo2: {{foo2}}</h3>


</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
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

    const stateAsRefs = toRefs(state)   // {foo: ref对象, bar: ref对象}
    console.log(stateAsRefs)

    const {foo2, bar2} = useFeatureX()

    setTimeout(() => {
      state.foo += '--'
      bar2.value += '++'
    }, 2000)

    return {
      // ...state   // 不是响应式
      // foo: 'a',
      // bar: 'b'
      ...stateAsRefs,
      foo2, 
      bar2
    }
  },
}

function useFeatureX () {
  const state = reactive({
    foo2: 'a2',
    bar2: 'b2',
  })

  return {
    ...toRefs(state)
  }
}

</script>
