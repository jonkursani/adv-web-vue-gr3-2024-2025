import DepartmentsView from "@/views/department/DepartmentsView.vue";
import CreateDepartmentView from "@/views/department/CreateDepartmentView.vue";
import UpdateDepartmentView from "@/views/department/UpdateDepartmentView.vue";

export default [
    {
        path: '/departments',
        name: 'departments',
        component: DepartmentsView,
        meta: {requiresAuth: true}
    },
    {
        path: '/departments/create',
        name: 'create-department',
        component: CreateDepartmentView,
        meta: {requiresAuth: true}
    },
    {
        path: '/departments/update/:id',
        name: 'update-department',
        component: UpdateDepartmentView,
        meta: {requiresAuth: true}
    }
]