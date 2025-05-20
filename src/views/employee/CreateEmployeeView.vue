<script setup>
import AppCard from "@/components/ui/AppCard.vue";
import AppInput from "@/components/ui/AppInput.vue";
import {onMounted, reactive, ref} from "vue";
import {useDepartmentStore} from "@/stores/departmentStore.js";
import AppButton from "@/components/ui/AppButton.vue";
import EmployeeService from "@/services/employeeService.js";
import {useAppToast} from "@/composables/useAppToast.js";
import {useRouter} from "vue-router";

const isLoading = ref(false)
const formData = reactive({
  firstName: {val: '', isValid: true},
  lastName: {val: '', isValid: true},
  department: {val: null, isValid: true},
  hireDate: '',
  email: ''
})

const formIsValid = ref(true)
const validateForm = () => {
  formIsValid.value = true

  if (!formData.firstName.val) {
    formData.firstName.isValid = false
    formIsValid.value = false
  }

  if (!formData.lastName.val) {
    formData.lastName.isValid = false
    formIsValid.value = false
  }

  if (!formData.department.val) {
    formData.department.isValid = false
    formIsValid.value = false
  }
}

const clearValidity = (key) => {
  formData[key].isValid = true
}

const {showSuccess} = useAppToast()
const router = useRouter()
const handleSubmit = async () => {
  validateForm()

  if (!formIsValid.value) return

  const obj = {
    firstName: formData.firstName.val,
    lastName: formData.lastName.val,
    departmentId: formData.department.val,
    hireDate: formData.hireDate,
    email: formData.email
  }

  // console.log(obj)
  // alert('Form is valid!')

  try {
    isLoading.value = true
    const response = await EmployeeService.createEmployee(obj)
    if (response) {
      showSuccess('Employee created successfully')
      await router.push({name: 'employees'})
    }
  } catch (e) {
    throw e;
  } finally {
    isLoading.value = false
  }
}

const departmentStore = useDepartmentStore()
onMounted(async () => {
  await departmentStore.getDepartments()
})
</script>

<template>
  <app-card>
    <template #header>
      <h5>Create Employee</h5>
    </template>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <!--      <label class="form-label" for="first-name">First name</label>-->
        <!--      <input type="text" id="first-name" class="form-control form-control-sm" />-->
        <!--      <div class="invalid-feedback">First name is required</div>-->
        <app-input id="first-name"
                   label="First name"
                   type="text"
                   :is-valid="formData.firstName.isValid"
                   invalid-feedback="First name is required"
                   v-model.trim="formData.firstName.val"
                   @blur="clearValidity('firstName')"/>
      </div>

      <div class="mb-3">
        <app-input id="last-name"
                   label="Last name"
                   type="text"
                   :is-valid="formData.lastName.isValid"
                   invalid-feedback="Last name is required"
                   v-model.trim="formData.lastName.val"
                   @blur="clearValidity('lastName')"/>
      </div>

      <div class="mb-3">
        <label for="department" class="form-label">Department</label>
        <select id="department"
                class="form-select"
                :class="{'is-invalid': !formData.department.isValid}"
                v-model.number="formData.department.val"
                @blur="clearValidity('department')">
          <option selected :value="null" disabled>Select department</option>
          <option v-for="dep in departmentStore.departmentsForDropdown" :key="dep.value" :value="dep.value">
            {{ dep.label }}
          </option>
        </select>
        <div class="invalid-feedback">Department is required</div>
        <!--        {{ formData.department }}-->
      </div>

      <div class="mb-3">
        <app-input id="hire-date"
                   label="Hire date"
                   type="date"
                   v-model.trim="formData.hireDate"/>
      </div>

      <div class="mb-3">
        <app-input id="email"
                   label="Email"
                   type="email"
                   v-model.trim="formData.email"/>
      </div>

      <div class="text-center">
        <app-button class="btn btn-primary" :is-loading="isLoading">Submit</app-button>
        <router-link :to="{name:'employees'}" class="btn btn-secondary ms-2">Cancel</router-link>
      </div>
    </form>
  </app-card>
</template>

<style scoped></style>