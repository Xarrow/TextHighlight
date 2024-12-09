<template>
  <div 
    v-if="parts && parts.length" 
    class="result text-content text-lg leading-relaxed p-8 bg-white rounded-xl shadow-sm
           transition-all duration-300 hover:shadow-md"
  >
    <template v-for="(section, index) in processedSections" :key="index">
      <template v-if="section.type === 'highlight'">
        <span 
          class="quote-mark quote-mark-before"
          :style="[currentQuoteStyle.style, quoteMarkStyle]"
        >{{ currentQuoteStyle.before }}</span>
        <span
          v-for="(part, partIndex) in section.parts"
          :key="`${index}-${partIndex}`"
          class="font-bold transition-all"
          :style="getPartStyle(part, getGlobalIndex(section, partIndex))"
        >{{ part.text }}</span>
        <span 
          class="quote-mark quote-mark-after"
          :style="[currentQuoteStyle.style, quoteMarkStyle]"
        >{{ currentQuoteStyle.after }}</span>
      </template>
      <template v-else>
        <span
          v-for="(part, partIndex) in section.parts"
          :key="`${index}-${partIndex}`"
          class="transition-all"
          :style="getPartStyle(part, getGlobalIndex(section, partIndex))"
        >{{ part.text }}</span>
      </template>
    </template>
  </div>
  <div v-else class="text-gray-500 text-center p-4 animate-pulse">
    请在上方输入要处理的文本
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { calculateFadeStyle } from '../utils/fadeEffects.js'
import { getQuoteStyle } from '../utils/quoteStyles.js'
import { processTextSections } from '../utils/textProcessor.js'
import { quoteConfig } from '../utils/quoteConfig.js'

const props = defineProps({
  parts: {
    type: Array,
    required: true,
    default: () => []
  },
  quoteStyle: {
    type: String,
    default: 'default'
  }
})

const currentQuoteStyle = computed(() => {
  return getQuoteStyle(props.quoteStyle)
})

const processedSections = computed(() => {
  return processTextSections(props.parts)
})

const getGlobalIndex = (section, partIndex) => {
  return section.startIndex + partIndex
}

const getPartStyle = (part, globalIndex) => {
  return calculateFadeStyle(part, globalIndex, props.parts, props.parts.length)
}

const quoteMarkStyle = computed(() => ({
  transform: `scale(${quoteConfig.size.scale})`,
  position: 'relative',
  top: `${quoteConfig.size.verticalOffset}em`,
  display: 'inline-block',
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  transition: `all ${quoteConfig.animation.duration}ms ${quoteConfig.animation.timing}`
}))
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
  backface-visibility: hidden;
}

.quote-mark {
  font-weight: bold;
  opacity: 0.8;
}

.quote-mark-before {
  margin-right: calc(${quoteConfig.spacing.before}em + ${quoteConfig.spacing.edge}em);
}

.quote-mark-after {
  margin-left: calc(${quoteConfig.spacing.after}em + ${quoteConfig.spacing.edge}em);
}

@media (hover: hover) {
  .result:hover .quote-mark {
    opacity: 1;
    transform: scale(${quoteConfig.size.scaleHover});
  }
}
</style>