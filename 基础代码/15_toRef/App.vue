<template>
  <h2>App</h2>
  <p>{{state}}</p>

  <button @click="update">更新</button>

  <Child/>
</template>

<script lang="ts">
/*
toRef:
  为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
  区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
  应用: 当要将某个 prop 的 ref 传递给复合函数时，toRef 很有用
*/

import {
  reactive,
  toRef,
  ref,
} from 'vue'
import Child from './Child.vue'

export default {

  setup () {

    const state = reactive({
      foo: 1,
      bar: 2
    })

    const update = () => {
      state.foo++
    }

    return {
      state,
      update,
    }
  },

  components: {
    Child
  }
}
</script>
