
// 巅峰对决中部
<template>
  <div class="mid_top">
    <div v-for="(item,index) in top"
        :key="item.id"
        :id="('special'+index)"
        class="mid_mid"
        v-if="index<3"
    >
    <lazy-image
            :src='top[index].elementImg'
            :placeholder='placeholder'
          />
    <div :class="{'hover':itemNo==index&&isActive}"></div> 
    </div>
    <keyDo
      v-on:listenKeyCode="keyCode"
      v-if="isShow"
    ></keyDo>
  </div>
</template>
<style scoped="host_mid">
    .mid_top{
    margin-top: 14px;
    display: flex;
    margin-bottom: 20px;
    }
    .mid_mid{
        width: 373px;
        height: 128px;
        background: url(../../static/images/category/mid.png) no-repeat;
        background-size:100% 100%; 
        margin-right: 20px;
        position: relative;
    }
    .hover{
    width: 373px;
    height: 128px;
    background: url(../../static/images/category/5573.png) no-repeat;
    background-size: 100% 100%;
    z-index: 99;
    position: absolute;
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
  props: ['initData','itemSort'],
  name: 'remark_mid',
  data: function () {
    return {
      name: 'remark_mid',
      placeholder: require('../assets/img_loading_352x190.png'),
      initScore: require('../assets/corner_mark.png'),
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
      itemNo:0,
      load_start: 0,
      load_time: 0,
      eleId:"",
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
    console.log(this.top);
    console.log(this.initData);
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
    back () {
      this.isActive = false;
      this.isShow = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'back');
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
    right(){
      if (this.itemNo>=2) {
        return;
      } else {
        this.itemNo++;
      }
    },
    left(){
      if(this.itemNo<=0)return;
      this.itemNo--;
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
    },
    updateStast (bl, pos, isEnd) {
      console.log('中部组件接受键值' + bl + pos + isEnd);
      if (bl) {
        this.isShow = bl;
        this.isActive = true;
        this.pos = pos;
      }
    },
  },
  watch: {
    initData () {
      this.top = this.initData.elementList;
      this.eleId = this.initData.specialId;
    }
  }
};
</script>
