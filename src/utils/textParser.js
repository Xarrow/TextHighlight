// 文本分割规则
const TEXT_PATTERNS = {
  CHINESE_CHAR: /[\u4e00-\u9fa5]/,
  ENGLISH_WORD: /[a-zA-Z]+/,
  WHITESPACE: /\s+/,
  PUNCTUATION: /[.,!?;:]/,
  OTHER: /[^\s\u4e00-\u9fa5a-zA-Z]/
}

function splitIntoChunks(text) {
  const pattern = new RegExp(
    Object.values(TEXT_PATTERNS)
      .map(p => p.source)
      .join('|'),
    'g'
  )
  return text.match(pattern) || []
}

function processTextChunks(chunks, isHighlighted) {
  return chunks.map(chunk => ({
    text: chunk,
    highlight: isHighlighted,
    type: getChunkType(chunk)
  }))
}

function getChunkType(chunk) {
  for (const [type, pattern] of Object.entries(TEXT_PATTERNS)) {
    if (pattern.test(chunk)) {
      return type.toLowerCase()
    }
  }
  return 'other'
}

export function parseText(fullText, highlightText) {
  if (!fullText?.trim()) {
    return []
  }

  // 如果没有高亮文本，将整个文本作为一个高亮块
  if (!highlightText?.trim()) {
    return processTextChunks(splitIntoChunks(fullText), true)
  }

  try {
    const parts = []
    let lastIndex = 0
    const regex = new RegExp(highlightText, 'g')
    let match

    while ((match = regex.exec(fullText)) !== null) {
      // 处理非高亮部分
      if (match.index > lastIndex) {
        const text = fullText.substring(lastIndex, match.index)
        parts.push(...processTextChunks(splitIntoChunks(text), false))
      }
      
      // 处理高亮部分
      const highlightedText = match[0]
      parts.push(...processTextChunks(splitIntoChunks(highlightedText), true))
      
      lastIndex = match.index + highlightedText.length
    }

    // 处理剩余文本
    if (lastIndex < fullText.length) {
      const remainingText = fullText.substring(lastIndex)
      parts.push(...processTextChunks(splitIntoChunks(remainingText), false))
    }

    return parts
  } catch (e) {
    console.error('Text parsing error:', e)
    return processTextChunks(splitIntoChunks(fullText), true)
  }
}