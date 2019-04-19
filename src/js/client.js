/**
 * create:2018-11-06
 *
 * update:jiangjie
 *
 */

function yh () {}

yh.prototype.siteId = '27' // 站点ID

yh.prototype.userId = '123456' // 用户ID

yh.prototype.sys_v = 'jingxuan' // 系统版本

yh.prototype.soft_v = '1.0.1' // 用户软件版本

yh.prototype.device_id = '' // 设备号

yh.prototype.operator_id = '' // 运营商ID（广电：1 电信：2 移动：3 联通：4）

yh.prototype.terrace_id = '' // 平台ID(中兴：1 华为：2 烽火：3)

yh.prototype.content_id = '' // (牌照方厂家：央视国际1 杭州华数2 百事通3 南方传媒4 湖南卫视5 银河电视6 国广东方7 爱上北京8)

yh.prototype.brand = '' // 机顶盒品牌

yh.prototype.mode = '' // 机顶盒型号

yh.prototype.model = '' // 用户设备版本

yh.prototype.apk_version = '' // apk版本

yh.prototype.reserve_group = '' // 采集方式

yh.prototype.userToken = '' // 用户令牌

yh.prototype.mac = 'AC4AFEB380CC' // 设备mac地址90d8f36515d8

yh.prototype.ip = '00:00:00' // IP地址

yh.prototype.bizDomain = '27' // 用户厂商orBMS站点

yh.prototype.userGroup = '' // 用户分组

yh.prototype.productIds = '' // 用户已订购产品ID（多个以逗号隔开）

yh.prototype.areaCode = '10000' // 用户区域

yh.prototype.userName = '' // 用户名称

yh.prototype.telephone = '' // 联系电话

yh.prototype.epgDomain = '' // epg域

yh.prototype.stbType = '' // 单播/组播字段

yh.prototype.aaaDomain = '' // aaa域

yh.prototype.ucenterDomain = '' // 用户中心域

yh.prototype.logDomain = '' // 日志域

yh.prototype.updateServer = '' // 更新服务器

yh.prototype.spCode = '' // 内容提供商

yh.prototype.apk_version_name = '' // app版本名称

yh.prototype.cdn = '' // cdn类型

yh.prototype.tvNo = 'qq' // 电视账号

yh.prototype.zoneNo = 'SP_SJTV_01' // 专区编号

// 城市  地市行政区域代码 CDN平台(1 中兴 2 华为 3 烽火)
const custInfo = [
  { city: '成都', districtCode: '510100', cdn: '1' },
  { city: '绵阳', districtCode: '510700', cdn: '1' },
  { city: '自贡', districtCode: '510300', cdn: '3' },
  { city: '攀枝花', districtCode: '510400', cdn: '1' },
  { city: '德阳', districtCode: '510600', cdn: '1' },
  { city: '达州', districtCode: '511700', cdn: '2' },
  { city: '泸州', districtCode: '510500', cdn: '3' },
  { city: '广安', districtCode: '511600', cdn: '1' },
  { city: '巴中', districtCode: '511900', cdn: '2' },
  { city: '遂宁', districtCode: '510900', cdn: '1' },
  { city: '宜宾', districtCode: '511500', cdn: '2' },
  { city: '内江', districtCode: '511000', cdn: '2' },
  { city: '资阳', districtCode: '512000', cdn: '1' },
  { city: '乐山', districtCode: '511100', cdn: '2' },
  { city: '雅安', districtCode: '511800', cdn: '1' },
  { city: '广元', districtCode: '510800', cdn: '1' },
  { city: '南充', districtCode: '511300', cdn: '2' },
  { city: '眉山', districtCode: '511400', cdn: '2' },
  { city: '阿坝', districtCode: '513200', cdn: '1' },
  { city: '甘孜', districtCode: '513300', cdn: '2' },
  { city: '凉山', districtCode: '513400', cdn: '3' }
]

/**
 * 将获取的终端信息重新定义给页面使用
 */
