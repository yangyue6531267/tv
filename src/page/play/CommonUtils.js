
// 跑马灯
function startMarquee (elementId) {
  let element = document.getElementById(elementId);
  if (!element || typeof (element) == 'undefined') {
    console.log('startMarquee id is null');
    return -1;
  }
  console.log('startMarquee widgth = ' + element.clientWidth + 'scrollwidth = ' + element.scrollWidth);
  let scrolled = 0;
  let count = 0;

  let timer = setInterval(() => {
    // 一开始先停一下不然看不清第一个字
    if (scrolled == 0) {
      if (count < 15) {
        count++;
        return;
      } else {
        count = 0;
      }
    }
    // 到最后停一下不然看不清最后一个字
    if (scrolled != 0 && scrolled == element.scrollLeft) {
      if (count > 15) {
        element.scrollLeft = 0;
        scrolled = 0;
        count = 0;
      } else {
        count++;
      }
    } else {
      if (element.scrollLeft == 0) { element.scrollLeft = 1; }
      scrolled = element.scrollLeft++;
    }
  }, 100);

  return timer;
}

// 停止跑马灯
function clearMarquee (elementId, timer) {
  console.log('clearMarquee enter + id = ' + elementId);
  let element = document.getElementById(elementId);
  if (!element || typeof (element) == 'undefined') {
    console.log('clearMarquee id is null');
    return;
  }
  element.scrollLeft = 0;
  if (timer != null || typeof (timer) == 'undefined') {
    clearInterval(timer);
  }
}

function startMarqueeV2 (elementId, elementId1) {
  let element = document.getElementById(elementId);
  // alert(elementId);
  // alert(elementId1);

  let element1 = document.getElementById(elementId1);
  if (!element || typeof (element) == 'undefined') {
    console.log('startMarquee id is null');
    return -1;
  }
  console.log('startMarquee widgth = ' + element.clientWidth + 'scrollwidth = ' + element.scrollWidth);
  let scrolled = 0;
  let scrolled1 = 0;
  let offsetWidth = parseInt(element.offsetWidth);
  let scrollWidth = parseInt(element.scrollWidth);
  let timer = setInterval(() => {
    // 后面/50是凑的
    if (scrolled != 0 && scrolled1 >= (offsetWidth + offsetWidth / 50)) {
      element.scrollLeft = 0;
      element1.scrollLeft = 0;
      scrolled = 0;
      scrolled1 = 0;
    } else {
      if (element.scrollLeft >= (scrollWidth - offsetWidth / 2)) {
        element1.scrollLeft += 2;
        scrolled1 += 2;
      }
      scrolled = element.scrollLeft += 2;
    }
  }, 80);
  return timer;
}

// 停止跑马灯
function clearMarqueeV2 (elementId, elementId1, timer) {
  console.log('clearMarquee enter + id = ' + elementId);
  try {
    let element = document.getElementById(elementId);
    let element1 = document.getElementById(elementId1);
    element.scrollLeft = 0;
    element1.scrollLeft = 0;
    clearInterval(timer);
  } catch (error) {
    console.log('clearMarqueeV2 error = ' + error);
  }
}

// 水平listview处理滚动事件让当前焦点可见
function horizontalScroll (elementId, itemWidth, itemIndex, lineWidth, isLeft, toFirst) {
  let element = document.getElementById(elementId);
  if (!element || typeof (element) == 'undefined') {
    console.log('horizontalScroll id is null');
    return;
  }
  // 负数
  let currLeft = parseFloat(element.style.left);
  if (isNaN(currLeft)) { currLeft = 0; }
  let minLeft = 0 - itemWidth * itemIndex; // 使元素可见的最小left，有误差多加一个
  let maxLeft = lineWidth - itemWidth - itemWidth * itemIndex; // 使元素可见的最大left，有误差多加一个
  // console.log("horizontalScroll itemWidth = " +
  // itemWidth + " currLeft = " + currLeft + "lineWidth = " + lineWidth + "itemIndex = " + itemIndex
  //     + " leftsytle = " + element.style.left + "min = " + minLeft + " max = " + maxLeft + "lineWidth = " + lineWidth);

  if (toFirst) {
    element.style.left = minLeft > 0 ? 0 : minLeft + 'px';
  } else {
    let left = maxLeft > 0 ? 0 : maxLeft;
    if (currLeft > minLeft && currLeft < maxLeft && left != 0) {
      // console.log("！！！currLeft = " + currLeft + "(minLeft + itemWidth) = " + (minLeft + itemWidth));
      return;
    }
    if (isLeft) {
      if (currLeft > minLeft) { return; }
      element.style.left = minLeft > 0 ? 0 : minLeft + 'px';
    } else {
      //  console.log("ffffff left = " + left);
      element.style.left = left + 'px';
    }
  }
}

