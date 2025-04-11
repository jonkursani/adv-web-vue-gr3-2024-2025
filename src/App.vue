<!-- Vue single file component (SFC) -->
<!-- JavaScript (Logic) -->
<!-- setup composition api script setup -->
<script setup>
import { reactive, ref, computed } from "vue";
import Detyra1 from "@/components/detyra/Detyra1.vue";

// Ref e bon ni variabel reaktive
const message = ref("Hello from Vue"); // { value: "Hello from Vue" }
const vueLink = ref("https://vuejs.org/"); // { value: "https://vuejs.org/" }
const id = ref(3); // { value: 3 }
const isBtnDisabled = ref(false);
// { value: false }

const toggleButton = () => {
  console.log(isBtnDisabled); // { value: false }
  console.log(isBtnDisabled.value); // false
  isBtnDisabled.value = !isBtnDisabled.value;
};

function randomText() {
  return Math.random() > 0.5 ? "Drink coffe" : "Go to gym";
}

const isSeen = ref(true); // { value: true }

const onSubmit = () => {
  // event.preventDefault(); // Stop the form from submitting

  alert("Form submitted");
};

const name = ref(""); // { value: '' }
const confirmedName = ref(""); // { value: '' }
const confirmName = (e) => {
  // e.target.key === "Enter"
  confirmedName.value = e.target.value; // elementi qe e ka shkaktu eventin
  name.value = "";
};

const counter = ref(0); // { value: 0 }
const decrement = (num) => {
  // counter.value--;
  // counter.value = counter.value - 1;
  counter.value -= num;
};

const increment = (num) => {
  // counter.value++;
  // counter.value = counter.value + 1;
  counter.value += num;
};

// reactive
// nuk pranon tipe primitive, ne script skemi nevoj me iu qas me .value

const state = reactive({
  counter: 0,
}); // { counter: 0 }

const userId = ref(1); // { value: 1 }
const userName = ref("John Doe"); // { value: 'John Doe' }
const age = ref(25); // { value: 25 }
const userRef = ref({
  id: 1,
  name: "John Doe",
});

// userRef.value.age = 25;

const user = reactive({
  id: 1,
  name: "John Doe",
  age: 25,
});

// user.id

// computed property
const author = reactive({
  name: "John Doe",
  books: [
    { title: "Book 1", year: 2020 },
    { title: "Book 2", year: 2021 },
  ],
});

const hasPublishedBooks = computed(() => {
  return author.books.length > 0 ? "Yes" : "No";
});

const randomTextComputed = computed(() => {
  return Math.random() > 0.5 ? "Drink coffe" : "Go to gym";
});

// class and style binding
const isActive = ref(true);
const hasError = ref(false);
const classObject = reactive({
  active: true,
  "text-danger": false,
});

const isCompleted = ref(false);
const classObjComputed = computed(() => {
  return {
    completed: isCompleted.value,
    // completed: isCompleted.value === true,
    "text-danger": !isCompleted.value, // && hasError.value,
    // "text-danger": isCompleted.value === false,
  };
});

// style binding
const redColor = ref("red");
const upperCase = ref("uppercase");
const styleObject = reactive({
  color: "indigo",
  textTransform: "uppercase",
});

// conditional rendering
const awesome = ref(true);
const type = ref("C");

// Input binding
const userInput = ref("");
const onUserInput = (e) => {
  userInput.value = e.target.value; // e.target.value
};

// Todo List
let todoId = 1;
const newTodo = ref("");
const todos = ref([
  { id: todoId++, text: "Todo 1" },
  { id: todoId++, text: "Todo 2" },
]);

const addTodo = () => {
  // if (newTodo.value.trim() === "") {
  //   alert("Please enter a todo");
  //   return;
  // }

  // "" => false => !false = true
  // newTodo.value === "" || newTodo.value === null || newTodo.value === undefined
  if (!newTodo.value) {
    alert("Please enter a todo");
    return;
  }

  todos.value.push({
    id: todoId++,
    text: newTodo.value,
  });

  newTodo.value = ""; // Clear the input field
};
</script>

