/* eslint-disable no-sequences */
// import fetch from '../config/fetch'
// import UserInfo from './userinfoApi.js'
// import MD5 from '../utils/md5.js'

let BIMS_HOST = 'http://bimsboot.cprt.ysten.com:10054/'
// let BIMS_HOST = "http://ottcn.help:8081/";

export const CHANNEL_ID = 'YST_SC_KANSHIZX_20180831'
export const VERSION = '1.1.1'

/**
 * 如果已赋值则不再使用平台下的
 * @type {string}
 */
// eslint-disable-next-line no-unused-expressions
;(window.BIG_DATA_RECOMMEND = ''),
(window.BIMS_XMPP_PROJECT = ''),
(window.BIMS_SEEN = ''),
(window.BIMS_SEARCH = ''),
(window.BIMS_BSS_USER_URL = ''),
(window.BIMS_MOBILE_RECOMMEND = ''),
(window.BIMS_APK_UPDATE_RESULT = ''),
(window.BIMS_APK_UPDATE = ''),
(window.STBext = '')
// eslint-disable-next-line no-unused-expressions
;(window.BIMS_BIGDATA_LOGGER = ''),
(window.BIMS_FACADE = ''),
(window.BIMS_MOBILE_DMS = ''), // http://192.168.48.165:8082/   http://172.16.13.100:8080/
(window.BIMS_EPGVIPER = '')
/** ;
 * bims boot
 */
export const BIMS_API = {
  /**
   * 获取用户权益
   * @param callback
   */
  getUserRights: function (callback) {
    let url = BIMS_API.getValue('BIMS_FACADE') + 'v1/common/user/rights'
    console.log('getUserRights url = ' + url)
    fetch(callback, url, {
      custId: UserInfo.getUserAccount(),
      fromChannel: CHANNEL_ID
    })
  },
  /**
   * 获取是否已经订购产品 ，v1接口
   * @param callback
   */
  queryBought: function (callback, id, ppvList) {
    let url = BIMS_API.getValue('BIMS_FACADE') + '/tv/taipan/inquiry'
    console.log('queryBought url = ' + url + 'ppvList = ' + ppvList)
    let cosInqueryInfo = ''
    try {
      cosInqueryInfo = encodeURI(ppvList)
    } catch (error) {
      cosInqueryInfo = ''
    }
    fetch(callback, url, {
      contentId: id,
      custId: UserInfo.getUserAccount(),
      channelId: CHANNEL_ID,
      cosInquiryInfo: encodeURI(ppvList)
    })
  },
  /**
   * 判断用户是否购买过该影片关联的产品包
   * @param callback
   */
  queryBoughtCp: function (callback, contentId, productIds = '') {
    let url = BIMS_API.getValue('BIMS_FACADE') + '/cp/inquiry'
    console.log(
      'queryBoughtCp url = ' +
        url +
        ' contentId = ' +
        contentId +
        ' productIds = ' +
        productIds
    )

    fetch(callback, url, {
      custId: UserInfo.getUserAccount(),
      contentId: contentId,
      productIds: productIds,
      merchantId: 'SP_KANS',
      // 'sign':"",
      sign: getCpSign(UserInfo.getUserAccount(), contentId, 'SP_KANS')
    })
  },
  /**
   * 查询订单列表
   * @param callback
   */
  queryOrderList: function (callback) {
    let url = BIMS_API.getValue('BIMS_FACADE') + 'v2/common/user/orders'
    console.log('queryOrderList url = ' + url)
    // let cosInqueryInfo = encodeURI(ppvList);
    fetch(callback, url, {
      deviceMac: '0c%3Ac6%3A55%3A8d%3A5e%3Ad6',
      custId: '13771409725',
      channelId: CHANNEL_ID
    })
  },
  /**
   * 查询可订购的产品包列表
   * @param callback
   */
  queryPkgList: function (callback) {
    let url = BIMS_API.getValue('BIMS_MOBILE_RECOMMEND') + 'epg/getProductList'
    // let url =  "http://192.168.48.151:10057/vcop-cont-api/epg/getProductList";
    console.log('queryPkgList url = ' + url)
    fetch(callback, url, {
      merchantId: 'SP_KANS',
      custId: UserInfo.getUserAccount(),
      channelId: CHANNEL_ID
    })
  }
}
function getCpSign (custId, contentId, merchantId, productIds = '') {
  // console.log("getCpsign custId = " + custId + " contentId = " + contentId + " merchantId = " + merchantId);
  let param = []
  if (contentId != '') param.push('contentId' + '=' + contentId + '&')
  if (custId != '') param.push('custId' + '=' + custId + '&')
  if (merchantId != '') param.push('merchantId' + '=' + merchantId + '&')
  if (productIds != '') param.push('productIds' + '=' + productIds + '&')

  let result = ''

  for (let i = 0; i < param.length; i++) {
    result = result + param[i]
  }
  let privateKey = 'u4pkd1swo0inbq56tyxqdbjbgy4gc0ha'
  result += 'key=' + privateKey // todo 需要privateKey
  result = result.toUpperCase()
  console.log('getCpSign result = ' + result)
  let md5 = MD5.hex_md5(result)
  console.log('getCpSign md5 = ' + md5)
  return md5
}
