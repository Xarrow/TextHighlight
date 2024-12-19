/**
 * 将连续的高亮部分或非高亮部分组合成段落
 */
export function processTextSections(parts) {
  if (!parts || parts.length === 0) return []

  const sections = []
  let currentSection = null
  let globalIndex = 0

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]

    if (!currentSection || currentSection.type !== (part.highlight ? 'highlight' : 'normal')) {
      if (currentSection) {
        globalIndex += currentSection.parts.length
      }
      
      currentSection = {
        type: part.highlight ? 'highlight' : 'normal',
        parts: [],
        startIndex: globalIndex
      }
      sections.push(currentSection)
    }

    currentSection.parts.push(part)
  }

  return sections
}