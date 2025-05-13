<script setup>
import AppCard from "@/components/ui/AppCard.vue";
import AppButton from "@/components/ui/AppButton.vue";
import {onMounted, reactive, ref} from "vue";
import {useLoading} from "@/composables/useLoading.js";
import DepartmentService from "@/services/departmentService.js";
import {useAppToast} from "@/composables/useAppToast.js";
import {useRoute, useRouter} from "vue-router";
import AppSpinner from "@/components/AppSpinner.vue";

const formData = reactive({
  name: {val: '', isValid: true},
  location: ''
})

const formIsValid = ref(true)
const validateForm = () => {
  formIsValid.value = true;

  if (!formData.name.val) { // formData.name.val === '' || formData.name.val === null || formData.name.val === undefined
    formData.name.isValid = false;
    formIsValid.value = false
  }
}

const clearValidity = (key) => {
  // formData.name.isValid = true
  formData[key].isValid = true
}

const {isLoading, withLoading} = useLoading()
const {showSuccess} = useAppToast()
const router = useRouter()
const handleSubmit = async () => {
  validateForm();

  if (!formIsValid.value) return;

  const obj = {
    name: formData.name.val,
    location: formData.location
  }

  await withLoading(async () => {
    const response = await DepartmentService.updateDepartment(departmentId, obj)
    if (response) {
      showSuccess('Department updated successfully')
      await router.push({name: 'departments'})
    }
  })
}

const getDepartmentById = async (id) => {
  await withLoading(async () => {
    const response = await DepartmentService.getDepartmentById(id);
    if (response) {
      formData.name.val = response.name;
      formData.location = response.location;
    }
  })
}

const route = useRoute()
const departmentId = parseInt(route.params.id)
onMounted(async () => {
  await getDepartmentById(departmentId)
})
</script>

<template>
  <app-card>
    <template #header>
      <h5>Update Department</h5>
    </template>

    <div class="text-center" v-if="isLoading">
      <app-spinner :is-loading="isLoading"/>
    </div>
    <form @submit.prevent="handleSubmit" v-else>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text"
               id="name"
               class="form-control"
               :class="{'is-invalid': !formData.name.isValid}"
               v-model.trim="formData.name.val"
               @blur="clearValidity('name')"/>
        <div class="invalid-feedback">Name is required</div>
      </div>

      <div class="mb-3">
        <label for="location" class="form-label">Location</label>
        <input type="text"
               id="location"
               class="form-control"
               v-model.trim="formData.location"/>
      </div>

      <div class="text-center">
        <app-button class="btn btn-primary" :is-loading="isLoading">Submit</app-button>
        <router-link :to="{ name: 'departments' }" class="btn btn-secondary ms-2">Cancel</router-link>
      </div>
    </form>
  </app-card>
</template>

<style scoped></style>