import DepartmentsView from "@/views/department/DepartmentsView.vue";

export default [
    {
        path: '/departments',
        name: 'departments',
        component: DepartmentsView,
        meta: {requiresAuth: true}
    }
]