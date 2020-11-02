<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span>
      <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" v-show="completeSize>0" @click="clearCompletedTodos">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { Todo } from '@/types/todo'
import { computed, toRef } from 'vue'
  export default {
    props: {
      todos: {
        type: Array as () => Todo[],
        required: true
      },
      clearCompletedTodos: {
        type: Function,
        required: true
      },
      checkAll: {
        type: Function,
        required: true
      },
    },

    setup (props) { // 尽量不要解构props中的数据使用
      const completeSize = computed(() => {
        return props.todos.reduce((preTotal, todo, index) => preTotal + (todo.completed ? 1 : 0), 0)
      })

      const isCheckAll = computed({
        get () {
          return props.todos.length === completeSize.value && completeSize.value>0
        },
        
        set (value) {
          props.checkAll(value)
        }
      })

      return {
        completeSize,
        isCheckAll
      }
    },
  }
</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
