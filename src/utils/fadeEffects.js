export function calculateFadeStyle(part, index, parts, totalParts) {
  if (part.highlight) {
    return {
      opacity: 1,
      color: '#000000',
      textShadow: '0 0 1px rgba(0,0,0,0.1)',
      transform: 'scale(1.02)',
      transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }

  const highlightPositions = parts
    .map((p, i) => p.highlight ? i : -1)
    .filter(i => i !== -1)

  if (highlightPositions.length === 0) {
    return { opacity: 1 }
  }

  // Find distances to all highlight positions
  const distances = highlightPositions.map(pos => Math.abs(index - pos))
  const minDistance = Math.min(...distances)
  
  // Calculate base opacity based on minimum distance
  const baseOpacity = Math.max(0.1, 1 - (minDistance / (totalParts * 0.5)))
  
  // Progressive delay based on distance
  const transitionDelay = `${minDistance * 50}ms`
  
  // Calculate character-based fade
  const charPosition = part.text.length > 1 
    ? index / totalParts 
    : (index + 1) / (totalParts + 1)
  
  const progressiveFade = Math.pow(baseOpacity, 1.5)
  const finalOpacity = progressiveFade * (1 - (charPosition * 0.2))

  return {
    opacity: finalOpacity,
    color: `rgba(0, 0, 0, ${Math.max(0.15, finalOpacity)})`,
    transform: `scale(${0.98 + (finalOpacity * 0.02)})`,
    filter: `blur(${(1 - finalOpacity) * 1.5}px)`,
    transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDelay
  }
}