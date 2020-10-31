<template>
  <h2>App</h2>
  <p>msg: {{msg}}</p>
  <button @click="msg += '--'">更新</button>

  <hr>

  <Child :msg="msg" msg2="bbb" @fn="fn">
    <!-- <template v-slot:test>
      <span>aaaaaa</span>
    </template> -->
  </Child>

 

</template>

<script lang="ts">
import { ref } from 'vue'
import Child from './child.vue'
export default {
  setup () {

    const msg = ref('abc')

    function fn(content: string) {
      msg.value += content
    }

    return {
      msg,
      fn
    }
  },

  components: {
    Child
  }
}
</script>
