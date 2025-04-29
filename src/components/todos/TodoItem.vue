<script setup>
import { useRouter } from "vue-router";

defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["removeTodo", "toggleTodo"]);

const onRemoveTodo = (id) => {
  emit("removeTodo", id);
};

// const onToggleTodo = (id) => {
//   emit("toggleTodo", id);
// };

const router = useRouter();

const goToUpdateTodo = (id) => {
  router.push({ name: "update-todo", params: { id } });
};
</script>

<template>
  <li>
    <!-- <input type="checkbox" :checked="todo.completed" @change="onToggleTodo(todo.id)" /> -->
    <input type="checkbox" v-model="todo.completed" />
    <span :class="{ completed: todo.completed }">({{ todo.id }}): {{ todo.text }}</span>
    <button @click="goToUpdateTodo(todo.id)">🖋️</button>
    <button @click="onRemoveTodo(todo.id)">❌</button>
  </li>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: green;
}
</style>
