<template>
  <div class="space-y-4">
    <div class="flex flex-col space-y-2">
      <label class="text-sm text-gray-600">文字大小</label>
      <div class="flex items-center space-x-4">
        <input
          type="range"
          v-model="localScale"
          min="1"
          max="2"
          step="0.1"
          class="w-full"
        />
        <span class="text-sm text-gray-600 w-12">{{ localScale }}x</span>
      </div>
    </div>
    
    <div class="flex flex-col space-y-2">
      <label class="text-sm text-gray-600">文字间距</label>
      <div class="flex items-center space-x-4">
        <input
          type="range"
          v-model="localSpacing"
          min="0"
          max="0.5"
          step="0.05"
          class="w-full"
        />
        <span class="text-sm text-gray-600 w-12">{{ localSpacing }}em</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  scale: {
    type: Number,
    required: true
  },
  spacing: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:scale', 'update:spacing'])

const localScale = ref(props.scale)
const localSpacing = ref(props.spacing)

watch(localScale, (newValue) => {
  emit('update:scale', Number(newValue))
})

watch(localSpacing, (newValue) => {
  emit('update:spacing', Number(newValue))
})

watch(() => props.scale, (newValue) => {
  localScale.value = newValue
})

watch(() => props.spacing, (newValue) => {
  localSpacing.value = newValue
})
</script>

<style scoped>
input[type="range"] {
  @apply h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer;
}

input[type="range"]::-webkit-slider-thumb {
  @apply w-4 h-4 bg-blue-600 rounded-full appearance-none cursor-pointer;
}

input[type="range"]::-moz-range-thumb {
  @apply w-4 h-4 bg-blue-600 rounded-full cursor-pointer;
}
</style>