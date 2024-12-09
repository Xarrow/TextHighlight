import { fadeConfig as config } from './fadeConfig'

// 计算基础透明度
function calculateBaseOpacity(minDistance, totalParts) {
  const { min, max } = config.opacity
  const { factor } = config.distance
  
  const normalizedDistance = minDistance / (totalParts * factor)
  return Math.max(min, max - normalizedDistance)
}

// 计算字符位置权重
function calculatePositionWeight(index, totalParts, textLength) {
  return textLength > 1 
    ? index / totalParts 
    : (index + 1) / (totalParts + 1)
}

// 计算最终透明度
function calculateFinalOpacity(baseOpacity, positionWeight) {
  const { power } = config.distance
  const { factor } = config.position
  
  const progressiveFade = Math.pow(baseOpacity, power)
  return progressiveFade * (1 - (positionWeight * factor))
}

// 计算模糊效果
function calculateBlurEffect(opacity) {
  const { max, factor } = config.blur
  return `blur(${Math.max(0, (1 - opacity) * max * factor)}px)`
}

// 计算缩放效果
function calculateScale(opacity) {
  const { min, max } = config.scale
  const scale = min + (opacity * (max - min))
  return `scale(${scale})`
}

// 生成过渡样式
function generateTransition(minDistance) {
  const { duration, delay, timing } = config.transition
  const transitionDelay = `${minDistance * delay}ms`
  return `all ${duration}ms ${timing}`
}

export function calculateFadeStyle(part, index, parts, totalParts) {
  // 高亮部分保持原样
  if (part.highlight) {
    return {
      opacity: config.opacity.max,
      color: '#000000',
      textShadow: '0 0 1px rgba(0,0,0,0.1)',
      transform: `scale(${config.scale.max})`,
      transition: generateTransition(0)
    }
  }

  // 获取所有高亮位置
  const highlightPositions = parts
    .map((p, i) => p.highlight ? i : -1)
    .filter(i => i !== -1)

  // 如果没有高亮部分，显示所有文字
  if (highlightPositions.length === 0) {
    return { 
      opacity: config.opacity.max,
      transition: generateTransition(0)
    }
  }

  // 计算与最近高亮部分的距离
  const distances = highlightPositions.map(pos => Math.abs(index - pos))
  const minDistance = Math.min(...distances)
  
  // 计算基础透明度
  const baseOpacity = calculateBaseOpacity(minDistance, totalParts)
  
  // 计算位置权重
  const positionWeight = calculatePositionWeight(index, totalParts, part.text.length)
  
  // 计算最终透明度
  const finalOpacity = calculateFinalOpacity(baseOpacity, positionWeight)

  return {
    opacity: finalOpacity,
    color: `rgba(0, 0, 0, ${Math.max(config.opacity.min, finalOpacity)})`,
    transform: calculateScale(finalOpacity),
    filter: calculateBlurEffect(finalOpacity),
    transition: generateTransition(minDistance)
  }
}