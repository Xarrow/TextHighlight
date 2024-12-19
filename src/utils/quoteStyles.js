// 预定义的引用样式
export const defaultQuoteStyles = {
  default: {
    before: '"',
    after: '"',
    style: {
      color: '#2563eb',
      fontFamily: 'serif'
    }
  },
  chinese: {
    before: '「',
    after: '」',
    style: {
      color: '#2563eb',
      letterSpacing: '-0.05em'
    }
  },
  guillemets: {
    before: '《',
    after: '》',
    style: {
      color: '#2563eb',
      letterSpacing: '-0.05em'
    }
  }
}

// 验证自定义引用样式
function validateCustomStyle(style) {
  return style && 
         typeof style.before === 'string' && 
         typeof style.after === 'string' && 
         (!style.style || typeof style.style === 'object')
}

// 存储自定义样式
const customStyles = new Map()

// 添加自定义引用样式
export function addQuoteStyle(name, style) {
  if (!name || typeof name !== 'string') {
    throw new Error('Style name must be a non-empty string')
  }
  
  if (!validateCustomStyle(style)) {
    throw new Error('Invalid quote style format')
  }
  
  customStyles.set(name, {
    ...style,
    style: {
      color: '#2563eb',
      ...style.style
    }
  })
  
  return true
}

// 获取引用样式
export function getQuoteStyle(type = 'default') {
  return customStyles.get(type) || defaultQuoteStyles[type] || defaultQuoteStyles.default
}

// 获取所有可用的引用样式
export function getAllQuoteStyles() {
  return {
    ...defaultQuoteStyles,
    ...Object.fromEntries(customStyles)
  }
}