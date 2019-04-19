<!-- 赛事详情页----wzh -->
<template>
  <div class="event-detail">
    <div class="title">
      <h3>赛事详情</h3>
    </div>
    <detailtop ref="dl" :initData="detailData" :jsonUrl="jsonUrl" v-on:pressDown="keepDo"></detailtop>
    <div class="recommend">
      <h4 v-if="likeShow">猜你喜欢</h4>
      <ul class="recommend-content" ref="contentBox">
        <li v-for="(item,index) in detailData.assetList" :key="index" :id="('box-'+index)" :class="{'active':index===itemNo}">
          <div>{{item.assetName}}</div>
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
  .event-detail {
    width: 1280px;
    height: 720px;
    background: url("../../../assets/detail/detail-bg.png");
    overflow: hidden;
  }

  .event-detail .title {
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

  .recommend ul {
    margin-left: 35px;
    width: 10000px;
    transition: all 0.5s;
  }

  .recommend h4 {
    font-size: 20px;
    opacity: 0.4;
    line-height: 24px;
    margin-left: 20px;
    margin-top: 20px;
  }


  .recommend-content li {
    float: left;
    width: 231px;
    height: 130px;
    margin-left: 20px;
    margin-top: 20px;
    background: url("../../../assets/detail/img_230x130.png") no-repeat;
    background-size:100% 100%; 
    text-align: center;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .recommend-content li.active {
    background: url("../../../assets/detail/img_230x130_active.png") no-repeat;
    background-size:100% 100%; 
  }
  .recommend-content li div {
    width: 166px;
  }
</style>

<script>
  import c from '../../../js/common.js';
  import detailtop from "../detail-top.vue";
  import { HTTPUtil as api } from "../../../fetch/api.js";
  import { mapGetters } from 'vuex';
  import { client as yh} from '../../../js/client.js'
  import {bi} from '../../../js/logApi.js'
  export default  {
    data() {
      return {
        detailData:[
        ],
        isShow:false,
        itemNo:-1,
        lastFocus:0,
        jsonUrl:'',
        maskShow:false,
        likeShow:true,
      }
    },
     created() {
       if (this.$route.params.jsonUrl) {
         this.jsonUrl=this.$route.params.jsonUrl
          let url = this.$route.params.jsonUrl+ this.behindParams;
          localStorage.setItem('detailJsonUrl', this.jsonUrl);
          this.getDetailData(url);
       } else if(this.$route.query.jsonUrl) {
         c.startTime();
         bi.start('0201')
         this.jsonUrl = `${this.$route.query.jsonUrl}&p=${this.$route.query.p}&k=${this.$route.query.k}&v=${this.$route.query.v}&assetId=${this.$route.query.assetId}&c=${this.$route.query.c}`;
         let url = this.jsonUrl+ this.behindParams;
          this.getDetailData(url);
       }else{
         let url = localStorage.getItem('detailJsonUrl')+this.behindParams;
         this.getDetailData(url);
       }
          
    },
    mounted() {
    },

    watch:{
    },
     computed: {
      ...mapGetters(['behindParams', 'navpos'])
    },
    components:{
      detailtop
    },
    methods:{
      getDetailData(url) {
        console.log("获取详情页信息");   
        api.jsonp(url, (res) => {
          if(res.data == null){
            this.maskShow = true;
            return;
          }else{
            this.maskShow = false;
          }
          this.detailData = res.data;
          if(this.detailData.assetList.length == 0){
            this.likeShow = false;
          }else{
            this.likeShow = true;
          }
          // yh.initPlayer(60,90,480,270);
          // this.playVideo();
        })
      },

      playVideo() {
          yh.showVideo(this.jsonUrl)
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
          if(!this.maskShow){
            try {
              // yh.closePlayer()
            } catch (err) {
              console.log(err.message);
            }            
          }
          if(this.$route.params.bp && this.$route.params.bp.type){
            c.routerBack(this.$router,this.$route.params.bp.type)
          }else{
            c.routerBack(this.$router,undefined)
          }
        }
      },
      up() {
        this.isShow=false
        this.lastFocus=this.itemNo
        this.itemNo=-1
        this.$refs.dl.getKeyListen('up');
      },
      left() {
          if(this.itemNo===0) return;
          if(this.itemNo>=3) {
              this.$refs.contentBox.style.marginLeft=35-(this.itemNo-3)*251+"px"
          }
          this.itemNo--
      },
      right() {
           if(this.itemNo===this.detailData.assetList.length-1) return
          this.itemNo++ 
          if(this.itemNo>=4) {
              this.$refs.contentBox.style.marginLeft=35-(this.itemNo-3)*251+"px"
          }
      },
      enter() {
        this.jsonUrl = this.detailData.assetList[this.itemNo].jsonUrl;
        localStorage.setItem('BI_recmd_id', 3);
        // let url =this.detailData.assetList[this.itemNo].jsonUrl+this.behindParams;
        // yh.closePlayer();
        // this.getDetailData(url)
        // this.$refs.contentBox.style.marginLeft="35px";
        // this.isShow=false;
        // this.itemNo=-1;
        // this.lastFocus=0;
        // this.$refs.dl.getKeyListen('enter');
        let url = this.detailData.assetList[this.itemNo].jsonUrl;
        let layType = this.detailData.assetList[this.itemNo].layout;
        // yh.closePlayer();
        if(layType == 'Detail_News'){
          // 相同类型资产只刷新数据不跳转
          url = url +this.behindParams;
          this.getDetailData(url)
          this.$refs.contentBox.style.marginLeft="35px";
          this.isShow=false;
          this.itemNo=-1;
          this.lastFocus=0;
          this.$refs.dl.getKeyListen('enter');
        }else{
          c.routerSkip(url,"1",layType,{},this.$router);
        }
      },
      keepDo(isShow,name,position) {
        if(this.detailData.assetList.length == 0){
          this.$refs.dl.getKeyListen('up');
          return;
        }
        if(position==='down') {
          this.isShow=true
          this.itemNo=this.lastFocus
        }
      }
    }
  }
  
</script>