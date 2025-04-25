# Vue 3 + Vue Router with Composition API (`<script setup>`) - Full Guide

This is a complete example that teaches you everything you need to know about using **Vue Router** with **Vue 3** using the **Composition API** and `<script setup>` syntax.

## 🗂 Project Structure
```
src/
├── App.vue
├── main.js
├── router/
│   └── index.js
├── views/
│   ├── Home.vue
│   ├── About.vue
│   ├── User.vue
│   └── NotFound.vue
└── components/
    └── Navbar.vue
```

## 🚀 Getting Started
### 1. Install dependencies
```bash
npm install vue-router
```

### 2. Setup Router
Create the file `src/router/index.js`:
```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue'), meta: { requiresAuth: false } },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/user/:id', name: 'User', component: () => import('@/views/User.vue'), props: true },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.fullPath} to ${to.fullPath}`)
  next()
})

export default router
```

### 3. Mount Router in `main.js`
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

---

## 📄 `App.vue`
```vue
<template>
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>
```

## 🔗 `components/Navbar.vue`
```vue
<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link :to="{ name: 'User', params: { id: 123 } }">User 123</router-link>
  </nav>
</template>
```

## 🏠 `views/Home.vue`
```vue
<template>
  <div>
    <h1>Home</h1>
    <button @click="goToUser">Go to User 456</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function goToUser() {
  router.push({ name: 'User', params: { id: 456 } })
}
</script>
```

## 📘 `views/About.vue`
```vue
<template>
  <h1>About Page</h1>
</template>

<script setup>
</script>
```

## 👤 `views/User.vue`
```vue
<template>
  <div>
    <h1>User Page</h1>
    <p>User ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
</script>
```

## ❌ `views/NotFound.vue`
```vue
<template>
  <h1>404 - Page Not Found</h1>
</template>

<script setup>
</script>
```

---

## ✅ Learnings Covered:

| Concept               | Covered in                                          |
|-----------------------|-----------------------------------------------------|
| Basic Routing         | Home, About routes                                  |
| Dynamic Routes        | `/user/:id` with `props: true`                     |
| Programmatic Nav      | `router.push(...)` in Home.vue                      |
| Navigation Guards     | `beforeEach` in `router/index.js`                   |
| Lazy Loading          | All routes use `() => import(...)`                  |
| 404 Catch-All Route   | `/:pathMatch(.*)*`                                  |
| Route Metadata        | `meta.requiresAuth` on Home                         |

---

## 🧠 Tips
- You can use `useRoute()` to access route details.
- You can use `useRouter()` to programmatically navigate.
- Lazy loading views improves performance.
- Use named routes (`name: 'RouteName'`) for maintainability.

---

## 📚 Docs
- Vue Router: https://router.vuejs.org/
- Vue 3 `<script setup>`: https://vuejs.org/api/sfc-script-setup.html
