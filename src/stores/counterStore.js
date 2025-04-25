import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // state (variablat reaktive qe i deklaroni)
  const count = ref(0); // { value: 0}
  const message = ref("Pinia!");

  // actions (metoda qe i perdorim per te manipuluar state-in)
  function increment() {
    count.value++;
  }

  // getters (computed properties qe i perdorim per te marre vlera nga state-i)
  const doubleCount = computed(() => count.value * 2);
  const welcomeMessage = computed(() => `Learning Vue 3 with ${message.value}`);

  return {
    count,
    message,
    increment,
    doubleCount,
    welcomeMessage,
  };
});
