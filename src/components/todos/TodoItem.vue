<script setup>
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

const onToggleTodo = (id) => {
  emit("toggleTodo", id);
};
</script>

<template>
  <li>
    <input type="checkbox" :checked="todo.completed" @change="onToggleTodo(todo.id)" />
    <span :class="{ completed: todo.completed }">({{ todo.id }}): {{ todo.text }}</span>
    <button @click="onRemoveTodo(todo.id)">X</button>
  </li>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
  color: green;
}
</style>
