<template>
  <h2>App</h2>
  <button>更新</button>
</template>

<script lang="ts">
/*
toRef:
  为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
  区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
  应用: 当要将 某个prop 的 ref 传递给复合函数时，toRef 很有用
*/

import Child from './Child.vue'

export default {

  setup () {

    return {
      
    }
  },

  components: {
    Child
  }
}
</script>
