<template>
  <div class="space-y-3">
    <textarea
      :value="modelValue"
      class="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200"
      :rows="rows"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 4
  },
  placeholder: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>