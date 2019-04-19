/**
 * 2017-11-30
 * 基于jquery封装get jsonp请求请求
 *
 */
import fetchJsonp from './async'
import { client as yh } from '../js/client.js';

var HTTPUtil = {}

HTTPUtil.get = function (url, successfn, failfn) {
  console.log('url:' + url)
  $.ajax({
    type: 'GET',
    url: url,
    async: true,
    success: successfn,
    error: failfn
  })
}
// HTTPUtil.get = function (url) {
//   console.log('url:' + url)
//   //步骤一:创建异步对象
//   var ajax = new XMLHttpRequest();
//   //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
//   ajax.open('get',url);
//   //步骤三:发送请求
//   ajax.send();
//   //步骤四:注册事件 onreadystatechange 状态改变就会调用
//   ajax.onreadystatechange = function () {
//     if (ajax.readyState==4 &&ajax.status==200) {
//     //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
//   　　　　console.log(ajax.responseText);//输入相应的内容
//   　　}
//   }
// }

HTTPUtil.post = function (url, data, successfn) {
  $.post(url, data, successfn);
}

HTTPUtil.jsonp = function (url, successfn, errorfn) {
  fetchJsonp(
    url,
    {
      jsonpCallback: 'jsonpCallback'
    },
    successfn
  )
}

// HTTPUtil.rootUrl =
//   'http://47.97.96.103/?s=27|2&p|2&p=yhSystemTheme&k=1&v=1&returnType=jsonp'

HTTPUtil.rootUrl =
  'http://47.97.96.103/?s=31|11&p=yhSystemTheme&k=1&v=1&returnType=jsonp'

// 获取主题接口
HTTPUtil.getTheme = function (url, successfn, failfn) {
  return HTTPUtil.jsonp(url, successfn, failfn)
}

// 获取栏目筛选条件
HTTPUtil.getFilter = function (catCode) {
  let url =
    'http://47.97.96.103/?s=31|11&p|2&p=yhCategoryList&k=1&v=1&returnType=jsonp&catCode=' +
    catCode
  return url
}

// 获取栏目筛选结果
HTTPUtil.getFilterResult = function (content, area, index, pageSize, catCode) {
  let url =
    'http://47.97.96.103/?s=31|11&p|2&p=yhScreenResult&k=1&v=1&returnType=jsonp&content=' +
    content +
    '&areaId=' +
    area +
    '&pindex=' +
    index +
    '&psize=' +
    pageSize +
    '&catCode=' +
    catCode
  return url
}

// 筛选页面获取筛选条件信息
HTTPUtil.getFilterCategory = function (catCode) {
  let url =
    'http://47.97.96.103/?s=31|11&p|2&p=yhCategoryList&k=1&v=1&returnType=jsonp&catCode=' +
    catCode
  return url
}
// 收藏
HTTPUtil.getShoucang = function (usedID, siteId) {
  let url = 'http://47.97.96.103/uds/cloud/collection/list?version=1&siteId=' + siteId + '&userId=' + usedID + '&pindex=0&psize=40'
  return url
}
// 添加收藏
HTTPUtil.addshoucang = function () {
  let url = "http://47.97.96.103/uds/cloud/collection/collect?version=1"
  let data = {
    siteId: yh.siteId,
    userId: yh.userId,
    collectType: num, //收藏类型(0-主播,1-资产,2-专题)
    relateId: assetId,
    relateTitle: assetName,
    relateScore: score,
    relateImg: assetImg,
    relateUrl: jsonUrl
  }
  api.post(url, data, (res) => {
    console.log(res);
    if (res.mes === "ok"){
      console.log("添加收藏成功");
    }
  })
}

HTTPUtil.delCollect = function () {
  let url = "http://47.97.96.103/uds/cloud/collection/del?version=1"
  let data = {
    siteId: yh.siteId,
    userId: yh.userId,
    collectType: 1, //收藏类型(0-主播,1-资产,2-专题)
    relateId: this.detailData.assetId,
  }
  api.post(url, data, (res) => {
    console.log(res);
    if (res.mes === "ok"){
      console.log("删除收藏成功");
    }
  })
}

HTTPUtil.getSearchHot =
  'http://47.97.96.103/?s=31|11&p|2&p=yhSearchRecommend&k=1&v=1'

HTTPUtil.getSearchResult = 'http://47.97.96.103/?s=27|2&p|2&p=yhSearch&k=1&v=1'

HTTPUtil.getSearchData = function (keyWord, pageNum) {
  let url = "http://47.97.96.103/?s=31|11&p=yhSearch&k=1&v=1&returnType=jsonp&word=" + keyWord + "&pindex=" + pageNum + "&psize=9&searchType="
  return url
}

// bi数据埋点请求发送
HTTPUtil.biHttp = function (url) {
  console.log('bi数据埋点请求:' + url)
  // fetchJsonp(url, {
  //     jsonpCallback: 'jsonpCallback',
  // }).catch(function(){
  //   console.log("Bi success");
  // })
}

export { HTTPUtil }
