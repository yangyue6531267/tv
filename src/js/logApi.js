/****
 *
 * update: 2019.03.21
 * write: jiang
 */

import { HTTPUtil as api } from '../fetch/api.js'
import { client as yh } from './client.js'

var logAddress = 'http://jsyd-log.yanhuamedia.tv/logCollect2';

function bi () {

}

/****
 * 公共字段
 * site_id(站点ID)
 * device_id（终端设备ID）
 * user_id（用户ID）
 * log_type（日志类型）
 * v(日志版本)
 * model（终端硬件型号）
 * soft_v（终端软件版本号）
 * vip(用户属性)
 * root_id（导航栏ID）
 * province（用户省份）
 * create_time（触发时间）
 */
var commonParams = {
  site_id: yh.siteId,
  device_id: yh.device_id,
  user_id: yh.userId,
  log_type: '2',
  v: '1',
  model: yh.model,
  soft_v: yh.soft_v,
  vip: yh.vip,
  province: '四川省',
  create_time: new Date().getTime() + ''
}
// 启动
bi.start = function (type){
  let logOb = commonParams;
  logOb.event = '102';
  logOb.start_type = type;
  logup(logOb);
}
// 退出
bi.end = function (type) {
  let logOb = commonParams;
  logOb.event = '103';
  logOb.time = new Date().getTime() - parseInt(JSON.parse(localStorage.getItem('app')).startTime);
  logOb.quit_type = type
  logup(logOb);
}

/****
 * 支付
 *
 * pkg_type 产品包类型
 * pkg_id 产品包ID
 * pkg_price 产品包价格
 * action 订购动作
 * order_msg 订购信息
 * parent_page_id 父级页面ID
 * parent_page_type 父级页面类型
 * preview 试看类型
 */
bi.order = function (jsonOb){
  let logOb = commonParams
  logOb.event = '201';
  logOb.pkg_type = jsonOb.pkg_type;
  logOb.pkg_id = jsonOb.pkg_id;
  logOb.pkg_price = jsonOb.pkg_price
  logOb.action = jsonOb.action;
  logOb.order_msg = jsonOb.order_msg;
  logOb.parent_page_id = jsonOb.parent_page_id;
  logOb.parent_page_type = jsonOb.parent_page_type;
  logOb.preview = jsonOb.preview;
  logup(logOb)
}

/***
 *  点播
 * asset_id 资产壳ID
 * item_id  子集ID
 * qb_datetime 起播时间
 * zb_datetime 终止播放时间
 * qb_assettime 视频起播时间
 * zb_assettime 视频终播时间
 * duration 适配总时长
 * ep 集数
 * asset_from 资产来源
 * asset_type 资产类型
 * time 实际播放时长
 * error 错误信息
 * fee 是否收费
 * parent_page_type 父级页面类型
 * parent_page_id 父级页面ID
 * pos_id 推荐页位置
 * recmd_id 大数据推荐类型
 */
bi.vod = function (jsonOb){
  let logOb = commonParams;
  logOb.event = '8';
  logOb.asset_id = jsonOb.asset_id;
  logOb.item_id = jsonOb.item_id;
  logOb.qb_datetime = jsonOb.qb_datetime;
  logOb.zb_datetime = jsonOb.zb_datetime;
  logOb.qb_assettime = jsonOb.qb_assettime;
  logOb.zb_assettime = jsonOb.zb_assettime;
  logOb.duration = jsonOb.duration;
  logOb.ep = jsonOb.ep;
  logOb.asset_from = jsonOb.asset_from;
  logOb.asset_type = jsonOb.asset_type;
  logOb.time = jsonOb.time;
  logOb.error = jsonOb.error;
  logOb.fee = jsonOb.fee;
  logOb.parent_page_type = jsonOb.parent_page_type;
  logOb.parent_page_id = jsonOb.parent_page_id;
  logOb.pos_id = jsonOb.pos_id;
  logOb.isFullScreen = logOb.isFullScreen;
  logOb.recmd_id = localStorage.getItem('BI_recmd_id') || '';
  logup(logOb)
}

// 上传
function logup (jsonOb){
  // console.error('BI log:' + JSON.stringify(jsonOb))
  api.post(logAddress, JSON.stringify(jsonOb), function (){
    console.log('bi 日志发生完毕');
  })
}
export { bi }
