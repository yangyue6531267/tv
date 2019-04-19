// // import { BIMS_EPGVIPER_API } from '../../service/serviceApi'
// // import { BIMS_SEEN_API } from '../../service/serviceApi'
// // import { BIMS_MOBILE_RECOMMEND_API } from '../../service/serviceApi'
// // import { BIMS_FACADE_API } from '../../service/serviceApi'

// function getDetailData (callback, psId) {
//   BIMS_EPGVIPER_API.getDetailData(callback, psId);
// }

// function addCollection (callback, data, lastProgramId, lastProgramName) {
//   BIMS_SEEN_API.addCollection(function (resp) {
//     try {
//       console.log('addCollection resp = ' + JSON.stringify(resp));
//     } catch (error) {

//     }
//     if (resp.code == 0) {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   }, data, lastProgramId, lastProgramName);
//   // let url = BIMS_API.getValue("BIMS_SEEN") + "integration/apk/addCollection";
//   // console.log("detailModel addCollection url = " + url);
//   // fetch(function(resp) {
//   //     if (resp.code == 0) {
//   //         callback(true);
//   //     } else {
//   //         callback(false);
//   //     }
//   // }, url, {
//   //     'account':UserInfo.getUserAccount(),
//   //     'platformId': CHANNEL_ID,  //channelId
//   //     'businessType':'vod',
//   //     'playType':'vod',
//   //     'objectId': data.id,
//   //     'objectName':data.name,
//   //     'bannerImg': data.hImage,
//   //     'verticalImg':data.vImage,
//   //     'deviceType':'STB',
//   //     'totalSeriesNumber':data.programTotalCount,
//   //     //下面两个不在播放时可以不加
//   //     'lastProgramId':data.sources[currIndex].programId,
//   //     'lastProgramName':data.sources[currIndex].subName,
//   //     'abilityString':BIMS_API.getAbilityString(),

//   // }, 'POST');
// }

// function queryCollection (callback, id) {
//   BIMS_SEEN_API.queryCollection(function (resp) {
//     if (resp.code == 0) {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   }, id);
//   // let url = BIMS_API.getValue("BIMS_SEEN") + "integration/apk/checkIsCollection";
//   // console.log("detailModel queryCollection url = " + url);
//   // fetch(function(resp) {
//   //     if (resp.code == 0) {
//   //         callback(true);
//   //     } else {
//   //         callback(false);
//   //     }
//   // }, url, {
//   //     'account':UserInfo.getUserAccount(),
//   //     'platformId': CHANNEL_ID,  //channelId
//   //     'objectId': id,
//   //     'deviceType':'STB',
//   // });
// }

// function deleteCollection (callback, id) {
//   BIMS_SEEN_API.deleteCollection(function (resp) {
//     if (resp.code == 0) {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   }, id);
//   // let url = BIMS_API.getValue("BIMS_SEEN") + "integration/apk/deleteCollection";
//   // console.log("detailModel deleteCollection url = " + url);
//   // fetch(function(resp) {
//   //     if (resp.code == 0) {
//   //         callback(true);
//   //     } else {
//   //         callback(false);
//   //     }
//   // }, url, {
//   //     'account':UserInfo.getUserAccount(),
//   //     'platformId': CHANNEL_ID,  //channelId
//   //     'objectId': id,
//   //     'deviceType':'STB',
//   // }, 'POST', 'www');
// }

// function addHistory (callback, data, currIndex, beginTime, currentTime, maxTime, type) {
//   BIMS_SEEN_API.addHistory(function (resp) {
//     if (resp.code == 0) {
//       callback(true);
//     } else {
//       callback(false);
//     }
//   }, data, currIndex, beginTime, currentTime, maxTime, type);
//   // let url = BIMS_API.getValue("BIMS_SEEN") + "integration/apk/addHistory";
//   // console.log("detailModel addHistory url = " + url);
//   // fetch(function(resp) {
//   //     if (resp.code == 0) {
//   //         callback(true);
//   //     } else {
//   //         callback(false);
//   //     }
//   // }, url, {
//   //     'account':UserInfo.getUserAccount(),
//   //     'platformId': CHANNEL_ID,  //channelId
//   //     'businessType':'vod',
//   //     'playType':'vod',
//   //     'objectId': data.id,
//   //     'objectName':data.name,
//   //     //下面两个不在播放时可以不加
//   //     'lastProgramId':data.sources[currIndex].programId,
//   //     'lastProgramName':data.sources[currIndex].subName,

