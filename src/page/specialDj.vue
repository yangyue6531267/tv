<template>
    <div class="special">
        <div class="special_left">
            <div class="left_top"></div>
            <div class="top_ico" :class="{'hover':itnum<=5||itemNo==0}"></div>
            <div class="center">
               <ul class="left_center" id="left">
                  <li 
                      v-for="(item,index) in top"
                      :key="item.id"
                      :id="('speaialDj'+index)"
                  >
                    <div id="specialCen">
                      <div class="list">{{item.elementName}}</div>
                      <div class="s_list"></div>
                    </div>
                    <div :class="{'hover':itemNo==index&&!isHover}"></div>
                  </li>
                </ul>
            </div>
            <div class="bottom_ico" :class="{'hover':itemNo==itnum||itnum<=5}"></div>
        </div>
        <div class="special_right">
            <div class="active" v-if="isHover"></div>
            <VideoPlayer v-if="detail" v-bind:detailData="detail" v-bind:currShow="currShow"
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
      <keyDo
      ref="keydo"
      v-on:listenKeyCode="keyCode"
      v-if="isShow"
    ></keyDo>
    </div>
</template>
<style scoped="special">
 .special{
     width: 1280px;
     height: 720px;
     background: url(../../static/images/specialDj/1822.png) no-repeat;
     background-size: 100% 100%;
     position: relative;
 }
 .special_left{
     width: 438px;
     height: 720px;
     background: url(../../static/images/specialDj/663.png) no-repeat;
     background-size: 100% 100%;
 }
 .left_top{
     width: 245px;
     height: 77px;
     background: url(../../static/images/specialDj/1820.png) no-repeat;
     background-size: 100% 100%;
     position:absolute;
     top:33px;
     left: 0px;
 }

 .center{
    height: 492px;
     width: 335px;
     overflow: hidden;
     position:absolute;
     top: 176px;
     left: 104px;
 }

 .left_center{
 }

 .left_center li{
     width: 335px;
     height: 64px;
     background: url(../../static/images/specialDj/839.png) no-repeat;
     background-size: 100% 100%;
     margin-bottom:18px; 
     position: relative;
 }
 .left_center li .hover{
    position: absolute;
    width: 335px;
    height: 64px;
    background: url(../../static/images/specialDj/1884.png) no-repeat;
    background-size:100% 100%;
    z-index: 99; 
    left: 0px;
    top: 0px;
 }
  .left_center li .list{
     /* font-size: 18px;
     
     width: 300px;
     
     margin-left: 14px;
     white-space: nowrap;
     float: left; */
     display: inline;
  }
  .left_center li .s_list{
    /* font-size: 18px;
     
     height: 68px;
     margin-left: 22px;
     float: left; */
     display: inline;
  }
  .special_right{
      width: 722px;
      height: 465px;
      position:absolute;
      top: 128px;
      right: 69px;
      background: url(../../static/images/specialDj/1821.png) no-repeat;
     background-size: 100% 100%;
  }
  .special_right .active{
    width: 720px;
    height: 425px;
    background: url(../../static/images/category/661.png) no-repeat;
    background-size: 100% 100%;
    position:absolute;
    top: 20px;
    left: 0px;
  }
  .top_ico{
    width: 66px;
    height: 66px;
    background: url(../../static/images/specialDj/icons_dark_next_1_-1.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 238px;
    top: 109px;
  }
  .bottom_ico{
    width: 66px;
    height: 66px;
    background: url(../../static/images/specialDj/icons_dark_next_1_.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;    left: 238px;
    bottom: 0px;
  }
  .bottom_ico.hover,.top_ico.hover{
    display: none;
  }
  #specialCen{
    margin-left: 20px;
    display: inline-block;
    position: relative;
    font-size: 18px;
    color: #ffffff;
    width: 90%;
    height: 68px;
    line-height: 50px;
    margin-top: 11px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
<script>
import { mapGetters } from 'vuex';
import { HTTPUtil as api } from '../fetch/api.js';
import { client as yh } from '../js/client.js';
import c from '../js/common.js';
import VideoPlayer from '../page/play/VideoPlayer'
import PlayCore from '../page/play/playerCode.js'
import DetailRecordHelper from '../page/play/DetailRecordHelper'

export default {
  props: ['jsonUrl'],
  data () {
    return {
      timer:0,
      isShow: true,
      isHover:false,
      itemNo: 0,
      itnum:0,
      placeholder: require('../../static/images/special/665.png'),
      initScore: require('../../static/images/special/665.png'),
      top:"",
      size:{x:494, y:150, width:710,height:420},
      playerCore: PlayCore.getPlayCore(),
      currShow: 0, // 0:主页  1：全集 2：简介 3：全屏
      // view管理
      lastFocusId: '',
      classifyDirection: '',
      isFree: false,
      isBought: false,
      detail:'',
      psId:''
    };
  },
  mounted () {

  },
  created () {
    this.init();
  },
  watch: {
   
  },
  updated () {
  },
  methods: {
    getDetail (curl) {
      let that = this;
      if (this.isHTTPS && curl.indexOf('https') < 0) {
        curl = curl.replace('http', 'https');
      }
      api.jsonp(curl, function (data) {
        let catList = data.data;
        that.top = catList.elementList;
        that.itnum = that.top.length-1;
        that.$nextTick(()=>{
          let playUrl = that.top[that.itemNo].jsonUrl+that.behindParams;
          api.jsonp(playUrl,(json)=>{
            that.detail = json.data;
          })
          // yh.showVideo(playUrl);
          that.changeColor();
        })
      });
    },
    init () {
      let curl;
      if (this.$route.query.jsonUrl) {
        curl = this.$route.query.jsonUrl + this.behindParams;
        this.childrenUrl = this.$route.query.jsonUrl;
      } else {
        if (this.jsonUrl) {
          this.childrenUrl = this.jsonUrl;
          curl = this.jsonUrl + this.behindParams;
          localStorage.setItem('hot', this.jsonUrl);
        } else {
          curl = localStorage.getItem('hot') || '';
          //            console.log(curl);
          this.childrenUrl = curl;
          curl += this.behindParams;
        }
      }
      this.getDetail(curl);
    },
    keyCode (params) {
      // console.log("父组件接收子组件触发事件传上来的值");
      if (params == 'down') {
        this.down();
      } else if (params == 'up') {
        this.up();
      } else if (params == 'left') {
        this.left();
      } else if (params == 'right') {
        this.right();
      } else if (params == 'KeyEnter') {
        this.KeyEnter();
      } else if (params == 'KeyBack') {
        this.KeyBack();
      }
    },
    KeyBack () {
      try {
        this.removeCss();
        // yh.closePlayer();
        this.removeCss();
      } catch (err) {
        console.log(err.message);
      }
      this.$router.push({name:'index'})
    },
    KeyEnter(){
      if (this.isHover) {
        this.$store.commit('GET_ISSHOWPLAY', false);
        // yh.fullPlay();
        this.currShow = 3;
          let currentTime = 0;
          currentTime = this.$refs.videoplayer.getCurrentTime();
          this.$refs.videoplayer.destoryPlayer();
          console.log('全屏记录历史时间：' + currentTime);
          DetailRecordHelper.recordSchedule(this.detail.assetId,this.episode, currentTime);
          this.$router.push({'name': 'play', params: {detailData: this.detail, currShow: this.currShow, playerCore: this.playerCore, psId: this.psId, isFree: this.isFree, isBought: this.isBought, isFullScreen: true}})
      } else {
        let playUrl = this.top[this.itemNo].jsonUrl+this.behindParams;
          api.jsonp(playUrl,(json)=>{
            this.detail = json.data;
          })
        this.removeColor();
        this.changeColor();
      }
    },
    changeColor(){
      $('#speaialDj' + this.itemNo +' #specialCen .list').css('color',"#7b7b7b");
      $('#speaialDj' + this.itemNo +' #specialCen .s_list').css('color',"#7b7b7b");

    },
    removeColor(){
      $('.left_center li #specialCen .list').css('color','#ffffff');
      $('.left_center li #specialCen .s_list').css('color','#ffffff');

    },
    left () {
      if (this.isHover) {
          this.isHover = false;
      }
    },
    right () {
      this.isHover = true;  
    },
    down () {
        if (this.isHover) {
            return
        }else{
          if (this.itemNo>=this.top.length-1) {
            return;
          }else{
            this.removeCss();
            this.itemNo++;
            this.addscroll();
            this.addCss();
          }
        }
    },
    cEleOffsetTop(ele) {
        var elsss = document.getElementById(ele);
        let fEleDistance = elsss.offsetTop;
        let realHeight = fEleDistance;
        return realHeight;
    },
    addscroll(){
      let top = this.cEleOffsetTop('speaialDj' + this.itemNo);
      var game = document.getElementById("left");
      if (top>420) {
        game.style.marginTop =  - (this.itemNo - 5) * 82 + "px"
        // game.style.setProperty({'transform': 'translateX(-' + 164 * (this.itemNo-5) + 'px)','transition': 'all 0.3s'});
      }
      if (top<0) {
        game.style.marginTop =  - (this.itemNo) * 82 + "px"
      }
    },
    up () {
        if (this.isHover) {
            return
        }
        this.removeCss();
        if (this.itemNo<=0)return;
        this.itemNo--;
        this.addscroll();
        this.addCss();
    },
    addCss () {
      let ptitleObj = $('#speaialDj' + this.itemNo + ' #specialCen .list');
      let ptitle = '';
      if (ptitleObj) {
        ptitle = ptitleObj.html();
      }
      if (ptitle.length >= 15) {
        let id = '#speaialDj' + this.itemNo;
        let speed = 50;
        let that = this;
        let tab = document.querySelector(id +' #specialCen');
        let tab1 = document.querySelector(id + ' #specialCen .list');
        let tab2 = document.querySelector(id + ' #specialCen .s_list');
        tab.style.textOverflow = 'clip';
        tab2.innerHTML = tab1.innerHTML;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
          that.Marquee(tab, tab1, tab2);
        }, speed);
      }
    },
    removeCss () {
      if (this.timer != 0) {
        clearInterval(this.timer);
        this.timer = 0;
        let id = '#speaialDj' + this.itemNo;
        let tab = document.querySelector(id +' #specialCen');
        let tab2 = document.querySelector(id + ' #specialCen .s_list');
        tab2.innerHTML = '';
        tab.scrollLeft = 0;
        tab.style.textOverflow = 'ellipsis';
      }
    },
    Marquee (tab, tab1, tab2) {
      if(tab2.offsetWidth - tab.scrollLeft<=0){
          tab.scrollLeft = 0;
        }else{
          tab.scrollLeft += 2;
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
  components: {VideoPlayer},
  computed: {
    ...mapGetters(['behindParams', 'episode',  'smallScreenState', 'navpos','isShowPlay'])
  },
};
</script>