yh.prototype.setDeviceInfo = function (devices) {
  try {
    // const DeviceOb = { "reserve_group": "yanhua", "model": "", "content_id": "", "terrace_id": "", "operator_id": "", "apk_version": "7", "brand": "", "site_id": "19", "user_id": "yanhua123", "device_id": "", "soft_v": "3.0.1", "sys_v": "4.4.2", "mode": "","mac":"",ip:"","apk_version_name","","cdn":""};
    const DeviceOb = JSON.parse(devices)
    yh.prototype.reserve_group = DeviceOb.reserve_group
    yh.prototype.model = DeviceOb.model
    yh.prototype.content_id = DeviceOb.content_id
    yh.prototype.terrace_id = DeviceOb.terrace_id
    yh.prototype.operator_id = DeviceOb.operator_id
    yh.prototype.apk_version = DeviceOb.apk_version
    yh.prototype.brand = DeviceOb.brand
    yh.prototype.siteId = DeviceOb.site_id
    yh.prototype.userId = DeviceOb.user_id
    yh.prototype.device_id = DeviceOb.device_id
    yh.prototype.soft_v = DeviceOb.soft_v
    yh.prototype.sys_v = DeviceOb.sys_v
    yh.prototype.mode = DeviceOb.mode
    yh.prototype.mac = DeviceOb.mac
    yh.prototype.ip = DeviceOb.ip
    yh.prototype.apk_version_name = DeviceOb.apk_version_name
    yh.prototype.cdn = DeviceOb.cdn
  } catch (error) {
    console.log('处理设备信息异常')
  }
}
// 直播
yh.prototype.Player = function (x, y, width, height) {
  try {
    console.log('播放器位置:' + x, y, width, height)
    JsCallLivePlayer.updatePlayerLayout(x, y, width, height);
  } catch (error) {
    // console.log(error);
    console.log('调用初始化点播播放器异常');
  }
}

yh.prototype.JsCallConfig = function (callBack) {
  try {
    JsCallConfig.setConfigCall(callBack);
  } catch (error) {
    console.log('调用点播播放器全屏播放异常');
  }
}

// 播放直播视频
yh.prototype.showPlay = function (url , id) {
  try {
    console.log('当前播放器地址' + url);
    let jsonob = {
      'playUrl': url,
      'channelId': id
    }
    JsCallLivePlayer.openPlayer(JSON.stringify(jsonob));
  } catch (error) {
    console.log('调用点播播放地址异常');
  }
}

// 直播全屏播放

yh.prototype.AllinitPlay = function () {
  try {
    JsCallLivePlayer.changeFullScreen();
  } catch (error) {
    console.log('调用点播播放器全屏播放异常');
  }
}

// 显示出直播窗口
yh.prototype.showView = function () {
  try {
    JsCallLivePlayer.showPlayer();
  } catch (error) {
    console.log('调用显示点播播放器异常');
  }
}

// 隐藏直播窗口
yh.prototype.hideView = function () {
  try {
    JsCallLivePlayer.hidePlayer();
  } catch (error) {
    console.log('调用停止并隐藏点播播放器异常');
  }
}

// 关闭直播窗口
yh.prototype.closeView = function () {
  try {
    JsCallLivePlayer.closePlayer();
  } catch (error) {
    console.log('调用关闭点播播放器异常');
  }
}
// --------------------------------------------播控 开始 ----------------------------------------
// 渲染点播窗口
yh.prototype.initPlayer = function (x, y, width, height) {
  try {
    console.log('播放器位置:' + x, y, width, height)
    JsCallVodPlayer.updatePlayerLayout(x, y, width, height);
  } catch (error) {
    // console.log(error);
    console.log('调用初始化点播播放器异常');
  }
}

// 播放点播视频
yh.prototype.showVideo = function (url) {
  try {
    console.log('当前播放器地址' + url);
    let jsonob = {
      'dataUrl': url
    };
    JsCallVodPlayer.openPlayer(JSON.stringify(jsonob));
  } catch (error) {
    console.log('调用点播播放地址异常');
  }
}

