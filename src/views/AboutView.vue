<script setup>
import AppCard from "@/components/ui/AppCard.vue";
import {onMounted, ref} from "vue";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTablesBS5 from 'datatables.net-bs5';

// Initialize DataTables with Bootstrap 5 styles
DataTable.use(DataTablesCore);
DataTable.use(DataTablesBS5);

const users = ref([
  {id: 1, firstName: 'John', lastName: 'Doe', age: 30},
  {id: 2, firstName: 'Jane', lastName: 'Smith', age: 25},
  {id: 3, firstName: 'Alice', lastName: 'Johnson', age: 28},
])

// lifecycle hooks
onMounted(() => {
  new DataTablesCore('#users')
})
</script>

<template>
  <app-card>
    <template #header>
      <h5>Hello from about view</h5>
    </template>

    <!--    <template #default>-->
    <!--      <p>About content</p>-->
    <!--    </template>-->

    <!--    <p>About content</p>-->

    <table id="users" class="table table-bordered table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="u in users" :key="u.id">
        <td>{{ u.id }}</td>
        <td>{{ u.firstName }}</td>
        <td>{{ u.lastName }}</td>
        <td>{{ u.age }}</td>
      </tr>
      </tbody>
    </table>
  </app-card>
</template>
