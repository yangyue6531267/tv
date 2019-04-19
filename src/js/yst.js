/**
 *  埋点方案
 *
 * write 2018/04/20
 *
 * by jiangjie
 */

import c from './common.js'
import { client as yh } from './client.js'

var yst = {}

// var _gaq = _gaq || [];

// _gaq.push(['UserID', '']); // 用户ID
// _gaq.push(['Mac', '']); // Mac
// _gaq.push(['CreateTime', '']); // 事件产生时间
// _gaq.push(['AppKey', '']); // 应用KEY
// _gaq.push(['OperatorID', '']);  // 运营商ID
// _gaq.push(['TerraceID', '']); // 平台ID
// _gaq.push(['ContentID', '']); // 牌照方厂家(1央视国际2杭州华数3百事通4南方传媒5湖南电视台5银河电视6国广东方7爱上北京)
// _gaq.push(['Brand', '']); // 机顶盒品牌
// _gaq.push(['Mode', '']); // 机顶盒型号
// _gaq.push(['ApkVersion', '']); // Apk版本
// _gaq.push(['ReserveGroup', '']); // 用户分组
// _gaq.push(['CollectType', '']); // 采集方式
// _gaq.push(['Reserve1', '']); // 预留字段1
// _gaq.push(['Reserve2', '']); // 预留字段1

let baseInfo = {
  userId: yh.userId,
  mac: yh.mac,
  createTime: new Date().format('yyyyMMdd'),
  appKey: '',
  operatorId: yh.operator_id,
  terraceId: '',
  contentId: '',
  brand: yh.brand,
  mode: yh.mode,
  apkVersion: yh.apk_version,
  reserveGroup: yh.reserve_group,
  collectType: 'BS'
}
let asset = {
  ChannelID: '',
  ChannelName: '',
  ChannelStatus: '',
  PagePath: '',
  SrcPagePath: '',
  PageName: ''
}
let commonFields = function (type) {
  let ystObject = {}
  ystObject.date = baseInfo.createTime
  ystObject.tv_no = yh.tvNo
  ystObject.zone_no = yh.zoneNo
  return ystObject
}
// 初始化采集
yst.init = function () {
  let ystObj = commonFields('01')
  ystObj.OperatorID = yh.operator_id
  ystObj.TerraceID = yh.terrace_id
  ystObj.ContentID = yh.ContentID
  ystObj.Brand = yh.brand
  ystObj.Mode = yh.mode
  ystObj.ApkVersion = yh.apk_version_name
  ystObj.ReserveGroup = yh.areaCode
  ystObj.CollectType = collectType(yh.stbType)
  ystObj.Reserve1 = ''
  ystObj.Reserve1 = ''
  ystObj.IP = yh.ip
  ystObj.Mac = yh.mac;
  ystObj.UserID = yh.userId;
  ystObj.DeviceID = yh.device_id
  ystObj.TvNo = yh.tvNo
  ystObj.ZoneNo = yh.zoneNo

  console.log('初始化', JSON.stringify(ystObj))
  groupArg('01', ystObj)
}

yst.contentInfo = function (obj) {
  let ystObj = {}
  ystObj.zone_no = yh.zoneNo
  ystObj.Program_name = obj.Program_name
  ystObj.Product_code = obj.Product_code
  ystObj.Product_name = obj.Product_name
  ystObj.Program_id = obj.Program_id
  ystObj.director = obj.director
  ystObj.actor = obj.actor
  ystObj.year = obj.year
  ystObj.region = obj.region
  ystObj.label = obj.label
  ystObj.program_type = obj.program_type
  ystObj.program_status = obj.program_status
  ystObj.program_online_time = obj.program_online_time
  ystObj.program_offline_time = obj.program_offline_time
  console.log('节目信息log', ystObj)
  groupArg('20', ystObj)
}

yst.userVod = function (obj) {
  let ystObj = commonFields('21')
  ystObj.Program_code = obj.Program_code
  ystObj.Program_type = obj.Program_type
  ystObj.Play_id = obj.Play_id
  ystObj.Event_type = obj.Event_type
  ystObj.time = obj.time
  ystObj.ip = yh.ip
  console.log('点播行为log', ystObj)
  groupArg('21', ystObj)
}

