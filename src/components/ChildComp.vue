<script setup>
// Komunikimi prej comp prind ne comp child behet me props
// defineProps(["name", "age"]);
// Mrena skriptes duhet me ju referu props me props.name dhe props.age
// ne template mundesh me i referu direkt si name dhe age ose user.name dhe user.age
// defineProps({
//   name: String,
//   age: Number,
// });
// defineProps({
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     default: 25,
//   },
// });

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// Komunikimi prej comp child ne comp prind behet me emit (event)
const emit = defineEmits(["childEvent"]);

const onClick = () => {
  //   emit("childEvent", "Hello from child component");
  //   emit("childEvent", 1);
  // emit("childEvent", { name: "Filan", age: 25 });
  emit("childEvent", props.user.name);
};
</script>

<template>
  <!-- <h3>Hello from child component</h3> -->
  <!-- <h3>Hello {{ name || "Filan" }} is {{ age || 25 }} years old</h3> -->
  <!-- <h3>Hello {{ name }} is {{ age }} years old</h3> -->
  <h3>Hello {{ user.name }} is {{ user.age }} years old</h3>

  <!-- 
    Parametri i pare eventi qe e keni definu ne defineEmits
    Parametri 2 vlera qe doni me dergu te comp prindi
  -->
  <!-- <button @click="emit('childEvent', 'Hello from child component')">Click</button> -->
  <button @click="onClick">Click</button>
</template>

<style scoped></style>
