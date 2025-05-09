import TodoList from "@/components/todos/TodoList.vue";
import AddTodo from "@/components/todos/AddTodo.vue";
import UpdateTodo from "@/components/todos/UpdateTodo.vue";

export default [
    {
        path: "/todos",
        name: "todos",
        component: TodoList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/todos/add",
        name: "add-todo",
        component: AddTodo,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/todos/:id",
        name: "update-todo",
        component: UpdateTodo,
        meta: {
            requiresAuth: true
        }
    },
]