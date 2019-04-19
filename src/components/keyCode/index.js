import keyCode from '../keyCode/keyDo.vue'
// 这里是重点
const install = (vue, options = {}) => {
  vue.component('keyDo', keyCode)
}

// 导出组件
// default export
export default {
  install,
  keyCode
}
