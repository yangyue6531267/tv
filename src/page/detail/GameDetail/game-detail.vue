<template>
  <div class="game-detail">
    <div class="left-box" :style="{backgroundImage:'url('+detailData.specialImg+')'}">
      <div class="title">
        <h3>游戏详情</h3>
      </div>
    </div>
    <div class="right-box">
      <div class="detail-top">
        <div class="details">
          <div class="text-box">
            <p>{{detailData.specialName}}</p>
            <!-- 下部标签 -->
            <span></span>
          </div>
          <div class="introduction">
            <div class="word">{{detailData.specialDesc}}</div>
            <span :class="{'active':position===-1}"></span>
          </div>
        </div>
      </div>

      <div class="detail-content">
        <h4>游戏视频</h4>
        <ul ref="contentBox">
          <li v-for="(item,index) in itemList" :key="index" :id="('box-'+index)" :class="{'active':index===itemNoA}">
            <div>{{item.itemName}}</div>
          </li>
        </ul>
      </div>

      <div class="recommend">
        <h4>猜你喜欢</h4>
        <ul class="recommend-content" ref="recommendBox">
          <li v-for="(item,index) in assetList" :id="('box-'+index)" :key="index" :class="{'active':index===itemNoB}">
            <div>{{item.assetName}}</div>
          </li>
        </ul>
      </div>
    </div>
    <keyDo ref="keydo" v-on:listenKeyCode="keyCode" v-if="isShow"></keyDo>
    <detailMoreIntroduction ref="detailM" :isAlert="detailData.specialDesc" v-on:pressDown="keepDo"></detailMoreIntroduction>
  </div>
</template>

<style scoped="GameDetail">
  .game-detail {
    width: 1280px;
    height: 720px;
    background: url("../../../assets/detail/detail-bg_game.png");
    overflow: hidden;
  }

  .left-box {
    float: left;
    width: 268px;
    height: 720px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-color: rgba(194, 204, 252, 0.2); */
    
  }

  .game-detail .title {
    position: relative;
    left: -20px;
    display: block;
    width: 254px;
    height: 58px;
    background: #002D50;
    line-height: 58px;
    font-size: 25px;
    font-weight: 300;
    text-align: center;
    transform: skewX(-30deg)
  }

  .title h3 {
    transform: skewX(30deg)
  }


  .right-box {
    float: right;
    width: 1012px;
    height: 720px;
    position: relative;
  }

  .text-box {
    display: inline-block;
    height: 100px;
    margin-top: 20px;
    margin-left: 35px;
  }

  .text-box p {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    line-height: 42px;
    font-size: 35px;
  }

  .text-box span {
    font-size: 18px;
    line-height: 22px;
  }


  .introduction {
    width: 920px;
    height: 123px;
    position: absolute;
    right: 22px;
    top: 128px;
    background-color: rgba(28, 35, 85, 0.6);
  }

  .introduction .word {
    margin-top: 28px;
    margin-left: 24px;
    width: 866px;
    height: 70px;
    font-size: 20px;
    line-height: 24px;
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
    margin-left: 845px;
    background: url("../../../assets/detail/more-introduction.png");
  }

  .introduction span.active {
    background: url("../../../assets/detail/more-introduction-active.png");
  }

  .detail-top:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
  }
  .right-box::after{
    content: '';
    display: block;
    clear: both;
  }

  .detail-content {
    margin-top: 170px;
    margin-left: 9px;
    width: 1000px;
    overflow: hidden;
  }

  .detail-content ul,
  .recommend ul {
    transition: all 0.5s;
    width: 1000000000000%;
  }
  /* .detail-content ul:after {
    display: block;
    content: "";
    clear: both;
  } */

  .detail-content li {
    float: left;
    width: 231px;
    height: 130px;
    margin-left: 17px;
    margin-top: 20px;
    background: url("../../../assets/detail/img_230x130.png") no-repeat;
    background-size:100% 100%; 
    text-align: center;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }



  .recommend {
    margin-left: 9px;
    width: 1003px;
    overflow: hidden;
  }
