/* eslint-disable camelcase */
import { HTTPUtil as api } from '../fetch/api.js'
import { client as yh } from '../js/client.js'

var bp = {}

// eslint-disable-next-line no-use-before-define
var _gaq = _gaq || []

_gaq.push(['sys_v', 'bsjx'])
_gaq.push(['model', 'bs'])
_gaq.push(['soft_v', '1.0.1'])
_gaq.push(['device_id', '000000'])
_gaq.push(['site_id', '101'])
_gaq.push(['v', '2'])

// 应用启动
bp.openApp = function () {
  let pageUrl = encodeURIComponent(location.href)
  _gaq.push(['event', 102])
  _gaq.push(['page_url', pageUrl])
  combineArgs()
}

// 关闭应用
bp.closeApp = function (pageId, oldTime) {
  let stayTime = oldTime
  _gaq.push(['event', 103])
  _gaq.push(['page_type', 1])
  _gaq.push(['page_id', pageId])
  _gaq.push(['time', stayTime])
  combineArgs()
}

// 访问页面（加载时长）
bp.loadPage = function (
  traceId,
  traceType,
  pageType,
  pageId,
  parent_page_type,
  parent_page_id,
  special_type,
  oldTime
) {
  let stayTime = oldTime
  let new_traceId = (traceId + '').replace('undefined', '')
  let new_traceType = (traceType + '').replace('undefined', '')
  let new_parent_page_type = (parent_page_type + '').replace('undefined', 0)
  let new_parent_page_id = (parent_page_id + '').replace('undefined', 0)
  if (special_type != '' || special_type != 0) {
    _gaq.push(['special_type', special_type])
  }

  _gaq.push(['event', 104])
  _gaq.push(['time', stayTime])
  _gaq.push(['trace_id', new_traceId])
  _gaq.push(['trace_type', new_traceType])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  _gaq.push(['parent_page_type', new_parent_page_type])
  _gaq.push(['parent_page_id', new_parent_page_id])
  combineArgs()
}
// 离开页面（页面停留时间）
bp.closPage = function (
  traceId,
  traceType,
  pageType,
  pageId,
  parent_page_type,
  parent_page_id,
  special_type,
  oldTime
) {
  let stayTime = oldTime
  let new_traceId = (traceId + '').replace('undefined', '')
  let new_traceType = (traceType + '').replace('undefined', '')
  let new_parent_page_type = (parent_page_type + '').replace('undefined', 0)
  let new_parent_page_id = (parent_page_id + '').replace('undefined', 0)
  if (special_type != '') {
    _gaq.push(['special_type', special_type])
  }
  _gaq.push(['event', 105])
  _gaq.push(['time', stayTime])
  _gaq.push(['trace_id', new_traceId])
  _gaq.push(['trace_type', new_traceType])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  _gaq.push(['parent_page_type', new_parent_page_type])
  _gaq.push(['parent_page_id', new_parent_page_id])
  combineArgs()
}

// 栏目点击
bp.categoryClick = function (
  cat_id,
  cat_elements,
  click_type,
  pageType,
  pageId,
  traceId,
  traceType
) {
  _gaq.push(['event', 3])
  _gaq.push(['cat_id', cat_id])
  _gaq.push(['cat_elements', cat_elements])
  _gaq.push(['click_type', click_type])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  _gaq.push(['trace_id', traceId])
  _gaq.push(['trace_type', traceType])
  combineArgs()
}

// 收藏/取消收藏
bp.collect = function (
  traceId,
  traceType,
  pageType,
  pageId,
  parent_page_type,
  parent_page_id,
  cat_id,
  asset_id,
  collect_type,
  type
) {
  _gaq.push(['event', 4])
  _gaq.push(['cat_id', cat_id])
  _gaq.push(['asset_id', asset_id])
  _gaq.push(['collect_type', collect_type])
  _gaq.push(['type', type])
  _gaq.push(['trace_id', traceId])
  _gaq.push(['trace_type', traceType])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  _gaq.push(['parent_page_type', parent_page_type])
  _gaq.push(['parent_page_id', parent_page_id])
  combineArgs()
}

// 在收藏页面点击
bp.collectPage = function (
  traceId,
  traceType,
  pageType,
  pageId,
  parent_page_type,
  parent_page_id,
  asset_id,
  trace_id,
  trace_type,
  special_type,
  type
) {
  _gaq.push(['event', 5])
  _gaq.push(['asset_id', asset_id])
  _gaq.push(['trace_id', trace_id])
  _gaq.push(['trace_type', trace_type])
  _gaq.push(['special_type', special_type])
  _gaq.push(['type', type])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  _gaq.push(['parent_page_type', parent_page_type])
  _gaq.push(['parent_page_id', parent_page_id])
  combineArgs()
}

