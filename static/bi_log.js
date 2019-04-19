/**
 * @author Administrator
 */

// var starvServerURL = "http://123.232.102.5:8007";
//    var starvServerURL = "http://ddata.daxiangjia.com:8007/";

var starvServerURL = {
  contentInfo: 'http://47.96.135.84/sichuanC?sichuanEvent=cp_content_info&&&',
  userVod: 'http://47.96.135.84/sichuanU?sichuanEvent=cp_user_vod&&&',
  pageclick: 'http://47.96.135.84/sichuanP?sichuanEvent=cp_panel_click&&&',
  exposure: 'http://47.96.135.84/sichuanE?sichuanEvent=exposure&&&'
}
var __userList = [['053102528881', '053103218995'], ['1124', '1127']]
var starVGl = {
  sign: '|,|', // 日志分隔符
  debug: true,
  portalURL: '/htmls/index/index.html',
  isPortal: false,
  subSign: '^',
  initDoFlag: false,
  key: 'OK',
  timediff: '',
  currServiceFlag: 1,
  lastServiceFlag: '08',
  currName: '',
  currP: {
    // 请求类型
    type: '01',
    info: {}
  }
}
function starvp (str) {
  if (starVGl.debug) console.log('[print] ' + str)
}
var starvIntervalTimeout = -1
var starVGf = {
  getMainFrameURL: function () {
    return window.location.href
  },
  getHistoryURL: function (t) {
    return document.referrer
  },
  getEPGURL: function (t) {
    return window.location.href
  },
  stringToJSON: function (str) {
    try {
      if (!str) {
        return {}
      } else {
        var a
        eval('a=' + str + ';')
        return a
      }
    } catch (e) {
      return {}
    }
  },
  JSONToString: function (obj) {
    switch (typeof obj) {
      case 'object':
        var ret = []
        if (obj instanceof Array) {
          for (var i = 0, len = obinfo.length; i < len; i++) {
            ret.push(starVGf.JSONToString(obj[i]))
          }
          return '[' + ret.join(',\n') + ']'
        } else if (obj instanceof RegExp) {
          return obinfo.toString()
        } else {
          for (var a in obj) {
            ret.push('"' + a + '":' + starVGf.JSONToString(obj[a]))
          }
          return '{' + ret.join(',\n') + '}'
        }
      case 'function':
        return 'function() {}'
      case 'number':
        return obinfo.toString()
      case 'string':
        return '"' + obj + '"'
      case 'boolean':
        return obinfo.toString()
      default:
        return obinfo.toString()
    }
  },
  getParams: function (url, name) {
    if (url.indexOf('?') != -1) {
      var search = url.split('?')[1]
      if (search && search.length > 0) {
        var m = {},
          ps = search.split('&')
        for (var i = 0; i < ps.length; i++) {
          m[ps[i].split('=')[0]] = ps[i].split('=')[1]
        }
        return m[name]
      }
      return ''
    }
    return ''
  },
  clearCookie: function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    }
  },
  setCookie: function (name, val, time) {
    if (!window.localStorage) {
      name = name.replace(/[, =;]+/g, '')
      if (name != undefined && name.trim() != '' && val != undefined) {
        var exp = new Date()
        if (Object.prototype.toString.call(time) != '[object Date]') {
          if (isNaN(time) || time == undefined) {
            exp.setTime(exp.getTime() + 365 * 24 * 3600 * 1000)
          } else {
            exp.setTime(exp.getTime() + time * 1000)
          }
        } else {
          exp = time
        }
        // if (starVGl.debug)
        // 	starvData.sendData(starvServerURL, "document.cookie = " + document.cookie);

        document.cookie =
          name + '=' + escape(val) + ';expires=' + exp.toGMTString()
      }
    } else {
      window.localStorage.setItem(name, val)
    }
  },
  getCookie: function (name) {
    if (!window.localStorage) {
      if (name != undefined && name.trim() != '') {
        var reg = new RegExp(name + '=([^;]*)', 'im')
        var val = document.cookie.match(reg)
        if (val != null && val != '') {
          return unescape(val[1])
        }
      }
      return ''
    } else {
      return window.localStorage.getItem(name)
    }
  },

  getNeedSend: function (id) {
    return true
    var f = false
    for (var i = 0, len = __userList.length; i < len; i++) {
      if (id >= __userList[i][0] && id <= __userList[i][1]) {
        f = true
        break
      }
    }
    return f
  },
  removeScript: function (id) {
    var script = document.getElementById(id)
    if (script) document.getElementsByTagName('head')[0].removeChild(script)
  }
}
var __SUtil = {
  // 基类
  getTime: function () {
    var display = ''
    var d = new Date()
    var H = d.getHours().toString()
    var Min = d.getMinutes().toString()
    var S = d.getSeconds().toString()
    if (H.length == 1) {
      H = '0' + H
    }
    if (Min.length == 1) {
      Min = '0' + Min
    }
    if (S.length == 1) {
      S = '0' + S
    }
    display = H + Min + S
    return display
  },
  getDate: function () {
    var d = new Date()
    var year = d.getFullYear().toString()
    var month = (d.getMonth() + 1).toString()
    var date = d.getDate().toString()
    if (month.length == 1) {
      month = '0' + month
    } else if (month.length == 0) {
      month = ''
    }
    if (date.length == 1) {
      date = '0' + date
    } else if (date.length == 0) {
      date = ''
    }
    dis_date = year + month + date
    return dis_date
  },
  getDateTime: function () {
    return __SUtil.getDate() + __SUtil.getTime()
  }
}
/***
	 * 心跳：
		业务类型标识|用户ID|MAC地址|采集数据时间|应用key|H|心跳次数|运营商|业务状态|APK版本|用户分组
		|数据采集方式 CS\BS|平台|终端型号|频道名称

		其他业务：
		业务类型标识|用户ID|MAC地址|采集数据时间|应用key|业务包含参数
	 */