<!-- HTML (Structure) -->
<template>
  <h1>{{ message }}</h1>

  <!-- Attribute binding -->
  <!-- <h1>Check out <a v-bind:href="https://vuejs.org/">vue docs</a></h1> -->
  <h1>Check out <a :href="vueLink">vue docs</a></h1>

  <h1 :id="`emp-${id}`">User: {{ id }}</h1>
  <br />
  <!-- Mapimi i atributeve me ":" :id, :href -->
  <button :disabled="isBtnDisabled">Button</button>

  <!-- Direktiva: v-on, v-bind, v-if  -->
  <!-- Perdorimi i eventeve me "@" @click, @keyup, @input -->
  <!-- <button v-on:click="">Toggle button</button> -->
  <!-- <button @click="isBtnDisabled = !isBtnDisabled">Toggle button</button> -->
  <button @click="toggleButton">Toggle button</button>
  <!-- {{ Math.random() > 0.5 ? "Drink coffe" : "Go to gym" }} -->
  {{ randomText() }}

  <p v-if="isSeen">Now paragraph is seen</p>
  <button @click="isSeen = !isSeen">{{ isSeen ? "Hide" : "Show" }} paragraph</button>

  <br /><br />

  <!-- Modifiers .prevent, .enter -->
  <form @submit.prevent="onSubmit">
    <input type="text" />
    <button type="submit">Submit</button>
  </form>

  <br />

  <input type="text" placeholder="Enter name" :value="name" @keyup.enter="confirmName" />
  <input type="text" placeholder="Confirmed name" :value="confirmedName" disabled />

  <p>Ref counter</p>
  <!-- <button @click="counter--">-</button> -->
  <button @click="decrement(1)">-</button>
  <button @click="decrement(5)">-5</button>
  {{ counter }}
  <!-- <button @click="counter++">+</button> -->
  <button @click="increment(1)">+</button>
  <button @click="increment(10)">+10</button>

  <p>Reactive counter</p>

  <button @click="state.counter--">-</button>
  {{ state.counter }}
  <button @click="state.counter++">+</button>

  <p>User id: {{ user.id }}</p>
  <p>Name: {{ user.name }}</p>
  <p>Age: {{ user.age }}</p>

  <!-- Computed -->
  <!-- <p>Has published books: {{ author.books.length > 0 ? "Yes" : "No" }}</p> -->
  <p>Has published books: {{ hasPublishedBooks }}</p>
  <p>Random text computed: {{ randomTextComputed }}</p>

  <!-- Class and style binding -->
  <!-- 'active' klasa ne css, 'isActive' varibla ne script -->
  <p class="some-class" :class="{ active: isActive, 'text-danger': hasError }">Class bindig</p>
  <p :class="classObject">Class object</p>
  <p :class="classObjComputed">Computed class object</p>
  <button @click="isCompleted = !isCompleted">Toggle completed</button>
  <!-- <p :class="['active', 'other-class']">Binding to array</p> -->
  <p :class="['active', isCompleted ? 'completed' : '']">Binding to array</p>
  <p :style="{ color: redColor, textTransform: upperCase }">Style binding</p>
  <p :style="styleObject">Style object</p>

  <Detyra1 />

  <!-- Conditional rendering -->
  <!-- 
    if (true) {
    } else {
    }
  -->
  <p v-if="awesome">Vue is awesome</p>
  <!-- <span></span> error nese ka ndonje tag tjeter ne mes v-if dhe v-else -->
  <p v-else>Oh nooo 😒</p>
  <button @click="awesome = !awesome">Toggle</button>

  <p v-if="type === 'A'">A</p>
  <!-- <p v-else></p> -->
  <p v-else-if="type === 'B'">B</p>
  <p v-else>Not A/B</p>

  <!-- Template per grupim te elementeve te html nuk renderohet ne dom -->
  <template v-if="true">
    <h1>Template</h1>
    <p>Test p</p>
  </template>

  <p v-show="awesome">V-show</p>

  <!-- List rendering -->
  <h3>Author: {{ author.name }}</h3>
  <p>Books:</p>
  <ul v-if="author.books.length > 0">
    <!-- <li v-for="(book, index) in author.books">{{ index }} - {{ book.title }} ({{ book.year }})</li> -->
    <!-- <li v-for="({ title, year }, index) in author.books">{{ index }} - {{ title }} ({{ year }})</li> -->
    <!-- :key duhet me qene unike -->
    <template v-for="({ title, year }, index) in author.books" :key="index">
      <li>{{ index }} - {{ title }} ({{ year }})</li>
    </template>
  </ul>
  <p v-else>No published books</p>

  <!-- Input binding -->
  <p>Input binding</p>
  <!-- <input type="text" :value="userInput" @input="onUserInput" />
  <p>User input: {{ userInput }}</p> -->

  <input type="text" v-model="userInput" />
  <p>User input: {{ userInput }}</p>

  <!-- Todo List -->
  <h3>Todo List</h3>
  <input type="text" v-model.trim="newTodo" placeholder="Add new todo" @keyup.enter="addTodo" />
  <button @click="addTodo">+ Add</button>

  <ul v-if="todos.length">
    <li v-for="todo in todos" :key="todo.id">({{ todo.id }}): {{ todo.text }}</li>
  </ul>
  <p v-else>No todos</p>
</template>

<!-- CSS (Style) -->
<!-- CSS aplikohet vetem ne kete file -->
<style scoped>
.active {
  font-weight: bold;
}

.text-danger {
  color: red;
}

.completed {
  text-decoration: line-through;
  color: green;
}
</style>
