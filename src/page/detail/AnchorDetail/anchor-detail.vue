<template>
  <div class="anchor-detail">
    <div class="title">
      <h3>主播详情</h3>
    </div>
    <div class="detail-top">
      <div class="details">
        <div class="img"></div>
        <div class="text-box">
          <p>{{detailData.actorName}}</p>
          <!-- <span>新加坡 | 2018 | 半决赛 | 第二场BO2</span> -->
        </div>
        <div class="introduction">
          <div class="word">{{detailData.introduce}}</div>
          <span :class="{'active':position===-1}"></span>
        </div>
      </div>
    </div>
    <div class="detail-content">
      
      <div class="content-left">
        <ul>
          <div class="left" v-show="tempAssetListLength>0"></div>
          <div class="right" v-show="tempAssetListLength<tempAssetList.length-1"></div>
          <li><span>幽鬼</span></li>
          <li><span>大圣</span></li>
          <li><span>混沌</span></li>
        </ul>
      </div>
      <div class="content-right">
        <ul ref="contentBox">
          <li v-for="(item,index) in tempAssetList[tempAssetListLength]" :key="index" :id="('box-'+index)">
            <div><img :src="item.assetImg" alt=""><span :class="{'active':index===itemNo}" v-show="index===itemNo">{{item.assetName}}</span></div>
          </li>
        </ul>
      </div>
    </div>
    <detailMoreIntroduction ref="detailM" :isAlert="detailData.introduce" v-on:pressDown="keepDo"></detailMoreIntroduction>
    <keyDo ref="keydo" v-on:listenKeyCode="keyCode" v-if="isShow"></keyDo>

  </div>
</template>

