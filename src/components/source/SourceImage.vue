<template>
  <div class="mt-0 relative">
    <!-- 加载状态 -->
    <div 
      v-if="status === 'loading'" 
      class="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 rounded-lg"
    >
      <div class="animate-spin text-blue-600">
        <svg class="w-8 h-8" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      </div>
    </div>
    
    <!-- 错误状态 -->
    <!-- <div 
      v-if="status === 'error'" 
      class="p-4 bg-red-50 rounded-lg text-red-600 text-sm text-center"
    >
      图片加载失败
    </div> -->
    
    <!-- 图片显示 -->
    <img 
      v-show="status === 'success'"
      ref="imageRef"
      :src="processedUrl"
      :alt="title || '文章配图'"
      class="max-w-full h-auto rounded-lg shadow-sm source-image"
      crossorigin="anonymous"
      @load="handleLoad"
      @error="handleError"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useImageLoader, processImageUrl, imageStatus } from '../../utils/imageUtils'

const props = defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['load', 'error'])
const imageRef = ref(null)
const { status, error, load } = useImageLoader({ timeout: 15000 })
const processedUrl = ref('')

// 处理图片加载
async function loadImage() {
  if (!props.image) return
  
  processedUrl.value = processImageUrl(props.image)
  const success = await load(props.image)
  
  if (success) {
    emit('load')
  } else {
    console.error('Image load failed:', error.value)
    emit('error', error.value)
  }
}

// 监听图片URL变化
watch(() => props.image, loadImage, { immediate: true })

const handleLoad = () => {
  status.value = imageStatus.SUCCESS
  emit('load')
}

const handleError = (err) => {
  status.value = imageStatus.ERROR
  console.error('Image load error:', err)
  emit('error', err)
}

onMounted(loadImage)
</script>

<style scoped>
.source-image {
  max-height: 400px;
  object-fit: contain;
  width: 100%;
}

.source-image {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.source-image[src] {
  opacity: 1;
}
</style>