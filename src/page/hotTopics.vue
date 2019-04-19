<template>
    <div class="carousel">
      <div class="header">
        <div class="tit">
          <p class="tit1">{{eleList.specialName}}</p>
        </div>
        <div class="left-center">
          <div class="center-text">
            <p class="text">{{eleList.specialDesc}}</p>
            </div>
        </div>
        <div class="btn-sc" 
        v-if="isSC"
        :class="{'hovers':isHover==true}"
          >
        </div>
        <div class="btn-scc" 
        v-if="!isSC"
        :class="{'active':isHover==true}"
          >
        </div>
      </div>
        <div class="left-icon" :class="{'accnone':posnum==0}"></div>
        <div class="left-icon1" :class="{'accnone':posnum==list||list <= 0}"></div>
      <div class="right-center">
        <div 
          v-for="(item,index) in top[posnum]"
          :key="item.id"
          :id="('speaial'+index)"
          class="specialCen"
        >
          <lazy-image
            :src='top[posnum][index].elementImg'
            :placeholder='placeholder'
          />
          <div :class="{'hover':itemNo==index&&isHover==false}"></div>
        </div>
        <div class="no_text" :class="{'no':!top[posnum]}">暂无资产,请返回观看专区更多精彩视频</div>
      </div>

      <keyDo
      ref="keydo"
      v-on:listenKeyCode="keyCode"
      v-if="isShow">
    </keyDo>
  </div>
