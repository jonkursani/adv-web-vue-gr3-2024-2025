<script setup>
import TheLayout from "@/components/ui/TheLayout.vue";
import AuthView from "@/views/auth/AuthView.vue";
import {useAuthStore} from "@/stores/authStore.js";

const authStore = useAuthStore();
</script>

<template>
  <auth-view v-if="!authStore.isLoggedIn"/>
  <the-layout v-else/>
</template>
