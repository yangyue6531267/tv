<template>
    <div  style="background-color:rgba(0,0,0,0);">
        <div  v-if="currShow == 0 && typeof(detailData) != 'undefined'" fe-role="Widget" class="video_player_wrapper" id="detail_top_left" style="display:none">
            <!-- <div id="video_bg" >
                <img class="video_player" src="../../assets/detail/detail_init.png" >
            </div> -->
             <!-- 小窗口提示信息 -->
            <div v-show="detailData.layout ==='Detail_Series'" class="smallScreenTip">
              <p>第 {{episode+1}} 集</p>
            </div>
            <div v-show="playState == 3 || playState == -2 || playState == -1"  id="playerLoading1" class="videoplay_tip_center_loading1" >
                <LoadingAnim/>
                <div v-show="playState == 3" class="videoplay_tip_center">玩命加载中...</div>
                <div v-show="isPlayStarted && (playState == -2 || playState == -1)" v-if=" typeof(detailData) != 'undefined'" class="videoplay_tip_center">即将播放：{{detailData.itemList[episode].itemName!=undefined?detailData.itemList[episode].itemName:''}}</div>
            </div>
            <div class="videoplay_tip_bottom_bg" v-show="smallScreenState === 0"></div>
            <div v-show="isPlayStarted && smallScreenState === 0" class="videoplay_tip_bottom" id="videoplay_tip_bottom">正在播放：{{detailData.itemList[episode].itemName!=undefined?detailData.itemList[episode].itemName:''}}</div>
        </div>
        <div id="video_player_main" v-if="currShow == 3 && typeof(detailData) != 'undefined'" class="video_player_main">
            <!-- 全部选集 -->
            <div  id="id_full_choose_episode" class="id_full_choose_episode" v-if="isShow">
              <!-- d顶部介绍 -->
              <div id="background—title" v-show="showContent == 2">
                <p class="videoName">{{detailData.assetName}}<span v-if="detailData.itemList.length>1">第{{episode+1}}集</span></p>
              </div>
              <div class="video_full_episode_scroll_wrapper" v-if="showContent == 1">
                  <!-- 综艺类选集 -->
                  <div id="video_variety_episode_scroll" class='video_variety_episode_scroll'>
                      <div :class="buttonPlaying?'variety_playing':''"></div>
                      <div class="varietyEisode" :style="{transform:'translateY('+scrollVariety+'px)'}">
                        <div v-for="(item,index) in detailData.itemList" v-bind:key="index">
                            <div class="button_variety">
                                <MarqueenText :id="'scroll_fullEpisode' + index" :text="item.itemName" :scroll="varietyEpisode == index"
                                    style="float:left;text-align:right;width:215px;height:60px;line-height:60px;"></MarqueenText>
                            </div>
                        </div>
                      </div>
                  </div>
              </div>
                <div  v-show="playState == 3 || playState == -2 || playState == -1" id="playerLoading2" class="" style="position:absolute;top:0px;left:0px;z-index:200;width:1280px;">
                       <div id="loading" style="width:1280px;height:720px;display:table-cell;vertical-align:middle;text-align:center;">
                       <LoadingAnim/>
                       </div>
                </div>
                <div v-show="showContent == 2" class="mediaPlayer_bottom" id="mediaPlayer_bottom">
                    <!--进度条-->
                    <div class="mediaPlayer_bottom_bg"></div>
                    <div class="mediaPlayer_progressBar xiuBar" id="mediaPlayer_progressBar">
                        <dl style="width:0%;" class="progressBar" id="progressBar">
                            <dt v-show="currFocusId == ''"><P id="progressTimeContent" style="margin-top:5px">00:00</P></dt>
                        </dl>
                        <dl class="mediaPlayer_progressBar_bg"></dl>
                    </div>
                    <!--功能块-->
                    <div >
                        <div id="mediaPlayer_function_endTime" class="mediaPlayer_function_endTime">00:00:00</div>
                    </div>
                </div>
            </div>
            <!-- 暂停按钮 -->
            <div v-show="playState === 2" class="stopBtn"></div>
            <!-- 自动联播提示 -->
            <div v-show="isPlayNext" class="nextPlay">
              <p>即将进入下一集</p>
            </div>
        </div>
        <keyDo v-on:listenKeyCode="keyCode" v-if="isShow" ref="keyDo"></keyDo>
    </div>

</template>

