<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodosStore } from "@/stores/todosStore.js";

const route = useRoute();
const router = useRouter();
const store = useTodosStore();
const todo = ref({});

// lifecycle methods
onMounted(() => {
  const todoFromDb = store.getTodoById(+route.params.id);
  //   console.log(todoFromDb);

  todo.value = todoFromDb.text;
});

const onUpdateTodo = () => {
  if (!todo.value) {
    alert("Please enter a todo");
    return;
  }

  store.updateTodo(+route.params.id, todo.value);
  router.push({ name: "todos" });
};
</script>

<template>
  <input type="text" v-model.trim="todo" placeholder="Update todo" @keyup.enter="onUpdateTodo" />
  <button @click="onUpdateTodo">Update</button>
</template>