// 点播全屏播放

yh.prototype.fullPlay = function () {
  try {
    JsCallVodPlayer.changeFullScreen();
  } catch (error) {
    console.log('调用点播播放器全屏播放异常');
  }
}

// 显示出点播窗口
yh.prototype.showPlayer = function () {
  try {
    JsCallVodPlayer.showPlayer();
  } catch (error) {
    console.log('调用显示点播播放器异常');
  }
}

// 隐藏点播窗口
yh.prototype.hidePlayer = function () {
  try {
    JsCallVodPlayer.hidePlayer();
  } catch (error) {
    console.log('调用停止并隐藏点播播放器异常');
  }
}

// 关闭点播窗口
yh.prototype.closePlayer = function () {
  try {
    JsCallVodPlayer.closePlayer();
  } catch (error) {
    console.log('调用关闭点播播放器异常');
  }
}
// 切换集数
yh.prototype.cutEp = function (episode) {
  try {
    JsCallVodPlayer.cutEp(episode);
    console.log('调用了切换集数播放')
  } catch (error) {
    console.log('切换集数异常' + episode);
  }
}

// 打开并显示播放器
yh.prototype.openPlayer = function (json) {
  try {
    JsCallVodPlayer.openPlayer(json);
    console.log('调用打开并显示播放器')
  } catch (error) {
    console.log('打开并显示播放器异常' + json)
  }
}

// 播放器内部集数切换通知
yh.prototype.setJsNoticEpCallBack = function (callback) {
  try {
    JsCallVodPlayer.setJsNoticEpCallBack(callback);
  } catch (error) {
    console.log('通知播放器集数回调失败')
  }
}
// ----------------------------------------------- 播控  结束 --------------------------------

/**
 * 退出当前webview标签
 */
yh.prototype.back = function () {
  try {
    ERT.exit();
  } catch (error) {
    console.log('调用ERT.exit()方法异常：');
  }
};

// 查询所有历史记录
// 返回:
// 收藏的条目json
yh.prototype.queryHistory = function () {
  try {
    return ERT.queryHistory();
  } catch (error) {
    console.log('调用ERT.openqueryHistory()方法异常：');
  }
}

/**
 * 删除所有历史记录
 */
yh.prototype.removeHistory = function () {
  try {
    ERT.removeHistory();
  } catch (error) {
    console.log('调用ERT.removeHistory()方法异常：');
  }
}
/**
 * 删除历史记录
 * @param {*} assetId
 * @param {*} specialId
 */
yh.prototype.removeHistorys = function (assetId) {
  // console.log('删除' + assetId);
  try {
    ERT.removeHistory(assetId);
  } catch (error) {
    console.log('调用ERT.removeFavorites()方法异常：', assetId);
  }
}
/**
 * 根据资产ID查询播放历史
 * @param {*} assetId
 */
yh.prototype.playHistory = function (assetId) {
  try {
    return ERT.queryHistory(assetId);
  } catch (error) {
    console.log('调用ERT.queryHistory()方法异常：', assetId);
    return '';
  }
}
/**
 *  鉴权信息存放
 * @param {*} authOb
 */
yh.prototype.setSpAuthInfo = function (authOb) {
  try {
    yh.prototype.userToken = authOb.userToken // 用户令牌

    yh.prototype.userGroup = authOb.userGroup // 用户分组

    yh.prototype.areaCode = authOb.areaCode // 用户区域

    yh.prototype.userName = authOb.userName // 用户名称

    yh.prototype.telephone = authOb.telephone // 联系电话
  } catch (error) {
    console.log('Sp鉴权结果处理异常')
  }
}

/***
 *  获取地市分组CDN类型
 */
yh.prototype.getCdn = function (districtCode) {
  let cdn = ''
  for (let index = 0; index < custInfo.length; index++) {
    const element = custInfo[index]
    if (element.districtCode == districtCode) {
      cdn = element.cdn
      break
    }
  }
  return cdn
}

