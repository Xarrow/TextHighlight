<template>
  <div
    class="source-info mt-7 pt-7 border-t border-gray-100"
  >
    <div class="space-y-4">
      <!--   配图 -->
      <SourceImage
        v-if="image"
        :image="image"
        :title="title"
      />

      <div class="flex">
        <div class="flex-1 pr-4">
          <div v-if="title || source" class="text-base">
            <!--   title -->
            <h3 v-if="title" class="font-medium text-gray-800">{{ title }}</h3>
            <!-- source  -->
            <p v-if="source" class="text-gray-600 text-sm mt-1">
              {{ source }}
            </p>
          </div>
          
          <div v-if="link" class="mt-4">
            <QRCode :value="link" :size="size" />
          </div>
        </div>

        <div class="flex items-end justify-end gap-4">
          <div class="w-12 h-12 flex-shrink-0">
            <img 
              src="../../assets/logo.png"
              alt="Vue Logo" 
              class="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import SourceImage from './SourceImage.vue'
import QRCode from 'qrcode.vue'


const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: ''
  }
})

const size = computed(() => {
  // 根据设备宽度动态设置 QRCode 大小
  return window.innerWidth < 600 ? 50 : 70; // 小于600px时为100，大于等于600px时为200
})

</script>

<style scoped>
.source-info {
  transition: all 0.3s ease;
}
</style>