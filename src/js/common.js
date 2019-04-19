import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

//  JavaScript常用方法

// localStorage sessionStorage

export default {
  clearLocal (localName) {
    localStorage.removeItem(localName)
  },
  setLocal (localName, localStr) {
    localStorage.setItem(localName, localStr)
  },
  getLocal (localName) {
    // eslint-disable-next-line no-redeclare
    var localName = localStorage.getItem(localName)
    if (this.isAllNull(localName)) {
      return ''
    } else {
      return localName
    }
  },
  errorPic (img) {
    // 图像加载出错时的处理
    img.src = '/business/common/images/business/errorPic.png'
    img.onerror = null
  },
  isAllNull (str) {
    if (
      str == null ||
      str == 'null' ||
      str === '' ||
      str == 'undefined' ||
      undefined == str
    ) {
      return true
    }
    return false
  },
  strAllNull (str) {
    if (this.isAllNull(str)) {
      return ''
    }
    return str
  },
  startTime () {
    let current = new Date().getTime()
    let app = { name: 'app', startTime: current }
    localStorage.setItem('app', JSON.stringify(app))
  },
  settingPath (pathName, id) {
    // 设置埋点路径
    // eslint-disable-next-line camelcase
    let trace_type = localStorage.getItem('trace_type')
    // eslint-disable-next-line camelcase
    let trace_id = localStorage.getItem('trace_id')
    // eslint-disable-next-line camelcase
    if (trace_type) {
      let ppvPath = trace_type.split(',')
      let ppvId = trace_id.split(',')
      ppvId.push(id)
      ppvPath.push(pathName)
    } else {
      localStorage.setItem('trace_type', '')
      localStorage.setItem('trace_id', '')
    }
  },
  getTraceType () {
    return localStorage.getItem('trace_type')
  },
  getTraceId () {
    return localStorage.getItem('trace_id')
  },
  getAppStartTime () {
    let app = localStorage.getItem('app')
    return JSON.parse(app).startTime
  },
  getNow () {
    return new Date().getTime()
  },
  getPosition (name) {
    const pos = localStorage.getItem('position')
    let sp = pos.split('_')
    if (name === 'posId') {
      return sp[0]
    } else if (name === 'columnId') {
      return sp[1]
    } else {
      return pos;
    }
  },
  getRecmd_id (){
    return localStorage.getItem('BI_recmd_id');
  },
  setPosition (arg1, arg2) {
    // 保存点播推荐位置
    localStorage.setItem('position', arg1 + '_' + arg2)
  },
  // 保存父级页面类型
  setParentPageType (value) {
    sessionStorage.setItem('BI_parent_page_type', this.strAllNull(value))
  }, // 保存父级页面id
  setParentPageId (value) {
    sessionStorage.setItem('BI_parent_page_id', this.strAllNull(value))
  },
  getParentPageType () {
    // 获取父级页面类型
    let pageType = sessionStorage.getItem('BI_parent_page_type')
    return this.strAllNull(pageType)
  },
  getParentPageId () {
    // 获取父级页面ID
    let pageId = sessionStorage.getItem('BI_parent_page_id')
    return this.strAllNull(pageId)
  },
  formatDate (ms) {
    // 时间格式化
    // eslint-disable-next-line one-var
    let oDate = new Date(ms),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime =
        oYear +
        getzf(oMonth) +
        getzf(oDay) +
        getzf(oHour) +
        getzf(oMin) +
        getzf(oSen)
    return oTime
  },
  getAssetType (type) {
    if (type === 'Movie') return '电影'

    return ''
  },
  routerSkip(url, Type, layType, bp, route){ // 公共路由跳转
    // 路由跳转
     console.log("路由:url:" + url + "===========路由Type:" + Type);
    // 1：详情页 2：演员页 3：角色 4：专题   5:短视频  6：标签  7：分类 8:历史收藏 9：搜索 10：筛选
     switch (Type) {
        case "1": // 详情页
          switch(layType){
            case "Game_Zy":
            route.push({name:"varietyDetail",params:{jsonUrl:url,bp:bp}});
            break;
            case "Host_Js":
            route.push({name:"AnchorShotVideo",params:{jsonUrl:url,bp:bp}});
            break;
            case "Detail_News":
            route.push({name:"eventDetail",params:{jsonUrl:url,bp:bp}});
            break;
          }
          break;
        case "2":// 演员列表页
          route.push({name: "anchorDetail", params: {jsonUrl:url,bp:bp}});
         break;
       case "3":
          console.log("暂无此页面");
         break;
       case "4":
         switch(layType){
          case "Subject_Detail_TP1":
          route.push({name:"hotTopics",params:{jsonUrl:url,bp:bp}});
          break;
          case "Game_News":
          route.push({name:"specialDj",params:{jsonUrl:url,bp:bp}});
          break;
          case "Game_Detail":
          route.push({name:"gameDetail",params:{jsonUrl:url,bp:bp}});
          break;
        }
        break;
       case "5":
         route.push({ name: "hotTopics", params: { jsonUrl: url, bp: bp }});
         break;
       case "6":
         route.push({ name: "hotTopics", params: { jsonUrl: url, bp: bp } });
         break;
       case "7":
       route.push({ name: "Screening", params: { jsonUrl: url, bp: bp } });
         break;
         case "8":
        window.location.href = url;
         break;
       case "9": // 搜索
         route.push({ name: "vip", params: { jsonUrl: url, bp:bp} });
         break;
       case "10":// 筛选
         route.push({ name: "Screening", params: { jsonUrl: url, bp: bp } });
         break;
        case "15": // 点播记录
         route.push({ name: "history", params: { jsonUrl: url, bp: bp }});
         break;
        case "16": // 收藏记录
        route.push({ name: "search", params: { jsonUrl: url, bp: bp ,type:'index'} });
         break;
    }
  },
  routerBack(route,type){ //路由返回方法
    if(type){
      if(type == 'search'){
        route.push({name:'search'})
      }else if(type == 'filter'){
        route.push({name:'Screening'})
      }else if(type == 'history'){
        route.push({name:'History'})
      }else if(type == 'hotTopics'){
        route.push({name:'hotTopics'})
      }else{
        route.push({name:'index'})
      }
    }else{
      route.push({name:'index'})
    }
  }
}

function getzf (num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}
/**
 *  对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt) {
  // author: meizz
  'use strict'
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
