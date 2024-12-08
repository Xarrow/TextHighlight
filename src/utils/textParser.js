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
      if (match.index > lastIndex) {
        // Split non-highlighted text into smaller chunks for smoother animation
        const text = fullText.substring(lastIndex, match.index)
        const chunks = text.match(/[\u4e00-\u9fa5]|[a-zA-Z]+|\s+|[^a-zA-Z\u4e00-\u9fa5\s]/g) || []
        
        chunks.forEach(chunk => {
          parts.push({
            text: chunk,
            highlight: false
          })
        })
      }
      
      // Split highlighted text into smaller chunks as well
      const highlightedChunks = match[0].match(/[\u4e00-\u9fa5]|[a-zA-Z]+|\s+|[^a-zA-Z\u4e00-\u9fa5\s]/g) || []
      
      highlightedChunks.forEach(chunk => {
        parts.push({
          text: chunk,
          highlight: true
        })
      })
      
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < fullText.length) {
      const remainingText = fullText.substring(lastIndex)
      const chunks = remainingText.match(/[\u4e00-\u9fa5]|[a-zA-Z]+|\s+|[^a-zA-Z\u4e00-\u9fa5\s]/g) || []
      
      chunks.forEach(chunk => {
        parts.push({
          text: chunk,
          highlight: false
        })
      })
    }
  } catch (e) {
    // Fallback in case of regex error
    return [{ text: fullText, highlight: true }]
  }

  return parts
}