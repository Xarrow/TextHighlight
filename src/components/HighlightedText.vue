<template>
  <div class="result-container">
    <div
      v-if="parts?.length" 
      class="result text-content text-lg leading-relaxed p-8 bg-white rounded-xl shadow-sm
             transition-all duration-300 hover:shadow-md"
      :style="containerStyle"
    >
      <div class="highlight-content whitespace-pre-wrap">
        <template v-for="(section, index) in processedSections" :key="index">
          <template v-if="section.type === 'highlight'">
            <span
              v-for="(part, partIndex) in section.parts"
              :key="`${index}-${partIndex}`"
              class="highlight-text font-bold transition-all inline-block"
              :class="getChunkClass(part)"
              :style="[getPartStyle(part, getGlobalIndex(section, partIndex)), highlightedTextStyle]"
            >{{ part.text }}</span>
          </template>
          <template v-else>
            <span
              v-for="(part, partIndex) in section.parts"
              :key="`${index}-${partIndex}`"
              class="transition-all inline-block"
              :class="getChunkClass(part)"
              :style="getPartStyle(part, getGlobalIndex(section, partIndex))"
            >{{ part.text }}</span>
          </template>
        </template>
      </div>

      <SourceInfo
        v-if="sourceInfo"
        :title="sourceInfo.title"
        :source="sourceInfo.source"
        :image="sourceInfo.image"
        :link="sourceInfo.link"
      />

      
    </div>
    <div v-else class="text-gray-500 text-center p-4 animate-pulse">
      请在上方输入要处理的文本
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { calculateFadeStyle } from '../utils/fadeEffects.js'
import { processTextSections } from '../utils/textProcessor.js'
import { highlightConfig } from '../utils/highlightConfig.js'
import SourceInfo from './source/SourceInfo.vue'

const props = defineProps({
  parts: {
    type: Array,
    required: true,
    default: () => []
  },
  sourceInfo: {
    type: Object,
    default: () => ({
      title: '',
      source: '',
      image: '',
      link: ''
    })
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


const processedSections = computed(() => {
  return processTextSections(props.parts)
})

const containerStyle = computed(() => ({
  minWidth: '300px',
  maxWidth: '100%',
  wordBreak: 'break-word',
  overflowWrap: 'break-word'
}))

const getGlobalIndex = (section, partIndex) => {
  return section.startIndex + partIndex
}

const getPartStyle = (part, globalIndex) => {
  return calculateFadeStyle(part, globalIndex, props.parts, props.parts.length)
}

const getChunkClass = (part) => {
  return {
    'whitespace-pre': part.type === 'whitespace',
    'chinese-char': part.type === 'chinese_char',
    'english-word': part.type === 'english_word',
    'punctuation': part.type === 'punctuation'
  }
}

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
  break-inside: avoid;
  page-break-inside: avoid;
}

.highlight-content {
  word-break: break-word;
  overflow-wrap: break-word;
}

.chinese-char {
  margin-right: 0.1em;
}

.english-word {
  margin: 0 0.1em;
}

.punctuation {
  margin: 0 0.05em;
}

.highlight-text:last-of-type {
  margin-right: 0;
}

@media print {
  .result {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

.export-button-container {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.export-button-container:hover {
  opacity: 1;
}
</style>