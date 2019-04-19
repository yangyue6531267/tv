import * as types from '../types'
import { HTTPUtil as api } from '../../fetch/api.js'
/**
 * App通用配置
 */

const state = {
  rootPath: api.rootUrl,
  catList: JSON.parse(localStorage.getItem('Home')) || {},
  categorys: JSON.parse(localStorage.getItem('Categorys')) || [],
  behindParams: '&returnType=jsonp',
  isHTTPS: localStorage.getItem('ISHTTPS') == 'true' || false,
  openTime: undefined || 0,
  startTime: undefined || 0,
  httpRequestTime: 0,
  httpResponseTime: 0,
  navpos: 0,
  episode: 0,
  smallScreenState: 0,
  isShowPlay: true
}
const getters = {
  rootPath: state => state.rootPath,
  catList: state => state.catList,
  categorys: state => state.categorys,
  behindParams: state => state.behindParams,
  isHTTPS: state => state.isHTTPS,
  openTime: state => state.openTime,
  startTime: state => state.startTime,
  httpRequestTime: state => state.httpRequestTime,
  httpResponseTime: state => state.httpResponseTime,
  navpos: state => state.navpos,
  episode: state => state.episode,
  smallScreenState: state => state.smallScreenState,
  isShowPlay: state => state.isShowPlay
}

const actions = {
  getRootPath ({ commit }, status) {
    commit(types.GET_THEME, status)
  },
  getCatList ({ commit }, status) {
    commit(types.GET_PROGRAMA, status)
  },
  getCategorys ({ commit }, status) {
    commit(types.GET_CATEGORYS, status)
  },
  getIsHTTP ({ commit }, status) {
    commit(types.GET_ISHTTPS, status)
  },
  getOpenTime ({ commit }, status) {
    commit(types.GET_OPENTIME, status)
  },
  getStartTime ({ commit }, status) {
    commit(types.GET_STARTTIME, status)
  },
  getHttpRequestTime ({ commit }, status) {
    commit(types.GET_HTTPREQUESTTIME, status)
  },
  getHttpResponseTime ({ commit }, status) {
    commit(types.GET_HTTPRESPONSETIME, status)
  },
  getNavPos ({ commit }, status) {
    commit(types.GET_NAVPOS, status)
  },
  getEpisode ({ commit }, status) {
    commit(types.GET_EPISODE, status)
  },
  getSmallScreenState ({ commit }, status) {
    commit(types.SET_THESMALLSCREENSTATE, status)
  },
  getIsShowPlay ({ commit }, status){
    commit(types.GET_ISSHOWPLAY, status)
  }
}

const mutations = {
  [types.GET_THEME] (state, status) {
    state.rootPath = status
  },
  [types.GET_PROGRAMA] (state, status) {
    state.catList = status
  },
  [types.GET_CATEGORYS] (state, status) {
    state.categorys = status
  },
  [types.GET_ISHTTPS] (state, status) {
    state.isHTTPS = status
  },
  [types.GET_OPENTIME] (state, status) {
    state.openTime = status
  },
  [types.GET_STARTTIME] (state, status) {
    state.startTime = status
  },
  [types.GET_HTTPREQUESTTIME] (state, status) {
    state.httpRequestTime = status
  },
  [types.GET_HTTPRESPONSETIME] (state, status) {
    state.httpResponseTime = status
  },
  [types.GET_NAVPOS] (state, status) {
    state.navpos = status
  },
  [types.GET_EPISODE] (state, status) {
    state.episode = status
  },
  [types.SET_THESMALLSCREENSTATE] (state, status) {
    state.smallScreenState = status
  },
  [types.GET_ISSHOWPLAY] (state, status) {
    state.isShowPlay = status
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