<script>
import { mapGetters } from 'vuex';
import DetailRecordHelper from './DetailRecordHelper'
import LoadingAnim from './LoadingAnim';
import CommonUtils from './CommonUtils'
import MarqueenText from './MarqueenText'
import {yst} from '../../js/yst.js'
import {bi} from '../../js/logApi.js'
import c from '../../js/common.js'
export default {
  components: {LoadingAnim, MarqueenText},
  props: ['detailData', 'psId', 'currShow', 'playerCore', 'isFree', 'isBought', 'isFullScreen','size',],
  data (){
    return {
      isPlayStarted: false,
      showContent: 0, // 1 选集  2 控制
      showTimer: -1,
      playState: -2,
      currPlayTime: 0,
      currFocusId: '',
      funViewInited: false,
      recordTimer: -1,
      progressTimer: -1,
      tryWatchTime: 600,
      cachePlayTime: -1,
      needPlayIndex: -1,
      needPlayTime: -1,
      needFullScreenTime: -1,
      needMinScreenTime: -1,
      playerReadyOption: {
        id: '',
        url: '',
        timeout: '60', // 缓冲超时时间，超时会触发onException
        beginTime: '0', // 视频播放开始时间，不是所有终端都支持
        name: '',
        onReady: function (){
          console.log('video_player onReady');
        }, // 播放器触发ready状态的回调函数
        onPlay: function (){
          console.log('video_player onPlay + this = ' + this);
        }, // 播放器触发play状态的回调函数
        onBuffer: function (){
          console.log('video_player onBuffer');
        }, // 播放器触发缓冲状态的回调函数
        onPause: function (){
          console.log('video_player onPause');
        }, // 播放器触发暂停状态的回调函数
        onResume: function (){
          console.log('video_player onResume');
        }, // 播放器触发重新播放状态的回调函数
        onStop: function (){
          console.log('video_player onStop');
        }, // 播放器触发stop状态的回调函数
        onOver: function (){
          console.log('video_player onOver');
        }, // 播放器触发播放结束状态的回调函数
        onException: function (){
          console.log('video_player onException');
        }, // 播放器触发异常状态的回调函数
        onError: function (){
          console.log('video_player onError');
        }, // 播放器触发error状态的回调函数
        onStateChange: function (){
          console.log('video_player onStateChange');
        }, // 播放器状态变更时的回调函数
        logOption: {} // 日志选项
      },
      isShow: false, // 键值变量
      singleList: [], // 分段集数条
      singleBar: false, // 单条选集
      scrollY: 241, // 初始化滚动条长度
      episodePos: 0, // 焦点停留在选集条位置
      buttonPlaying: true, // 选集条是否被选中
      scrollScope: 198, // 左边单条滚动
      scrollScopePos: 0, // 左边滚动条集数范围
      isPlayNext: false, // 是否激活下一集提示
      isVarietyBar: false, // 综艺选集条
      scrollVariety: 240, // 综艺滚动长度
      varietyEpisode: 0, // 综艺选集条当前集数位置
      userEffectiveTime: 0, // 用户有效时长
      userTimeTask: null, // 用户有效时长定时任务
      showModeTime: null, // 定时任务,用户不操作关闭操作面板
      startTime: '', // 播放器开始播放器时间点
      historyTime: '', // 视频播放器时间点
      TotalTime: '', // 视频总时长
      errorMsg: '' // 视频播放器错误信息
    }
  },
  watch: {
    episode: {
      handler:  function(v, oldV) {
        console.log('历史记录的集数与传入的集数不一致,使用传入的集数：' + v)
        console.log('episode changed v = ' + v + 'oldv = ' + oldV);
        this.cachePlayTime = -1;
        this.playIndex(this.episode);
      },
      deep: false
    },
    detailData(){
      console.log('video player next');
      setTimeout(() => {
        if (this.isFullScreen){// 全屏状态
          this.isShow = true;
          this.playerCore.setDisplayArea(0, 0, 1280, 720);
        } else { // 小窗口状态
          this.initView(this.size);
        }
        this.destoryPlayer();
        this.startPlay();
        this.initListener();
        this.initProgress();
        this.initModelData();
      }, 100);
    },
    currShow: {
      handler: function (v, oldV) {
        console.log('videoplayer currShow changed = ' + this.currShow);
        // if (oldV == 3 && v != 3)
        //     this.minScreen();
      },
      deep: false
    },
    isShowPlay(){
      if (this.isShowPlay == false) {
        this.destoryPlayer();
        this.heartlogUp('end');
        yst.heart(0);
        this.$store.commit('GET_ISSHOWPLAY', true);
      }
    }
  },
  computed: {
    ...mapGetters(['behindParams', 'episode', 'userTimeStatus', 'smallScreenState','isShowPlay'])
  },
  methods: {
    keyCode (kc){
      console.log('播放器已获取键值控制权');
      this.controllShowModeTask();
      if (kc == 'down') {
        
        if (this.showContent === 1){
          // 焦点在综艺选集条
          if (this.isVarietyBar){
            if (this.varietyEpisode >= (this.detailData.itemList.length - 1)) return;
            this.scrollVariety -= 60;
            ++this.varietyEpisode;
            return;
          }
          // // 电视剧选集条
          // if (this.singleBar === false){
          //   // 焦点在集数上
          //   if (this.episodePos >= (this.detailData.itemList.length - 1)) return;
          //   this.scrollY -= 60;
          //   ++this.episodePos;
          //   // 集数滚动完以后计算左边集数范围的滚动长度
          //   let toleftScoll = this.episodePos - ((this.scrollScopePos + 1) * 10);
          //   if (toleftScoll === 0){
          //     // 满足左边滚动条件
          //     this.scrollScope -= 61;
          //     ++this.scrollScopePos;
          //   }
          // } else {
          //   if (this.scrollScopePos >= (this.singleList.length - 1)) return;
          //   this.scrollScope -= 61;
          //   ++this.scrollScopePos;
          //   // 右边选集条计算
          //   let surplus = (this.scrollScopePos) * 10 - this.episodePos;
          //   if (surplus > 0){
          //     this.scrollY -= (surplus * 60);
          //     this.episodePos = (this.scrollScopePos) * 10;
          //   } else {

          //   }
          // }
        } else if (this.showContent == 2){
          // 焦点在进度条
        } else if (this.showContent === 0){
          if (this.detailData.itemList.length == 1){
            // 电影资产不需要显示选集条
          } else {
            this.showContent = 1;
          }
        }
      } else if (kc == 'left') {
        if (this.showContent === 1){
          // if (this.singleBar === false){
          //   this.buttonPlaying = false;
          //   this.singleBar = true;
          // }
        } else if (this.showContent == 2){
          this.goBackView();
        } else if (this.showContent === 0){
          this.switchShowContent(2);
        }
      } else if (kc == 'right') {
        if (this.showContent === 1){
          // if (this.singleBar){
          //   this.buttonPlaying = true;
          //   this.singleBar = false;
          // }
        } else if (this.showContent === 2){
          this.goForwardView();
        } else if (this.showContent === 0){
          this.switchShowContent(2);
        }
      } else if (kc == 'KeyEnter') {
        if (this.showContent === 1){
          // if (this.singleBar === false){
            // 综艺选集条和电视剧选集条不影响
            this.$store.commit('GET_EPISODE', this.varietyEpisode);
          // }
        } else if (this.showContent == 2){
          if (this.playState == 2) {
            console.log('resume video');
            this.resume();
          } else {
            console.log('pause video');
            this.pause();
          }
        } else if (this.showContent == 0){
          // 如果没有在控制界面按确定
          if (this.playState === 2){
            console.log('resume video');
            this.pause();
          } else {
            console.log('pause video');
            // 继续播放
            this.resume();
          }
        }
      } else if (kc == 'KeyBack') {
        console.log('handleBackEvent showContent = ' + this.showContent);
        DetailRecordHelper.recordSchedule(this.detailData.assetId,this.episode, this.currPlayTime);
        // 监听返回键
        if (this.showTimer != -1) {
        // console.log("restartShowTimer before clear");
          clearTimeout(this.showTimer);
        }
        if (this.currShow == 3){
          if (this.showContent === 1 || this.showContent === 2){
            this.showContent = 0;
            // 如果是暂停状态则继续播
            if (this.playState == 2) { this.resume(); }
          } else if (this.showContent === 0){
            this.stop();
            // this.$router.push({name: 'detail'});
            this.$router.go(-1);
          }
        } else {
          this.stop();
          // this.$router.push({name: 'detail'});
          this.$router.go(-1);
        }
        // this.back();
      } else if (kc == 'up'){
        this.controllShowModeTask();
        if (this.showContent === 1){
          // 焦点在综艺选集条
          if (this.isVarietyBar){
            if (this.varietyEpisode === 0) return;
            this.scrollVariety += 60;
            --this.varietyEpisode;
            return;
          }
          // // 焦点在选集条
          // if (this.singleBar === false){
          //   // 焦点在集数上
          //   if (this.episodePos === 0) return;
          //   this.scrollY += 60;
          //   --this.episodePos;
          //   // 集数滚动完以后计算左边集数范围的滚动长度
          //   let toleftScoll = this.episodePos - ((this.scrollScopePos) * 10);
          //   if (toleftScoll === -1){
          //     // 满足左边滚动条件
          //     this.scrollScope += 61;
          //     --this.scrollScopePos;
          //   }
          // } else {
          //   if (this.scrollScopePos === 0) return;
          //   this.scrollScope += 61;
          //   --this.scrollScopePos;
          //   // 右边选集条计算
          //   let surplus = (this.scrollScopePos) * 10 - this.episodePos;
          //   if (surplus > 0){

          //   } else {
          //     this.scrollY -= (surplus * 60);
          //     this.episodePos = (this.scrollScopePos) * 10;
          //   }
          // }
        } else if (this.showContent == 2){
          // 焦点在进度条
        } else if (this.showContent === 0){
          if (this.detailData.itemList.length == 1){
            // 电影资产不需要显示选集条
          } else {
            this.showContent = 1;
          }
        }
      }
    },
    getSingleEpisode (){
      let arr_ = [];
      if (this.detailData.itemList.length > 0){
        for (let index = 0; index < this.detailData.itemList.length; index++) {
          if (index > 0 && index % 10 == 0){
            let templateNum = (index - 9) + '-' + (index);
            arr_.push(templateNum);
          }
        }
      }
      return arr_;
    },
    initModelData (){
      // 初始化模版显示数据
      if (this.currShow != 3) return;
      // 电视剧类型
      // if (this.detailData.layout === 'Detail_News'){
      //   this.singleList = this.getSingleEpisode(); // 集数范围确定
      //   // 初始化选集焦点
      //   if (this.episode > 0){
      //     this.scrollY -= (60 * this.episode);
      //     this.episodePos = this.episode;
      //     let seriesScope = Math.floor(this.episode / 10);
      //     // 判断是否需要滚动左边选集条
      //     if (seriesScope > 0){
      //       this.scrollScope -= (61 * seriesScope);
      //       this.scrollScopePos = seriesScope;
      //     }
      //   }
      // } else 
      if (this.detailData.layout === 'Game_Zy' || 'Detail_News'){
        // 综艺类型
        this.isVarietyBar = true;
        // 初始化选集条位置
        if (this.episode > 0){
          this.scrollVariety -= (60 * this.episode);
          this.varietyEpisode = this.episode;
        }
      }
    },
    initKeyEvent () {
    },
    heartlogUp (type){
      // 心跳日志上传
      starVGf.setCookie('STARV_ProgramCode', this.detailData.assetId);
      starVGf.setCookie('STARV_ProgramType', this.detailData.fCategory);
      starVGf.setCookie('STARV_PlayId', this.detailData.itemList[this.episode].vodList[0].vodId);
      starVGf.setCookie('STARV_EventType', type);
    },
    restartShowTimer () {
      // 重置时间显示
      if (this.showTimer != -1) {
        // console.log("restartShowTimer before clear");
        clearTimeout(this.showTimer);
        this.showTimer = -1;
      }

      console.log('restartTimer showtimer');
      this.showTimer = setTimeout(() => {
        // this.showContent = 0;
        console.log('restartTimer timeout playState = ' + this.playState);
        if (this.playState != 2) { this.switchShowContent(0); }
      }, 1000);
    },
    initListener () {
      // 初始化播放器监听
      console.log('开启播放器监听');
      var self = this;
      this.playerReadyOption.onReady = function (){
        self.heartlogUp('start');
        self.startTime = new Date().getTime();
        yst.heart(1); // 打开点播心跳
        console.log('video_player onReady');
      }; // 播放器触发ready状态的回调函数
      this.playerReadyOption.onPlay = function (){
        console.log('进入播放状态回调函数');
        self.heartlogUp('heart');
        console.log('video_player onPlay + this = ' + this);
        // self.showPlayer();
      }; // 播放器触发play状态的回调函数
      this.playerReadyOption.onBuffer = function (){
        console.log('video_player onBuffer');
      }; // 播放器触发缓冲状态的回调函数
      this.playerReadyOption.onPause = function (){
        console.log('video_player onPause');
      }; // 播放器触发暂停状态的回调函数
      this.playerReadyOption.onResume = function (){
        console.log('video_player onResume');
      }; // 播放器触发重新播放状态的回调函数
      this.playerReadyOption.onStop = function (){
        console.log('video_player onStop');
        setTimeout(() => {
          if (self.needPlayIndex != -1) {
            // 当集数存在时候
            self.playIndex_(self.needPlayIndex, self.needPlayTime);
            self.needPlayIndex = -1;
          } else if (self.needFullScreenTime != -1) {
            // 大屏时间
            self.fullScreen_(self.needFullScreenTime);
            self.needFullScreenTime = -1;
          } else if (self.needMinScreenTime != -1) {
            // 小屏时间
            self.minScreen_(self.needMinScreenTime);
            self.needMinScreenTime = -1;
          }
        }, 100)
      }; // 播放器触发stop状态的回调函数
      this.playerReadyOption.onOver = function (){
        console.log('video_player onOver episode = ' + self.episode +
                    ' length = ' + self.detailData.itemList.length);
        // self.playerCore.stop();
        console.log('video_player onOver currShow = ' + self.currShow)
        if (self.episode == self.detailData.itemList.length - 1) {
          setTimeout(() => {
            if (this.currShow != 3){
              self.$emit('onPlayOver');
            }
          }, 100);
          self.playNext();
        } else {
          self.playNext();
        }
      }; // 播放器触发播放结束状态的回调函数
      this.playerReadyOption.onException = function (){
        console.log('video_player onException');
        self.playerCore.stop();
      }; // 播放器触发异常状态的回调函数
      this.playerReadyOption.onError = function (){
        console.log('video_player onError');
        self.playerCore.stop();
      }; // 播放器触发error状态的回调函数
      this.playerReadyOption.onStateChange = function (){
        console.log('video_player onStateChange + state = ' + self.playerCore.getState());
        self.playState = self.playerCore.getState();
        
        if (self.playState == 0) {
          // ...
        }
        if (self.playState == -1){
          // 播放器初始化
          self.userTask();
        }
        if (self.playState != 2) {
          self.cachePlayTime = -1;
        }
        if (self.playState != 0) {
          self.showPlayer();
        } else {
          self.hidePlayer();
        }
        if (self.playState == 5 || self.playState == 6) {
          self.clearUserTask();
          self.$emit('onPlayError');
        }
      }; // 播放器状态变更时的回调函数
      console.log('videoplayer initListener finished');
    },
    userTask (){
      var timer = setInterval(() => {
        if (this.playState == 0 || this.playState == 2){
          clearInterval(timer);
          timer = null;
        }
        // 避免获取到的总时长有问题，每次去获取下
        this.TotalTime = this.playerCore.getTotalTime();
      }, 1000);
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer) // 此处的timer即 上文const的 timer
        timer = null;
      })
    },
    controllShowModeTask (){
      // 控制面板不操作自动隐藏
      clearTimeout(this.showModeTime);
      this.showModeTime = null;
      this.showModeTime = setTimeout(() => {
        if (this.showContent !== 0){
          this.showContent = 0;
        }
      }, 1000000000);
    },
    clearUserTask (){
      // clearInterval(this.userTimeTask);
      // this.userTimeTask = null;
      // let lastSeeTime = parseInt(localStorage.getItem('TotalUserTime'));
      // console.log('已观看时长:' + lastSeeTime);
      // let allTime = 0;
      // if (!isNaN(lastSeeTime)){
      //   allTime = lastSeeTime + (this.userEffectiveTime * 1000);
      // }
      // console.log('当前观看总时长:' + allTime);
      // localStorage.setItem('TotalUserTime', allTime);
    },
    initView (json) {
      // 初始化窗口大小
      console.warn(json.x,json.y,json.width,json.height);
      this.playerCore.setDisplayArea(json.x,json.y,json.width,json.height);
      console.warn(this.detailData);
    },
    initProgress () {
      // 初始化进度条
      clearInterval(this.recordTimer);
      this.recordTimer = setInterval(() => {
        if (this.playState == 1 || this.playState == 2 || this.playState == 3) {
          console.log('播放器状态属于暂停、缓冲，播放时，每过10s记录一次历史纪录');
          DetailRecordHelper.recordSchedule(this.detailData.assetId,
            this.episode, this.playerCore.getCurrentTime());
        }
        if (this.playState == 1) {
          console.log('检查试看时间是否已到');
          this.checkNeedGoBuy();
        }
      }, 100000000);
    },
    checkNeedGoBuy (time = -1) {
      // 查询用户是否订购
      console.log('checkNeedGoBuy==>enter isfree = ' + this.isFree + ' isBought = ' + this.isBought);
      let currTime = this.playerCore.getCurrentTime();
      if (time != -1) { currTime = time; }
      if (this.tryWatchTime <= currTime) {
        if (this.$emit('goCloudPay')) {
          console.log('need go pay stop');
          //   this.playerCore.stop();
        }
      }
    },
    refreshProgressView () {
      // 若没有数据，则在1秒后再尝试
      if (this.playerCore.getTotalTime() <= 0) {
        console.log('refreshProgressView ==> enter + totaltime <=0 return ');
        this.funViewInited = false;
        setTimeout(() => {
          this.refreshProgressView();
        }, 1000);

        return;
      }
      console.log('refreshProgressView1 ==> enter + totaltime = ' + this.playerCore.getTotalTime());

      this.funViewInited = true;

      // console.log("refreshProgressView total time = " + this.playerCore.getTotalTime() + " currtime = " + this.playerCore.getCurrentTime());
      this.currPlayTime = this.playerCore.getCurrentTime();
      let progress = this.currPlayTime / this.playerCore.getTotalTime();
      if (progress > 100) { progress = 100; }

      if (this.playState == 2) {
        console.log('刷新进度条，暂停状态');
      } else {
        console.log('刷新进度条,播放器状态' + this.playState);
      }

      // document.getElementById('episodeBtn').src = require('../../assets/player/ic_episode_unfocus.png');
      document.getElementById('progressBar').style.width = progress * 100 + '%';
      document.getElementById('progressTimeContent').innerHTML = this.getTimeFormat(this.currPlayTime);
      // document.getElementById('mediaPlayer_function_startTime').innerHTML = this.getTimeFormat(this.playerCore.getCurrentTime());
      document.getElementById('mediaPlayer_function_endTime').innerHTML = this.getTimeFormat(this.playerCore.getTotalTime());
    },
    goForwardView () {
      // 快进
      if (!this.funViewInited) { return; }
      if (this.cachePlayTime < this.playerCore.getCurrentTime()) { this.cachePlayTime = -1; }
      if (this.cachePlayTime != -1) { this.currPlayTime = this.cachePlayTime; } else { this.currPlayTime = this.playerCore.getCurrentTime(); }

      if (this.currPlayTime >= this.playerCore.getTotalTime()) { return; }
      if (this.playState == 2) { this.resume(); }
      this.currPlayTime += 20;
      if (this.currPlayTime > this.playerCore.getTotalTime()) { this.currPlayTime = this.playerCore.getTotalTime(); }
      this.cachePlayTime = this.currPlayTime;
      this.playerCore.seekByTime(this.currPlayTime);
      let progress = this.currPlayTime / this.playerCore.getTotalTime();
      document.getElementById('progressBar').style.width = progress * 100 + '%';
      // document.getElementById('mediaPlayer_function_startTime').innerHTML = this.getTimeFormat(this.currPlayTime);
      document.getElementById('progressTimeContent').innerHTML = this.getTimeFormat(this.currPlayTime);
      // 校验用户是否在试看的过程中快进
      this.checkNeedGoBuy(this.currPlayTime);
    },
    goBackView () {
      // 快退
      if (!this.funViewInited) { return; }
      if (this.cachePlayTime > this.playerCore.getCurrentTime()) { this.cachePlayTime = -1; }
      if (this.cachePlayTime != -1) { this.currPlayTime = this.cachePlayTime; } else { this.currPlayTime = this.playerCore.getCurrentTime(); }
      if (this.currPlayTime <= 0) { return; }
      if (this.playState == 2) { this.resume(); }
      this.currPlayTime -= 20;
      if (this.currPlayTime < 0) { this.currPlayTime = 0; }
      this.cachePlayTime = this.currPlayTime;
      this.playerCore.seekByTime(this.currPlayTime);
      let progress = this.currPlayTime / this.playerCore.getTotalTime();

      document.getElementById('progressBar').style.width = progress * 100 + '%';
      // document.getElementById('mediaPlayer_function_startTime').innerHTML = this.getTimeFormat(this.currPlayTime);
      document.getElementById('progressTimeContent').innerHTML = this.getTimeFormat(this.currPlayTime);
      // this.checkNeedGoBuy();
    },
    hidePlayer () {
      // 隐藏播放器
      let element = document.getElementById('video_bg');
      if (element != null) { element.style.visibility = 'visible'; }
    },
    showPlayer () {
      // 显示播放器
      let element = document.getElementById('video_bg');
      if (element != null) { element.style.visibility = 'hidden'; }
    },
    fullScreen_ (currTimer) {
      console.log('fullScreen_ currtime = ' + currTimer);
      this.playerReadyOption.beginTime = currTimer;
      this.playerCore.setDisplayArea(0, 0, 1280, 720);
      this.playerCore.ready(this.playerReadyOption);
    },
    minScreen_ (currTimer) {
      console.log('minScreen_ currtime = ' + currTimer);
      this.playerReadyOption.beginTime = currTimer;
      this.playerCore.setDisplayArea(this.size.x, this.size.y, this.size.width, this.size.height);
      this.playerCore.ready(this.playerReadyOption);
    },
    startPlay () {
      // 开始播放
      // this.playerCore.stop();
      console.log('video_player startPlay + state = ' + this.playerCore.getState());
      // 判断历史记录集数
      let record = DetailRecordHelper.getRecord(this.detailData.assetId);
      let playIndex = this.episode;
      console.log('startPlay record = ' + record + 'record string' + JSON.stringify(record) +
                'length = ' + this.detailData.itemList.length + 'record.currentEpisode = ' + record.currentEpisode);
      for (let i = 0; i < this.detailData.itemList.length; i++) {
        if (record.currentEpisode == this.detailData.itemList[i].episode) {
          playIndex = i + 1; // 集数对应数组里面的数据需要加1
          break;
        }
      }
      // 初始化播放器参数
      console.log('详情页传的集数：' + this.episode + '-----历史记录里面的集数:' + playIndex);
      if (playIndex == this.episode){ 
        this.playIndex(this.episode);
        } else { 
          this.$emit('setCurrPlay', playIndex); 
        }
      this.$emit('onPlayStart', playIndex);
    },
    getCurrentTime (){
      let value = this.playerCore.getCurrentTime();
      console.log('当前视频播放时间:' + value);
      return value;
    },
    destoryPlayer () {
      // 销毁播放器
      console.log('video_player destoryPlayer');
      this.playerCore.stop();
      this.removePlay();
      this.clearUserTask();
    },
    playNext () {
      // 播放器下一集
      this.isPlayNext = false; // 隐藏下一集提示
      console.log('playNext currIndex = ' + this.episode + ' length = ' + this.detailData.itemList.length);
      if (this.episode == this.detailData.itemList.length - 1) {
        if (this.detailData.itemList.length == 1) {
          DetailRecordHelper.recordSchedule(this.detailData.assetId,
            this.episode, 0);
        }
        // 判断是否大小屏
        if (this.currShow == 3){
          // 全屏播放完最后一集退出全屏返回到详情页
          // this.$router.push({name: 'detail'});
          this.$router.go(-1);
        } else {
          this.$emit('setCurrPlay', 0);
        }
        return;
      }
      console.log('playNext currShow =' + this.currShow);
      // 判断是否大小屏
      if (this.currShow == 3){
        console.log('当前播放第:' + this.episode);
        this.cachePlayTime = -1;
        this.playIndex(this.episode + 1);
      }
      this.$store.commit('GET_EPISODE', this.episode + 1);
    },
    playIndex (index, startPlayTime = -1) {
      // 选择播放集数
      console.log('playIndex index = ' + index + ' startPlayTime = ' + startPlayTime +
                'state = ' + this.playState);
      if (this.playState != 0 && this.playState != -2) {
        console.log('播放器状态为init或者是stop');
        this.playerCore.stop();
        this.needPlayIndex = index;
        this.needPlayTime = startPlayTime;
        return;
      }
      this.isPlayNext = false; // 清除下一集提示
      this.playIndex_(index, startPlayTime);
    },
    playIndex_ (index, startPlayTime = -1) {
      console.log('playIndex_ index = ' + index + ' startPlayTime = ' + startPlayTime);

      let record = DetailRecordHelper.getRecord(this.detailData.assetId);
      let startTime = 0;
      if (record.currentEpisode == this.episode && startPlayTime == -1) { startTime = record.currentSchedule; } else {
        if (startPlayTime != -1) { startTime = startPlayTime; }
      }
      if (!this.isBought && !this.isFree) {
        console.log('支付状态：' + this.isBought + '-----是否免费试看：' + this.isFree);
        startTime = 0;
      }
      this.historyTime = startTime;
      let tryTime = 600;
      if (typeof (tryTime) != 'undefined' && tryTime != null && tryTime != '') {
        this.tryWatchTime = parseInt(tryTime);
      } else {
        this.tryWatchTime = 600;
      }
      setTimeout(() => {
        console.log('playIndex actionUrl = ' + this.detailData.itemList[index].vodList[0].playUrl + 'startTime = ' + startTime);
        DetailRecordHelper.recordSchedule(this.detailData.assetId, this.episode, startTime);
        this.playerReadyOption.url = 'http://223.87.20.83:8089/28000001/m_ystenvod0000000000000000429759';
        this.playerReadyOption.beginTime = startTime;
        this.playerCore.ready(this.playerReadyOption);
        this.isPlayStarted = true;
      }, 200);
    },
    switchShowContent (show) {
      // 唤起进度条或者选集条需要更新集数或者更新播放器进度条
      console.log('switchShowContent show = ' + show + 'lenght = ' + this.detailData.itemList.length);

      if (show == 1) {
        // 如果是电影类型不需要唤醒选集条
        if (this.detailData.itemList.length <= 1) { return; }
      }
      if (this.showContent == show) { return; }
      this.showContent = show; // 唤醒选集条还是进度条
      if (show == 0 || show == 1) {
        this.currFocusId = '';
        if (this.progressTimer != -1) {
          clearInterval(this.progressTimer);
          this.progressTimer = -1;
        }
      } else if (show == 2) {
        this.currFocusId = '';
        this.refreshProgressView();
        if (this.progressTimer == -1) {
          this.progressTimer = setInterval(() => {
            let progress = this.playerCore.getCurrentTime() / this.playerCore.getTotalTime();
            if (progress > 0.96){
              this.isPlayNext = true;
            }
            document.getElementById('progressBar').style.width = progress * 100 + '%';
            // document.getElementById('mediaPlayer_function_startTime').innerHTML = this.getTimeFormat(this.playerCore.getCurrentTime());
            document.getElementById('progressTimeContent').innerHTML = this.getTimeFormat(this.playerCore.getCurrentTime());
          }, 1000);
        }
      }
    },
    getTimeFormat (secondTime) {
      if (secondTime <= 0) { return '00:00:00'; }
      let hour = parseInt(secondTime / 3600) + '';
      if (hour.length == 1) { hour = '0' + hour; }
      let minute = parseInt(secondTime / 60) + '';
      if (minute.length == 1) { minute = '0' + minute; }
      let second = parseInt(secondTime % 60) + '';
      if (second.length == 1) { second = '0' + second; }
      return hour + ':' + minute + ':' + second;
    },
    reset () {
      // 播放器重置
      console.log('videoplayer reset');
      if (this.recordTimer != -1) {
        clearInterval(this.recordTimer);
        this.recordTimer = -1;
      }
      if (this.progressTimer != -1) {
        clearInterval(this.progressTimer);
        this.progressTimer = -1;
      }
      if (this.showTimer != -1) {
        clearTimeout(this.showTimer);
        this.showTimer = -1;
      }
      this.restartShowTimer();
      this.needPlayIndex = -1;
      this.needFullScreenTime = -1;
      this.needMinScreenTime = -1;
      this.playerCore.stop();
    },
    pause () {
      // 播放器关闭
      this.heartlogUp('end');
      yst.heart(0);
      // 清空用户定时任务
      this.clearUserTask();
      // 播放器暂停
      this.playerCore.pause();
    },
    resume () {
      this.heartlogUp('start');
      yst.heart(1); // 打开点播心跳
      // 开启用户时间
      this.userTask();
      // 播放器续播
      this.playerCore.resume();
    },
    stop () {
      console.log('videoplayer stop');
      this.playerCore.stop();
      if (this.recordTimer != -1) {
        clearInterval(this.recordTimer);
      }
      if (this.progressTimer != -1) {
        clearInterval(this.progressTimer);
      }
      if (this.showTimer != -1) {
        clearTimeout(this.showTimer);
      }
      this.needPlayIndex = -1;
      this.needFullScreenTime = -1;
      this.needMinScreenTime = -1;
    },
    removePlay(){
      this.playerCore.removePlay();
    },
    nextPlay(){
      setTimeout(() => {
        this.initView(this.size);
        this.startPlay();
        this.initListener();
        this.initProgress();
        this.initModelData();
      }, 100);
    }
  },
  created: function (){
    console.log('video player created');
    console.log(this.detailData);
    this.$nextTick(function (){
      setTimeout(() => {
        if (this.isFullScreen){ // 全屏状态
          this.isShow = true;
          this.$store.commit('SET_THESMALLSCREENSTATE', 5);
          this.playerCore.setDisplayArea(0, 0, 1280, 720);
        } else { // 小窗口状态
          this.$store.commit('SET_THESMALLSCREENSTATE', 0);
          this.initView(this.size);
        }
        this.startPlay();
        this.initListener();
        this.initProgress();
        this.initModelData();
      }, 100);
    })
  },
  beforeDestroy: function () {
    console.log('video player beforeDestroy');
    // 离开页面记录用户有效时长
    // 离开页面关闭播放器
    let logs = {
      asset_id: this.detailData.assetId,
      item_id: this.detailData.itemList[this.episode].itemId,
      qb_datetime:this.startTime,
      zb_datetime: new Date().getTime(),
      qb_assettime: this.historyTime,
      zb_assettime: this.currPlayTime,
      duration: this.TotalTime,
      ep: this.episode + 1,
      asset_from: this.detailData.providerId,
      asset_type: this.detailData.fCategory,
      time: this.userEffectiveTime,
      error: this.errorMsg,
      fee: this.detailData.itemList[this.episode].fee,
      parent_page_type: c.getParentPageType(),
      parent_page_id: c.getParentPageId(),
      pos_id: c.getPosition('posId') || '',
      recmd_id: c.getRecmd_id(),
      isFullScreen: this.currShow == 3 ? 0 : 1
    }
    console.log('埋点日志信息'+logs);
    bi.vod(logs);
    this.destoryPlayer();
    this.heartlogUp('end');
    yst.heart(0);
  }

}

