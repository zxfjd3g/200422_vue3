<template>
  <h2>name: {{user.name}}</h2>
  <h2>age: {{user.age}}</h2>
  <h2>wife: {{user.wife}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive } from 'vue'
/* 
reactive: 
  作用: 定义多个数据的响应式
  const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
  响应式转换是“深层的”：会影响对象内部所有嵌套的属性
  内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
*/
export default {
  setup () {

    const obj = {
      name: 'tom',
      age: 23,
      wife: {
        name: 'marry',
        age: 20
      }
    }

    // reactive返回一个代理对象, 内部管理的是被代理对象(也就是包含多个属性数据的对象)
    const user = reactive(obj)

    console.log(user)

    function update () {
      // 必须通过代理对象来更新目标对象的数据 ==> 界面更新
      // user.name += '--'
      // user.age += 1
      user.wife.name += '++'  // 对象中所有层次的属性都是响应式的


      // 直接更新原始对象的数据 ==> 不会自动更新界面
      // obj.name += '---'
    }


    return {
      user,
      update,
    }
  }
}
</script>
