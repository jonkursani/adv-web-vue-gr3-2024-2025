<script setup>
import {onErrorCaptured} from "vue";
import {useAppToast} from "@/composables/useAppToast.js";

const {showError} = useAppToast()

onErrorCaptured((err) => {
  // console.error('Error captured in ErrorBoundary:', err);
  // Handle the error, e.g., log it or show a notification

  showError(err.response?.data?.message || 'An error occurred')

  return false; // Returning false allows the error to propagate further
});
</script>

<template>
  <slot/>
</template>

<style scoped>

</style>