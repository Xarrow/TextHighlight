export const quoteConfig = {
  // 引号大小配置
  size: {
    scale: 0.85,        // 基础缩放比例
    scaleHover: 0.9,    // 悬浮时的缩放比例
    verticalOffset: -0.05  // 垂直位置偏移（em单位）
  },
  
  // 间距配置
  spacing: {
    before: 0.1,     // 前引号右间距（em单位）
    after: 0.1,      // 后引号左间距（em单位）
    edge: 0.05       // 引号与边缘的间距（em单位）
  },
  
  // 动画配置
  animation: {
    duration: 400,   // 过渡动画持续时间（毫秒）
    timing: 'cubic-bezier(0.4, 0, 0.2, 1)'  // 过渡时间函数
  }
}