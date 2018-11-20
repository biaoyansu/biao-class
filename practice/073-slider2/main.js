// 轮播容器
const parent = document.querySelector('.slider');
// 轮播中的每一页
const slides = parent.querySelectorAll('.item');

// 记录最后一页的索引，方便后面使用
let lastIndex = slides.length - 1;
// 默认从第一页开始
let currentIndex = 0;

// 一切从此开始
boot();

/**
 * 启动函数，一切从此开始
 */
function boot() {
  // 确保一开始就滚动一次
  // 横向移动
  slideX();
  // "前后"移动
  slideZ();

  // 每隔1秒滚动一次
  setInterval(() => {
    // 自增currentIndex
    increment();

    // 滚动其实就是重新调整元素位置
    // 横向移动
    slideX();
    // "前后"移动
    slideZ();
  }, 1000);
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

  // 前一页向左挪
  prev.style.left = -prev.offsetWidth + 'px';
  // 当前页在中间
  current.style.left = 0;
  // 后一页向右挪
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

  prev.style.zIndex = 1; // 前一页次重要
  current.style.zIndex = 2; // 当前页最重要，所以最靠前
  next.style.zIndex = 0; // 下一页最不重要，因为还看不见
}

/**
 * 自增当前索引
 *
 * 也就是翻页（自增页码）
 */
function increment() {
  // 如果当前页面在所有页码范围内就直接加1
  if (currentIndex < lastIndex) // 图示：[*][][] 或 [][*][]
    currentIndex++;
  // 否则就回归到0
  else // 图示：[][][*]
    currentIndex = 0;
}

/**
 * 获取上一页的元素对象
 * @return {HTMLElement}
 */
function getPrev() {
  // 如果当前页面不是第一页，就可以直接减1
  if (currentIndex > 0) // 图示：[][*][] 或 [][][*]
    return slides[currentIndex - 1];
  else // 图示：[*][][]
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
  // 如果当前页面在所有页码范围内就直接加1
  if (currentIndex < lastIndex) // 图示：[*][][] 或 [][*][]
    return slides[currentIndex + 1];
  // 否则就回归到0
  else // 图示：[][][*]
    return slides[0];
}
