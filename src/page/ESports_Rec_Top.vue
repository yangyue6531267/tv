
// 首页推荐屏内容
<template>
  <div class="h_top">
    <div class="top_tiao">
      <div v-for="(item,index) in top"
            v-if="index<3"
            :key="item.id"
            :id="('t'+index)"
      >
      <p>{{item.subtitle}}</p>
      <p>{{item.elementName}}</p>
      <div :class="{'hover':itemNo==index&& isActive}"></div>
      </div>
    </div>
    <div class="top_play" id="t3" :class="{'active':itemNo==3&& isActive}">
      <VideoPlayer v-if="detail&&isShowPlay" v-bind:detailData="detail" v-bind:currShow="currShow"
        ref="videoplayer"
        v-bind:psId="psId"
        v-bind:playerCore="playerCore"
        v-bind:isFullScreen="false" 
        v-bind:isFree="isFree"
        v-bind:isBought="isBought"
        v-bind:lastFocusId="lastFocusId"
        :size="size"
        v-on:initFocus="initFocus($event)"
        v-on:setCurrPlay="setCurrPlay($event)"
        v-on:goCloudPay="goCloudPay()"
        v-on:onPlayStart="onPlayStart()"
        v-on:onPlayError="showError(3)"
        v-on:onPlayOver="onPlayOver()">
        >
      </VideoPlayer>
    </div>
    <div class="top_r_news">
      <ul>
        <li
          v-for="(item,index) in top"
          v-if="index>3 && index<7"
          :key="item.id"
          :id="('t'+index)"
        >
          <div class="no" :class="{'acckive':itemNo==index&& isActive && index<6}"><p class="os">{{top[index].subtitle}}</p></div>
          <div class="no" :class="{'acckives':itemNo==index&& isActive && index==6}"><p class="oo">{{top[index].subtitle}}</p></div>
          <div :class="{'img_border':index==4||index==5,'achange':itemNo==index&& isActive}"></div>
            <lazy-image
              :src='top[index].elementImg'
              :placeholder='placeholder'
            />
        </li>
      </ul>
    </div>
    <keyDo
      v-on:listenKeyCode="keyCode"
      v-if="isShow"
    ></keyDo>
  </div>
