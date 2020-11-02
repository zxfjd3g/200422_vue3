<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>
      <Footer 
        :todos="todos" 
        :clearCompletedTodos="clearCompletedTodos" 
        :checkAll="checkAll"
      />
    </div>
  </div>
</template>


<script lang="ts">
  import Header from '@/components/Header.vue'
  import List from '@/components/List.vue'
  import Footer from '@/components/Footer.vue'
  import { saveTodos, readTodos } from '@/utils/storageUtils'
  import { onMounted, reactive, toRefs, watch } from 'vue'
  import { Todo } from './types/Todo'
  export default { // 配置对象

    setup () {

      // 定义响应式数据
      const state = reactive<{todos: Todo[]}>({
        todos: []
      })

      // 组件挂载后执行
      onMounted(() => {
        // 模拟异步读取数据
        setTimeout(() => {
          // 读取local中保存的todos, 更新数据
          state.todos = readTodos()
        }, 1000);
      })

      const addTodo = (todo: Todo) => {
        state.todos.unshift(todo)
      }

      const deleteTodo = (index: number) =>{
        state.todos.splice(index, 1)
      }

      const clearCompletedTodos = () => {
        state.todos = state.todos.filter((todo: Todo, index: number) => !todo.completed)
      }

      const checkAll = (isCheckAll: boolean) => {
        state.todos.forEach((todo: Todo) => todo.completed = isCheckAll)
      }

      const updateTodo = (todo: Todo, isCheck: boolean) => {
        todo.completed = isCheck
        console.log(state.todos)
      }


      // 监视
      // watch(() => state.todos, (value) => {
      //   saveTodos(value)
      // }, {deep: true})
      watch(() => state.todos, saveTodos, {deep: true})



      return {
        ...toRefs(state),
        addTodo,
        deleteTodo,
        clearCompletedTodos,
        checkAll,
        updateTodo
      }
    },

    components: {
      Header,
      List,
      Footer
    }
  }
</script>

<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>