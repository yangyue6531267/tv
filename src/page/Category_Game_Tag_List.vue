<template>
  <div class="singleName">
     <ul>
        <li v-for="(item,index) in tagName" v-if="index<5" :key="item.id" :id="('tagName'+index)">{{item.elementName}}</li>
        <li id="tagName5">全部类别</li>
      </ul>
      <keyDo v-on:listenKeyCode="keyCode"  v-if="isShow"></keyDo>
  </div>
</template>
<style >
 .singleName{
    position: relative;
    width: 1227px;
    min-height: 100px;
    margin-top: 30px;
  }
 .singleName ul{
   clear: both;
   content: "";
   display: block;
 }
  .singleName li{
    float: left;
    margin-right: 45px;
    width:145px;
    text-align:center;
    font-size:23px;
    height:55px;
    line-height:55px;
    background-color:#AF9773;
    border:1px solid #FFFFFF;
    border-radius:8px;
  }
 .singleName li.hover{
   box-shadow:0px 10px 20px rgba(0, 0, 0, 0.55);
   border:4px #FFF solid;
   background-color:#A26564;
   margin-right:39px;
   transform: scale(1.1);
   border-radius:8px;
 }
</style>
<script>
import {client as yh} from '../js/client.js'
import {bp as bi} from '../js/ga.js'
import $ from 'jquery'
import c from "../js/common.js";
export default {
  props: ['initData', 'catCode', 'catId'],
  name: 'SinglePorgama',
  data (){
    return {
      name: 'SinglePorgama',
      itemNo: 0,
      position: 0,
      pos: '',
      eleId: '',
      isShow: false,
      tagName: [{
        elementId: '',
        elementName: '',
        elementType: ''
      }]
    }
  },
  computed: {

  },
  created (){
    this.tagName = this.initData.elementList;
    this.eleId = this.initData.specialId;
  },
  methods: {
    keyCode (kc) {
      if (kc == 'KeyBack') {
        this.back();
      } else if (kc == 'right'){
        this.right();
      } else if (kc == 'left'){
        this.left();
      } else if (kc == 'down'){
        this.down();
      } else if (kc == 'up'){
        this.up();
      } else if (kc == 'KeyEnter'){
        let eleName = '';
        let pageType = this.$route.name;
        if (pageType == 'index'){
          try {
            let traceId = '|' + this.catId + '|' + this.tagName[this.itemNo].elementId;
            let traceType = '|1|';
            bi.categoryClick(this.catId, this.tagName[this.itemNo].elementId, 3, 1, this.catId, traceId, traceType);
          } catch (error) {
            console.log(error);
          }
        }
        if (this.itemNo == 5){
          eleName = '全部类别';
        } else {
          eleName = this.tagName[this.itemNo].elementName;
        }
        this.$router.push({name: 'filter', params: {catCode: this.catCode, categoryName: eleName, catId: this.eleId, parentId: this.catId}});
      }
    },
    back () {
      console.log('返回');
      this.removeCss();
      this.isShow = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'back');
    },
    up (){
      this.removeCss();
      this.isShow = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'up');
    },
    down (){
      this.removeCss();
      this.isShow = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'down');
    },
    left (){
      if (this.itemNo == 0) return;
      this.removeCss();
      this.itemNo--;
      this.addCss();
    },
    right (){
      if (this.itemNo > 4) return;
      this.removeCss();
      this.itemNo++;
      this.addCss();
    },
    addCss (){
      $('#tagName' + this.itemNo).addClass('hover');
    },
    removeCss (){
      $('#tagName' + this.itemNo).removeClass('hover');
    },
    updateStast (bl, pos, isEnd){
      this.isShow = bl;
      this.pos = pos;
      if (bl){
        this.addCss();
        // let eleH = this.cEleOffsetTop('#tagName' + this.itemNo);
        // this.$emit('eleScroll', this.name, this.pos, eleH);
      }
    },
    cEleOffsetTop (ele){
      let fEleDistance = $(ele).offset().top;
      // console.log("元素距离文档顶部的距离:"+fEleDistance);
      // console.log(this.name,"元素距离文档顶部的距离:"+(fEleDistance+95));
      let realHeight = fEleDistance + 95;
      return realHeight;
    }
  },
  components: {

  },
  watch: {
    initData (){
      this.tagName = this.initData.elementList;
      this.eleId = this.initData.specialId;
    }
  }
}
</script>
