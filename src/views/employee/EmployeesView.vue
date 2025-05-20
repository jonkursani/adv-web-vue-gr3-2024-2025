<script setup>
import AppCard from "@/components/ui/AppCard.vue";
import {onMounted, ref} from "vue";
import AppSpinner from "@/components/AppSpinner.vue";
import EmployeeService from "@/services/employeeService.js";
import AppDatatable from "@/components/ui/AppDatatable.vue";
import AppButton from "@/components/ui/AppButton.vue";
// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net';
// import DataTablesBS5 from 'datatables.net-bs5';

// Initialize DataTables with Bootstrap 5 styles
// DataTable.use(DataTablesCore);
// DataTable.use(DataTablesBS5);

const isLoading = ref(false)
const employees = ref([])
const columns = ref([
  {key: 'id', label: '#'},
  {key: 'firstName', label: 'First name'},
  {key: 'lastName', label: 'Last name'},
  {key: 'department', label: 'Department'},
  {key: 'hireDate', label: 'Hire date'},
  {key: 'email', label: 'Email'},
])

const loadEmployees = async () => {
  try {
    isLoading.value = true
    const response = await EmployeeService.getAllEmployees()
    employees.value = response.map(emp => {
      return {
        id: emp.id,
        firstName: emp.firstName,
        lastName: emp.lastName,
        department: emp.department.name,
        hireDate: emp.hireDate,
        email: emp.email
      }
    })
    // employees.value = await EmployeeService.getAllEmployees()
  } catch (e) {
    throw e;
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadEmployees()
  // new DataTablesCore('#employees')
})
</script>

<template>
  <app-card>
    <template #header>
      <div class="d-flex justify-content-between">
        <h5>Employees</h5>
        <router-link :to="{name: 'create-employee'}" class="btn btn-primary">Add</router-link>
      </div>
    </template>

    <div class="text-center" v-if="isLoading">
      <app-spinner :is-loading="isLoading"/>
    </div>
    <!--    <table v-else id="employees" class="table table-bordered table-striped">-->
    <!--      <thead>-->
    <!--      <tr>-->
    <!--        <th>#</th>-->
    <!--        <th>First name</th>-->
    <!--        <th>Last name</th>-->
    <!--        <th>Department</th>-->
    <!--        <th>Hire date</th>-->
    <!--        <th>Email</th>-->
    <!--        <th>Actions</th>-->
    <!--      </tr>-->
    <!--      </thead>-->
    <!--      <tbody>-->
    <!--      <tr v-for="emp in employees" :key="emp.id">-->
    <!--        <td>{{ emp.id }}</td>-->
    <!--        <td>{{ emp.firstName }}</td>-->
    <!--        <td>{{ emp.lastName }}</td>-->
    <!--        <td>{{ emp.department.name }}</td>-->
    <!--        <td>{{ emp.hireDate }}</td>-->
    <!--        <td>{{ emp.email }}</td>-->
    <!--        <td>-->
    <!--          <button class="btn btn-primary">Edit</button>-->
    <!--          <button class="btn btn-danger">Delete</button>-->
    <!--        </td>-->
    <!--      </tr>-->
    <!--      </tbody>-->
    <!--    </table>-->
    <app-datatable v-else id="employees" :rows="employees" :columns="columns" has-actions>
      <!-- Template renderohet te sloti me emrin actions -->
      <!--      <template #actions="variabla">-->
      <template #actions="{rreshti}">
        <router-link to="" class="btn btn-secondary">Update</router-link>
        <!--        <app-button class="btn btn-danger ms-2" @click="() => console.log(variabla.rreshti)">Delete</app-button>-->
        <app-button class="btn btn-danger ms-2" @click="() => console.log(rreshti.id)">Delete</app-button>
      </template>
    </app-datatable>
  </app-card>
</template>

<style scoped></style>