import AboutView from "@/views/AboutView.vue";
import HowToView from "@/views/HowToView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import UserView from "@/views/UserView.vue";
import {createRouter, createWebHistory} from "vue-router";
import AuthView from "@/views/auth/AuthView.vue";
import {useAuthStore} from "@/stores/authStore.js";
import DepartmentRoutes from "@/router/departmentRoutes.js";
import TodoRoutes from "@/router/todoRoutes.js";
import EmployeeRoutes from "@/router/employeeRoutes.js";
import AdminView from "@/views/AdminView.vue";
import {ROLES} from "@/composables/useAdministration.js";
import ManagerView from "@/views/ManagerView.vue";
import AccessDeniedView from "@/views/AccessDeniedView.vue";

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
    // (...) spread operator na ndihmon mi ekstraktu objektet prej array-it
    ...TodoRoutes,
    ...DepartmentRoutes,
    ...EmployeeRoutes,
    {
        path: "/admin",
        name: 'admin',
        component: AdminView,
        meta: {
            requiresAuth: true,
            roles: [ROLES.ADMIN]
        }
    },
    {
        path: '/manager',
        name: 'manager',
        component: ManagerView,
        meta: {
            requiresAuth: true,
            roles: [ROLES.MANAGER, ROLES.ADMIN]
        }
    },
    {
        path: "/access-denied",
        name: 'access-denied',
        component: AccessDeniedView,
        meta: {requiresAuth: true}
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

    // nese routa ka roles te caktuara dhe useri osht logged in
    // kontrollojme nese useri ka rolin e duhur
    // ne kete rast, nese useri nuk ka rolin e duhur, e ridirektojm te access-denied
    if (to.meta.roles && to.meta.roles.length > 0 && authStore.isLoggedIn) {
        const isAllowed = to.meta.roles.includes(authStore.loggedInUser?.role)

        if (!isAllowed) {
            return {
                name: 'access-denied',
            }
        }
    }

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
