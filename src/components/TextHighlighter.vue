<template>
  <div class="text-highlighter bg-white p-8 rounded-xl shadow-sm">
    <div class="controls space-y-6">
      <TextInput
        v-model="fullText"
        :rows="4"
        placeholder="输入完整文本..."
        class="text-content"
      />
      <TextInput
        v-model="highlightText"
        :rows="1"
        placeholder="输入要高亮显示的文本..."
      />
    </div>
    <div class="mt-8">
      <HighlightedText :parts="textParts" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TextInput from './TextInput.vue'
import HighlightedText from './HighlightedText.vue'
import { parseText } from '../utils/textParser.js'

const fullText = ref('')
const highlightText = ref('')

const textParts = computed(() => {
  return parseText(fullText.value, highlightText.value)
})
</script>