var _SVPInfo = {
  getSTBID: function () {
    return (
      starVGl.currP.info.tv_no +
      starVGl.sign +
      starVGl.currP.info.zone_no
    )
  },
  getHBInfo: function () {
    console.log('STARV_ProgramCode=' + starVGf.getCookie('STARV_ProgramCode'))
    return (
      starVGf.getCookie('STARV_ProgramCode') +
      starVGl.sign +
      starVGf.getCookie('STARV_ProgramType') +
      starVGl.sign +
      starVGf.getCookie('STARV_PlayId') +
      starVGl.sign +
      starVGf.getCookie('STARV_EventType') +
      starVGl.sign +
      new Date().format('yyyy-MM-dd hh:mm:ss') +
      starVGl.sign +
      starVGf.getCookie('STARV_IP')
    )
  },
  setSTBInfo: function (o) {
    starVGf.setCookie('STARV_Mac', o.Mac) // mac 地址
    starVGf.setCookie('STARV_UserID', o.UserID) // 用户id
    starVGf.setCookie('STARV_DeviceID', o.DeviceID) // 设备号
    starVGf.setCookie('STARV_OperatorID', o.OperatorID) // 运营商ID
    starVGf.setCookie('STARV_ReserveGroup', o.ReserveGroup) // 用户分组
    starVGf.setCookie('STARV_CollectType', o.CollectType) // 采集方式
    starVGf.setCookie('STARV_ApkVersion', o.ApkVersion) // Apk or Bs 版本
    starVGf.setCookie('STARV_TerraceID', o.TerraceID) // 平台ID
    starVGf.setCookie('STARV_Model', o.Mode) //  机顶盒型号
    starVGf.setCookie('STARV_IP', o.IP) // 机顶盒IP
    starVGf.setCookie('STARV_TvNo', o.TvNo) // 电视账号
    starVGf.setCookie('STARV_ZoneNo', o.ZoneNo) // 专区编号
    starvp('yst setcookie end ')
  },
  getCreatTime: function () {
    return __SUtil.getDateTime()
  }
}
var starvAjax2 = function (url, cfg) {
  var args = arguments
  if (args.length == 0) return

  var uri = undefined
  var data = undefined
  var async = true
  var complete = function (XHR, TS) {}
  var contentType = 'application/x-www-form-urlencoded'
  var context = undefined
  var dataType = undefined
  var success = function (data, status, XHR) {}
  var error = function (status, XHR) {}
  var timeout = 10000
  var type = 'GET'

  var init = function (config) {
    uri = config.url ? config.url : uri
    if (
      !!config.data &&
      Object.prototype.toString.call(config.data) == '[object Object]'
    ) {
      var parameter = ''
      for (var k in config.data) {
        parameter = parameter + k + '=' + config.data[k] + '&'
      }
      data = parameter.substr(0, parameter.length - 1)
    } else if (
      !!config.data &&
      Object.prototype.toString.call(config.data) == '[object String]'
    ) {
      data = config.data
    } else {
    }
    async = config.async != undefined ? !!config.async : async
    if (
      Object.prototype.toString.call(config.complete) == '[object Function]'
    ) {
      complete = eval(config.complete)
    }
    contentType = config.contentType ? config.contentType : contentType
    context = config.context ? config.context : context
    dataType = config.dataType ? config.dataType : dataType
    if (Object.prototype.toString.call(config.success) == '[object Function]') {
      success = eval(config.success)
    }
    if (Object.prototype.toString.call(config.error) == '[object Function]') {
      error = eval(config.error)
    }
    timeout = config.timeout ? config.timeout : timeout
    type =
      config.type != undefined && config.type.toLowerCase() == 'post'
        ? 'POST'
        : type
  }

  if (
    args.length == 1 &&
    Object.prototype.toString.call(arguments[0]) == '[object String]'
  ) {
    uri = arguments[0]
  } else if (
    args.length == 1 &&
    Object.prototype.toString.call(arguments[0]) == '[object Object]'
  ) {
    init(arguments[0])
  } else if (
    args.length == 2 &&
    Object.prototype.toString.call(arguments[0]) == '[object String]' &&
    Object.prototype.toString.call(arguments[1]) == '[object Function]'
  ) {
    uri = arguments[0]
    success = arguments[1]
  } else {
    init(arguments[1])
    uri = arguments[0]
  }

  if (!uri) {
    return
  }

  var result = { context: null, data: null }
  var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : window.ActiveXObject
      ? new ActiveXObject('Microsoft.XMLHTTP')
      : null
  if (xhr != null) {
    if (type.toLowerCase() == 'get' && data != undefined) {
      uri = uri.indexOf('?') == -1 ? uri + '?' + data : uri + '&' + data
    }
    xhr.open(
      type.toUpperCase(),
      uri.indexOf('?') == -1 ? uri + '?ver=' + Math.random() : uri,
      true
    )
    if (type.toLowerCase() == 'post') {
      xhr.setRequestHeader('Content-type', contentType) // "application/x-www-form-urlencoded"
    }
    var ajaxTimeId = undefined
    ajaxTimeId = setTimeout(function () {
      xhr.abort()
    }, timeout)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        var xhrRespText = xhr.responseText
        if (dataType != undefined && dataType.toLowerCase() == 'json') {
          xhrRespText = eval(
            '(' +
              xhrRespText
                .replace(/(^\s*)|(\s*$)/g, '')
                .replace(/^\s*|\s*$/g, '') +
              ')'
          )
        }
        if (dataType != undefined && dataType.toLowerCase() == 'jscript') {
          xhrRespText = eval(
            xhrRespText.replace(/(^\s*)|(\s*$)/g, '').replace(/^\s*|\s*$/g, '')
          )
        }
        if (xhr.status == 200) {
          eval(success(xhrRespText, xhr.status, xhr))
          result.data = xhrRespText
        } else {
          eval(error(xhr.status, xhr))
        }
        eval(complete(xhr, xhr.status))
        if (ajaxTimeId != undefined) clearTimeout(ajaxTimeId)
      }
    }
    xhr.send(type.toLowerCase() == 'post' && data != undefined ? data : null)
  }
  if (
    context != undefined &&
    Object.prototype.toString.call(context).indexOf('[object HTML') != -1
  ) { result.context = context } else result.context = document.body
  return result
}