// 水平listview处理滚动事件让当前焦点可见
function horizontalScrollWithPreWidth (elementId, itemWidth, itemIndex, lineWidth, isLeft, preWidth, toFirst) {
  let element = document.getElementById(elementId);
  if (!element || typeof (element) == 'undefined') {
    console.log('horizontalScrollWithPreWidth id is null');
    return;
  }
  // 负数
  let currLeft = parseFloat(element.style.left);
  if (isNaN(currLeft)) { currLeft = 0; }
  let minLeft = 0 - preWidth; // 使元素可见的最小left，有误差多加一个
  let maxLeft = lineWidth - itemWidth - preWidth; // 使元素可见的最大left，有误差多加一个
  // console.log("horizontalScrollWithPreWidth itemWidth = " +
  // itemWidth + " currLeft = " + currLeft + "lineWidth = " + lineWidth + "itemIndex = " + itemIndex
  //     + " leftsytle = " + element.style.left + "min = " + minLeft + " max = " + maxLeft + "lineWidth = " + lineWidth
  //     + "preWidth = " + preWidth + "isLeft = " + isLeft);

  if (toFirst) {
    element.style.left = minLeft > 0 ? 0 : minLeft + 'px';
  } else {
    let left = maxLeft > 0 ? 0 : maxLeft;
    if (currLeft > minLeft && currLeft < maxLeft && left != 0) {
      // console.log("！！！currLeft = " + currLeft + "(minLeft + itemWidth) = " + (minLeft + itemWidth));
      return;
    }
    if (isLeft) {
      if (currLeft > minLeft) { return; }
      element.style.left = minLeft > 0 ? 0 : minLeft + 'px';
    } else {
      //  console.log("ffffff left = " + left);
      element.style.left = left + 'px';
    }
  }
}

// 水平翻页滚动
function horizontalScrollPage (elementId, lineWidth, pageSize, currIndex) {
  console.log('horizontalScrollPage lineWidth = ' + lineWidth + ' pageSize = ' + pageSize + ' currIndex = ' + currIndex);
  let element = document.getElementById(elementId);
  if (!element || typeof (element) == 'undefined') {
    console.log('horizontalScrollPage id is null');
    return;
  }
  let left = 0;
  if (currIndex + 1 > pageSize) {
    left = 0 - (lineWidth * parseInt((currIndex) / pageSize));
  }

  element.style.left = left + 'px';
}

// 垂直listview处理滚动事件让当前焦点可见
function verticalScroll (elementId, itemHeight, itemIndex, lineHeight, isUp, toFirst) {
  let element = document.getElementById(elementId);
  if (!element || typeof (element) == 'undefined') {
    console.log('verticalScroll id is null');
    return;
  }
  // 负数
  let currTop = parseFloat(element.style.top);
  if (isNaN(currTop)) { currTop = 0; }
  let minTop = 0 - itemHeight * itemIndex; // 使元素可见的最小left，有误差多加一个
  let maxTop = lineHeight - itemHeight - itemHeight * itemIndex; // 使元素可见的最大left，有误差多加一个
  // console.log("verticalScroll itemHeight = " +
  //     itemHeight + " currTop = " + currTop + "lineHeight = " + lineHeight + "itemIndex = " + itemIndex
  //     + " leftsytle = " + element.style.top + "min = " + minTop + " max = " + maxTop + "lineHeight = " + lineHeight);

  if (toFirst) {
    element.style.top = minTop > 0 ? 0 : minTop + 'px';
  } else {
    let top = maxTop > 0 ? 0 : maxTop;
    if (currTop > minTop && currTop < maxTop && top != 0) {
      // console.log("！！！currLeft = " + currLeft + "(minLeft + itemWidth) = " + (minLeft + itemWidth));
      return;
    }
    if (isUp) {
      if (currTop > minTop) { return; }
      element.style.top = minTop > 0 ? 0 : minTop + 'px';
    } else {
      //  console.log("ffffff left = " + left);
      element.style.top = top + 'px';
    }
  }
}

export default {
  startMarquee,
  startMarqueeV2,
  clearMarquee,
  clearMarqueeV2,
  horizontalScroll,
  horizontalScrollWithPreWidth,
  verticalScroll,
  horizontalScrollPage
}