/**
 * STB支持的keys
 */
yh.prototype.STB_KEYS = {
  DEVICE_ID: 'deviceId', // 设备ID
  STB_IP: 'stbip', // 设备ip
  MAC: 'mac', // mac地址
  TIME_SHIFT: 'timeshift', // 是否支持时移
  USER_ID: 'userId', // 用户主账号
  ACCOUNT_IDENTITY: 'accountIdentity', // 用户主账号(基地盒子）
  USER_TOKEN: 'usertoken', // 鉴权接口spToken参数
  EPG_ADDRESS: 'EPGAddress', // EPGAddress参数
  EPG_SERVER: 'epgserver', // epgserver参数
  STB_ID: 'stbid' // 盒子串号
}

/***
 *  启动apk
 *
 *  @param url 通用地址
 */
yh.prototype.OpenApk = function (url) {
  const type = 'OpenUrl'
  // const url = "http://sns.is.ysten.com/CNTV/index.html?action=detail&object=2924645";
  if (window.widgetmanager && window.widgetmanager.launchApp) {
    window.widgetmanager.launchApp(type, url, '', true)
  }
}
/**
 * 获取STB支持的配置参数
 * 也可以通过该方法获取盒子的BIMS下发参数 key为boot的key
 * @param key
 */
yh.prototype.getSTBParameter = (key, defaultVal = '') => {
  if (window.widgetmanager && window.widgetmanager.getParameter) {
    return window.widgetmanager.getParameter(key) || defaultVal
  }
  return defaultVal
}

/**
 * 获取盒子DeviceId
 */
yh.prototype.getSTBDeviceId = (defaultVal = '') => {
  try {
    var deviceId = getSTBParameter('deviceId')
    if (deviceId == '' && window.service) { deviceId = window.service.getDeviceID() }

    return deviceId != '' ? deviceId : defaultVal
  } catch (error) {
    return defaultVal
  }
}

/**
 * 获取盒子是否为taipan版本
 * @returns {boolean}
 */
yh.prototype.isSTBTaipan = () => {
  var newVersion = false
  if (window.widgetmanager && window.widgetmanager.getParameter) {
    if (widgetmanager.getParameter('BASE_MODULE') >= 1) {
      // 新版本
      newVersion = true
    } else {
      // 老版本
      newVersion = false
    }
  } else {
    // 老版本
    newVersion = false
  }
  return newVersion
}

/**
 * 发消息给STB
 * @param content
 */
yh.prototype.sendMsg2STB = content => {
  if (window.widgetmanager && window.widgetmanager.sendMsg2Android) {
    window.gefoAndroid.sendMsg2Android(content)
  }
}

/***
 *  获取用户账号
 */
yh.prototype.getUserAccount = function () {
  try {
    let account = window.widgetmanager.getParameter('userId')
    return account
  } catch (err) {
    return '15196390128'
  }
}



yh.prototype.addHistory= function(historyData) {   // 本地添加历史观看 (已倒序查重) ---wzh
  let historyList = localStorage.getItem('historyList');
  if (historyList) {
    historyList = JSON.parse(historyList)
    historyList = historyList.filter(arr =>arr.relateId!==historyData.relateId)
    historyList.unshift(historyData);
  } else {
    historyList = []
    historyList.unshift(historyData);
  }
  console.log("播放记录列表");
  console.log(historyList);
  localStorage.setItem('historyList', JSON.stringify(historyList));
}
yh.prototype.delHistory =function(index) {  //本地添加历史观看---wzh
    let historyList = JSON.parse(localStorage.getItem('historyList'));
    if(historyList.length>0) {
      historyList.splice(index,1)
      console.log("播放记录列表");
      console.log(historyList);
      localStorage.setItem('historyList', JSON.stringify(historyList));
    } else {
      console.log("已无播放记录");
    }
},
yh.prototype.delAllHistory =function() { //删除所有---wzh
  localStorage.removeItem("historyList")
}
// eslint-disable-next-line new-cap
let client = new yh()

export { client }
