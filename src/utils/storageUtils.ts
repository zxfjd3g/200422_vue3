import { Todo } from '@/types/Todo'

/* 
数据存储的工具模块
*/
export function saveTodos(todos: Todo[]) {
  localStorage.setItem('todos_key', JSON.stringify(todos))
}

export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('todos_key') || '[]')
}
