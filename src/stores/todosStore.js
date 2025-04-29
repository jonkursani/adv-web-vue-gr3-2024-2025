import { defineStore } from "pinia";
import { ref } from "vue";

export const useTodosStore = defineStore("todos", () => {
  // Todo List
  let todoId = 1;
  const todos = ref([
    { id: todoId++, text: "Todo 1", completed: true },
    { id: todoId++, text: "Todo 2", completed: false },
  ]);

  // action
  const addTodo = (newTodo) => {
    todos.value.push({
      id: todoId++,
      text: newTodo,
      completed: false,
    });
  };

  const removeTodo = (id) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const getTodoById = (id) => {
    return todos.value.find((todo) => todo.id === id);
  };

  const updateTodo = (id, text) => {
    const todo = todos.value.find((todo) => todo.id === id);
    console.log(todo);

    if (todo) {
      todo.text = text;
    }
  };

  return { todos, addTodo, removeTodo, getTodoById, updateTodo };
});
