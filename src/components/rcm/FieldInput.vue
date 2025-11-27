<template>
  <van-field
    :readonly="readonly"
    :required="required"
    :is-link="is_link"
    :label-width="label_width"
    :name="name"
    :label="label"
    :placeholder="placeholder"
    v-model="modelValue"
  />
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    is_link: {
      type: Boolean,
      default: false
    },
    label_width: {
      type: String,
      default: '85'
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    fieldType: {
      type: String,
      default: 'no_variable'
    },
  })
</script>

<script>
  export default {
    name: 'FieldInput'
  }
</script>