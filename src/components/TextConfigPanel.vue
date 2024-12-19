<template>
  <div class="space-y-6">
    <!-- Highlight Text Input -->
    <div class="space-y-2">
      <label class="text-sm text-gray-600">高亮文本</label>
      <TextInput
        :model-value="highlightText"
        @update:model-value="$emit('update:highlightText', $event)"
        :rows="1"
        placeholder="输入要高亮显示的文本..."
        class="slide-up"
      />
    </div>

    <!-- Source Information -->
    <div class="space-y-4">
      <h3 class="text-sm font-medium text-gray-700">文章来源信息</h3>
      
      <div class="space-y-2">
        <label class="text-sm text-gray-600">文章标题</label>
        <input
          :value="articleTitle"
          @input="$emit('update:articleTitle', $event.target.value)"
          type="text"
          placeholder="输入文章标题..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300"
        />
      </div>
      
      <div class="space-y-2">
        <label class="text-sm text-gray-600">来源</label>
        <input
          :value="articleSource"
          @input="$emit('update:articleSource', $event.target.value)"
          type="text"
          placeholder="输入来源..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300"
        />
      </div>
      
      <div class="space-y-2">
        <label class="text-sm text-gray-600">配图链接</label>
        <input
          :value="articleImage"
          @input="$emit('update:articleImage', $event.target.value)"
          type="text"
          placeholder="输入配图URL..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300"
        />
      </div>

      <div class="space-y-2">
        <label class="text-sm text-gray-600">文章链接</label>
        <input
          :value="articleLink"
          @input="$emit('update:articleLink', $event.target.value)"
          type="text"
          placeholder="输入文章链接..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-200 hover:border-blue-300"
        />
      </div>
    </div>

    <!-- Text Style Controls -->
    <div class="space-y-2">
      <label class="text-sm text-gray-600">文本样式</label>
      <HighlightStyleControls
        :scale="textScale"
        :spacing="textSpacing"
        @update:scale="$emit('update:textScale', $event)"
        @update:spacing="$emit('update:textSpacing', $event)"
        class="slide-up"
      />
    </div>
  </div>
</template>

<script setup>
import TextInput from './TextInput.vue'
import HighlightStyleControls from './HighlightStyleControls.vue'

defineProps({
  highlightText: String,
  articleTitle: String,
  articleSource: String,
  articleImage: String,
  articleLink: String,
  textScale: Number,
  textSpacing: Number
})

defineEmits([
  'update:highlightText',
  'update:articleTitle',
  'update:articleSource',
  'update:articleImage',
  'update:articleLink',
  'update:textScale',
  'update:textSpacing'
])
</script>