//   //     'startWatchTime':beginTime,
//   //     'endWatchTime':currentTime,
//   //     'bannerImg': data.hImage,
//   //     'verticalImg':data.vImage,
//   //     'deviceType':'STB',
//   //     'logType':type,
//   //     'totalTime':maxTime,

//   //     'totalSeriesNumber':data.programTotalCount,

//   //     'playPath':"",  //todo

//   // }, 'POST');
// }

// function getRecommendV (callback, panelId) {
//   console.log('getRecommendV panelId = ' + panelId);
//   BIMS_MOBILE_RECOMMEND_API.getRecommendV(function (resp) {
//     if (resp.code == 0) {
//       callback(resp.data);
//     } else {
//       callback(resp.data);
//     }
//   }, panelId);
// }

// function getRecommend (callback, type, cpCode) {
//   BIMS_MOBILE_RECOMMEND_API.getDetailRecommendIcop(function (resp) {
//     try {
//       console.log('usercentermodel getRecommend resp = ' + JSON.stringify(resp));
//     } catch (error) {

//     }
//     if (resp.code == 0) {
//       callback(resp.data);
//     } else {
//       let list = [];
//       callback(list);
//     }
//   }, encodeURI(type), cpCode);
// }

// function queryBought (callback, subData) {
//   if (typeof (subData) == 'undefined' || subData == null) {
//     // callback(true, true);
//     return;
//   }
//   let isFree = false;
//   if (typeof (subData.ppvList) == 'undefined' || subData.ppvList == '' || subData.ppvList.length == 0) {
//     isFree = true;
//     // callback(true, true);
//     //  return;
//   }
//   console.log('detailModel queryBought ppvlist = ' + subData.ppvList);
//   BIMS_FACADE_API.queryBought(function (resp, callback) {
//     if (resp.result == 'free' || isFree) {
//       callback(true, true, resp.memberInfo.imageUrl);
//     } else if (resp.result == 'ORD-000') {
//       callback(true, false, resp.memberInfo.imageUrl);
//     } else {
//       callback(false, false, resp.memberInfo.imageUrl);
//     }
//   }, subData.id, JSON.stringify(subData.ppvList));
// }

// function queryBoughtCp (callback, contentId, ppvList) {
//   console.log('queryBoughtCp contentId = ' + contentId + 'ppvList = ' + ppvList);
//   let products = '';
//   try {
//     for (let i = 0; i < ppvList.length; i++) {
//       for (let j = 0; j < ppvList[i].productIdList.length; j++) {
//         if (products != '') { products = products + ','; }
//         products = products + ppvList[i].productIdList[j];
//       }
//     }
//   } catch (error) {
//     console.error('queryBoughtCp error ' + error);
//   }

//   BIMS_FACADE_API.queryBoughtCp(function (resp) {
//     try {
//       console.log('queryBoughtCp resp = ' + JSON.stringify(resp));
//     } catch (error) {

//     }

//     if (resp.result == '0' || typeof (resp.cloudPayUrl) == 'undefined') {
//       callback(false, true, resp.cloudPayUrl);
//     } else {
//       callback(false, false, resp.cloudPayUrl);
//     }
//   }, contentId, products);
// }

// export default {
//   getDetailData,
//   queryCollection,
//   deleteCollection,
//   addCollection,
//   addHistory,
//   getRecommendV,
//   getRecommend,
//   queryBought,
//   queryBoughtCp
// }
