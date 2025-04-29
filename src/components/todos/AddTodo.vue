<script setup>
import { useTodosStore } from "@/stores/todosStore.js";
import { useRouter } from "vue-router";

const newTodo = defineModel({ type: String });

const emit = defineEmits(["addTodo"]);

const store = useTodosStore();

const router = useRouter();

const onAddTodo = () => {
  // emit("addTodo", newTodo);

  if (!newTodo.value) {
    alert("Please enter a todo");
    return;
  }

  store.addTodo(newTodo.value);
  newTodo.value = "";
  router.push({ name: "todos" });
};
</script>

<template>
  <input type="text" v-model.trim="newTodo" placeholder="Add new todo" @keyup.enter="onAddTodo" />
  <button @click="onAddTodo">+ Add</button>
</template>

<style scoped></style>
