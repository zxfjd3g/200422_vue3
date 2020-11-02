<template>
  <h2>{{state}}</h2>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
</template>

<script lang="ts">
/* 
toRaw: 得到reactive代理对象的目标数据对象
*/
import {
  markRaw,
  reactive, toRaw,
} from 'vue'

interface UserInfo {
  name: string;
  age: number;
  likes?: string[]
}
export default {
  setup () {
    const state = reactive<UserInfo>({
      name: 'tom',
      age: 25,
    })

    const testToRaw = () => {
      const user = toRaw(state)
      console.log(user)
      user.name += '--'
    }

    const testMarkRaw = () => {
      const likes = ['a', 'b']  
      // state.likes = likes
      state.likes = markRaw(likes) // 如果数组内部数据后面不会再有修改
      setTimeout(() => {
        if (state.likes) {
          state.likes[0] += '--'
        }
      }, 1000)
    }

    return {
      state,
      testToRaw,
      testMarkRaw,
    }
  }
}
</script>