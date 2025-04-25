# 📦 Vue 3 + Pinia Setup Store Example

This is a complete example of how to use Pinia with Vue 3 Composition API using the `setup store` syntax.

## 🛠 Technologies Used

- Vue 3
- Pinia (for state management)
- Script Setup syntax
- Composition API

## 📁 Project Structure

```
src/
├── stores/
│   └── counterStore.js
├── components/
│   └── CounterPanel.vue
├── App.vue
└── main.js
```

---

## 🧩 1. Install Pinia

```bash
npm install pinia
```

---

## ⚙️ 2. Setup in `main.js`

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

---

## 🧠 3. Store: `stores/counterStore.js`

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Vue Enthusiast')

  const doubleCount = computed(() => count.value * 2)
  const welcomeMessage = computed(() => `Hello, ${name.value}!`)

  function increment() {
    count.value++
  }

  function reset() {
    count.value = 0
  }

  async function incrementAsync() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    count.value++
  }

  return {
    count,
    name,
    doubleCount,
    welcomeMessage,
    increment,
    reset,
    incrementAsync
  }
})
```

---

## 🧪 4. Component Example: `components/CounterPanel.vue`

```vue
<template>
  <div class="counter-panel">
    <h2>{{ welcomeMessage }}</h2>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="incrementAsync">Increment Async</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counterStore'

const { count, doubleCount, welcomeMessage, increment, reset, incrementAsync } = useCounterStore()
</script>

<style scoped>
.counter-panel {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
```

---

## 🏠 5. Main App: `App.vue`

```vue
<template>
  <div class="app">
    <h1>Pinia + Vue 3 Demo</h1>
    <CounterPanel />
  </div>
</template>

<script setup>
import CounterPanel from './components/CounterPanel.vue'
</script>

<style scoped>
.app {
  padding: 2rem;
  font-family: sans-serif;
}
</style>
```

---

## ✅ Summary

With this setup, you can manage state cleanly and reactively using Pinia and Composition API. Easily scalable and modular for real-world applications.

---

Happy Coding! 🎉