<template>
  <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="isComplete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>
/* 
1. 绑定事件监听
2. 设计数据
3. 在监听回调中, 更新数据
 */
<script lang="ts">
import { Todo } from '@/types/todo';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  props: { // 声明属性的属性名和属性值的类型
    todo: {
      type: Object as () => Todo,  // 断言为函数返回的类型
      required: true
    },
    deleteTodo: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    updateTodo: {
      type: Function,
      required: true
    }
  },


  setup ({
    todo,
    index,
    deleteTodo,
    updateTodo
  }) {
    
    const bgColor = ref('white')
    const isShow = ref(false)

    // 计算属性
    const isComplete = computed({
      get () {
        return todo.completed
      },
      set (value) {
        updateTodo(todo, value)
      }
    })

    function handleEnter (isEnter: boolean) {
      if (isEnter) {
        bgColor.value = '#aaaaaa',
        isShow.value = true
      } else {
        bgColor.value = '#ffffff',
        isShow.value = false
      }
    }

    function deleteItem () {
      if (window.confirm('确定删除吗?')) {
        deleteTodo(index)
      }
    }

    return {
      bgColor,
      isShow,
      isComplete,
      handleEnter,
      deleteItem
    }
  },

})

</script>

<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
