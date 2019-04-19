import LFirm from './Lfirm.vue'
import loading from './Lfirm'
/**
 *
 * @param vue
 * @param options
 * {
 *     offset:String || Number   // extra distance for preload
 *     events:['scroll','resize'..]  //events which window should listen
 *  }
 */
const install = (vue, options = {}) => {
  vue.component('LFirm', LFirm)
  // eslint-disable-next-line new-cap
  let load = new loading()
  vue.prototype.$loading = load
}
// default exportd
export default {
  install,
  LFirm
}
export { install, LFirm }
