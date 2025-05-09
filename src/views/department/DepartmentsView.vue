<script setup>
import AppCard from "@/components/ui/AppCard.vue";
import {useLoading} from "@/composables/useLoading.js";
import DepartmentService from "@/services/departmentService.js";
import {onMounted, ref} from "vue";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTablesBS5 from 'datatables.net-bs5';
import AppSpinner from "@/components/AppSpinner.vue";
import AppButton from "@/components/ui/AppButton.vue";

// Initialize DataTables with Bootstrap 5 styles
DataTable.use(DataTablesCore);
DataTable.use(DataTablesBS5);

const {isLoading, withLoading} = useLoading()

const departments = ref([])
const loadDepartments = async () => {
  await withLoading(async () => {
    // const response = await DepartmentService.getAllDepartments()
    // departments.value = response
    departments.value = await DepartmentService.getAllDepartments()
  })
  // nese nuk e perdorni withLoading
  // try {
  //   isLoading.value = true;
  //   departments.value = await DepartmentService.getAllDepartments()
  // } catch (e) {
  //   throw e;
  // } finally {
  //   isLoading.value = false
  // }
}

onMounted(async () => {
  await loadDepartments()
  new DataTablesCore('#departments')
})
</script>

<template>
  <app-card>
    <template #header>
      <h5>Departments</h5>
    </template>

    <div class="text-center" v-if="isLoading">
<!--      Loading...-->
      <app-spinner :is-loading="isLoading"/>
    </div>
    <table v-else id="departments" class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Location</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="dep in departments" :key="dep.id">
        <td>{{ dep.id }}</td>
        <td>{{ dep.name }}</td>
        <td>{{ dep.location }}</td>
        <td>
          <router-link to="" class="btn btn-secondary">Update</router-link>
          <app-button class="btn btn-danger ms-2">Delete</app-button>
        </td>
      </tr>
      </tbody>
    </table>
  </app-card>
</template>

<style scoped>

</style>