<template>
  <h2>Child</h2>
  <h3>{{foo}}</h3>
  <h3>{{length}}</h3>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, toRef } from 'vue'

function useFeatureX(foo: Ref) {
  const lenth = computed(() => foo.value.length)

  return lenth
}

export default defineComponent({
  props: {
    foo: {
      type: Number,
      require: true
    }
  },

  setup (props, context) {

    // 将接收的某个prop转换为ref对象
    const length = useFeatureX(toRef(props, 'foo'))

    return {
      length
    }
  }
})
</script>