function doSendPlayData (type, info) {
  console.log(JSON.stringify(info))
  starVGl.currP.type = type
  starVGl.currP.info = info
  // setTimeout(function(){
  doSendPlayData1()
  // },2000);
}

function doSendPlayData1 () {
  var type = starVGl.currP.type
  var info = starVGl.currP.info
  if (!starVGf.getNeedSend(_SVPInfo.getSTBID().split('|')[2])) return
  starvp('type = ' + starVGl.currP.type)
  starvp('e = ' + starVGl.currP.info.Switch)
  try {
    if (type == '200') {
      // 心跳接口
      if (starVGl.currP.info.Switch == 0) {
        // 关闭心跳接口
        starvp(
          'starvCK if switch 00 starVGf.getCookie("STARV_openHeart") = ' +
            starVGf.getCookie('STARV_openHeart')
        )
        if (starVGf.getCookie('STARV_openHeart') == 0) return 0
        starvp('starvCK starvIntervalTimeout = ')
        // 关闭心跳时需要把最后一条发出去
        starvData.sendData(starvServerURL.userVod, starvData.getData('255'), '255')
        clearInterval(starvIntervalTimeout)
        starVGf.setCookie('STARV_openHeart', 0)
      } else {
        // 打开心跳接口
        starvp(
          'starvCK else switch 11 starVGf.getCookie("STARV_openHeart") = ' +
            starVGf.getCookie('STARV_openHeart')
        )
        if (starVGf.getCookie('STARV_openHeart') == 1) return 0
        starVGf.setCookie('STARV_openHeart', 1)
        __starVinit()
      }
    } else {
      if (type == '01') {
        // 初始化
        starvp('xha setSTBInfo')
        if (!starVGf.getCookie('STARV_Mac')) _SVPInfo.setSTBInfo(info)
      } else {
        starvdoSend(starvServerURL, type, info)
      }
    }
  } catch (e) {}
  return 0
}
var starvData = {
  // 组装数据
  getData: function (t, info) {
    // var str =  t + _SVPInfo.getSTBID() + starVGl.sign + __SUtil.getDateTime() + starVGl.sign +"";
    var str = ''
    if (t == '255') {
      str =
        starVGl.sign +
        __SUtil.getDate() +
        starVGl.sign +
        _SVPInfo.getSTBID() +
        starVGl.sign +
        ''
    } else {
      //  str =  t +  starVGl.sign + info.UserID + starVGl.sign + info.Mac + starVGl.sign + __SUtil.getDateTime() + starVGl.sign +"";
    }

    var mainURL = starVGf.getMainFrameURL()
    // if(starVGl.debug)starvData.sendData(starvServerURL,"getData t= " +  t,t)
    try {
      switch (t) {
        case '255': // Heartbeat
          /*
           * 业务类型标识|用户ID|MAC地址|采集数据时间|应用key|H|心跳次数|运营商
           * |业务状态|APK版本|用户分组|数据采集方式 CS\BS|平台|终端型号|频道名称
           */
          console.warn(_SVPInfo.getHBInfo());
          str += _SVPInfo.getHBInfo()
          break
        case '01' /* boot */:
          str =
            t +
            starVGl.sign +
            info.UserID +
            starVGl.sign +
            info.Mac +
            starVGl.sign +
            __SUtil.getDateTime() +
            starVGl.sign +
            info.UserID +
            starVGl.sign +
            info.OperatorID +
            starVGl.sign +
            info.TerraceID +
            starVGl.sign +
            info.ContentID +
            starVGl.sign +
            info.Brand +
            starVGl.sign +
            info.Mode +
            starVGl.sign +
            info.ApkVersion +
            starVGl.sign +
            info.ReserveGroup +
            starVGl.sign +
            info.CollectType +
            starVGl.sign +
            info.AppKey +
            starVGl.sign +
            info.Reserve1 +
            starVGl.sign +
            info.Reserve2
          break
        case '06' /* page view or page click */:
          starVGl.lastServiceFlag = '06'
          starVGl.currName = decodeURIComponent(info.PageName)
          str +=
            starVGl.sign +
            info.PagePath +
            starVGl.sign +
            info.SrcPagePath +
            starVGl.sign +
            decodeURIComponent(info.PageName) +
            starVGl.sign +
            info.AssetId +
            starVGl.sign +
            info.Id +
            starVGl.sign +
            info.TypeId +
            starVGl.sign +
            info.OperatorID
          break
        case '07' /* order */:
          starVGl.lastServiceFlag = '07'
          starVGl.currName = ''
          str +=
            starVGl.sign +
            info.ProductType +
            starVGl.sign +
            info.ProductID +
            starVGl.sign +
            decodeURIComponent(info.ProductName) +
            starVGl.sign +
            info.ProviderID +
            starVGl.sign +
            info.EndTime +
            starVGl.sign +
            info.Action +
            starVGl.sign +
            info.OrderStatus +
            starVGl.sign +
            info.Fail +
            starVGl.sign +
            info.OrderUrl +
            starVGl.sign +
            info.Confirmation +
            starVGl.sign +
            info.UrlName +
            starVGl.sign +
            info.Reserve1 +
            starVGl.sign +
            info.Reserve2 +
            starVGl.sign +
            info.OperatorID
          break
        case '03' /* vod */:
          starVGl.currName = decodeURIComponent(info.FilmName)
          starVGl.lastServiceFlag = '109'
          str +=
            starVGl.sign +
            info.ColumnID +
            starVGl.sign +
            decodeURIComponent(info.ColumnName) +
            starVGl.sign +
            info.AssetID +
            starVGl.sign +
            decodeURIComponent(info.FilmName) +
            starVGl.sign +
            info.Episodes +
            starVGl.sign +
            info.VodEpisodes +
            starVGl.sign +
            info.OrderStatus +
            starVGl.sign +
            info.VodTime +
            starVGl.sign +
            info.VodOperateType +
            starVGl.sign +
            info.Pace +
            starVGl.sign +
            info.EnterType +
            starVGl.sign +
            info.FilmType +
            starVGl.sign +
            info.StartTime +
            starVGl.sign +
            info.State +
            starVGl.sign +
            info.ProductID +
            starVGl.sign +
            info.SPID +
            starVGl.sign +
            info.Reserve1 +
            starVGl.sign +
            info.Reserve2 +
            starVGl.sign +
            info.OperatorID
          break
        case '08' /* fav */:
          starVGl.currName = ''
          starVGl.lastServiceFlag = '08'
          str +=
            starVGl.sign +
            info.ChannelID +
            starVGl.sign +
            decodeURIComponent(info.ChannelName) +
            starVGl.sign +
            info.ChannelStatus +
            starVGl.sign +
            info.Reserve1 +
            starVGl.sign +
            info.Reserve2 +
            starVGl.sign +
            info.OperatorID

          break
        case '09' /* yuding */:
          starVGl.currName = ''
          starVGl.lastServiceFlag = '09'
          str +=
            starVGl.sign +
            info.ChannelID +
            starVGl.sign +
            decodeURIComponent(info.ChannelName) +
            starVGl.sign +
            info.AD_ColumnID +
            starVGl.sign +
            info.AsssetID +
            starVGl.sign +
            decodeURIComponent(info.AsssetName) +
            starVGl.sign +
            info.ChannelStatus +
            starVGl.sign +
            info.ReserveType +
            starVGl.sign +
            info.Reserve1 +
            starVGl.sign +
            info.Reserve2 +
            starVGl.sign +
            info.OperatorID
          break
        case '10' /* app */:
          starVGl.currName = ''
          starVGl.lastServiceFlag = '10'
          str +=
            starVGl.sign +
            info.ApplylID +
            starVGl.sign +
            info.ApplylName +
            starVGl.sign +
            info.ApplyColumnID +
            starVGl.sign +
            decodeURIComponent(info.ApplyColumnName) +
            starVGl.sign +
            info.ApplylStatus +
            starVGl.sign +
            info.EnterType +
            starVGl.sign +
            info.ApplyType +
            starVGl.sign +
            info.Reserve1 +
            starVGl.sign +
            info.Reserve2 +
            starVGl.sign +
            info.OperatorID
          starVGl.lastServiceFlag = '105'
          break
        case '11' /* ad */:
          starVGl.currName = ''
          starVGl.lastServiceFlag = 'ad'
          str +=
            starVGl.sign +
            info.AdID +
            starVGl.sign +
            info.AdName +
            starVGl.sign +
            info.AdColumnID +
            starVGl.sign +
            decodeURIComponent(info.AdColumnName) +
            starVGl.sign +
            info.AdlStatus +
            starVGl.sign +
            info.EnterType +
            starVGl.sign +
            info.ApplyType +
            starVGl.sign +
            info.State +
            starVGl.sign +
            info.Reserve1 +
            starVGl.sign +
            info.Reserve2 +
            starVGl.sign +
            info.OperatorID
          break
        case '20' /** content_info */:
          str +=
            info.Program_name +
            starVGl.sign +
            info.Product_code +
            starVGl.sign +
            info.Product_name +
            starVGl.sign +
            info.director +
            starVGl.sign +
            info.actor +
            starVGl.sign +
            info.year +
            starVGl.sign +
            info.region +
            starVGl.sign +
            info.label +
            starVGl.sign +
            info.program_type +
            starVGl.sign +
            info.program_status +
            starVGl.sign +
            info.program_online_time +
            starVGl.sign +
            info.program_offline_time
          break
        case '21' /** user_vod */:
          str +=
            info.date +
            starVGl.sign +
            info.tv_no +
            starVGl.sign +
            info.zone_no +
            starVGl.sign +
            info.Program_code +
            starVGl.sign +
            info.Program_type +
            starVGl.sign +
            info.Play_id +
            starVGl.sign +
            info.Event_type +
            starVGl.sign +
            info.time +
            starVGl.sign +
            info.ip

          break

        case '22' /** panel_click */:
          str +=
            info.date +
            starVGl.sign +
            info.tv_no +
            starVGl.sign +
            info.zone_no +
            starVGl.sign +
            info.ip +
            starVGl.sign +
            info.page_name +
            starVGl.sign +
            info.page_level +
            starVGl.sign +
            info.Panel_id +
            starVGl.sign +
            info.Recommend_id +
            starVGl.sign +
            info.Page_url +
            starVGl.sign +
            info.Load_time +
            starVGl.sign +
            info.Load_status

          break
        case '23' /** exposure */:
          str +=
            info.date +
            starVGl.sign +
            info.tv_no +
            starVGl.sign +
            info.zone_no +
            starVGl.sign +
            info.Exposure_id +
            starVGl.sign +
            info.Exposure_type +
            starVGl.sign +
            info.Exposure_content_id +
            starVGl.sign +
            info.Exposure_content_type +
            starVGl.sign +
            info.Exposure_start_time +
            starVGl.sign +
            info.Exposure_end_time
          break
        case '100' /* group */:
          str += starVGl.sign + info.UserGroup
          break
        case '0E' /* error */:
          str += starVGl.sign + info
          break
      }
    } catch (e) {
      // 拼接参数异常
      console.log(e);
      // starvdoSend(starvServerURL, '0e', 'geterr')
    }
    return str
  },
  sendData: function (url, d, t, cb) {
    // 发送数据
    starvp('starvCK send data = ' + d)
    if (!d || (d.indexOf('|') != -1 && d.split('|')[2] == 'NO')) {
      return 0
    }
    if (!starVGf.getNeedSend(d.split('|')[2])) {
      return 0
    }
    if (starVGf.getCookie('STARV_openHeart') == 0 && d.split('|')[0] == 255) {
      return 0
    }
    // var _url = url+"?" + d;
    var _url = ''
    if (t === '20') {
      _url = starvServerURL.contentInfo + d
    } else if (t === '21') {
      _url = starvServerURL.userVod + d
    } else if (t === '22') {
      _url = starvServerURL.pageclick + d
    } else if (t === '23') {
      _url = starvServerURL.exposure + d
    } else if (t === '255'){
      _url = starvServerURL.userVod + d
    }
    var script = document.createElement('script')
    var id = new Date().getTime()
    starvp('starvCK send id = ' + id)
    script.setAttribute('src', _url)
    script.setAttribute('async', 'async')
    script.setAttribute('src', _url)
    script.async = 'async'
    script.src = _url
    script.setAttribute('id', id)
    starvp('starvCK send data url = ' + _url)
    document.getElementsByTagName('head')[0].appendChild(script)
    setTimeout(function () {
      starVGf.removeScript(id)
    }, 5000)
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'complete' || script.readyState == 'loaded') {
          cript.onreadystatechange = null
          starVGf.removeScript(id)
        }
      }
    } else {
      script.onload = function () {
        starVGf.removeScript(id)
      }
    }
  }
}

