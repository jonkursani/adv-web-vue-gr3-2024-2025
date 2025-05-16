<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import DataTablesBS5 from 'datatables.net-bs5';
import {nextTick, onMounted} from "vue";

// Initialize DataTables with Bootstrap 5 styles
DataTable.use(DataTablesCore);
DataTable.use(DataTablesBS5);

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  columns: { // [{key: 'id', label: 'ID'}, {key: 'firstName', label: 'Emri'}]
    type: Array,
    required: true
  },
  rows: { // [{id: 1, firstName: 'John'}, {id: 2, firstName: 'Jane'}]
    type: Array,
    required: true
  },
  hasActions: {
    type: Boolean,
    default: false
  }
})

onMounted(async () => {
  // Wait for the DOM to be updated before initializing DataTables
  await nextTick()
  // console.log(props.id)
  new DataTablesCore(`#${props.id}`)
})
</script>

<template>
  <table :id="id" class="table table-striped table-bordered">
    <thead>
    <tr>
      <th v-for="(col, index) in columns" :key="index">
        {{ col.label }}
      </th>
      <th v-if="hasActions">Actions</th>
    </tr>
    </thead>
    <tbody>
    <!-- Row: [{id: 1, firstName: 'John'}, {id: 2, firstName: 'Jane'}]-->
    <!-- row1.id => 1, row1.firstName => 'John' -->
    <tr v-for="(row,index) in rows" :key="index">
      <td v-for="(col, index) in columns" :key="index">
        {{ row[col.key] }}
      </td>
      <td v-if="hasActions">
        <slot name="actions" :rreshti="row" />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>