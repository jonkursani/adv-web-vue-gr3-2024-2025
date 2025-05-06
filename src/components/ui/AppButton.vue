<script setup>
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <!--  v-bind="$attrs" => perdorimi i komplet atributeve te html ne komponentat e krijuara -->
  <!-- slot => placeholder per renderimin e kontentit mes tagjeve hapese dhe mbyllese te komponentes -->
  <button type="button" disabled v-if="isLoading" v-bind="$attrs">
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <slot/>
  </button>
  <button v-else v-bind="$attrs">
    <slot/>
  </button>
</template>

<style scoped>

</style>