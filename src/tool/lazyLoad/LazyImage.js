import { getStyle, getScrollParent, checkInView, throttle, debounce } from './utils';

const DEFAULT_EVENTS = ['onload', 'scroll', 'animationend', 'transitionend', 'keyDown', 'keydown', 'keyup', 'keyUp'];

class LazyImage {
  constructor (options = {}) {
    this.init(options);
  }

  init (options = {}) {
    this.images = []; // list of unload-images info
    this.scrollParent = new WeakSet(); // list of scrollParent listener
    this.options = options;
    this.eventsList = options.eventsList || DEFAULT_EVENTS;
  }

  addImage (el) {
    if (!el.tagName || el.tagName.toLowerCase() !== 'img') return;
    let scrollParent = getScrollParent(el);
    if (!scrollParent) return;
    let image = {
      el: el,
      scrollParent: scrollParent
    };
    // console.log(el);
    this.images.push(image);
    this.initListener(scrollParent);
  }

  removeImage (el) {
    //  if (el.dataset.src.indexOf('http')>=0){

    //  }else{
    //  销毁时需要移除懒加载图片,但是组件如果做了keep-alive 会导致图片更新不出来
    // console.log("images is delete"+el.src);
    //   const index = this.images.findIndex(item => item.el === el);
    //   this.images.splice(index, 1);
    //  }

  }
  removeAll (){
    console.log('remove all images');
    this.images = [];
    //  console.log(this.images); // 输出 []，空数组，即被清空了
  }

  initListener (scrollParent) {
    let loadFn;
    // get throttle or debounce function
    if (this.options.throttle) {
      loadFn = throttle(this.loadImage, this.options.throttle);
    } else if (this.options.debounce) {
      loadFn = debounce(this.loadImage, this.options.debounce);
    } else loadFn = this.loadImage;
    if (!this.scrollParent.has(scrollParent)) {
      const position = getStyle(scrollParent, 'position');
      if (position === '' || position === 'static') scrollParent.style.position = 'relative';
      this.scrollParent.add(scrollParent);
      this.eventsList.forEach((event) => {
        scrollParent.addEventListener(event, loadFn.bind(this));
      })
    }
  }

  loadImage () {
    let images = this.images;
    // refresh images
    for (let i = 0; i < images.length; i++) {
      const scrollParent = images[i].scrollParent;
      const el = images[i].el;
      // ready to enter the screen but still "options.offset" px to go,load the img
      if (checkInView(el, scrollParent, this.options.offset)) {
        let src = el.dataset.src;
        if (!src) {
          // console.log(el);
          src = require('../../assets/img_loading_160x230.png');
          console.log(`${el} has no attribute 'data-src'!`);
        }
        let tmpImg = new Image();
        tmpImg.src = src;
        tmpImg.onload = () => {
          el.src = src;
          tmpImg = null;
        }
        tmpImg.onerror = () => {
          el.src = require('../../assets/img_loading_160x230.png');
          tmpImg = null;
        }
        images.splice(i--, 1);
      }
    }
  }
}

export default LazyImage;
