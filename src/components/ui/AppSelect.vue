<script setup>
const model = defineModel({type: [String, Number, Array, Object]})

defineProps({
  id: {type: String, required: true},
  label: {type: String, required: true},
  isValid: {type: Boolean, default: true},
  options: {type: Array, required: true}, // [{value: '1', label: 'Option 1'}, {value: '2', label: 'Option 2'}]
  defaultOption: {type: Object, default: {value: '', label: 'Select an option'}},
  invalidFeedback: {type: String, default: 'This field is required'},
})
</script>

<template>
  <label class="form-label" :for="id">{{ label }}</label>
  <select
      :id="id"
      class="form-select"
      :class="{'is-invalid': !isValid}"
      v-model="model"
      v-bind="$attrs"
  >
    <option :value="defaultOption.value" selected disabled>
      {{ defaultOption.label }}
    </option>
    <slot/>
    <option
        v-for="(opt, index) in options"
        :key="index"
        :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
  <div class="invalid-feedback">{{ invalidFeedback }}</div>
</template>

<style scoped></style>