.recommend-content{
  width: 100000%;
}
  .recommend h4,
  .detail-content h4 {
    font-size: 20px;
    color:rgba(255,255,255,0.4);
    line-height: 24px;
    margin-left: 20px;
    margin-top: 20px;
  }


  .recommend-content li {
    float: left;
    width: 231px;
    height: 130px;
    margin-left: 17px;
    margin-top: 20px;
    background: url("../../../assets/detail/img_230x130.png") no-repeat;
    background-size:100% 100%; 
    text-align: center;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .recommend-content li div,
  .detail-content li div {
    width: 166px;
  }

  .detail-content li.active,
  .recommend-content li.active {
    background: url("../../../assets/detail/img_230x130_active.png") no-repeat;
    background-size:100% 100%; 
  }
</style>

<script>
  import c from '../../../js/common.js';
  import {
    HTTPUtil as api
  } from "../../../fetch/api.js";
  import {
    mapGetters
  } from 'vuex';
  import detailMoreIntroduction from '../detail-more-introduction.vue';
  import {
    client as yh
  } from '../../../js/client.js';
  import PlayCore from '../../play/playerCode.js';
  export default {
    data() {
      return {
        detailData: [], 
        itemList:[],
        assetList:[],
        isShow: true,
        position: 0,
        itemNoA: 0,
        itemNoB: -1,
        lastFocusA: 0,
        lastFocusB: 0,
        jsonUrl:'',
        // url: "http://47.97.96.103/?s=31|11&p=yhAssetDetail&k=1&v=1&assetId=8377&c=11"
        // 播放器传值
        playerCore: PlayCore.getPlayCore(),
        currShow: 0, // 0:主页  1：全集 2：简介 3：全屏
        // view管理
        lastFocusId: '',
        classifyDirection: '',
        isFree: false,
        isBought: false,
        detail:'',
        psId:'',
      }
    },
    created() {
      this.jsonUrl= this.$route.params.jsonUrl
      let url = this.$route.params.jsonUrl + this.behindParams
      this.getDetailData(url)
    },
    mounted() {
      // yh.initPlayer(60, 90, 480, 270)
      // let url = "http://vcdn.yanhuamedia.tv/vod/201806/15/22/01/201806152201043671140744a.ts";
      // yh.showVideo(url)
    },
    computed: {
      ...mapGetters(['behindParams', 'navpos'])
    },
    components: {
      detailMoreIntroduction
    },
    methods: {
      getDetailData(url) {
        console.log("获取详情页信息");
        api.jsonp(url, (res) => {
          this.detailData = res.data;
          if(res.data.elementList[0].elementName == '游戏视频'){
            this.getItemList(res.data.elementList[0].jsonUrl+this.behindParams);
            this.getAssetList(res.data.elementList[1].jsonUrl+this.behindParams)
          }else{
            this.getItemList(res.data.elementList[1].jsonUrl+this.behindParams);
            this.getAssetList(res.data.elementList[0].jsonUrl+this.behindParams)
          }
        })
      },
      playVideo() {
          // let url = this.jsonUrl
          // yh.showVideo(url)
      }, 
      keyCode(kc) {
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
          //  try {
          //   yh.closePlayer()
          // } catch (err) {
          //   console.log(err.message);
          // }         
          if(this.$route.params.bp && this.$route.params.bp.type){
            c.routerBack(this.$router,this.$route.params.bp.type)
          }else{
            c.routerBack(this.$router,undefined)
          }
        }
      },
      getItemList(url){
        api.jsonp(url,(res) =>{
          this.itemList = res.data.elementList;
        })
      },
      getAssetList(url){
        api.jsonp(url,(res) =>{
          this.assetList = res.data.elementList;
        })
      },
      up() {
        if (this.position === -1) {
          return
        } else if (this.position === 0) {
          this.position = -1
          this.lastFocusA = this.itemNoA
          this.itemNoA = -1
        } else {
          this.position = 0
          this.lastFocusB = this.itemNoB
          this.itemNoB = -1
          this.itemNoA = this.lastFocusA
        }
      },
      bigScreenPlay(){
          let  dataUrl = this.itemList[this.itemNoA].jsonUrl+this.behindParams;
          // let showingPlayer = false;
          // let jsonData = {'dataUrl':dataUrl,'showingPlayer':showingPlayer}
          // console.log('传入播放器的数据'+JSON.stringify(jsonData));
          // yh.openPlayer(JSON.stringify(jsonData));
          api.jsonp(dataUrl,(code)=>{
             this.currShow = 3;
            let currentTime = 0;
            console.log(code);
            this.detail = code.data;
            // currentTime = this.$refs.videoplayer.getCurrentTime();
            // DetailRecordHelper.recordSchedule(this.detail.assetId,this.episode, currentTime);
            this.$router.push({'name': 'play', params: {detailData: this.detail, currShow: this.currShow, playerCore: this.playerCore, psId: this.psId, isFree: this.isFree, isBought: this.isBought, isFullScreen: true}})
          })
      },
      down() {
        if (this.position === -1) {
          this.position = 0
          this.itemNoA = this.lastFocusA
        } else if (this.position === 0) {
          this.position = 1
          this.lastFocusA = this.itemNoA
          this.itemNoA = -1
          this.itemNoB = this.lastFocusB
        } else {
          return
        }
      },

      left() {
        if (this.position === -1) {
          return
        } else if (this.position === 0) {
          if (this.itemNoA === 0) return;
          if (this.itemNoA >= 3) {
            this.$refs.contentBox.style.marginLeft = -(this.itemNoA - 3) * 247 + "px"
          }
          this.itemNoA--
        } else {
          if (this.itemNoB === 0) return;
          if (this.itemNoB >= 3) {
            this.$refs.recommendBox.style.marginLeft = -(this.itemNoB - 3) * 247 + "px"
          }
          this.itemNoB--
        }
      },

      right() {
        if (this.position === -1) {
          return
        } else if (this.position === 0) {
          if (this.itemNoA === this.itemList.length - 1) return
          this.itemNoA++
          if (this.itemNoA >= 4) {
            this.$refs.contentBox.style.marginLeft = -(this.itemNoA - 3) * 248 + "px"
          }
        } else {
          if (this.itemNoB === this.assetList.length - 1) return
          this.itemNoB++
          if (this.itemNoB >= 4) {
            this.$refs.recommendBox.style.marginLeft = -(this.itemNoB - 3) * 248 + "px"
          }
        }
      },

      enter() {
        if (this.position === -1) {
          this.isShow = false;
          this.$refs.detailM.getKeyListen(false);
        } else if (this.position === 0) {
          console.log(this.itemList);
          let historyData = {
              bookMarkTime: new Date().getTime(),  //播放时长
              watchTime:'', //观看时长
              collectType: 1, //收藏类型(0-主播,1-资产,2-专题)
              relateId: this.itemList[this.itemNoA].elementId,
              relateTitle: this.itemList[this.itemNoA].elementName,
              relateScore: this.itemList[this.itemNoA].score,
              relateImg: this.itemList[this.itemNoA].elementImg,
              layout: this.itemList[this.itemNoA].layout,
              jsonUrl: this.itemList[this.itemNoA].jsonUrl
            };
          console.warn('历史记录数据'+JSON.stringify(historyData))  
            yh.addHistory(historyData);
            this.bigScreenPlay();
        } else {
          localStorage.setItem('BI_recmd_id', 3);
          console.log(this.assetList);
          let url = this.assetList[this.itemNoB].jsonUrl;
          let layType = this.assetList[this.itemNoB].layout;
          c.routerSkip(url,"1",layType,{},this.$router);
        }
      },

      keepDo(name, keyDo) { //子集来得数据
        if (name === "introduction") {
          this.isShow = true
        }
      }
    }
  }
</script>