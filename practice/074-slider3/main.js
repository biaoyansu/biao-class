// 轮播容器
const parent = document.querySelector('.slider');
// 轮播中的每一页
const slides = parent.querySelectorAll('.item');

// 记录最后一页的索引，方便后面使用
let lastIndex = slides.length - 1;
// 默认从第一页开始
let currentIndex = 0;
// 默认配置
let config = {
  mode: 'slide',
  interval: 1000,
};

// 一切从此开始
boot({mode: 'fade'});

/**
 * 启动函数，一切从此开始
 */
function boot(custom) {
  config = Object.assign({}, config, custom);

  if (config.mode == 'slide')
  // 确保一开始就滚动一次
    slide();
  else {
    hideAll();
    fade();
  }

  // 每隔config.interval秒就滚动一次
  setInterval(() => {
    // 自增currentIndex
    increment();

    // 判断翻页效果
    if (config.mode == 'slide')
      slide(); // 滚动
    else
      fade(); // 淡入淡出
  }, config.interval);
}

/**
 * 作用滚动效果一次
 */
function slide() {
  slideX();
  slideZ();
}

/**
 * 作用淡入淡出效果一次
 */
function fade() {
  let prev = getPrev();
  let current = getCurrent();

  prev.style.opacity = 0;
  current.style.opacity = 1;
}

/**
 * 隐藏所有页
 *
 * 通常用于准备fade
 */
function hideAll() {
  slides.forEach(el => {
    el.style.opacity = 0;
  });
}

/**
 * 横向移动
 *
 * 调整前一页、当前页和后一页的横向位置
 */
function slideX() {
  let prev = getPrev();
  let current = getCurrent();
  let next = getNext();

  prev.style.left = -prev.offsetWidth + 'px';
  current.style.left = 0;
  next.style.left = next.offsetWidth + 'px';
}

/**
 * "前后"移动
 *
 * 调整前一页、当前页和后一页的覆盖次序
 * 防止在动画过程中，页面间出现重叠或抖动的现象
 */
function slideZ() {
  let prev = getPrev();
  let current = getCurrent();
  let next = getNext();

  prev.style.zIndex = 1;
  current.style.zIndex = 2;
  next.style.zIndex = 0;
}

/**
 * 自增当前索引
 *
 * 也就是翻页（自增页码）
 */
function increment() {
  if (currentIndex < lastIndex)
    currentIndex++;
  else
    currentIndex = 0;
}

/**
 * 获取上一页的元素对象
 * @return {HTMLElement}
 */
function getPrev() {
  if (currentIndex > 0)
    return slides[currentIndex - 1];
  else
    return slides[lastIndex];
}

/**
 * 获取当前页的元素对象
 * @return {HTMLElement}
 */
function getCurrent() {
  return slides[currentIndex];
}

/**
 * 获取下一页的元素对象
 * @return {HTMLElement}
 */
function getNext() {
  if (currentIndex < lastIndex)
    return slides[currentIndex + 1];
  else
    return slides[0];
}
