import AddTodo from "@/components/todos/AddTodo.vue";
import TodoList from "@/components/todos/TodoList.vue";
import UpdateTodo from "@/components/todos/UpdateTodo.vue";
import AboutView from "@/views/AboutView.vue";
import HowToView from "@/views/HowToView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import UserView from "@/views/UserView.vue";
import {createRouter, createWebHistory} from "vue-router";
import AuthView from "@/views/auth/AuthView.vue";
import {useAuthStore} from "@/stores/authStore.js";

const routes = [
    {
        path: "/auth/login",
        name: 'login',
        component: AuthView,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/",
        name: "home",
        component: HowToView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/how-to",
        redirect: "/",
    },
    {
        path: "/about-us",
        name: "about",
        component: AboutView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/user/:id",
        name: "user",
        component: UserView,
        meta: {
            requiresAuth: true
        }
    },
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
    // catch-all route
    {
        path: "/:notFound(.*)",
        component: NotFoundView,
        meta: {
            requiresAuth: true
        }
        // redirect: "/",
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// navigation guard
router.beforeEach((to, from) => {
    // console.log(`Navigating to ${to.fullPath} from ${from.fullPath}`);

    // nese ki ndonje validim perpara se te kalosh te routa tjeter
    // next() vetem te ridirekton te routa tjeter
    // next();

    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        return {
            name: 'login',
            query: {redirect: to.fullPath} // save the route user was trying to access
        }
    } else if (!to.meta.requiresAuth && authStore.isLoggedIn) {
        // mos me lon userin me navigu prap ne login nese veq osht logged in
        return {
            name: 'home'
        }
    }
});

export default router;
