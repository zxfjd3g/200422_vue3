<template>
  <Suspense>
    <template #default>
      <!-- <AsyncComp/> -->
      <AsyncAddress/>
    </template>
    <template v-slot:fallback>
      <h1>LOADING...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
/* 
异步组件 + Suspense组件
*/
import AsyncComp from './AsyncComp.vue'
import AsyncAddress from './AsyncAddress.vue'
// const AsyncComp = defineAsyncComponent(() => import('./AsyncComp.vue'))
export default {
  setup() {
    return {
     
    }
  },

  components: {
    AsyncComp,
    AsyncAddress
  }
}
</script>