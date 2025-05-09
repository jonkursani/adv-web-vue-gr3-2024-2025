<script setup>
import { useCounterStore } from "@/stores/counterStore";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const userId = route.params.id;
// const { params } = useRoute();
// const userId = params.id;

// router-link nuk mundeni me perdor ne skripte
const router = useRouter();
const goToHome = () => {
  //   router.push("/"); // nese navigoni me path
  router.push({ name: "home" }); // nese navigoni me name
};

// state
const store = useCounterStore();
</script>

<template>
  <h1>User view</h1>
  <!-- $route variablen globale e keni te qashme vetem ne HTML jo ne skripte -->
  <!-- <p>User id: {{ $route.params.id }}</p> -->
  <p>User id: {{ userId }}</p>

  <!-- <router-link :to="{ name: 'home' }">Go to Home</router-link> -->
  <button @click="goToHome">Go to Home</button>

  <h2>{{ store.welcomeMessage }}</h2>
  <p>Counter: {{ store.count }}</p>
  <p>Double counter: {{ store.doubleCount }}</p>
  <button @click="store.increment">Increment</button>


</template>
