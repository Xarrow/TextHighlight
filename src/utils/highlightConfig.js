export const highlightConfig = {
  // 文字样式配置
  text: {
    scale: 1.1,         // 高亮文字放大比例
    fontWeight: 600,    // 字重
    spacing: {
      letter: 0.02,     // 字间距（em单位）
      word: 0.0,        // 词间距（em单位）
      padding: 0.1      // 文字内边距（em单位）
    },
    transition: {
      duration: 300,    // 过渡动画持续时间（毫秒）
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'  // 过渡时间函数
    }
  },
  
  // 引号样式配置
  quote: {
    size: {
      scale: 1.2,           // 基础缩放比例
      scaleHover: 1.3,      // 悬浮时的缩放比例
      verticalOffset: -0.1   // 垂直位置偏移（em单位）
    },
    
    spacing: {
      before: 0.15,     // 前引号右间距（em单位）
      after: 0.15,      // 后引号左间距（em单位）
      edge: 0.05        // 引号与边缘的间距（em单位）
    },
    
    animation: {
      duration: 400,    // 过渡动画持续时间（毫秒）
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'  // 过渡时间函数
    }
  }
}