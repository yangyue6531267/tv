<!-- 主播短视频----wzh -->
<template>
  <div class="anchor-shot-detail">
    <div class="title">
      <h3>主播短视频</h3>
    </div>
    <detailtop ref="dl" :initData="detailData" :jsonUrl="jsonUrl" v-on:pressDown="keepDo"></detailtop>
    <div class="recommend">
      <h4 v-if="likeShow">猜你喜欢</h4>
      <ul class="recommend-content" ref="contentBox">
        <li v-for="(item,index) in detailData.actorList" :key="index" :id="('box-'+index)" :class="{'active':index===itemNo}">
          <lazy-image
            :src='item.elementImg'
            :placeholder='placeholder'
          />
          <!-- <img :src='item.elementImg' alt=""> -->
          <span>{{item.actorName}}</span>
        </li>
      </ul>
    </div>
    <div class="mask" v-if="maskShow">
      该资产已下线，点击返回体验更多精彩视频
    </div>
    <keyDo ref="keydo" v-on:listenKeyCode="keyCode" v-if="isShow"></keyDo>
  </div>
</template>

<style scoped="EventDetail">
  .mask{
    width: 1280px;
    height: 720px;
    background-color: rgba(0, 0, 0, .8);
    color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    z-index: 999;
    line-height: 1050px;
    font-size: 40px;
  }
  .anchor-shot-detail {
    width: 1280px;
    height: 720px;
    background: url("../../../assets/detail/detail-bg.png");
    overflow: hidden;
  }

  .anchor-shot-detail .title {
    position: relative;
    left: -20px;
    display: block;
    width: 254px;
    height: 58px;
    background: rgb(5, 44, 85);
    line-height: 58px;
    font-size: 25px;
    font-weight: 300;
    text-align: center;
    transform: skewX(-30deg)
  }

  .title h3 {
    transform: skewX(30deg)
  }


  .recommend {
    margin-left: 55px;
    width: 10000000px;
  }

  .recommend h4 {
    font-size: 20px;
    opacity: 0.4;
    line-height: 24px;
    margin-top: 20px;
  }


  .recommend-content li {
    float: left;
    width: 100px;
    height: 100px;
    margin-right: 83px;
    margin-top: 20px;
    background: url("../../../assets/detail/anchor-recommend.png") no-repeat;
    background-size:100% 100%; 
    background-size: cover;
    text-align: center;
  }

  .recommend-content li.active {
  background: url("../../../assets/detail/anchor-recommend-active.png") no-repeat;
  background-size:100% 100%; 
    background-size: cover;
  }

  .recommend-content span {
    position: relative;
    bottom: 51px;
    font-size: 16px;
  }
</style>

<script>
  import c from '../../../js/common.js';
  import detailtop from "../detail-top.vue";
  import { HTTPUtil as api } from "../../../fetch/api.js";
  import { mapGetters } from 'vuex';
  import { client as yh} from '../../../js/client.js';
  import {bi} from '../../../js/logApi.js'
  export default {
    data() {
      return {
        detailData: [],
        isShow: false,
        itemNo: -1,
        lastFocus: 0,
        jsonUrl: '',
        placeholder: require('../../../assets/img_loading_352x190.png'),
        maskShow:false,
        likeShow:true,
        actorRecParameter:'&actorRec=1&actor=0',
      }
    },
    created() {

      if (this.$route.params.jsonUrl) {
         this.jsonUrl=this.$route.params.jsonUrl
          let url = this.$route.params.jsonUrl+this.actorRecParameter+this.behindParams;
          localStorage.setItem('detailJsonUrl', this.jsonUrl);
          this.getDetailData(url);
       } else if(this.$route.query.jsonUrl) {
         c.startTime();
         bi.start('0201')
         this.jsonUrl = `${this.$route.query.jsonUrl}&p=${this.$route.query.p}&k=${this.$route.query.k}&v=${this.$route.query.v}&assetId=${this.$route.query.assetId}&c=${this.$route.query.c}`;
         let url = this.jsonUrl+this.actorRecParameter+ this.behindParams;
        this.getDetailData(url);
       }else{
         let url = localStorage.getItem('detailJsonUrl')+this.actorRecParameter+ this.behindParams;
         this.getDetailData(url);
       }
      // yh.initPlayer(60, 90, 480, 270);
      // this.playVideo();
    },
    computed: {
      ...mapGetters(['behindParams', 'navpos'])
    },
    components: {
      detailtop
    },
    methods: {
      getDetailData(url) {
        console.log("获取详情页信息");
        api.jsonp(url, (res) => {
        if(res.data == null){
            this.maskShow = true;
            return;
          }else{
            this.maskShow = false;
          }
          console.log(res);
          this.detailData = res.data
          if(this.detailData.actorList.length == 0){
            this.likeShow = false;
          }else{
            this.likeShow = true;
          }
        })
      },
      playVideo() {
          let url = this.jsonUrl
          yh.showVideo(url)
      },

      keyCode(kc) {
        if (kc === "down") {
          return;
        } else if (kc === "up") {
          this.up();
        } else if (kc === "left") {
          this.left();
        } else if (kc === "right") {
          this.right();
        } else if (kc === "KeyEnter") {
          this.enter();
        } else if (kc === "KeyBack") {
          if(this.$route.params.bp && this.$route.params.bp.type){
            c.routerBack(this.$router,this.$route.params.bp.type)
          }else{
            c.routerBack(this.$router,undefined)
          }
        }
      },
      up() {
        this.isShow = false
        this.lastFocus = this.itemNo
        this.itemNo = -1
        this.$refs.dl.getKeyListen();
      },
      left() {
        if (this.itemNo === 0) return;
        if (this.itemNo >= 6) {
          this.$refs.contentBox.style.marginLeft =  - (this.itemNo - 6) * 183 + "px"
        }
        this.itemNo--
      },
      right() {
        if (this.itemNo === this.detailData.actorList.length - 1) return
        this.itemNo++
        if (this.itemNo >= 7) {
          this.$refs.contentBox.style.marginLeft =  - (this.itemNo - 6) * 183 + "px"
        }
      },
      enter() {
        // yh.closePlayer();
        localStorage.setItem('BI_recmd_id', 3);
        let url =this.detailData.actorList[this.itemNo].jsonUrl;
        let bp = this.detailData.actorList[this.itemNo];
        this.$router.push({name: "anchorDetail", params: {jsonUrl:url,bp:bp}});
          // let layType = this.detailData.assetList[this.itemNo].layout
          // c.routerSkip(url,"1",layType,bp,this.$router);
      },
      keepDo(isShow, name, position) {
        if(this.detailData.actorList.length == 0){
          this.$refs.dl.getKeyListen();
          return;
        }
        if (position === 'down') {
          this.isShow = true
          this.itemNo = this.lastFocus
        }
      },
    },
  }
</script>