yst.panelClick = function (obj) {
  let ystObj = commonFields('22')
  ystObj.ip = yh.ip
  ystObj.time = obj.time
  ystObj.page_name = obj.page_name
  ystObj.page_level = obj.page_level
  ystObj.Panel_id = obj.Panel_id
  ystObj.Recommend_id = obj.Recommend_id
  ystObj.Page_url = obj.Page_url
  ystObj.Load_time = obj.Load_time
  ystObj.Load_status = obj.Load_status
  console.log('页面点击log', ystObj)
  groupArg("22", ystObj);
}

yst.exposure = function (obj) {
  let ystObj = commonFields('23')
  ystObj.Exposure_id = obj.Exposure_id
  ystObj.Exposure_type = obj.Exposure_type
  ystObj.Exposure_content_id = obj.Exposure_content_id
  ystObj.Exposure_content_type = obj.Exposure_content_type
  ystObj.Exposure_start_time = obj.Exposure_start_time
  ystObj.Exposure_end_time = obj.Exposure_end_time
  console.log('页面曝光log', ystObj)
  groupArg('23', ystObj)
}

// 收藏采集
yst.collect = function (cId, cName, cStatus) {
  let ystObj = commonFields('08')
  ystObj.ChannelID = cId
  ystObj.ChannelName = cName
  ystObj.ChannelStatus = cStatus
  ystObj.Reserve1 = ''
  ystObj.Reserve2 = ''
  ystObj.OperatorID = yh.operator_id
  console.log('收藏', ystObj)
  groupArg('08', ystObj)
}

// 页面浏览
yst.pageLoad = function (PagePath, SrcPagePath, PageName, AsssetID, Id, TYPE) {
  // let value = commonFields('06') + PagePath + "|" + SrcPagePath + "|" + encodeURIComponent(PageName) + "|" + AsssetID + "|" + Id + "|" + TYPE + "|" + Reserve1 + "|" + baseInfo.operatorId;
  let ystObj = commonFields('06')
  ystObj.PagePath = PagePath
  ystObj.SrcPagePath = SrcPagePath
  ystObj.PageName = PageName
  ystObj.AssetId = AsssetID // 详情页资产ID
  ystObj.Id = Id // 推荐位窗口ID
  ystObj.TypeId = TYPE // 类型
  ystObj.OperatorID = yh.operator_id
  console.log('页面浏览', JSON.stringify(ystObj))
  groupArg('06', ystObj)
}

//  订购采集
yst.pay = function (
  ProductType,
  ProductID,
  ProductName,
  EndTime,
  Action,
  OrderStatus,
  Fail,
  OrderUrl,
  Confirmation,
  UrlName,
  ProviderID
) {
  let ystObj = commonFields('07')
  ystObj.ProductType = ProductType
  ystObj.ProductID = ProductID
  ystObj.ProductName = ProductName
  ystObj.ProviderID = ProviderID
  ystObj.EndTime = EndTime
  ystObj.Action = Action
  ystObj.OrderStatus = OrderStatus
  ystObj.Fail = Fail
  ystObj.OrderUrl = OrderUrl
  ystObj.Confirmation = Confirmation
  ystObj.UrlName = UrlName
  ystObj.Reserve1 = ''
  ystObj.Reserve2 = ''
  ystObj.OperatorID = yh.operator_id
  console.log('订购', ystObj)
  groupArg('07', ystObj)
}

// 广告展现
yst.ad = function (AdID, AdName, AdlStatus) {
  let ystObj = commonFields('11')
  ystObj.AdID = AdID
  ystObj.AdName = AdName
  ystObj.AdlStatus = AdlStatus
  console.log('广告', ystObj)
  groupArg('11', ystObj)
}

// 心跳
yst.heart = function (type) {
  let ystObj = commonFields('200')
  ystObj.Switch = type
  console.log('心跳开关:' + type)
  groupArg('200', ystObj)
}

function collectType (stbType) {
  if (stbType === '0' || stbType === 0) {
    // 组播
    return 0
  } else if (stbType === '1' || stbType === 1) {
    // 单播
    return 1
  } else {
    return 1
  }
}

// window.ystCallback = function (params) {
//     // console.log("埋点发送成功");
// }

function groupArg (type, jsonObj) {
  window.doSendPlayData(type, jsonObj)
}

export { yst }
