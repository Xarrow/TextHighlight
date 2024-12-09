function splitIntoChunks(text) {
  // 将文本分割成更小的单位：
  // - 单个汉字
  // - 连续的英文字母
  // - 空格
  // - 标点符号
  return text.match(/[\u4e00-\u9fa5]|[a-zA-Z]+|\s+|[^a-zA-Z\u4e00-\u9fa5\s]/g) || []
}

function processTextChunks(chunks, isHighlighted) {
  return chunks.map(chunk => ({
    text: chunk,
    highlight: isHighlighted
  }))
}

export function parseText(fullText, highlightText) {
  if (!fullText) {
    return []
  }
  
  if (!highlightText) {
    return [{ text: fullText, highlight: true }]
  }

  const parts = []
  let lastIndex = 0
  const regex = new RegExp(highlightText, 'g')
  let match

  try {
    while ((match = regex.exec(fullText)) !== null) {
      // 处理非高亮部分
      if (match.index > lastIndex) {
        const text = fullText.substring(lastIndex, match.index)
        const chunks = splitIntoChunks(text)
        parts.push(...processTextChunks(chunks, false))
      }
      
      // 处理高亮部分
      const highlightedChunks = splitIntoChunks(match[0])
      parts.push(...processTextChunks(highlightedChunks, true))
      
      lastIndex = match.index + match[0].length
    }

    // 处理剩余文本
    if (lastIndex < fullText.length) {
      const remainingText = fullText.substring(lastIndex)
      const chunks = splitIntoChunks(remainingText)
      parts.push(...processTextChunks(chunks, false))
    }
  } catch (e) {
    // 发生错误时返回完整文本
    return [{ text: fullText, highlight: true }]
  }

  return parts
}