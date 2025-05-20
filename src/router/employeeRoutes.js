import EmployeesView from "@/views/employee/EmployeesView.vue";
import CreateEmployeeView from "@/views/employee/CreateEmployeeView.vue";

export default [
    {
        path: '/employees',
        name: 'employees',
        component: EmployeesView,
        meta: {requiresAuth: true},
    },
    {
        path: '/employees/create',
        name: 'create-employee',
        component: CreateEmployeeView,
        meta: {requiresAuth: true}
    }
]