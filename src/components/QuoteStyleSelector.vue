<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-4">
      <span class="text-sm text-gray-600">引用样式：</span>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(style, type) in allStyles"
          :key="type"
          @click="$emit('update:modelValue', type)"
          class="px-3 py-1 rounded-lg text-sm transition-all duration-200"
          :class="modelValue === type ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
        >
          {{ style.before }}文本{{ style.after }}
        </button>
      </div>
    </div>
    
    <div class="flex items-center space-x-4">
      <button
        @click="showCustomForm = !showCustomForm"
        class="text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        {{ showCustomForm ? '取消添加' : '添加自定义样式' }}
      </button>
    </div>

    <div v-if="showCustomForm" class="bg-gray-50 p-4 rounded-lg space-y-4">
      <div class="space-y-2">
        <label class="block text-sm text-gray-600">样式名称</label>
        <input
          v-model="newStyle.name"
          type="text"
          class="w-full px-3 py-2 border rounded-lg"
          placeholder="例如：custom1"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="block text-sm text-gray-600">前引号</label>
          <input
            v-model="newStyle.before"
            type="text"
            class="w-full px-3 py-2 border rounded-lg"
            placeholder="例如：『"
          />
        </div>
        
        <div class="space-y-2">
          <label class="block text-sm text-gray-600">后引号</label>
          <input
            v-model="newStyle.after"
            type="text"
            class="w-full px-3 py-2 border rounded-lg"
            placeholder="例如：』"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="block text-sm text-gray-600">颜色</label>
        <input
          v-model="newStyle.color"
          type="color"
          class="w-full h-10 p-1 border rounded-lg"
        />
      </div>

      <div class="flex justify-end space-x-2">
        <button
          @click="addCustomStyle"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          :disabled="!isValidNewStyle"
        >
          添加样式
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAllQuoteStyles, addQuoteStyle } from '../utils/quoteStyles'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'default'
  }
})

const emit = defineEmits(['update:modelValue'])

const showCustomForm = ref(false)
const newStyle = ref({
  name: '',
  before: '',
  after: '',
  color: '#2563eb'
})

const allStyles = ref(getAllQuoteStyles())

const isValidNewStyle = computed(() => {
  return newStyle.value.name &&
         newStyle.value.before &&
         newStyle.value.after &&
         newStyle.value.color
})

function addCustomStyle() {
  if (!isValidNewStyle.value) return
  
  try {
    addQuoteStyle(newStyle.value.name, {
      before: newStyle.value.before,
      after: newStyle.value.after,
      style: {
        color: newStyle.value.color
      }
    })
    
    // 更新样式列表
    allStyles.value = getAllQuoteStyles()
    
    // 重置表单
    newStyle.value = {
      name: '',
      before: '',
      after: '',
      color: '#2563eb'
    }
    
    showCustomForm.value = false
  } catch (error) {
    console.error('Failed to add custom style:', error)
  }
}
</script>