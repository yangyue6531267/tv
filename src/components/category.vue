<template>
  <div :class="{'box':isPlay,'boxBg':!isPlay}">
    <div class="to-shaoer-wrap" :class="{'active':position==2}"></div>
    <div class="to-shaoer"></div>
    <div class="scroll-box">
      <div class="systembar">
          <ul>
            <li
              :class="{'hover':position==1&&sNo==0,'select':0==sNo&&position==1}"
              id="p0"
            ><i class="iconfont icon-soushuo mas"></i><p>搜索</p></li>
            <li
              :class="{'hover':position==1&&sNo==1,'select':1==sNo&&position==1}"
              id="p1"
            ><i class="iconfont icon-lishi mas"></i> <p>历史</p></li>
            <li
              :class="{'hover':position==1&&sNo==2,'select':2==sNo&&position==1}"
              id="p2"
            ><div class="shouc"></div><p>收藏</p></li>
          </ul>
      </div>
      <div id="sliderSegmentedControl" class="yh-scroll-wrapper yh-slider-indicator yh-segmented-control yh-segmented-control-inverted">
        <div class="yh-scroll">
          <a
            v-for="(item,index) in navBar"
            ref='navItem'
            :class="{'yh-control-item':true}"
            :catCode="item.catCode"
            :key="item.id"
            :index="index"
          >
            {{item.catName}}
          <a :class="{'yh-active':index==isActive&&position==0}"></a>
          </a>
        </div>
        <keyDo v-on:listenKeyCode="keyCode" v-if="isShow"></keyDo>
      </div>
      <router-view
        ref="childContent"
        v-on:navigation='navigation(arguments)'
        :categoryData="currentData"
        :focusId="navBar[itemNo].catId"
        :lastId="lastId"
        :isPlay = "isPlay"
      ></router-view>
    </div>
    <firm
      ref="firm"
      v-on:listernpopup="firm"
    ></firm>
  </div>
</template>
<style scoped="category">
.to-shaoer{
  width: 170px;
  height: 47px;
  position:absolute;
  top: 67px;
  right: 71px;
  background: url('../../src/assets/to_shaoer.png') no-repeat;
}
.active{
  background: url('../../src/assets/to_shaoer_hover.png') no-repeat;
  width: 175px;
  height: 52px;
  position: absolute;
  top: 66px;
  right: 69px;
  z-index: 99;
}
.shouc{
  background: url("../../static/images/category/1659.png");
  background-size: 100% 100%;
  width: 18px;
  height: 18px;
  margin-top:14px; 
  margin-left:30px; 
}
.systembar ul li .mas{
  position: absolute;
  left: 28px;
    top: 6px;
}
.box {
  position: absolute;
  width: 1238px;
  padding-top: 106px;
  padding-left: 42px;
  height: 614px;
  overflow: hidden;
  background: url("../../static/images/category/1815.png") no-repeat;
  background-size:100% 100%; 
}

.boxBg{
  position: absolute;
  width: 1238px;
  padding-top: 106px;
  padding-left: 42px;
  height: 614px;
  overflow: hidden;
  background: url("../../static/images/category/1814.png") no-repeat;
  background-size:100% 100%; 
}

.scroll-box {
  position: relative;
  transform: translate3d(0, 0, 0);
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
}

.yh-slider-indicator.yh-segmented-control {
  position: relative;
  bottom: auto;
  padding-left: 12px;
}

.yh-segmented-control.yh-scroll-wrapper {
  height: 38px;
  margin-bottom:14px; 
}

.yh-segmented-control {
  font-size: 25px;
  font-weight: 400;
  position: relative;
  display: table;
  overflow: hidden;
  table-layout: fixed;
  border-radius: 3px;
  background-color: transparent;
}

.yh-scroll-wrapper {
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
}

.yh-segmented-control.yh-segmented-control-inverted {
  position: relative;
  overflow: hidden;
  border-radius: 0;
}

.yh-segmented-control.yh-scroll-wrapper .yh-scroll {
  height: 47px;
  white-space: nowrap;
  display: inline-block;
}

.systembar{
  height: 39px;
  line-height: 39px;
  width: 360px;
  position: absolute;
  left: 55px;
  top: -80px;
}

.systembar li {
  list-style: none;
  float: left;
  background: url(../../static/images/category/1906.png) no-repeat;
  background-size:100% 100%; 
  margin-left: -34px;
  width: 123px;
  height: 58px;
  font-size: 20px;
  position: relative;
}

.systembar li p{
  position: absolute;
    left: 51px;
    top: 17px;
}

.systembar li.hover {
  background: url(../../static/images/category/1660.png) no-repeat;
  background-size:100% 100%; 
}

