<script setup>
const newTodo = defineModel({ type: String });

const emit = defineEmits(["addTodo"]);

const onAddTodo = () => {
  emit("addTodo", newTodo);
};
</script>

<template>
  <input type="text" v-model.trim="newTodo" placeholder="Add new todo" @keyup.enter="onAddTodo" />
  <button @click="onAddTodo">+ Add</button>
</template>

<style scoped></style>
