<script setup>
import { ref, computed } from "vue";
import { useTodosStore } from "@/stores/todosStore.js";
import TodoItem from "./TodoItem.vue";
import AddTodo from "./AddTodo.vue";

// Todo List
// let todoId = 1;
// const newTodo = ref("");
// const todos = ref([
//   { id: todoId++, text: "Todo 1", completed: true },
//   { id: todoId++, text: "Todo 2", completed: false },
// ]);

// const onAddTodo = () => {
//   // if (newTodo.value.trim() === "") {
//   //   alert("Please enter a todo");
//   //   return;
//   // }

//   // "" => false => !false = true
//   // newTodo.value === "" || newTodo.value === null || newTodo.value === undefined
//   if (!newTodo.value) {
//     alert("Please enter a todo");
//     return;
//   }

//   todos.value.push({
//     id: todoId++,
//     text: newTodo.value,
//     completed: false,
//   });

//   newTodo.value = ""; // Clear the input field
// };

const store = useTodosStore();

const removeTodo = (id) => {
  // const index = todos.value.findIndex((todo) => todo.id === id);

  // todos.value = todos.value.filter((todo) => todo.id !== id);
  store.removeTodo(id);
};

const hideCompleted = ref(false);
const filteredTodos = computed(() => {
  // if (hideCompleted.value) {
  //   return todos.value.filter((todo) => !todo.completed);
  // } else {
  //   return todos.value;
  // }

  // nese hideCompleted === true ateher renderoj vetem todos qe nuk jon completed
  return hideCompleted.value ? store.todos.filter((todo) => !todo.completed) : store.todos;
});

// const toggleTodo = (id) => {
//   const todo = todos.value.find((todo) => todo.id === id);
//   if (todo) {
//     todo.completed = !todo.completed;
//   }
// };
</script>

<template>
  <!-- Todo List -->
  <h3>Todo List</h3>

  <!-- <add-todo v-model="newTodo" @add-todo="onAddTodo" /> -->
  <router-link :to="{ name: 'add-todo' }">Add new Todo</router-link>

  <!-- {{ newTodo }} -->

  <ul v-if="filteredTodos.length">
    <todo-item v-for="todo in filteredTodos" :key="todo.id" :todo="todo" @remove-todo="removeTodo" />
  </ul>
  <p v-else>No todos</p>

  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? "Show all" : "Hide completed" }}
  </button>
</template>

<style scoped></style>
