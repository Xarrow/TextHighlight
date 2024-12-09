<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-3xl font-bold mb-8 text-center text-content slide-up">
        文本高亮显示工具
      </h1>
      <TextHighlighter />
    </div>
  </div>
</template>

<script setup>
import TextHighlighter from './components/TextHighlighter.vue'
</script>