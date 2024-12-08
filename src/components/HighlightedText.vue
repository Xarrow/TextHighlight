<template>
  <div 
    v-if="parts && parts.length" 
    class="result text-content text-lg leading-relaxed p-8 bg-white rounded-xl shadow-sm"
  >
    <template v-for="(part, index) in parts" :key="index">
      <span
        :class="{
          'font-bold': part.highlight,
          'transition-all': true,
        }"
        :style="getPartStyle(part, index)"
      >{{ part.text }}</span>
    </template>
  </div>
  <div v-else class="text-gray-500 text-center p-4">
    请在上方输入要处理的文本
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { calculateFadeStyle } from '../utils/fadeEffects.js'

const props = defineProps({
  parts: {
    type: Array,
    required: true,
    default: () => []
  }
})

const getPartStyle = (part, index) => {
  return calculateFadeStyle(part, index, props.parts, props.parts.length)
}
</script>

<style scoped>
.result {
  overflow: hidden;
  line-height: 2;
}

.result span {
  display: inline-block;
  padding: 0 1px;
  will-change: opacity, transform, filter;
}
</style>