</script>

<style scoped>
    .video_player_wrapper {
        position: absolute;
        /* top: 50px;
        left:60px; */
        height: 396px;
        width: 703px;
        /* outline: #fff solid 1px; */
    }
    .video_player_wrapper.fe-focus {
        /* outline: #fff solid 6px; */
    }
    .video_player {
        height: 100%;
        width: 100%;
        margin-top: -1px;
        border-radius: 16px;
    }
    .video_player_main {
        z-index: 10;
    }
    .smallScreenTip{
      position: absolute;
      width: 108px;
      height: 45px;
      left: 0px;
      top: 33px;
      background: url('../../assets/player/smallScreenTip.png') no-repeat;
      background-size: 100% 100%;
    }
    .smallScreenTip p{
      width: 100%;
      height: 100%;
      line-height: 42px;
      padding-left: 24px;
    }
    .id_full_choose_episode {
        height: 720px;
        width: 1280px;
        background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0.43) 0%,
        rgba(0, 0, 0, 0.43) 50%,
        rgba(0, 0, 0, 0.43) 100%
      );
    }
    .video_full_episode_scroll_wrapper {
        position: absolute;
        width: 390px;
        top: 0px;
        bottom: 0px;
        overflow-y:hidden;
        background: #00325D;
    }
    .video_single_episode_scroll{
      position: absolute;
      left: 80px;
      top: 126px;
      width: 130px;
      height: 400px;
      font-size: 20px;
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.01) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0.01) 100%
      );
      border-radius: 15px;
      height: 400px;
      overflow: hidden;
    }
    .video_variety_episode_scroll{
      position: absolute;
      left: 80px;
      top: 126px;
      width: 215px;
      font-size: 20px;
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.01) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0.01) 100%
      );
      border-radius: 15px;
      height: 515px;
      overflow: hidden;
    }
    .navEisode{
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }
    .varietyEisode{
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }
    .button_single_item{
      width: 130px;
      height: 61px;
      display: inline-block;
      text-align: center;
      line-height: 61px;
    }
    .singlebar{
      position: absolute;
      z-index: 99;
    }
    .video_full_episode_scroll{
        position: absolute;
        top: 86px;
        transition:all ease 0.3s;
        -moz-transition:all ease 0.3s; /* Firefox 4 */
        -webkit-transition:all ease 0.3s; /* Safari and Chrome */
        -o-transition:all ease 0.3s; /* Opera */
        height: 558px;
        left: 211px;
        background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0.3) 100%
      );
      overflow: hidden;
      border-radius: 15px;
        /* opacity: .5; */
    }
    #singleItme{
      position: absolute;
      width: 130px;
      height: 61px;
      top: 199px;
      z-index: 10;

    }
    .button_single_playing{
      background: url('../../assets/player/singleEpisode.png') no-repeat;
      background-size: 100% 100%;
    }
    .video_full_episode_scroll ul  {
        list-style: none;
    }
    .button_item {
        position: relative;
        color: white;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        width: 82px;
        height: 60px;
        line-height: 48px;
        text-align: center;
        border: 0px;
        border-radius: 0px;
    }
    .button_variety{
        position: relative;
        color: white;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        width: 215px;
        height: 60px;
        line-height: 48px;
        text-align: center;
        border: 0px;
        border-radius: 0px;
    }
    .videobutton {
        opacity: 0.5;
        width: 82px;
        height: 60px;
        position: absolute;
        /* background: #8294FF; */
        /* background: red; */

    }
    .videobutton.fe-focus{
        opacity: 1;
        width: 180px;
        height: 60px;
        position: absolute;

        background: #46C4BC;
        /* background: url('../../assets/nav_press.png') center center no-repeat; */
    }
    .button_playing {
        opacity: 1;
        width: 82px;
        height: 60px;
        position: absolute;
        top: 241px;
        background:url('../../assets/player/seriesOn.png') no-repeat;
        background-size: 100% 100%;
        /* background: url('../../assets/nav_press.png') center center no-repeat; */
    }
    .variety_playing{
        opacity: 1;
        width: 100%;
        height: 60px;
        position: absolute;
        top: 241px;
        background:url('../../assets/player/seriesOn.png') no-repeat;
        background-size: 100% 100%;
    }
    .button_playing.fe-focus {
        opacity: 1;
        width: 180px;
        height: 60px;
        position: absolute;

        background: #46C4BC;
    }
    .play_play {

        background-image: url(../../assets/player/ic_play_unfocus.png)
    }
    .play_play.fe-focus {
        background-image: url(../../assets/player/ic_play_focus.png)
    }
    .play_pause {
        background-image: url(../../assets/player/ic_pause_unfocus.png)
    }
    .play_pause.fe-focus {
        background-image: url(../../assets/player/ic_pause_focus.png)
    }
    .episode_all_title {
        margin-top: 10px;
    }
    .videoplay_tip_bottom_bg{
        position: absolute;
        text-align: center;
        bottom: 0px;
        width: 703px;
        height: 40px;
        background: #000000;
        opacity: 0.2;
        border-radius: 0px 0px 18px 16px;
    }
    .videoplay_tip_bottom{
        position: absolute;
        text-align: center;
        top: 366px;
        width: 703px;
        color:white;
    }
    .videoplay_tip_center_loading1 {
        position: absolute;
        /* left: 270px; */
        width:640px;
        top: 130px;
        text-align: center;
        color:white;
    }
    .videoplay_tip_center {
        position: relative;
        margin-top: 10px;
        text-align: center;
        color:white;
    }
    .stopBtn{
      position: absolute;
      width: 120px;
      height: 115px;
      background: url('../../assets/player/stop_icon.png') no-repeat;
      background-size: 100% 100%;
      left: 580px;
      top: 301px;
    }
    .nextPlay{
      position: absolute;
      width: 220px;
      height: 72px;
      top: 512px;
      left: 1060px;
      background: url('../../assets/player/selectEpisode.png') no-repeat;
      background-size: 100% 100%;
    }
    .nextPlay p{
      font-size: 20px;
      height: 100%;
      width: 100%;
      line-height: 70px;
      padding-left: 30px;
    }
