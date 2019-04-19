<template>
  <div class="Game_scroll">
    <div :class="{'hovers':itemNo<=3}">
      <img src="../../static/images/category/111.png" alt=""  class="img1">
    </div>
    <div class="game_topbox">
      <div id="game_box">
        <div 
          v-for="(item,index) in top"
          :key="item.id"
          :id="('ES'+index)"
            class="Game_small"
            >
            <lazy-image
            :src='top[index].elementImg'
            :placeholder='placeholder'
          />
          <div :class="{'hover':itemNo==index&&isActive}"></div>
        </div>
      </div>
    </div>
    <div :class="{'hovers':itemNo==(list-1)||list<=4}">
      <img  src="../../static/images/category/222.png" alt=""  class="img2">
    </div>
    <keyDo
      v-on:listenKeyCode="keyCode"
      v-if="isShow"
    ></keyDo>
  </div>
</template>
<style scoped="ES_bottom">
.hovers{
  display: none;
}
  .Game_scroll{
    width: 1280px;
    height: 100px;
    position: relative;
    margin-left: 18px;
  }
  .game_topbox{
    width: 1160px;
    height: 100px;
    overflow: hidden;
  }
  #game_box{
    width: 1000%;
    height: 100px;
  }
  .img1{
    width: 80px;
    height: 80px;
    position: absolute;
    left: -70px;
    top: 10px;
  }
  .img2{
     width: 80px;
    height: 80px;
    position: absolute;
    right: 50px;
    top: 10px;
  }
  .Game_small{
    width: 275px;
    height: 98px;
    background: rgba(45,65,101,0.8);
    float: left;
    margin-right: 18px;
    font-size: 20px;
    text-align: center;
    line-height: 89px;
    position: relative;
  }
.hover{
    width: 275px;
    height: 98px;
    background: url(../../static/images/category/1891.png) no-repeat;
    background-size: 100% 100%;
    z-index: 99;
    position: absolute;
    left: 0px;
    top: 0px;
  }
</style>

<script>
import { mapGetters } from 'vuex';
import c from "../js/common.js";
import {yst} from '../js/yst.js';
export default {
  props: ['initData','itemSort'],
  name: 'games_scroll',
  data: function () {
    return {
      name: 'games_scroll',
      placeholder: require('../assets/img_loading_352x190.png'),
      initScore: require('../assets/corner_mark.png'),
      itemNo: 0,
      pos: '',
      eleId: '',
      pageId: '',
      top: [
        {
        }
      ],
      isShow: false, // 是否注册键值
      isActive: false, // 是否被激活,
      load_start: 0,
      load_time: 0,
      list:'',
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
    console.log("底部游戏导航");
    this.list = this.top.length;
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
    clickPage () {
      var ystObj = {};
      ystObj.ip = '';
      ystObj.time = new Date().format('yyyy-MM-dd hh:mm:ss');
      ystObj.page_name = 'pageIndex_0' + (this.navpos + 1);
      ystObj.page_level = '1';
      ystObj.Panel_id = '0' + (this.navpos + 1);
      ystObj.Recommend_id = ystObj.Panel_id + this.itemSort + '0' + (this.itemNo + 1);
      ystObj.Page_url = '/index';
      ystObj.Load_time = this.load_time;
      ystObj.Load_status = 'success';
      yst.panelClick(ystObj);
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
    right(){
      if (this.itemNo>=this.top.length-1) {
        return;
      } else {
        this.itemNo++;
      }
      this.addscroll();
    },
    left(){
      if(this.itemNo<=0)return;
      this.itemNo--;
      this.addscroll();
    },
    up(){
      this.isActive = false;
      this.isShow = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'up');
    },
    down(){
      this.isActive = false;
      this.isShow = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'down');
    },
    updateStast (bl, pos, isEnd) {
      console.log('游戏底部部组件接受键值' + bl + pos + isEnd);
      if (bl) {
        this.isShow = bl;
        this.isActive = true;
        this.pos = pos;
      }
    },
    addscroll(){
      let top = this.cEleOffsetTop('ES' + this.itemNo);
      var game = document.getElementById("game_box");
      if (top>1100) {
        game.style.marginLeft =  - (this.itemNo - 3) * 293 + "px"
        // game.style.setProperty({'transform': 'translateX(-' + 164 * (this.itemNo-5) + 'px)','transition': 'all 0.3s'});
      }
      if (top<173.9921875) {
        game.style.marginLeft =  - (this.itemNo) * 293 + "px"
      }
    },
    cEleOffsetTop (ele) {
      try {
        var elsss = document.getElementById(ele);
        let fEleDistance = elsss.offsetLeft;
        let realHeight = fEleDistance;
        return realHeight;
      } catch (error) {
        console.log('获取高度异常')
      }
    }
  },
  watch: {
    initData () {
      this.top = this.initData.elementList;
      console.log("底部游戏导航");
      console.log(this.initData);
      this.eleId = this.initData.specialId;
    }
  }
};
</script>
