<template>
  <div class="text-highlighter bg-white p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
    <div class="controls space-y-6">
      <TextInput
        v-model="fullText"
        :rows="4"
        placeholder="输入完整文本..."
        class="text-content slide-up"
      />
      <div class="flex flex-col space-y-4">
        <TextInput
          v-model="highlightText"
          :rows="1"
          placeholder="输入要高亮显示的文本..."
          class="slide-up"
          style="animation-delay: 100ms"
        />
        <QuoteStyleSelector
          v-model="quoteStyle"
          class="slide-up"
          style="animation-delay: 150ms"
        />
        <HighlightStyleControls
          v-model:scale="textScale"
          v-model:spacing="textSpacing"
          class="slide-up"
          style="animation-delay: 200ms"
        />
      </div>
    </div>
    <Transition name="fade">
      <div class="mt-8" v-show="textParts.length">
        <HighlightedText 
          :parts="textParts"
          :quote-style="quoteStyle"
          :text-scale="textScale"
          :text-spacing="textSpacing"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TextInput from './TextInput.vue'
import HighlightedText from './HighlightedText.vue'
import QuoteStyleSelector from './QuoteStyleSelector.vue'
import HighlightStyleControls from './HighlightStyleControls.vue'
import { parseText } from '../utils/textParser.js'
import { highlightConfig } from '../utils/highlightConfig.js'

const fullText = ref('')
const highlightText = ref('')
const quoteStyle = ref('default')
const textScale = ref(highlightConfig.text.scale)
const textSpacing = ref(highlightConfig.text.spacing.word)

const textParts = computed(() => {
  return parseText(fullText.value, highlightText.value)
})
</script>