function starvdoSend (url, t, i) {
  starvData.sendData(url, starvData.getData(t, i), t)
}

function __starVinit () {
  // 启动心跳定时任务
  var murl =
    window.location.href.indexOf('?') != -1
      ? window.location.href.split('?')[0]
      : window.location.href
  starVGl.isPortal = murl.substr(murl.length - 23) == starVGl.portalURL
  var openFlag = starVGf.getCookie('STARV_openHeart')
  starvp('starvCK openFlag = ' + openFlag)
  if (parseInt(openFlag) == 0) return
  starvp('starvCK closeFlag end ')
  clearInterval(starvIntervalTimeout)
  starvIntervalTimeout = setInterval(function () {
    starvData.sendData(
      starvServerURL.userVod,
      starvData.getData('255'),
      '255'
    )
  }, 60 * 1000)
}

var starVready = function (fn) {
  // 页面初始化
  if (document.addEventListener) {
    document.addEventListener(
      'DOMContentLoaded',
      function () {
        document.removeEventListener(
          'DOMContentLoaded',
          arguments.callee,
          false
        )
        fn()
      },
      false
    )
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete') {
        document.detachEvent('onreadystatechange', arguments.callee)
        fn()
      }
    })
  } /* else if (document.lastChild == document.body) {
           callback();
        } */
}

starVready(function () {
  // __starVinit()
})
