<template>
  <div class="space-y-3">
    <textarea
      :value="modelValue"
      class="w-full p-4 border rounded-xl shadow-sm 
             focus:ring-2 focus:ring-blue-200 focus:border-blue-400 
             outline-none transition-all duration-200
             hover:border-blue-300"
      :class="{ 'animate-pulse': isAnimating }"
      :rows="rows"
      :placeholder="placeholder"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    ></textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
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

const emit = defineEmits(['update:modelValue'])
const isAnimating = ref(false)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleFocus = () => {
  isAnimating.value = true
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

const handleBlur = () => {
  isAnimating.value = false
}
</script>