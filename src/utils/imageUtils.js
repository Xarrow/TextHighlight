import { ref } from 'vue'

// 图片状态管理
export const imageStatus = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}

// 验证图片URL
export function isValidImageUrl(url) {
  if (!url) return false
  
  try {
    const urlObj = new URL(url)
    return /^https?:/.test(urlObj.protocol)
  } catch {
    return false
  }
}

// 处理图片URL
export function processImageUrl(url) {
  if (!isValidImageUrl(url)) return ''
  // url = `https://wild-lake-23e3.helixcs.workers.dev/${url}`

  try {
    const urlObj = new URL(url)
    // 添加时间戳防止缓存
    urlObj.searchParams.set('t', Date.now())
    // 对于某些常见的图片CDN，添加特殊处理
    if (urlObj.hostname.includes('cloudinary.com')) {
      urlObj.searchParams.set('cors', 'true')
    }
    return urlObj.toString()
  } catch {
    return url
  }
}

// 图片加载hook
export function useImageLoader(options = {}) {
  const status = ref(imageStatus.LOADING)
  const error = ref(null)
  
  const load = async (url) => {
    if (!isValidImageUrl(url)) {
      status.value = imageStatus.ERROR
      error.value = new Error('Invalid image URL')
      return false
    }

    status.value = imageStatus.LOADING
    error.value = null

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = (error) => {
          // do nothing
        }
        console.log(`real url: ${url}`)
        img.src = processImageUrl(url)
        
        // 设置超时
        if (options.timeout) {
          setTimeout(() => reject(new Error('Image load timeout')), options.timeout)
        }
      })

      status.value = imageStatus.SUCCESS
      return true
    } catch (err) {
      status.value = imageStatus.ERROR
      error.value = err
      return false
    }
  }

  return {
    status,
    error,
    load
  }
}