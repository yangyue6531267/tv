// fei首页右侧推荐位
<template>
  <div class="h_top">
    <div class="top_r_news">
      <ul>
        <li
          v-for="(item,index) in top"
          v-if="index<8"
          :key="item.id"
          :id="('t'+index)"
        >
          <lazy-image
            :src='top[index].elementImg'
            :placeholder='placeholder'
          />
          <div :class="{'active':itemNo==1&&itemNo==index&&isActive|| itemNo==2&&itemNo==index&&isActive|| itemNo==4&&itemNo==index&&isActive|| itemNo==5&&itemNo==index&&isActive}"></div>
          <div :class="{'actives':itemNo==index&&itemNo==0&&isActive}"></div>
          <div :class="{'activess':itemNo==index&&itemNo==3&&isActive}"></div>
          <div class="no" :class="{'hover':itemNo==1&&itemNo==index&&isActive|| itemNo==2&&itemNo==index&&isActive|| itemNo==4&&itemNo==index&&isActive|| itemNo==5&&itemNo==index&&isActive}"><p class="os">{{top[index].elementName}}</p></div>
          <div class="no" :class="{'hover':itemNo==index&&itemNo==3&&isActive}"><p class="oo">{{top[index].elementName}}</p></div>
          <div :class="{'img_border':index==1|| index==2|| index==4|| index==5,'achange':itemNo==index&&isActive}"></div>
        </li>
      </ul>
    </div>
    <keyDo
      v-on:listenKeyCode="keyCode"
      v-if="isShow"
    ></keyDo>
  </div>
</template>
<style scoped="newtop">
.no{
  display: none;
}
.h_top {
  position: relative;
  width: 1227px;
  height: 269px;
  margin-top: 24px;
}
.h_top img {
  cursor: pointer;
}

.top_r_news ul {
  box-sizing: border-box;
}
.top_r_news li {
  width: 206px;
  height: 102px;
  position: relative;
}
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
.top_r_news li .imglazy {
  
}
.top_r_news li:nth-child(2) {
  position: absolute;
  right: 507px;
  top: 2px;
}
.top_r_news li:nth-child(3) {
  position: absolute;
  right: 507px;
  top: 146px;
}
.top_r_news li:nth-child(4) {
  width: 180px;
  height: 270px;
  background: url(../../static/images/category/108.png) no-repeat 100% 100%;
    position: absolute;
    right: 302px;
    top: -8px;
}
.top_r_news li:nth-child(5) {
  position: absolute;
  right: 68px;
  top: 2px;
  background: url(../../static/images/category/122.png) no-repeat 100% 100%;
  background-size:100% 100%; 
}
.top_r_news li:nth-child(6) {
 position: absolute;
  right: 68px;
  top: 146px;
  background: url(../../static/images/category/122.png) no-repeat 100% 100%;
  background-size:100% 100%; 
}
.top_r_news li:nth-child(1) {
  width: 480px;
  height: 270px;
  position: absolute;
 left: 0px;
  top: -12px;
}
.top_r_news li img {
  width: 100%;
  height: 100%;
}
.hover{
  position: absolute;
  z-index: 99; 
  left: 0px;
  top: 0px;
  display: block;
  text-indent: 2em;
  font-size: 15px;
}
.hover .os{
  width: 180px;
  height: 101px;
  font-size: 15px;
  text-indent: 2em;
  margin-left:13px;
  margin-top:13px;
  display: block; 
}
.hover .oo{
  width: 132px;
  height: 201px;
  font-size: 15px;
  text-indent: 2em;
  margin-left:33px;
  margin-top:23px;
  display: block;  
}
.activess{
  position: absolute;
  width: 101%;
  height: 100%;
  background: url(../../static/images/category/108.png) no-repeat;
  background-size:100% 100%;
  z-index: 99; 
  left: 0px;
  top: 0px;
}
.actives{
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #00FFF5;
  z-index: 99; 
  left: -2px;
  top: -2px;
}
.active{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 24, 67, 0.3);
  z-index: 99; 
  left: 0px;
  top: 0px;
}
</style>
<script>
import { mapGetters } from 'vuex';
import { bp as bi } from '../js/ga.js';
import { hp } from '../util/dom.js';
import { yst } from '../js/yst.js';
import c from "../js/common.js";
export default {
  props: ['initData', 'catCode', 'catId', 'itemSort'],
  name: 'IndexTopRecommend',
  data: function () {
    return {
      name: 'IndexTopRecommend',
      placeholder: require('../assets/img_loading_352x190.png'),
      initScore: require('../assets/corner_mark.png'),
      itemNo: 0,
      pos: '',
      eleId: '',
      pageId: '',
      top: [
        {
          elementId: '',
          elementImg: require('../assets/img_loading_352x190.png'),
          elementName: '',
          elementType: '',
          jsonUrl: '',
          layout: '',
          score: ''
        }
      ],
      isShow: false, // 是否注册键值
      isActive: false, // 是否被激活,
      load_start: 0,
      load_time: 0
    };
  },
  computed: {
    ...mapGetters(['behindParams', 'navpos','categorys'])
  },
  created () {
    this.load_start = new Date() - 0;
  },
  mounted () {
    this.load_time = new Date() - this.load_start;
    this.top = this.initData.elementList;
    this.eleId = this.initData.specialId;
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
        this.enter();
      }
    },
    enter(){
      let posId = this.itemSort + '0' + (this.itemNo + 1);
      let columnId = '0' + this.navpos;
      c.setPosition(columnId, posId); // 保存推荐位置
      c.setParentPageType('0101');
      c.setParentPageId(this.categorys[this.navpos].catId);
      this.clickPage();
      c.routerSkip(this.top[this.itemNo].jsonUrl,this.top[this.itemNo].elementType,this.top[this.itemNo].layout,{},this.$router);
    },
    back () {
      this.isActive = false;
      this.isShow = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'back');
    },
    up () {
      if(this.itemNo == 2 ||this.itemNo ==5){
        this.itemNo--;
      }else{
        this.isActive = false;
        this.isShow = false;
        this.$emit('pressDown', this.isShow, this.eleId, 'up');
      }
    },
    down () {
      if(this.itemNo == 1 ||this.itemNo ==4){
        this.itemNo++;
      }else{
        this.isActive = false;
        this.isShow = false;
        this.$emit('pressDown', this.isShow, this.eleId, 'down');
      }
    },
    left () {
      if(this.itemNo<=0)return;
      if(this.itemNo ==2 ||this.itemNo ==3 ||this.itemNo ==5){
        this.itemNo -=2;
      }else{
        this.itemNo--;
      }
    },
    right () {
      if(this.itemNo>=this.initData.elementList.length-1)return;
      if(this.itemNo == 1){
        this.itemNo += 2;
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
    }
  },
  watch: {
    initData () {
      this.top = this.initData.elementList;
      this.eleId = this.initData.specialId;
    },
    navpos () {
      this.itemNo = 0;
    }
  }
};
</script>
