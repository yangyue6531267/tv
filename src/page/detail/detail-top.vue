<!-- 详情页公共上部——wzh -->

<template>
  <div>
    <detailMoreIntroduction ref="detailM" :isAlert="detailData.description" v-on:pressDown="keepDo"></detailMoreIntroduction>
    <div class="detail-top">
      <div class="player-window" :class="{'active':position===0}">
        <!-- <span></span> -->
        <VideoPlayer v-if="detailData" v-bind:detailData="detailData" v-bind:currShow="currShow"
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
      <div class="details">
        <div class="text-box">
          <p>{{detailData.assetName}}</p>
          <p>{{detailData.area}} | {{detailData.year}} | {{detailData.language}}</p>
          <div class="collection" :class="{'active':position===1,'noCollect':noCollect,'isCollect':!noCollect}"></div>
          <div :class="{'orderBtn':true}"></div>
          <div :class="{'orderBtn_hover':position === 2}"></div>
        </div>
        <div class="introduction">
          <div class="word">{{detailData.description}}</div>
          <span :class="{'active':position === 3}"></span>
        </div>
      </div>
    </div>
    <div class="detail-content">
      <ul ref="contentBox">
        <li v-for="(item,index) in detailData.itemList" :key="index" :id="('box-'+index)" :class="{'active':index===itemNo && !isTop}">
          <div :class="{'isplay':index===isplay}">{{item.itemName}}</div>
        </li>
      </ul>
    </div>
    <keyDo ref="keydo" v-on:listenKeyCode="keyCode" v-if="isShow"></keyDo>
  </div>
</template>

<style scoped="detailTop">
  .detail-top {
    margin-top: 32px;
    margin-left: 60px;
  }

  .detail-top .player-window{
    float: left;
    width: 490px;
    height: 280px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    margin-left:-6px; 
    margin-top: -4px;
  }

  .detail-top .player-window.active {
    background: url("../../assets/detail/play-window.png") no-repeat;
    background-size: 100% 100%;
  }

  .player-window span {
    display: block;
    width: 93px;
    height: 93px;
    background: url("../../assets/detail/pause.png");
    background-size: cover;
  }

  .details {
    float: right;
    width: 662px;
    height: 272px;
    margin-right: 30px;
    background-color: rgba(131, 188, 255, 0.3);
  }

  .details:after {
    display: block;
    content: "";
    height: 0;
    clear: both
  }
  .orderBtn{
    width: 402px;
    height: 67.2px;
    background: url('../../assets/order.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 229px;
    margin-top: 70px;
  }
  .orderBtn_hover{
    position: absolute;
    top: 266px;
    margin-left: 229px;
    width: 402px;
    height: 67.5px;
    background: url('../../assets/orderBtn_hover.png') no-repeat;
    background-size: 100% 100%;
  }
  .text-box {
    display: inline-block;
    height: 100px;
    width: 273px;
    margin-top: 20px;
    margin-left: 10px;
  }
  .text-box p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }
  .text-box p:nth-of-type(1) {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    line-height: 42px;
    font-size: 35px;
    max-width: 320px
  }

  .text-box p:nth-of-type(2) {
    font-size: 18px;
    line-height: 22px;
  }

  .collection {
    margin-left: 9px;
    margin-top: 71px;
    width: 200px;
    height: 64px;
    float: left;
  }

  .collection.noCollect {
    background: url("../../assets/detail/noCollect.png");
  }

  .collection.isCollect {
    background: url("../../assets/detail/collected.png")
  }

  .noCollect.active {
    background: url("../../assets/detail/noCollect-active.png");
  }

  .isCollect.active {
    background: url("../../assets/detail/collected-active.png")
  }

  .introduction {
    float: right;
    margin-top: 30px;
    margin-right: 20px;
    width: 325px;
    height: 135px;
    background: url("../../assets/detail/introduction-window.png") no-repeat;
    background-size: 100% 100%;
  }

  .introduction:after {
    display: block;
    content: "";
    height: 0;
    clear: both
  }

  .introduction .word {
    margin-top: 17px;
    margin-left: 16px;
    width: 289px;
    height: 82px;
    font-size: 20px;
    line-height: 27px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .introduction span {
    display: block;
    content: "";
    width: 76px;
    height: 43px;
    margin-left: 248px;
    background: url("../../assets/detail/more-introduction.png");
  }

  .introduction span.active {
    background: url("../../assets/detail/more-introduction-active.png");
  }

  .detail-top:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
  }

  .detail-content ul {
    margin-left: 35px;
    width: 20000%;
    transition: all 0.3s;
  }

  .detail-content ul:after {
    display: block;
    content: "";
    height: 0;
    clear: both;
  }

  .detail-content li {
    float: left;
    width: 231px;
    height: 130px;
    margin-left: 20px;
    margin-top: 20px;
    background: url("../../assets/detail/img_230x130.png") no-repeat;
    background-size:100% 100%; 
    font-size: 20px;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }


  .detail-content li div {
    width: 166px;
    color: rgba(255,255,255,0.3);
  }



  .detail-content li.active {
    background: url("../../assets/detail/img_230x130_active.png") no-repeat;
    background-size:100% 100%; 
  }

  .detail-content li div.isplay {
    color: rgba(255,255,255);
  }
