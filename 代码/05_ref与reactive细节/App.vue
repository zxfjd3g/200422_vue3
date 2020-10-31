<template>
  <h2>App</h2>
  <h3>{{m1}}</h3>
  <h3>{{m2}}</h3>
  <h3>{{m3}}</h3>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
/* 
ref与reactive
  是Vue3的 composition API中2个最重要的响应式API
  ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
  如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
  ref内部: 通过给value属性添加getter/setter来实现对数据的劫持
  reactive内部: 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
  ref的数据操作: 在js中要.value, 在模板中不需要(内部解析模板时会自动添加.value)
*/
export default {

  setup () {

    const m1 = ref('abc')
    const m2 = reactive({
      a: 'abc',
      b: {bb: 123}
    })

    // 如果交给ref的是对象, 会对对象进行reactive处理, ref的value值就是的一个proxy对象
    const m3 = ref({
      a: 'aaa',
      b: {bb: 333}
    })
    console.log(m3, m3.value.b)


    function update () {
      m1.value += '--'
      m2.b.bb++
      m3.value.b.bb++

    }

    return {
      m1,
      m2,
      m3,
      update,
    }
  }
}
</script>
