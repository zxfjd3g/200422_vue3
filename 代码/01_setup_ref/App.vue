<template>
  <h2>App</h2>
  <!-- 模板中会自动读取ref对象的value值显示 -->
  <h2>count: {{count}}</h2>
  <button @click="update">更新</button>
  <button @click="count += 2">更新2</button>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'App',
  /* 
  setup
  - 新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
  - 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用

  ref
  - 作用: 定义一个数据的响应式
  - 语法: const xxx = ref(initValue): 
    - 创建一个包含响应式数据的引用(reference)对象
    - js中操作数据: xxx.value
    - 模板中操作数据: 不需要.value
  - 一般用来定义一个基本类型的响应式数据
  */
  setup () {
    console.log('setup')

    // 定义一个包含基本类型的响应式引用对象
    const count = ref(1)

    console.log(count)

    // 更新数据的函数
    function update () {
      // 更新引用对象内的value数据 ==> 界面会自动更新
      count.value++
    }

    return {
      count,
      update
    }
  }
}
</script>