.mediaPlayer{position:relative;top:0px;left:0px;width:1280px;height:720px;overflow:hidden;}
/* .mediaPlayer_top{height:55px;text-align:center;background:url(../../assets/player/opacityBg_00_80.png) 0 0 repeat-x;overflow:hidden;}
.mediaPlayer_top span{height:55px;line-height:55px;font-size:22px;color:#b9bbbd;font-weight:bold;text-align:center;} */

.mediaPlayer_bottom {position:absolute;bottom:5px;left:-44px;width:101%;height:200px;} /** background:url(../../assets/player/control_bg.png) 0 0 repeat-x; } **/
.mediaPlayer_bottom_bg {position:absolute;bottom:-41px;left:0px;width:100%;height:200px;opacity: 0.9; background:url('../../assets/player/play_propress.png') no-repeat;background-size: 100% 100%;}
.mediaPlayer_functionKey{position:absolute;bottom:100px;left:90px;width:40px;height:40px;}
.mediaPlayer_function_startTime{position:absolute;top:48px;bottom:99px;left:50px;z-index:1;height:8px;color: #FFFFFF;}
.mediaPlayer_function_endTime{position: absolute;
    top: 138px;
    bottom: 99px;
    left: 1200px;
    z-index: 1;
    height: 8px;
    color: #FFFFFF;}
.mediaPlayer_function_playPause{position:absolute;bottom:29px;left:150px;width:46.7px;height:46.7px;}
.mediaPlayer_function_episode{position:absolute;bottom:29px;left:220px;width:46.7px;height:46.7px;}
.mediaPlayer_function_title{position:absolute;bottom:29px;left:170px;width:940px;height:40px;text-align: center;color:white;font-size:22px}
.mediaPlayer_functionKey_left{float:left;width:328px;height:54px;margin-left:64px;overflow:hidden;}
.mediaPlayer_functionKey_right{float:right;width:252px;height:54px;margin-right:66px;overflow:hidden;}
.functionKey_left{float:left;}
.functionKey_right{float:right;}
.functionKey_left li{float:left;width:54px;height:54px;overflow:hidden;text-align:center;line-height:0px;margin-right:20px;}
.functionKey_right li{float:right;width:54px;height:54px;overflow:hidden;text-align:center;line-height:0px;margin-left:20px;}
.functionKey_left li img,.functionKey_right li img{width:54px;height:54px;/*-webkit-transition: all ease 0.3s;*/}
.functionKey_left li.keyx img:first-child{display:none;height:0px;}
.functionKey_right li.keyx img:first-child{display:none;height:0px;}
.mediaPlayer_functionKey_content{float:left;/*width:668px*/width: 566px;height:46px;line-height:46px;text-align:center;overflow:hidden;}
.mediaPlayer_functionKey_content span{height:46px;line-height:46px; white-space: nowrap; }
.mediaPlayer_functionKey_content span span{font-family: DroidSansFallback;height:46px;line-height:46px;font-size:28px;color: #E6E6E6;/*font-weight:bold;*/text-align:center;}

.mediaPlayer_progressBar{position: absolute;
    bottom: 93px;
    top: 138px;
    left: 122px;
    z-index: 1;
    width: 1030px;/*background:url(../images/player/opacityBg_00_50.png) 0 0 repeat-x;*/}
.mediaPlayer_progressBar_bg {width: 100%;height: 100%;background:url('../../assets/player/progress_bar.png') no-repeat;background-size:100% 100%;opacity: 0.3;position: absolute;top:0;left: 38px; z-index: 10;}
.progressBar {position: absolute;left: 40px; height:100%;background-size: 100% 100%;z-index: 100;background: linear-gradient(to left,rgba(165, 234, 240, 1) 0%,rgba(53, 186, 198, 0.5) 50%,rgba(53, 186, 198, 1) 100%);border-radius: 20px;}
.progressBarShowColor {position:absolute;height:100%;background-color:#46C4BC;z-index: 99;top:0px;opacity: 0.5;}
.progressBar dt {display:none;position:absolute;top: -12px;
    right: -50px;
    width: 90px;
    height: 40px;background:url('../../assets/player/progress_on.png') no-repeat;
    background-size: 100% 100%;text-align: center;
    line-height: 36px;}
.progressBar dd {display:none;position:absolute;bottom:18px;right:-76px;text-align:center;color:#e6e6e6;font-size:14px;width:177px;height:41px;line-height:16px;font-weight:bold;background:url(../../assets/player/procress_time.png) no-repeat; padding-top: 8px;}
/*.progressBar dd:before {content:"";position:absolute;top:-20%;left:0px;width:100%;height:20%;background:url(../images/player/key/timePlate.png) center top no-repeat;}
.progressBar dd:after {content:"";position:absolute;bottom:-20%;left:0px;width:100%;height:20%;background:url(../images/player/key/timePlate.png) center bottom no-repeat;}*/
.progressBar .date{bottom:10px; height:41px;line-height:36px;padding-top: 0;}

.progressBar dd.toLoad{position:absolute;bottom:18px;height:175px;right:-76px;}
.progressBar dd.toLoad:before{content:'';display:none;}
.progressBar dd.toLoad:after{content:'';display:none;}
.progressBar dd.toLoad img.view {position:absolute;top:0px;left:0px;width:100%;height:69%;border:none;}

.xiuBar {height:19px;}
.xiuBar .progressBar dt,.xiuBar .progressBar dd {display:block;}
.videoName{position: absolute;width: 400px;height: 52px;text-align: center;}
.videoName{top: 30px;font-size: 25px;}
/* .videoDetail{top:30px;font-size:22px; }
.videoDetail span{border-right: 1px solid white;margin-left: 10px;letter-spacing: 2px;padding-right: 5px;}
.videoDetail span:nth-child(1){border-left: none;} */
#background—title {
  position: absolute;
  width: 1280px;
  height: 100px;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.43);
  background-size: 100% 100%;
}
/* #background—title i {
  position: absolute;
  display: block;
  width: 60px;
  height: 20px;
  background: url("../../assets/detail/freestyle.png") no-repeat;
  background-size: 100% 100%;
  top: 165px;
  left: 250px;
} */
@keyframes loading {
    0%{
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}

@-webkit-keyframes loading {
    0%{
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }
}

#loading{
    animation:loading 3s infinite linear;
    -webkit-animation:loading 3s infinite linear;
}

</style>