</template>
<style scoped="rec_top">
.img_border{
  width: 223px;
  height: 126px;
  position: absolute;
  top: -11px;
  left: -8px;
  z-index: -1;
  background: url(../../static/images/category/113.png) no-repeat;
  background-size:100% 100%;
}
.img_border.achange{
  background: url(../../static/images/category/115.png) no-repeat;
  background-size:100% 100%;
}
.h_top {
  position: relative;
  width: 1227px;
  height: 269px;
}
.h_top:after {
  clear: both;
  content: "";
  display: block;
}
.h_top img {
  cursor: pointer;
}
.top_tiao{
  width: 224px;
  height: 270px;
  background: url(../../static/images/category/1811.png) no-repeat 100% 100%;
  position: relative;
  z-index: -10;
}
.top_tiao div p{
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.top_tiao div:nth-child(1){
  position: absolute;
  left: 14px;
  top: 25px;
}
.top_tiao div p:nth-child(1){
  font-size: 15px;
  color: #A5AAB1;
  text-align: left;
  margin-bottom: 11px;
}
.top_tiao div p:nth-child(2){
  font-size: 18px;
  color: #ffffff;
  text-align: left;
}
.top_tiao div:nth-child(2){
  position: absolute;
  left: 14px;
  top: 106px;
}
.top_tiao #t2{
  position: absolute;
  left: 14px;
  top: 189px;
}
.top_r_img img {
  width: 100%;
  height: 100%;
}
.top_r_news ul {
  position:absolute;
  right: 265px;
  top: 12px;
  box-sizing: border-box;
}
.top_r_news li{
  position: relative;
}
.top_r_news li .imglazy {
  border-radius: 7px;
}
.top_r_news li:nth-child(1) {
  width: 206px;
  height: 102px;
  margin-bottom: 41px;
  margin-top: 3px;
}
.top_r_news li:nth-child(2) {
  width: 206px;
  height: 102px;
  margin-bottom: 41px;
  margin-top: 3px;
}
.no{
  display: none;
}
.no .oo{
    width: 132px;
    height: 201px;
    font-size: 15px;
    text-indent: 2em;
    margin-left: 33px;
    margin-top: 23px;
    display: block;
}
.no .os{
    width: 190px;
    height: 100px;
    font-size: 15px;
    text-indent: 2em;
    margin-left: 13px;
    margin-top: 13px;
    display: block;
}
.acckive{
    width: 206px;
    height: 102px;
    background: rgba(0, 24, 67, 0.3);
    z-index: 2;
    position: absolute;
    left: 0px;
    top: 0px;
    display: block;
    text-indent: 2em;
    
}
.acckives{
    width: 101%;
    height: 100%;
  background: url(../../static/images/category/108.png) no-repeat;
    background-size: 100% 100%;
    z-index: 2;
    position: absolute;
    left: 0px;
    top: 0px;
    display: block;
    text-indent: 2em;
}
.top_r_news li:nth-child(3) {
  width: 180px;
  height: 270px;
  background: url(../../static/images/category/108.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: -202px;
  top: -8px;
}
.top_play{
  width: 480px;
  height: 270px;
  position: absolute;
  right: 498px;
  top: 0px;
}
.top_r_news li img {
  width: 100%;
  height: 100%;
}
.top_r_img img.item_hover {
  margin-top: -4px;
  border: 4px solid #ffffff;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.55);
  transform: scale(1.05);
  z-index: 999;
}
.top_r_news li.item_hover:nth-child(3),
.top_r_news li.item_hover:nth-child(4) {
  border: 4px solid #ffffff;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.55);
  transform: scale(1.15);
  z-index: 999;
}
.top_r_news li.item_hover:nth-child(1),
.top_r_news li.item_hover:nth-child(2) {
  border: 4px solid #ffffff;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.55);
  transform: scale(1.15);
  z-index: 999;
}
.hover{
      width: 274px;
    height: 101px;
    background: url(../../static/images/category/1900.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    left: -38px;
    top: -78px;
    z-index: -2;

}
.active{
  width: 480px;
  height: 270px;
  background: url(../../static/images/category/661.png) no-repeat;
  background-size:100% 100%;
}

</style>
<script>
import { mapGetters } from 'vuex';
import { bp as bi } from '../js/ga.js';
import { hp } from '../util/dom.js';
import { HTTPUtil as api } from '../fetch/api.js';
import { yst } from '../js/yst.js';
import c from "../js/common.js";
// import { client as yh} from '../js/client.js'; //播放器
import VideoPlayer from '../page/play/VideoPlayer'
import PlayCore from '../page/play/playerCode.js'
import DetailRecordHelper from '../page/play/DetailRecordHelper'

export default {
  props: ['initData', 'catCode', 'catId', 'itemSort','isPlay'],
  name: 'IndexTopRecommend',
  data: function () {
    return {
      name: 'IndexTopRecommend',
      placeholder: require('../assets/img_loading_352x190.png'),
      initScore: require('../assets/corner_mark.png'),
      itemNo: 0,
      position: 0,
      pos: '',
      eleId: '',
      pageId: '',
      top: [],
      isShow: false, // 是否注册键值
      isActive: false, // 是否被激活,
      load_start: 0,
      load_time: 0,
      // 播放器传值
      size:{x:293, y:164, width:474,height:260},
      playerCore: PlayCore.getPlayCore(),
      currShow: 0, // 0:主页  1：全集 2：简介 3：全屏
      // view管理
      lastFocusId: '',
      classifyDirection: '',
      isFree: false,
      isBought: false,
      detail:'',
      psId:'',
    };
  },
 
  created () {
    this.load_start = new Date() - 0;
    // window.play = this.play;
  },
  activated(){
    this.$store.commit('GET_EPISODE', 0);
    this.$store.commit('GET_ISSHOWPLAY', true);
    // this.$refs.videoplayer.nextPlay();
  },
  mounted () {
    this.load_time = new Date() - this.load_start;
    this.top = this.initData.elementList;
    this.eleId = this.initData.specialId;
    this.getJsonPlay(this.top[3].jsonUrl+this.behindParams);
  },
  updated(){

  },
  methods: {
    keyCode (kc) {
      if (kc == 'KeyBack') {
        this.back();
      } else if (kc == 'right') {
        this.right();
      } else if (kc == 'left') {
        this.left();
      } else if (kc == 'down') {
        this.down();
      } else if (kc == 'up') {
        this.up();
      } else if (kc == 'KeyEnter') {
        let posId = this.itemSort + '0' + (this.itemNo + 1);
        let columnId = '0' + this.navpos;
        c.setPosition(columnId, posId); // 保存推荐位置
        c.setParentPageType('0101');
        c.setParentPageId(this.categorys[this.navpos].catId);
        this.$store.commit('GET_ISSHOWPLAY', false);
        // 关闭小窗口播放
        // 数据采集
        this.clickPage();
        var pageType = this.$route.name;
        if (pageType == 'index') {
          try {
            this.pageId = this.catId;
            var traceId =
              '|' + this.catId + '|' + this.top[this.itemNo].elementId;
            var traceType = '|1|';
            bi.categoryClick(
              this.catId,
              this.top[this.itemNo].elementId,
              3,
              1,
              this.catId,
              traceId,
              traceType
            );
          } catch (error) {
            console.log(error);
          }
        }
        var url = this.top[this.itemNo].jsonUrl;
        if (this.itemNo==3) {
          if (this.top[3].elementType==10) {
            // yh.AllinitPlay();
            // 直播
          }else if (this.top[3].elementType==1) {
            this.currShow = 3;
            let currentTime = 0;
            currentTime = this.$refs.videoplayer.getCurrentTime();
            this.$refs.videoplayer.destoryPlayer();
            DetailRecordHelper.recordSchedule(this.detail.assetId,this.episode, currentTime);
            this.$router.push({'name': 'play', params: {detailData: this.detail, currShow: this.currShow, playerCore: this.playerCore, psId: this.psId, isFree: this.isFree, isBought: this.isBought, isFullScreen: true}})
          }
        } else {
          // this.removrplay();
          c.routerSkip(url,this.top[this.itemNo].elementType,this.top[this.itemNo].layout,{},this.$router);
        }
      }
    },
    getJsonPlay(url){
      api.jsonp(url,  (json)=> {
        if (json.code == 200 || json.code == '200') {
          console.warn(json);
          this.detail = json.data;
        }
      });
    },
    isPlayNow(){
      // 播放
      // if (this.top[3].elementType==10) {
      //   this.play();
      // }else if (this.top[3].elementType==1) {
      //   this.Dplay();
      // }
    },
    removrplay(){
      // if (this.top[3].elementType==10) {
      //   yh.closeView();
      // }else if (this.top[3].elementType==1) {
      //   yh.closePlayer();
      // }
    },
    hideplay(){
      // if (this.top[3].elementType==10) {
      //   yh.hideView();
      // }else if (this.top[3].elementType==1) {
      //   yh.hidePlayer();
      // }
    },
    isshowplay(){
      // if (this.top[3].elementType==10) {
      //   yh.showView();
      // }else if (this.top[3].elementType==1) {
      //   yh.showPlayer();
      // }
    },
    play(){
      // setTimeout(()=>{
      //     yh.Player(293,164,474,260);
      //     let url = this.top[3].jsonUrl;
      //     let id = this.top[3].elementId;
      //     yh.showPlay(url,id);
      //   },500)
    },
    Dplay(){
      // setTimeout(()=>{
      //     yh.initPlayer(293,164,474,260);
      //     let url = this.top[3].jsonUrl;
      //     let id = this.top[3].elementId;
      //     yh.showVideo(url,id);
      //   },500)
      },
    back () {
      this.isActive = false;
      this.isShow = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'back');
    },
    up () {
      if(this.itemNo == 0 ||this.itemNo ==3||this.itemNo ==4||this.itemNo ==6){

        this.isActive = false;
        this.isShow = false;
        this.$emit('pressDown', this.isShow, this.eleId, 'up');
      }else{
        this.itemNo--;
      }
    },
    down () {
      if(this.itemNo == 1 ||this.itemNo ==4||this.itemNo ==0){
        this.itemNo++;
      }else{
        this.isActive = false;
        this.isShow = false;
        this.$emit('pressDown', this.isShow, this.eleId, 'down');
      }
    },
    left () {
      if(this.itemNo<=0 ||this.itemNo ==1 ||this.itemNo ==2)return;
      if(this.itemNo ==4 ||this.itemNo ==5){
        this.itemNo =3;
      }else if(this.itemNo ==3){
        this.itemNo=0;
      }else if(this.itemNo ==6){
        this.itemNo-=2;
      }else {
        this.itemNo--;
      }
    },
    right () {
      if(this.itemNo>=6)return;
      if(this.itemNo==0 ||this.itemNo==1 ||this.itemNo==2){
        this.itemNo = 3;
      }else if(this.itemNo ==4){
        this.itemNo+=2;
      }else{
        this.itemNo++;
      }
    },
    updateStast (bl, pos, isEnd) {
      console.log('头部组件接受键值' + bl + pos + isEnd);
      if (bl) {
        this.isShow = bl;
        this.isActive = true;
        this.pos = pos;
        console.log('显示选中效果');
      }
    },
    clickPage () {
      var ystObj = {};
      ystObj.ip = '';
      ystObj.time = this.getDate();
      ystObj.page_name = 'pageIndex_0' + (this.navpos + 1);
      ystObj.page_level = '1';
      ystObj.Panel_id = '0' + (this.navpos + 1);
      ystObj.Recommend_id =
        ystObj.Panel_id + this.itemSort + '0' + (this.itemNo + 1);
      ystObj.Page_url = '/index';
      ystObj.Load_time = this.load_time;
      ystObj.Load_status = 'success';
      yst.panelClick(ystObj);
    },
    getDate () {
      var date = new Date();
      var nian = date.getFullYear();
      var yue = date.getMonth() + 1;
      var ri = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      var shi = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      var fen =
        date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      var miao =
        date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
      return nian + '-' + yue + '-' + ri + ' ' + shi + ':' + fen + ':' + miao;
    },
    cEleOffsetTop (ele) {
      try {
        var fEleDistance = hp.offset(hp.$(ele)).top;
        var realHeight = 0;
        if (this.position == 0) {
          realHeight = fEleDistance + 306;
        } else {
          realHeight = fEleDistance + 140;
        }
        return realHeight;
      } catch (error) {
        console.log('获取高度异常')
      }
    },
    initFocus (force = false) {

    },
    setCurrPlay (index) {
      console.log('setCurrPlay index = ' + index);
      this.$store.commit('GET_EPISODE', index);
      // this.currPlayIndex = index;
    },
    goCloudPay (immediately = false, force = false) {
      console.log('goCloudPay isBought = ' + this.isBought + ' cloudPayUrl = ' + this.cloudPayUrl);
    },
    onPlayStart (param) {
      console.log('开始播放参数：' + param);
    },
    onPlayOver () {
      // if (this.currShow == 3)
      //     this.currShow = 0;
    },
    showError (errCode) {
      console.log('showError enter, errCode = ' + errCode);
      this.currShow = 0;
      let self = this;
      let params;
      // 1: 获取信息错误  2:参数错误 3: 播放错误
      switch (errCode) {
        case 1:
          console.log('获取信息错误');
          break;

        case 2:
          console.log('参数信息错误');
          break;

        case 3:
          console.log('播放器播放器异常');
          break;
      }
    }
  },
  watch: {
    initData () {
      this.top = this.initData.elementList;
      this.eleId = this.initData.specialId;
    }
  },
  components: {VideoPlayer},
  computed: {
    ...mapGetters(['behindParams', 'episode',  'smallScreenState', 'navpos','isShowPlay','categorys'])
  },
};
</script>
