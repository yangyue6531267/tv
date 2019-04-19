<template>
  <div class="assetListNotMore">
    <h2>{{title}}</h2>
    <ul>
      <li
        v-for="(item,index) in specialList"
        :key="item.id"
        :id="('hotImg_'+eleId+'_'+index)"
        :class="{'hover':index==itemNo&&isActive}"
      >
        <!-- <img :src="item.elementImg"> -->
        <lazy-image
          :src='item.elementImg'
          :placeholder='placeholder'
          :initScore='initScore'
          :score="item.score"
          :title="item.elementName"
        />
      </li>
    </ul>
    <keyDo
      v-on:listenKeyCode="keyCode"
      v-if="isShow"
    ></keyDo>
  </div>
</template>
<style>
h2 {
  font-size: 30px;
  margin-bottom: 35px;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}
.assetListNotMore {
  position: relative;
  width: 1227px;
  min-height: 580px;
  margin-top: 15px;
}
.assetListNotMore li {
  position: relative;
  float: left;
  margin-right: 30px;
  margin-bottom: 30px;
  width: 160px;
  height: 233px;
  z-index: 10;
  box-sizing: border-box;
}
.assetListNotMore img {
  width: 100%;
  height: 100%;
}
.assetListNotMore li.hover {
  margin: -4px 34px 34px -4px;
  border: 4px solid #fff;
  transform: scale(1.1);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.55);
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
  name: 'assetListNotMore',
  data () {
    return {
      title: '',
      name: 'assetListNotMore',
      placeholder: require('../assets/img_loading_160x230.png'),
      initScore: require('../assets/corner_mark.png'),
      itemNo: 0,
      ClassNo: -1,
      position: 0,
      isShow: false,
      isEnd: false,
      specialList: [],
      eleId: '',
      timer: 0,
      pos: '',
      pageId: 0,
      isActive: false
    };
  },
  computed: {
    ...mapGetters(['navpos'])
  },
  created () {
    this.load_start = new Date() - 0;
    
  },
  beforeMount () {
    this.specialList = this.initData.elementList;
    this.eleId = this.initData.specialId; // 默认数据第一个为组件内的id
    this.name = 'assetListNotMore_' + this.initData.specialId; // 默认数据第一个为组件名字
    this.title = this.initData.specialName; // 默认标题
  },
  mounted () {
    this.load_time = new Date() - this.load_start;
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
        this.clickPage();
        let pageType = this.$route.name;
        if (pageType == 'index') {
          try {
            let traceId =
              '|' + this.catId + '|' + this.specialList[this.itemNo].elementId;
            let traceType = '|1|';
            this.pageId = '|' + this.catId;
            bi.categoryClick(
              this.catId,
              this.specialList[this.itemNo].elementId,
              3,
              1,
              this.catId,
              traceId,
              traceType
            );
          } catch (error) {
            console.log(error);
          }
        }
        let url = this.specialList[this.itemNo].jsonUrl;
        this.$router.push({
          name: 'detail',
          params: {
            jsonUrl: url,
            catCode: 1,
            catId: this.pageId,
            parent: 1,
            parentId: this.catId
          }
        });
      }
    },
    back () {
      this.removeCss();
      this.isShow = false;
      this.isActive = false;
      this.$emit('pressDown', this.isShow, this.eleId, 'back');
    },
    down () {
      if (this.itemNo <= 5) {
        this.removeCss();
        this.itemNo += 6;
        this.addCss();
        let eleH = this.cEleOffsetTop(
          '#hotImg_' + this.eleId + '_' + this.itemNo
        );
        this.$emit('eleScroll', this.eleId, 'down', eleH);
      } else {
        if (!this.isEnd) {
          this.removeCss();
          this.isShow = false;
          this.isActive = false;
          this.$emit('pressDown', this.isShow, this.eleId, 'down');
        }
      }
    },
    clickPage () {
      let ystObj = {};
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
      let date = new Date();
      let nian = date.getFullYear();
      let yue = date.getMonth() + 1;
      let ri = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      let shi = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      let fen =
        date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      let miao =
        date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
      return nian + '-' + yue + '-' + ri + ' ' + shi + ':' + fen + ':' + miao;
    },
    up () {
      if (this.itemNo > 5) {
        this.removeCss();
        this.itemNo -= 6;
        this.addCss();
        let eleH = this.cEleOffsetTop(
          '#hotImg_' + this.eleId + '_' + this.itemNo
        );
        this.$emit('eleScroll', this.eleId, 'up', eleH);
      } else {
        this.removeCss();
        this.isShow = false;
        this.isActive = false;
        this.$emit('pressDown', this.isShow, this.eleId, 'up');
      }
    },
    left () {
      if (this.itemNo == 0 || this.itemNo == 6) return;
      this.removeCss();
      this.itemNo--;
      this.addCss();
    },
    right () {
      if (this.itemNo == 11 || this.itemNo == 5) return;
      this.removeCss();
      this.itemNo++;
      this.addCss();
    },
    addCss () {
      let ptitle = $(
        '#hotImg_' + this.eleId + '_' + this.itemNo + ' .s-title-name'
      ).text();
      if (ptitle.length >= 8) {
        let id = '#hotImg_' + this.eleId + '_' + this.itemNo;
        let speed = 40;
        let that = this;
        let tab = document.querySelector(id + ' .s-title');
        let tab1 = document.querySelector(id + ' .s-title-name');
        let tab2 = document.querySelector(id + ' .s-title-temp');
        tab.style.textOverflow = 'clip';
        tab2.innerHTML = tab1.innerHTML;
        this.timer = setInterval(function () {
          that.Marquee(tab, tab1, tab2);
        }, speed);
      }
    },
    removeCss () {
      if (this.timer != 0) {
        clearInterval(this.timer);
        this.timer = 0;
        let id = '#hotImg_' + this.eleId + '_' + this.itemNo;
        let tab = document.querySelector(id + ' .s-title');
        tab.scrollLeft = 0;
        tab.style.textOverflow = 'ellipsis';
      }
    },
    updateStast (bl, pos, isEnd) {
      this.isShow = bl;
      this.pos = pos;
      this.isActive = true;
      // console.log(this.name,bl,pos,isEnd);
      this.isEnd = isEnd;
      if (pos == 'down' && this.itemNo > 5 && isEnd == false) {
        this.itemNo = 0;
      }
      this.addCss();
      if (bl == true && isEnd == false) {
        let eleH = this.cEleOffsetTop(
          '#hotImg_' + this.eleId + '_' + this.itemNo
        );
        // console.log("组件距离文档的高度:"+eleH);
        this.$emit('eleScroll', this.eleId, this.pos, eleH);
      }
    },
    cEleOffsetTop (ele) {
      let fEleDistance = hp.offset(hp.$(ele)).top;
      // console.log(this.name,"元素距离文档顶部的距离:"+(fEleDistance));
      // console.log(this.name,"元素距离文档顶部的高度:"+(fEleDistance+258));
      let realHeight = fEleDistance + 260;
      return realHeight;
    },
    Marquee (tab, tab1, tab2) {
      if (tab2.offsetWidth - tab.scrollLeft <= 0) {
        // tab.scrollLeft -= tab1.offsetWidth;
        tab.scrollLeft = 0; // 上面的写法会导致滚动时突然抖动
      } else {
        tab.scrollLeft++;
      }
    }
  },
  watch: {
    initData () {
      this.specialList = this.initData.elementList;
      // 数据更新组件id也需要更新
      this.specialList = this.initData.elementList;
      this.eleId = this.initData.specialId; // 默认数据第一个为组件内的id
      this.name = 'assetListNotMore_' + this.initData.specialId; // 默认数据第一个为组件名字
      this.title = this.initData.specialName; // 默认标题
      this.$nextTick(function () {
        this.$lazyImages.loadImage();
      });
    }
  }
};
</script>
