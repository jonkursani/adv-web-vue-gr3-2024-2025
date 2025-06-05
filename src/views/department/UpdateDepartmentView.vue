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
  location: '',
  image: null
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

  const fd = new FormData();
  fd.append('data', new Blob([JSON.stringify(obj)], {type: 'application/json'}));
  if (formData.image) {
    fd.append('image', formData.image);
  }

  await withLoading(async () => {
    const response = await DepartmentService.updateDepartment(departmentId, fd)
    if (response) {
      showSuccess('Department updated successfully')
      await router.push({name: 'departments'})
    }
  })
}

const oldImg = ref(null)
const getDepartmentById = async (id) => {
  await withLoading(async () => {
    const response = await DepartmentService.getDepartmentById(id);
    if (response) {
      formData.name.val = response.name;
      formData.location = response.location;
      oldImg.value = response.imagePath;
    }
  })
}

const getFullImageUrl = (path) => {
  return import.meta.env.VITE_IMG_URL + path
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

      <div class="mb-3">
        <div v-if="oldImg" class="d-flex">
          <label class="form-label me-5">Current image:</label>
          <img
              :src="getFullImageUrl(oldImg)"
              :alt="`Department ${formData.name.val}`"
              class="img-fluid"
              style="max-width: 300px"
          >
        </div>

        <label for="image" class="form-label">Image</label>
        <input
            type="file"
            id="image"
            class="form-control"
            @change="e => formData.image = e.target.files[0]"
        />
      </div>

      <div class="text-center">
        <app-button class="btn btn-primary" :is-loading="isLoading">Submit</app-button>
        <router-link :to="{ name: 'departments' }" class="btn btn-secondary ms-2">Cancel</router-link>
      </div>
    </form>
  </app-card>
</template>

<style scoped></style>