<template>
  <div class="text-highlighter space-y-8">
    <!-- Input Section -->
    <section class="input-section">
      <h2 class="text-lg font-medium text-gray-700 mb-4">
        <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">1</span>
        输入文本
      </h2>
      <div class="bg-white p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        <TextInput
          v-model="fullText"
          :rows="4"
          placeholder="输入完整文本..."
          class="text-content slide-up"
          @input="updateText"
        />
      </div>
    </section>

    <!-- Configuration Section -->
    <section class="config-section">
      <h2 class="text-lg font-medium text-gray-700 mb-4">
        <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">2</span>
        配置选项
      </h2>
      <div class="bg-white p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        <div class="flex flex-col space-y-6">
          <TextConfigPanel
            v-model:highlight-text="highlightText"
            v-model:article-title="articleTitle"
            v-model:article-source="articleSource"
            v-model:article-image="articleImage"
            v-model:article-link="articleLink"
            v-model:text-scale="textScale"
            v-model:text-spacing="textSpacing"
            @update:highlight-text="updateText"
          />
        </div>
      </div>
    </section>

    <!-- Result Section -->
    <section class="result-section">
      <h2 class="text-lg font-medium text-gray-700 mb-4">
        <span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">3</span>
        高亮结果
      </h2>
      <div class="bg-gray-100 p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md space-y-7"
        ref="resultTransitionRef"
        >
          <HighlightedText 
            :parts="textParts"
            :source-info="{
              title: articleTitle,
              source: articleSource,
              image: articleImage,
              link: articleLink
            }"
            :text-scale="textScale"
            :text-spacing="textSpacing"
          />
      </div>
    </section>

    <selection class="result-action-section">
       <!--  export hightlighted text as images -->
    <div class="export-button-container mt-4 text-right">
        <button
          @click="exportAsImage"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          导出图片
        </button>
      </div>

    </selection>
  </div>
</template>

<script setup>


import { ref, computed } from 'vue'
import TextInput from './TextInput.vue'
import TextConfigPanel from './TextConfigPanel.vue'
import HighlightedText from './HighlightedText.vue'
import { parseText } from '../utils/textParser.js'
import { highlightConfig } from '../utils/highlightConfig.js'
import html2canvas from 'html2canvas'

const fullText = ref('')
const highlightText = ref('')
const articleTitle = ref('')
const articleSource = ref('')
const articleImage = ref('')
const articleLink = ref('')
const textScale = ref(highlightConfig.text.scale)
const textSpacing = ref(highlightConfig.text.spacing.word)
const resultTransitionRef = ref(null)


const textParts = computed(() => {
  return parseText(fullText.value, highlightText.value)
})

const updateText = () => {
  // 强制重新计算 textParts
  textParts.value = parseText(fullText.value, highlightText.value)
}

const exportAsImage = async () => {
  const element = resultTransitionRef.value
  if (!element) return
  
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 5,
      useCORS: true
    })
    
    const link = document.createElement('a')
    link.download = 'highlighted-text.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('导出图片失败:', error)
  }
}
</script>

<style scoped>
.text-highlighter {
  @apply max-w-4xl mx-auto px-4;
}

section {
  @apply transition-all duration-300;
}

section:hover {
  @apply transform -translate-y-1;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>