</style>


<script>
  import {
    HTTPUtil as api
  } from "../../fetch/api.js";
  import {
    mapGetters
  } from 'vuex';
  import {
    client as yh
  } from '../../js/client.js'
  import detailMoreIntroduction from './detail-more-introduction.vue'
  import c from '../../js/common.js';
  import { yst } from '../../js/yst.js';
  import VideoPlayer from '../play/VideoPlayer'
  import PlayCore from '../play/playerCode.js'
  import DetailRecordHelper from '../play/DetailRecordHelper'

  export default {
    props: ['initData', 'jsonUrl'],
    data() {
      return {
        name:"detail_top",
        detailData: '',
        isShow: true,
        isTop: true,
        position: 0,
        itemNo: -1,
        lastFocus: 0,
        topLastFocus: 0,
        isplay: 0,
        noCollect: true,
        size:{x:60, y:90, width:480,height:270},
        playerCore: PlayCore.getPlayCore(),
        currShow: 0, // 0:主页  1：全集 2：简介 3：全屏
        // view管理
        lastFocusId: '',
        classifyDirection: '',
        isFree: false,
        isBought: false,
        psId:""
      }
    },
    beforeCreate() {

    },
    created() {
      // window.isplaynum = this.isplaynum;
    },
    mounted() {
      // yh.setJsNoticEpCallBack("isplaynum");
    },
    components: {VideoPlayer,detailMoreIntroduction},
    computed: {
      ...mapGetters(['behindParams', 'episode',  'smallScreenState', 'navpos','isShowPlay'])
    },
    watch: {
      initData() {
        this.detailData = this.initData;
        try{
          this.collectData() //初次加载判断是否收藏
          console.warn('历史返回数据源:'+yh.playHistory(this.detailData.assetId))
          this.queryHistory();
          if(yh.playHistory(this.detailData.assetId) == ''){
            this.isplay = 0;
            this.itemNo = 0;
            this.$refs.contentBox.style.marginLeft = '35px';
          }else{
            // let json = JSON.parse(yh.playHistory(this.detailData.assetId));
            
          }
          alert(this.episode);
          this.isplaynum(this.episode);
          this.itemNo = this.isplay;
        }catch(error){
          console.log(error)
        }
        this.$nextTick(function () {
          this.logUp();
        });
      }
    },
    methods: {
      queryHistory (){
      let jsonob = '';
      try {
        jsonob = DetailRecordHelper.getRecord(this.detailData.assetId);
        // alert(jsonob.currentEpisode);
        try {
          if (typeof (jsonob) === 'string'){
            jsonob = JSON.parse(jsonob);
            alert(jsonob.currentEpisode);
          }
        } catch (error) {
          jsonob = '';
        }
        if (jsonob === ''){
          console.log('历史记录为空');
          this.$store.commit('GET_EPISODE', 0);
        } else {
          this.$store.commit('GET_EPISODE', jsonob.currentEpisode);
        }
      } catch (error) {

      }
    },
      isplaynum(num){
        // 播放回调
        console.log("传过来的字符串"+num);
        this.isplay = num*1;
        this.lastFocus = num*1;
        if(this.isplay>=4){
         this.$refs.contentBox.style.marginLeft = 35 - (this.isplay - 3) * 251 + "px"  
        }     
      },
      playnumenter(){
        // 确定播放亮起
        this.isplay = this.itemNo;
        if(this.isplay>=4){
          this.$refs.contentBox.style.marginLeft = 35 - (this.isplay - 3) * 251 + "px"      
        } 
      },
      collectData() {
        console.log("判断收藏");
        let url =
          "http://47.97.96.103/uds/cloud/collection/list?version=1&siteId=" + yh.siteId + "&userId=" + yh.userId +
          "&relateId=" + this.initData.assetId + "&collectType=1" + this.behindParams
        api.get(url, (res) => {
          // console.log(res);
          if (res.data.resultNum === 1) {
            this.noCollect = false
          } else {
            this.noCollect = true
          }
        })
      },
      addCollect() {
        let url = "http://47.97.96.103/uds/cloud/collection/collect?version=1"
        let data = {
          siteId: yh.siteId,
          userId: yh.userId,
          collectType: 1, //收藏类型(0-主播,1-资产,2-专题)
          relateId: this.detailData.assetId,
          relateTitle: this.detailData.assetName,
          relateScore: this.detailData.score,
          relateImg: this.detailData.assetImg,
          relateUrl: this.jsonUrl,
          relateLayout:this.detailData.layout
        }
        api.post(url, data, (res) => {
          console.log(res);
          if (res.mes === "ok")
            console.log("添加收藏成功");
        })
      },
      delCollect() {
        let url = "http://47.97.96.103/uds/cloud/collection/del?version=1"
        let data = {
          siteId: yh.siteId,
          userId: yh.userId,
          collectType: 1, //收藏类型(0-主播,1-资产,2-专题)
          relateId: this.detailData.assetId,
          layout:this.detailData.layout
        }
        api.post(url, data, (res) => {
          console.log(res);
          if (res.mes === "ok")
            console.log("删除收藏成功");
        })
      },
      keyCode(kc) {
        if(!this.detailData){
          if(kc == 'KeyBack'){
            if(this.$route.params.bp && this.$route.params.bp.type){
              c.routerBack(this.$router,this.$route.params.bp.type)
            }else{
              c.routerBack(this.$router,undefined)
            }
          }
        }else{
          if (kc === "down") {
            this.down();
          } else if (kc === "up") {
            this.up();
          } else if (kc === "left") {
            this.left();
          } else if (kc === "right") {
            this.right();
          } else if (kc === "KeyEnter") {
            this.enter();
          } else if (kc === "KeyBack") {
            this.$store.commit('GET_ISSHOWPLAY', false);
            if(this.$route.params.bp && this.$route.params.bp.type){
              c.routerBack(this.$router,this.$route.params.bp.type);
            }else{
              c.routerBack(this.$router,undefined);
            }
          }
        }
      },
      left() {
        if (this.isTop) {
          if (this.position === 0) return
          this.position--
        } else {
          if (this.itemNo === 0) return
          if (this.itemNo >= 3) {
            this.$refs.contentBox.style.marginLeft = 35 - (this.itemNo - 3) * 251 + "px"
          }
          this.itemNo--
        }
      },
      right() {
        if (this.isTop) {
          if (this.position === 2 || this.position === 3) return
          this.position++
        } else {
          if (this.itemNo === this.detailData.itemList.length - 1) return
          this.itemNo++
          if (this.itemNo >= 4) {
            this.$refs.contentBox.style.marginLeft = 35 - (this.itemNo - 3) * 251 + "px"
          }
        }
      },
      up() {
        if (this.isTop) {
          if(this.position == 2){
            this.position = 3;
          }
          return;
        }
        this.isTop = true
        this.position = this.topLastFocus
        this.lastFocus = this.itemNo
        this.itemNo = -1
      },
      down() {
        if (this.isTop) {
          if(this.position == 3){
            this.position = 2;
            return;
          }
          this.isTop = false
          this.itemNo = this.lastFocus
          this.topLastFocus = this.position
          this.position = -1
        } else {
          this.isShow = false
          this.lastFocus = this.itemNo
          this.itemNo = -1
          this.$emit('pressDown', this.isShow, this.detailData, "down");
        }
      },
      enter() {
        if (this.isTop) {
          if (this.position === 0) {
            let historyData = {
              bookMarkTime: new Date().getTime(),  //播放时长
              watchTime: "", //观看时长
              collectType: 1, //收藏类型(0-主播,1-资产,2-专题)
              relateId: this.detailData.assetId,
              relateTitle: this.detailData.assetName,
              relateScore: this.detailData.score,
              relateImg: this.detailData.assetImg,
              layout: this.detailData.layout,
              jsonUrl: this.jsonUrl
            };
            yh.addHistory(historyData);
            this.currShow = 3;
            let currentTime = 0;
            currentTime = this.$refs.videoplayer.getCurrentTime();
            this.$refs.videoplayer.destoryPlayer();
            console.log('全屏记录历史时间：' + currentTime);
            DetailRecordHelper.recordSchedule(this.detailData.assetId,this.episode, currentTime);
            this.$router.push({'name': 'play', params: {detailData: this.detailData, currShow: this.currShow, playerCore: this.playerCore, psId: this.psId, isFree: this.isFree, isBought: this.isBought, isFullScreen: true}})
            // yh.fullPlay();
          } else if (this.position === 1) {
            if (this.noCollect) {
              this.addCollect()
            } else {
              this.delCollect()
            }
            this.noCollect = !this.noCollect
          } else if(this.position === 3) {
            // yh.hidePlayer();
            this.isShow = false;
            this.$refs.detailM.getKeyListen(true);
          }else if(this.position === 2){
            if(this.jsonUrl){
            window.localStorage.setItem('detailJsonUrl',this.jsonUrl);
            }
            c.setParentPageType('0301');
            c.setParentPageId(this.initData.assetId);
            this.$router.push({name: 'payfor'})
          }
        } else { //下方选集资产
          this.playnumenter();
          this.$store.commit('GET_EPISODE', this.itemNo);
        }
      },
      getKeyListen(pos) { //父级来的数据
        this.isShow = true
        if(pos == 'enter'){
           this.itemNo = 0;
        }else{
          this.itemNo = this.lastFocus
        }
      },
      keepDo(name, keyDo) { //子集来得数据
        if (name === "introduction") {
          this.isShow = true
        }
      },
      logUp () {
        try {
          let programInfo = {};
          programInfo.Program_name = this.detailData.assetName;
          programInfo.Program_id = this.detailData.assetId;
          programInfo.Product_code = '';
          programInfo.Product_name = '';
          programInfo.director = '';
          programInfo.actor = '';
          programInfo.year = this.detailData.year;
          programInfo.region = this.detailData.area;
          programInfo.label = '';
          programInfo.program_type = this.detailData.assetType;
          programInfo.program_status = '上线';
          programInfo.program_online_time = '';
          programInfo.program_offline_time = '';

          yst.contentInfo(programInfo);
        } catch (error) {
          console.log('移动数据处理异常');
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
  }
</script>