<style scoped="AnchorDetail">
  .anchor-detail {
    width: 1280px;
    height: 720px;
    background: url("../../../assets/detail/anchor-detail-bg.png");
    overflow: hidden;
  }

  .anchor-detail .title {
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

  .details {
    position: relative;
    width: 662px;
    height: 272px;
    position: relative;
    left: 400px;
    top: -50px
  }

  .details .img {
    width: 341px;
    height: 515px;
    background: url("../../../assets/detail/anchor-img.png");
    position: absolute;
    left: -379px;
    top: 76px;
  }

  .text-box {
    display: inline-block;
    height: 100px;
    margin-top: 20px;
    margin-left: 10px;
  }

  .text-box p {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    line-height: 36px;
    font-size: 30px;
  }

  .text-box span {
    font-size: 18px;
    line-height: 22px;
  }

  .collection {
    width: 200px;
    height: 64px;
    position: absolute;
    top: 160px;
    left: 25px;
    background: url("../../../assets/detail/collected.png");
  }

  .introduction {
    width: 500px;
    height: 90px;
    position: absolute;
    left: 40px;
    top: 78px;
  }

  .introduction .word {
    margin-top: 28px;
    margin-left: 17px;
    width: 430px;
    height: 60px;
    font-size: 20px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .introduction span {
    display: block;
    content: "";
    width: 76px;
    height: 43px;
    position: absolute;
    bottom: 15px;
    right: -80px;
    background: url("../../../assets/detail/more-introduction.png");
  }

  .introduction span.active {
    background: url("../../../assets/detail/more-introduction-active.png");
  }

  .content-left {
    position: relative;
    left: 200px;
    top: -55px;
  }

  .content-left ul li {
    width: 335px;
    height: 64px;
    margin-bottom: 20px;
    background: rgba(0, 45, 80, 0.8);
    line-height: 58px;
    font-size: 25px;
    font-weight: 300;
    text-align: center;
    transform: skewX(-30deg)
  }

  .content-left span {
    display: block;
    transform: skewX(30deg)
  }

  .content-right {
    width: 500px;
    height: 480px;
    position: absolute;
    top: 230px;
    left: 670px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow: hidden;
  }

  .content-right ul {
    margin-left: 0;
    /* display: flex;
    flex-direction: column;
    flex-wrap: wrap; */
    position: relative;
    transition: all 0.5s;
  }

  .left {
    width: 66px;
    height: 66px;
    background: url('../../../assets/search/icons_dark_next.png');
    position: absolute;
    top: 140px;
    left: 370px;
  }

  .right {
    width: 66px;
    height: 66px;
    background: url('../../../assets/search/icons_dark_next.png');
    position: absolute;
    top: 140px;
    left: 990px;
    transform: rotate(180deg)
  }

  .content-right ul li {
    width: 231px;
    height: 130px;
    margin-right: 25px;
    margin-bottom: 25px;
    background: url("../../../assets/detail/img_230x130.png");
    position: relative;
  }
  .content-right ul li:nth-of-type(4){
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .content-right ul li:nth-of-type(5){
    position: absolute;
    top: 155px;
    right: 0px;
  }
  .content-right ul li:nth-of-type(6){
    position: absolute;
    top: 310px;
    right: 0px;
  }
  .content-right ul li div {
    width: 100%;
    height: 100%;
  }

  .content-right ul li div img {
    width: 100%;
    height: 100%;
  }

  .content-right ul li div span.active {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: url("../../../assets/detail/img_230x130_active.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    font-size: 22px;
    line-height: 130px;
  }
</style>


<script>
  import {
    HTTPUtil as api
  } from "../../../fetch/api.js";
  import {
    mapGetters
  } from 'vuex';
  import detailMoreIntroduction from '../detail-more-introduction.vue';
  import {
    client as yh
  } from '../../../js/client.js'
  import c from '../../../js/common.js'
  export default {
    data() {
      return {
        detailData: [],
        isShow: true,
        position: 0,
        itemNo: 0,
        lastFocus: -1,
        tempAssetList:[],
        tempAssetListLength:0,
      }
    },
    created() {
      let url = this.$route.params.jsonUrl+ this.behindParams
      this.getDetailData(url)
      
    },
    activated(){
      if(this.$route.params.jsonUrl != undefined){
        let url = this.$route.params.jsonUrl+ this.behindParams
        this.getDetailData(url);
        this.itemNo = 0;
        this.position = 0;
        this.tempAssetListLength = 0;
      }
    },
    mounted() {},
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
          console.log(res);
          this.detailData = res.data
          if(this.detailData.assetList){
            this.tempAssetList = this.split_array(this.detailData.assetList,6)
          }else{
            this.tempAssetList = [];
            this.position = -1;
            this.itemNo = -1
          }
        })
      },

      keyCode(kc) {
        if (kc === "down") {
          this.down();
        } else if (kc === "up") {
          this.up();
        } else if (kc === "left") {
          if (this.position === -1) return
          this.left();
        } else if (kc === "right") {
          if (this.position === -1) return
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
        if (this.position === -1) return;
        // 资产部分
        if (this.itemNo % 3 === 0) {
          this.position = -1;
          this.lastFocus = this.itemNo
          this.itemNo = -1
        } else {
          this.itemNo--
        }
      },

      down() {
        if (this.position === -1) {
          if(this.tempAssetList.length == 0)return;
          this.position = 0
          this.itemNo = this.lastFocus
        } else {
          if (this.itemNo>=this.tempAssetList[this.tempAssetListLength].length-1) return;
          this.itemNo++
        }
      },
      
      split_array(arr, len){
      var a_len = arr.length;
      var result = [];    
      for(var i=0;i<a_len;i+=len)
      {        
        result.push(arr.slice(i,i+len));    
      }    
        return result;
      },
      left() {
        if(this.itemNo<3){
          if(this.tempAssetListLength<=0)return;
          this.itemNo+=3; 
          this.tempAssetListLength--;       
        }else{
          this.itemNo-=3;
        }
      },

      right() {
        if(this.itemNo>=3){
          if(this.tempAssetListLength>=this.tempAssetList.length-1)return;
          this.tempAssetListLength++
          this.itemNo-=3
        }else{
          this.itemNo+=3;
        }
        if(this.itemNo>=this.tempAssetList[this.tempAssetListLength].length-1){
          this.itemNo = this.tempAssetList[this.tempAssetListLength].length-1;
        }
      },

      enter() {
          if(this.position===-1) {
            this.isShow = false;
            this.$refs.detailM.getKeyListen(false);
          } else {
            let url = this.tempAssetList[this.tempAssetListLength][this.itemNo].jsonUrl;
            let layType = this.tempAssetList[this.tempAssetListLength][this.itemNo].layout;
            // this.$router.push({
            //   name: 'AnchorShotVideo',
            //   params: { jsonUrl: url, catCode: 1, data: this.detailData.assetList[this.itemNo]}
            // });
            c.routerSkip(url,'1',layType,'',this.$router)
          }
      },

      keepDo(name, keyDo) { //子集来得数据
        if (name === "introduction") {
          this.isShow = true;

        }
      }
    }
  }
</script>