.yh-scroll {
  position: absolute;
  z-index: 1;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.yh-segmented-control.yh-segmented-control-inverted .yh-control-item {
  color: inherit;
}

.yh-segmented-control {
  padding-left: 6px;
}

.yh-segmented-control.yh-scroll-wrapper .yh-control-item {
  display: inline-block;
  width: auto;
  padding: 0 30px;
}

.yh-segmented-control .yh-control-item {
  width: 127px;
  height: 38px;
  line-height: 39px;
  display: table-cell;
  overflow: hidden;
  width: 1%;
  -webkit-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  border-radius: 5px;
  background: 0 0;
  position: relative;
}

.yh-active{
  width: 110%;
  height: 204%;
  position: absolute;
  background: url(../../static/images/category/55.png) no-repeat;
  background-size:100% 100%;
  z-index: -1;
  left:-8px;
  top: -17px;
}

.yh-control-item.yh-select {
  background: rgb(255, 255, 255);
  opacity: 0.7;
  border: 1px solid #ffffff;
  border-radius: 5px;
}
.select {
  background: rgb(255, 255, 255);
  opacity: 0.7;
  border-radius: 5px;
}
.time {
  font-size: 20px;
  float: right;
  margin-right: 40px;
  line-height: 60px;
  position: absolute;
  right: 50px;
  top: -55px;
  color: rgb(255, 255, 255);
  opacity: 0.7;
  height: 30px;
  width: 50px;
}
</style>
<script>
import c from '../js/common';
import { mapGetters } from 'vuex';
import { client as yh } from '../js/client.js';
import { HTTPUtil as api } from '../fetch/api.js';
// import { bp as bi } from '../js/ga.js';
import firm from '../page/firm.vue';
import { hp } from '../util/dom.js';
import { yst } from '../js/yst.js';
import {bi} from '../js/logApi.js'
export default {
  name: 'category',
  data: function () {
    return {
      name: 'category',
      itemNo: 0,
      sNo: -1,
      else: true,
      position: 0,
      count: 0,
      navBar: [{ catId: '' }],
      isShow: true,
      currentData: {},
      isActive: 0,
      Acti:0,
      isSelect: -1,
      lastId: 0,
      Panel_id: '',
      Recommend_id: '',
      isPlay:true
    };
  },
  created () {
    this.load_start = new Date() - 0;
    this.getRootData();
    c.startTime();
    bi.start('0103');
  },
  mounted () {
    this.load_time = new Date() - this.load_start;
    if (!c.isAllNull(c.getLocal('Homes'))) {
      this.navBar = this.categorys;
      var cData = this.filtrateRouter(this.itemNo);
      this.currentData = cData;
    }
    window.setTimeout(function () {
      document.getElementsByClassName('openImage')[0].style.display = 'none';
    }, 5000);
  },
  computed: {
    ...mapGetters([
      'rootPath',
      'catList',
      'categorys',
      'isHTTPS',
      'behindParams',
      'navpos'
    ])
  },
  methods: {
    getRootData () {
      var _this = this;
      api.getTheme(this.rootPath, function (json) {
        _this.$store.commit('GET_PROGRAMA', json.data);
        localStorage.setItem('Homes', JSON.stringify(json.data));
        const cjson = json.data.jsonUrl + _this.behindParams;
        _this.getColumnData(cjson);
      });
    },
    getColumnData (url) {
      var _this = this;
      api.jsonp(url, function (json) {
        if (json.code == 200 || json.code == '200') {
          _this.navBar = [];
          _this.navBar = json.data.catList;
          _this.$store.commit('GET_CATEGORYS', json.data.catList);
          localStorage.setItem('Categorys', JSON.stringify(json.data.catList));
          console.log(_this.navBar);
          _this.currentData = _this.navBar[0];
        }
      });
      
    },
    keyCode (kc) {
      if (kc == 'KeyBack') {
        this.back();
      } else if (kc == 'left') {
        this.left();
      } else if (kc == 'right') {
        this.right();
      } else if (kc == 'down') {
        this.down();
      }else if (kc == 'up') {
        this.up();
      } else if (kc == 'KeyEnter') {
        if (this.position == 1) {
          if (this.itemNo==0) {
            if(this.isPlay){
            this.$refs.childContent.isremove();
            } 
          }
          this.clickPage();
          if (this.sNo == 0) {
            this.$router.push({
              name: 'search',
              params: {
                type: 'search',
                catId: this.navBar[this.itemNo].catId,
                catCode: 2,
                Panel_id: this.Panel_id,
                Recommend_id: this.Recommend_id
              }
            });
          } else if (this.sNo == 1) {
            this.$store.commit('GET_ISSHOWPLAY', false);
            this.$router.push({
              name: 'History',
              params: {
                type: false,
                catId: this.navBar[this.itemNo].catId,
                catCode: 6,
                Panel_id: this.Panel_id,
                Recommend_id: this.Recommend_id
              }
            });
          } else if (this.sNo == 2) {
            this.$store.commit('GET_ISSHOWPLAY', false);
            this.$router.push({
              name: 'History',
              params: {
                type: true,
                catId: this.navBar[this.itemNo].catId,
                catCode: 5,
                Panel_id: this.Panel_id,
                Recommend_id: this.Recommend_id
              }
            });
            // 修改
          }
        }else if(this.position == 2){
          bi.end('0102');
          this.isShow = false;
          window.location.href = 'http://112.18.251.100/sichuan/select?backType=dianjing';
        }
      }
    },
    clickPage () {
      var ystObj = {};
      ystObj.ip = '';
      ystObj.time = this.getDate();
      ystObj.page_name = 'pageIndex_0' + (this.navpos + 1);
      ystObj.page_level = '1';
      ystObj.Panel_id = '0' + (this.navpos + 1);
      this.Panel_id = ystObj.Panel_id;
      ystObj.Recommend_id = ystObj.Panel_id + '0000';
      this.Recommend_id = ystObj.Recommend_id;
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
    back () {
      setTimeout(()=>{   
        this.$refs.firm.updateStast(true);
        this.isShow = false;
        if(this.isPlay){
          this.$refs.childContent.isPlays();
        }
      },600)
    },
    left () {
      if (this.position == 0) {
        this.lastId = this.navBar[this.itemNo].catId;
        this.itemNo--;
        if (this.itemNo <= 0) {
          this.itemNo = 0;
          this.isPlay = true;
        }
        // if (this.isPlay) {
        //   this.$refs.childContent.isBlay();
        // }
        this.$store.commit('GET_NAVPOS', this.itemNo);
        this.$lazyImages.removeAll();
      }else if (this.position == 1) {
        if (this.sNo>0) {
          this.sNo--;          
        }
      }else if(this.position == 2){
        // document.querySelector('.to-shaoer-wrap').className = 'to-shaoer-wrap';       
        this.position = 0;
        this.isActive = 4;
      }
    },
    right () {
      if (this.position == 0) {
        if (this.itemNo >= this.navBar.length - 1) {
          this.position = 2;
          // document.querySelector('.to-shaoer-wrap').className = 'to-shaoer-wrap active';       
        } else {
          this.lastId = this.navBar[this.itemNo].catId;
          this.itemNo++;
          if (this.itemNo>0) {
            this.isPlay = false;
          }
          if (this.itemNo==1) {
            this.$refs.childContent.isPlays();
          }
          this.$store.commit('GET_NAVPOS', this.itemNo);
          this.$lazyImages.removeAll();
        }
      } else if (this.position == 1) {
        if (this.sNo > 1) return;
        this.sNo++;
        this.$store.commit('GET_NAVPOS', this.itemNo + this.sNo + 1);
      }else if(this.position == 2){
      }
    },
    down () {
      if (this.position == 1) {
          this.position = 0;
          this.isActive = this.Acti;
          this.sNo = -1;
          this.$store.commit('GET_NAVPOS', this.itemNo + this.sNo + 1);
      }else{
          this.isActive = -1;
          // document.querySelectorAll('.systembar ul li')[0].className = '';
          // document.querySelectorAll('.systembar ul li')[1].className = '';
          // document.querySelectorAll('.systembar ul li')[2].className = '';
          this.position = 0;
          this.isShow = false;
          this.$refs.childContent.updateStast(true, 'down', false);
      }
    },
    up(){
      if (this.position == 0 ||this.position ==2 ) {
        this.Acti = this.isActive;
        this.isActive = -1;
        this.position = 1;
        this.sNo = 0;
        this.$store.commit('GET_NAVPOS', 5);
      }
    },
    navigation () {
      console.log(arguments+"未知");
      var show = arguments[0][2];
      this.isShow = show;
      this.isSelect = -1;
      if (this.sNo == -1) {
        this.isActive = this.itemNo;
      }
    },
    filtrateRouter (catCode) {
      for (var i = 0; i < this.navBar.length; i++) {
        if (catCode == i) {
          return this.navBar[i];
        }
      }
    },
    changeIsActive (index) {
      if (this.position == 0) {
        this.isActive = index;
        var _this = this;
        setTimeout(() => {
          _this.$store.commit('GET_NAVPOS', this.itemNo);
          _this.currentData = _this.filtrateRouter(_this.itemNo);
          console.log(this.currentData);
        }, 300);
      }
    },
    firm (bl) {
      if (bl) {
        // 退出应用
        bi.end('0101');
        yh.back();
      } else {
        if(this.isPlay){
          this.$refs.childContent.isshows();
        }
        this.isShow = true;
      }
    },
    ds () {
      setInterval(function () {
        var date = new Date();
        var h = date.getHours(); // 获取小时
        var m = date.getMinutes(); // 获取分钟
        var timeStr = '';
        if (h < 10) {
          timeStr = '0' + h + ':' + m;
        } else {
          timeStr = h + ':' + m;
        }
        if (m < 10) {
          timeStr = h + ':0' + m;
        } else {
          timeStr = h + ':' + m;
        }
        document.getElementsByClassName('time')[0].innerText = timeStr;
      }, 1000);
    }
  },
  components: {
    firm
  },
  watch: {
    itemNo () {
      this.changeIsActive(this.itemNo);
    }
  }
};
</script>
