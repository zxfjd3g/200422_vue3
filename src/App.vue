<template>
  <h2>App</h2>
  fistName: <input v-model="user.firstName"><br>
  lastName: <input v-model="user.lastName"><br>
  fullName1: <input v-model="fullName1"><br>
  fullName2: <input v-model="fullName2"><br>
  fullName3: <input v-model="fullName3"><br>

</template>

<script lang="ts">
import { reactive } from 'vue'
/*
计算属性与监视
1. computed函数: 
  与computed配置功能一致
  只有getter
  有getter和setter
2. watch函数
  与watch配置功能一致
  监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
  默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
  通过配置deep为true, 来指定深度监视
3. watchEffect函数
  不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
  默认初始时就会执行第一次, 从而可以收集需要监视的数据
  监视数据发生变化时回调
*/

import {computed, watch, watchEffect, ref} from 'vue'

export default {

  setup () {

    const user = reactive({
      firstName: 'A',
      lastName: 'B'
    })

    // 计算属性: getter
    const fullName1 = computed(() => {
      console.log('fullName1 getter')
      return user.firstName + '-' + user.lastName
    })
    console.log(fullName1)

    // 计算属性: getter和setter
    const fullName2 = computed({
      get () {
        console.log('fullName2 getter')
        return user.firstName + '-' + user.lastName
      },
      set (value: string) {
        console.log('fullName2 setter')
        const names = value.split('-')
        user.firstName = names[0]
        user.lastName = names[1]
      }
    })
    
    const fullName3 = ref<string>('')
    // 监视指定的数据
    watch(user, ({firstName, lastName}) => {
      console.log('watch user')
      fullName3.value = firstName + '-' + lastName
    }, {immediate: true, deep: true})

    // 监视所有用的响应式数据
    watchEffect(() => {
      console.log('watchEffect')
      const names = fullName3.value.split('-')
      user.firstName = names[0]
      user.lastName = names[1]
    })


    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
}
</script>