</template>
<style scoped="hotTopics">
.no_text{
  width: 600px;
  height: 520px;
  line-height:520px;
  font-size: 30px;
  margin-left:-30px;
  display: none;
}
.no_text.no{
  display: block;
}
.header {
  height: 720px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.header:after {
  clear: both;
  content: "";
  display: block;
}
.left-center {
  width: 577px;
  height: 636px;
  background: url(../../static/images/special/663.png) no-repeat;
  background-size: 100% 100%;
}
.accnone{
  display: none;
}
.left-icon1.accnone{
  display: none;
}
.left-icon{
  width: 66px;
  height: 66px;
  background: url(../../static/images/category/111.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 616px;
  top:335px;
}
.left-icon1{
  width: 66px;
  height: 66px;
  background: url(../../static/images/category/222.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 46px;
  top:335px;
}
.center-text{
  width: 368px;
  height: 463px;
  background: url(../../static/images/special/d2a82b55876581.5996ba7ab09e8.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 113px;
  left: 46px;
}

.text{
  text-indent:2em;
  text-align: left;
  font-size: 20px;
  width: 314px;
  height: 383px;
  margin-top:31px;
  margin-left:30px;
  line-height: 24px;  
  overflow: hidden;
}

.header .btn-sc {
  width: 200px;
  height: 64px;
  border-top:1px solid transparent;
  position: relative;
  left: 66px;
  top: -33px;
  background: url(../../static/images/special/1877.png) no-repeat;
  background-size:100% 100%; 
}

.header .btn-scc {
  width: 200px;
  height: 64px;
  border-top:1px solid transparent;
  position: relative;
  left: 66px;
  top: -33px;
  background: url(../../static/images/special/1895.png) no-repeat;
  background-size:100% 100%; 
}

.tit {
  width: 256px;
  height: 155px;
  background: url(../../static/images/special/1891.png) no-repeat;
  background-size:100% 100%; 
  font-weight: 600;
  z-index: 99;
  color: #ffffff;
  position:absolute;
  transition: 0.8s all;
  margin-left: 20px;
}
.tit1{
  width: 256px;
  height: 155px;
  transform:rotate(-16deg);
  font-size: 30px;
  font-family: PingFangSC-Regular;
  position: absolute;
  top: 36px;
  left: 20px; 
}
ul,
li {
  list-style: none;
}

.carousel{
  width: 1280px;
  height: 720px;
  background: url(../../static/images/special/1832.png) no-repeat;
  background-size:100% 100%; 
  position: relative;
  overflow: hidden;
}

.right-center{
  width: 608px;
  height: 597px;
  float: right;
  margin-top: 123px;
}

/*.top_focus{width: 712px;height: 115px; border: 5px solid yellow;display: none;position: absolute;top: 187px;left: 21px;}*/
.right-center .specialCen{
  width: 231px;
  height: 130px;
  margin-right: 25px;
  margin-bottom:25px;
  position: relative;
}

.right-center .specialCen{
  float: left;
}

.header .color {
  background: #a36363;
  border: 4px solid #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.55);
  margin-top: -4px;
}

 .hover{
  position: absolute;
  width: 231px;
  height: 130px;
  background: url(../../static/images/special/915.png) no-repeat;
  background-size:100% 100%;
  z-index: 99; 
  left: 0px;
  top: 0px;
}

.header .btn-sc.hovers{
  background: url(../../static/images/special/1775.png) no-repeat;
  background-size:100% 100%;
}
.header .btn-scc.active{
  background: url(../../static/images/special/1896.png) no-repeat;
  background-size:100% 100%;
}
</style>
<script>
import { mapGetters } from 'vuex';
import { HTTPUtil as api } from '../fetch/api.js';
import { client as yh } from '../js/client.js';
import { bp as bi } from '../js/ga.js';
import { hp } from '../util/dom.js';
import { yst } from '../js/yst.js';
import c from '../js/common.js'
var row = 0;
var col = 0;
var listdate = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var title; // 焦点选中时滚动的标题
var run; // 滚动定时器函数
var flag = true;
export default {
  props: ['jsonUrl', 'bp'],
  name: 'hotTop',
  data () {
    return {
      isShow: true,
      isSC:true,
      isHover:false,
      posnum: 0,
      itemNo: 0,
      placeholder: require('../../static/images/special/665.png'),
      initScore: require('../../static/images/special/665.png'),
      tra: '',
      pageId: 0,
      sc: false,
      catid: 0,
      traceType: '',
      traceTypes: '',
      timer: '',
      list:'',
      eleList: '',
      top:'',
      listTop:0,
      load_start: 0,
      load_time: 0,
      exposureStartTime: 0,
      exposureEndTime: 0,
      pos:false
    };
  },
  components: {},
  mounted () {
    
  },
  created () {
    this.init();
    this.$nextTick(()=>{
      if (this.pos) {
        this.isHover=true;
      }else{
        this.isHover =false;
      }
    this.collectData();
    })
    if (this.bp =="收藏跳入") {
      localStorage.setItem('bp', this.bp);
    }
  },
  // watch: {
  //   jsonUrl: function (value) {
  //     // 监听数据变化并作出处理
  //     this.$nextTick(function () {
  //       this.isShow = true;
  //       this.collectData();
  //       // if (!this.top[this.posnum]) {
  //       //   this.isHover=true;
  //       // }
  //       // listdate[col] = 0;
  //       // this.load();
  //     });
  //   }
  // },
  activated(){
    if (!this.$route.meta.keep) {
      this.init();
      if (this.bp =="收藏跳入") {
      localStorage.setItem('bp', this.bp);
      }
      this.itemNo = 0;
      this.posnum = 0;
      this.isShow= true;
      this.isHover=false;
      this.isSC=true;
      setTimeout(()=>{
      this.collectData();
        if (this.pos) {
          this.isHover=true;
        }else{
          this.isHover =false;
        }
      },200)
    }
  },
  updated () {
    this.$nextTick(function () {
      this.$lazyImages.loadImage();
      
    });
  },
  methods: {
     collectData() {
        let url =
          "http://47.97.96.103/uds/cloud/collection/list?version=1&siteId=" + yh.siteId + "&userId=" + yh.userId +
          "&relateId=" + this.eleList.specialId + "&collectType=2"
          console.log(url);
        api.get(url, (res) => {
          if(res.data.resultNum==1) {
            this.isSC=false;
          } else {
            this.isSC=true;
          }
        })
      },

      addCollect() {
        let url = "http://47.97.96.103/uds/cloud/collection/collect?version=1"
        let data = {
          siteId: yh.siteId,
          userId: yh.userId,
          collectType: 2, //收藏类型(0-主播,1-资产,2-专题)
          relateId: this.eleList.specialId,
          relateTitle: this.eleList.specialName,
          relateImg: this.eleList.coverimage,
          relateUrl: this.jsonUrl,
          relateLayout:"Subject_Detail_TP1"
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
          collectType: 2, //收藏类型(0-主播,1-资产,2-专题)
          relateId: this.eleList.specialId,
        }
        api.post(url, data, (res) => {
          console.log(res);
          if (res.mes === "ok")
            console.log("删除收藏成功");
        })
      },
    split_array(arr, len){
      var a_len = arr.length;
      var result = [];    
      for(var i=0;i<a_len;i+=len){        
        result.push(arr.slice(i,i+len));    
      }    
        return result;
    },
    getDetail (curl) {
      let that = this;
      if (this.isHTTPS && curl.indexOf('https') < 0) {
        curl = curl.replace('http', 'https');
      }
      api.jsonp(curl, function (data) {
        let catList = data.data;
        that.eleList = catList;
        if (that.eleList.elementList.length == 0) {
          that.pos = true;
        } else {
          that.pos = false;
        }
        that.top = that.split_array(that.eleList.elementList,6);
          that.listTop = that.eleList.elementList.length;
          that.list = that.top.length-1;
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
    /**
     * 查看收藏
     * @param {assetId,specialId} params
     * assetId:资产id
     * specialId:专题id
     */

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
      // clearInterval(this.timer);
      if (this.$route.query.jsonUrl != undefined) {
        console.log('详情页从外部打开');
        yh.back();
      } else {
        let bst = localStorage.getItem('bp');
        if (bst == "收藏跳入") {
          localStorage.removeItem('bp');
          // this.$router.go(-1);
          this.$router.push({ path:'/History'});
        }else{
          this.$router.push({ path:'/jx/index'});
        }
      }
    },
    KeyEnter(){
      if (this.isHover) {
        if (this.isSC) {
          this.isSC = false;
          this.addCollect();
        } else {
          this.isSC = true;
          this.delCollect();
        }
      } else {
        c.setParentPageType('0801');
        c.setParentPageId(this.eleList.specialId);
        let url = this.top[this.posnum][this.itemNo];
        c.routerSkip(url.jsonUrl, "1", url.layout,{type:'hotTopics'}, this.$router);
      }
    },
    left () {
      if (this.isHover) {
          return;
        }else{
          if(this.itemNo==0||this.itemNo==2||this.itemNo==4){
          if (this.posnum==0) {
            this.isHover = true;
            this.itemNo=-1;
          } else {
            this.itemNo++;
            this.posnum--;
          }
        }else{
          this.itemNo--;
        }
      }
      
    },
    right () {
      if (this.pos)return;
      if (this.isHover) {
        this.isHover =false;
      }
      if(this.itemNo==3||this.itemNo==1||this.itemNo==5){
        if (this.posnum>=this.top.length-1){
            return;
        }else{
          this.itemNo--;
          this.posnum++;
          if (this.top[this.posnum].length-1<this.itemNo) {
            this.itemNo=0;
          } 
        }
      }else{
        this.itemNo++;
        if (this.itemNo>=this.top[this.posnum].length-1) {
        this.itemNo=this.top[this.posnum].length-1;
        }
      }
    },
    down () {
      if (this.isHover) {
          return;
        }else{
      if(this.itemNo==4||this.itemNo==5 )return;
      this.itemNo+=2;
      if (this.itemNo>=this.top[this.posnum].length-1) {
        this.itemNo=this.top[this.posnum].length-1;
      }
      }
    },
    up () {
      if (this.isHover) {
          return;
        }else{
      if(this.itemNo==0||this.itemNo==1)return;
      this.itemNo-=2;
      }
    },
  },
  computed: {
    ...mapGetters([
      'rootPath',
      'catList',
      'categorys',
      'behindParams',
      'isHTTPS',
      'startTime',
      'httpRequestTime',
      'httpResponseTime',
      'navpos'
    ])
  },
  beforeRouteLeave(to ,from , next){
      if (to.name=="index" ||to.name =='History') {
        from.meta.keep = false;
      }else{
        from.meta.keep = true;
      }
      next();
    },
  // beforeRouteLeave (to, from, next) {
  //   try {
  //     let pageId = this.eleList[0].specialId;
  //     let traceId = '|' + this.catId + '|' + pageId;
  //     let traceType = '|' + this.catCode + '|8|';
  //     console.log('开始时间被重置' + StartTime);
  //     let overTime = 0;
  //     overTime = new Date().getTime() - this.httpResponseTime;
  //     bi.closPage(
  //       traceId,
  //       traceType,
  //       8,
  //       pageId,
  //       this.catCode,
  //       this.catId,
  //       1,
  //       overTime
  //     );
  //     console.log(
  //       traceId,
  //       traceType,
  //       8,
  //       pageId,
  //       this.catCode,
  //       this.catId,
  //       1,
  //       overTime
  //     );
  //     console.log('页面停留时间：' + overTime);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     next();
  //   }
  // }
};
</script>