// 在搜索页点击
bp.searchClick = function (
  search_txt,
  asset_id,
  search_type,
  trace_id,
  trace_type,
  special_type,
  pageType,
  pageId,
  parent_page_type,
  parent_page_id
) {
  _gaq.push(['event', 6])
  if (search_txt != '') {
    _gaq.push(['search_txt', search_txt])
  }
  if (special_type != '') {
    _gaq.push(['special_type', special_type])
  }
  _gaq.push(['asset_id', asset_id])
  _gaq.push(['search_type', search_type])
  _gaq.push(['trace_id', trace_id])
  _gaq.push(['trace_type', trace_type])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  _gaq.push(['parent_page_type', parent_page_type])
  _gaq.push(['parent_page_id', parent_page_id])
  combineArgs()
}

// 在历史页中点击
bp.historyClick = function (
  asset_id,
  type,
  traceId,
  traceType,
  pageType,
  pageId,
  parent_page_type,
  parent_page_id
) {
  _gaq.push(['event', 7])
  _gaq.push(['asset_id', asset_id])
  _gaq.push(['type', type])
  _gaq.push(['trace_id', traceId])
  _gaq.push(['trace_type', traceType])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  _gaq.push(['parent_page_type', parent_page_type])
  _gaq.push(['parent_page_id', parent_page_id])
  combineArgs()
}

// 演员专题点击
bp.actorClick = function (
  belongs_asset_id,
  cat_elements,
  rec_type,
  traceId,
  traceType,
  pageType,
  pageId,
  parent_page_type,
  parent_page_id
) {
  _gaq.push(['event', 11])
  _gaq.push(['belongs_asset_id', belongs_asset_id])
  _gaq.push(['cat_elements', cat_elements])
  _gaq.push(['rec_type', rec_type])
  _gaq.push(['trace_id', traceId])
  _gaq.push(['trace_type', traceType])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  _gaq.push(['parent_page_type', parent_page_type])
  _gaq.push(['parent_page_id', parent_page_id])
  combineArgs()
}

// 推荐资产点击
bp.recommendClick = function (
  belongs_asset_id,
  cat_elements,
  rec_type,
  pageType,
  pageId
) {
  _gaq.push(['event', 12])
  _gaq.push(['belongs_asset_id', belongs_asset_id])
  _gaq.push(['cat_elements', cat_elements])
  _gaq.push(['rec_type', rec_type])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  combineArgs()
}

// 筛选页面点击
bp.shaixuan = function (
  screen_txt,
  trace_id,
  trace_type,
  parent_page_type,
  parent_page_id,
  special_type,
  pageType,
  pageId
) {
  _gaq.push(['event', 14])
  _gaq.push(['screen_txt', screen_txt])
  _gaq.push(['trace_id', trace_id])
  _gaq.push(['trace_type', trace_type])
  _gaq.push(['parent_page_type', parent_page_type])
  _gaq.push(['parent_page_id', parent_page_id])
  _gaq.push(['special_type', special_type])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  combineArgs()
}

// 搜索结果页点击
bp.searchResultClick = function (
  search_txt,
  search_type,
  trace_id,
  trace_type,
  parent_page_type,
  parent_page_id,
  pageType,
  pageId
) {
  _gaq.push(['event', 16])
  _gaq.push(['search_txt', search_txt])
  _gaq.push(['search_type', search_type])
  _gaq.push(['trace_id', trace_id])
  _gaq.push(['trace_type', trace_type])
  _gaq.push(['parent_page_type', parent_page_type])
  _gaq.push(['parent_page_id', parent_page_id])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  combineArgs()
}

// 筛选结果点击
bp.shaixuanResultClick = function (
  screen_txt,
  screen_type,
  trace_id,
  trace_type,
  parent_page_type,
  parent_page_id,
  pageType,
  pageId
) {
  _gaq.push(['event', 17])
  _gaq.push(['screen_txt', screen_txt])
  _gaq.push(['screen_type', screen_type])
  _gaq.push(['trace_id', trace_id])
  _gaq.push(['trace_type', trace_type])
  _gaq.push(['parent_page_type', parent_page_type])
  _gaq.push(['parent_page_id', parent_page_id])
  _gaq.push(['page_type', pageType])
  _gaq.push(['page_id', pageId])
  combineArgs()
}

function combineArgs () {
  let sb = ''
  let host = 'http://bilog.yanhuamedia.tv?'
  let curl = ''
  for (let i = 0; i < _gaq.length; i++) {
    if (i == _gaq.length - 1) {
      sb += _gaq[i].join('=')
    } else {
      sb += _gaq[i].join('=') + '&'
    }
  }
  _gaq = []
  _gaq.push(['sys_v', 'bsjx'])
  _gaq.push(['model', 'bs'])
  _gaq.push(['soft_v', '1.0.1'])
  _gaq.push(['device_id', '000000'])
  _gaq.push(['site_id', '101'])
  _gaq.push(['v', '2'])

  curl = host + sb

  // console.log("采集数据:"+curl);
  //    api.biHttp(curl);
  // yh.proxyHttpRequest(curl, 'biCallback')
}
window.biCallback = function () {
  console.log('埋点数据回调成功~')
}

export { bp }
