import EmployeesView from "@/views/employee/EmployeesView.vue";

export default [
    {
        path: '/employees',
        name: 'employees',
        component: EmployeesView,
        meta: {requiresAuth: true},
    }
]