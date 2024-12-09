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
          class="highlight-text font-bold transition-all"
          :style="[getPartStyle(part, getGlobalIndex(section, partIndex)), highlightedTextStyle]"
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
import { highlightConfig } from '../utils/highlightConfig.js'

const props = defineProps({
  parts: {
    type: Array,
    required: true,
    default: () => []
  },
  quoteStyle: {
    type: String,
    default: 'default'
  },
  textScale: {
    type: Number,
    default: highlightConfig.text.scale
  },
  textSpacing: {
    type: Number,
    default: highlightConfig.text.spacing.word
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
  transform: `scale(${highlightConfig.quote.size.scale})`,
  position: 'relative',
  top: `${highlightConfig.quote.size.verticalOffset}em`,
  display: 'inline-block',
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  transition: `all ${highlightConfig.quote.animation.duration}ms ${highlightConfig.quote.animation.timing}`
}))

const highlightedTextStyle = computed(() => ({
  transform: `scale(${props.textScale})`,
  fontWeight: highlightConfig.text.fontWeight,
  letterSpacing: `${highlightConfig.text.spacing.letter}em`,
  padding: `0 ${highlightConfig.text.spacing.padding}em`,
  marginRight: `${props.textSpacing}em`,
  transition: `all ${highlightConfig.text.transition.duration}ms ${highlightConfig.text.transition.timing}`
}))
</script>

<style scoped>
.result {
  overflow: hidden;
  line-height: 2;
}

.result span {
  display: inline-block;
  will-change: opacity, transform, filter;
  backface-visibility: hidden;
}

.highlight-text:last-of-type {
  margin-right: 0;
}

.quote-mark {
  font-weight: bold;
  opacity: 0.8;
}

.quote-mark-before {
  margin-right: calc(${highlightConfig.quote.spacing.before}em + ${highlightConfig.quote.spacing.edge}em);
}

.quote-mark-after {
  margin-left: calc(${highlightConfig.quote.spacing.after}em + ${highlightConfig.quote.spacing.edge}em);
}

@media (hover: hover) {
  .result:hover .quote-mark {
    opacity: 1;
    transform: scale(${highlightConfig.quote.size.scaleHover});
  }
}
</style>