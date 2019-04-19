<!-- 首页文字位组件 -->
<template>
  <div class="hotp">
    <ul>
      <li
        v-for="(item,index) in hot"
        :key="item.id"
        :id="('hot'+index)"
        ref="subject"
        :class="{'hover':index===isActive}"
      >
        <!-- <img
          :class="{'hover':index===isActive}"
          :src="item.elementImg"
        > -->
        <p>{{item.elementName}}</p>
        <p>{{item.subtitle}}</p>
        <div class="boxyx" :class="{'hover':index===isActive}">
           <img
          :class="{'hover':index===isActive}"
          :src="item.elementImg"
          >
        </div>
      </li>
    </ul>
    <keyDo
      v-on:listenKeyCode="keyCode"
      v-if="isShow"
    ></keyDo>
  </div>
</template>
<style scoped="hotp">
.hotp {
  position: relative;
  width: 1227px;
  min-height: 106px;
  margin-top: 68px;
}
.hotp li {
  float: left;
  margin-right: 11px;
  width: 282px;
  height: 83px;
  background: url(../../static/images/category/124.png) no-repeat 100% 100%;
  position: relative;
}
.hotp li.hover{
  float: left;
  margin-right: 11px;
  width: 282px;
  height: 83px;
  background: url(../../static/images/category/919.png) no-repeat;
  background-size:100% 100%; 
  position: relative;
}
.hotp li .boxyx{
  width: 120px;
  height: 120px;
  background: url(../../static/images/category/1032.png) no-repeat 100% 100%;
  position: absolute;
  left: 160px;
  top: -50px;
}

.hotp li .boxyx.hover{
  width: 120px;
  height: 120px;
  background: url(../../static/images/category/1187.png) no-repeat 100% 100%;
  background-size:100% 100%; 
  position: absolute;
  left: 160px;
  top: -50px;
}

.hotp li p:nth-child(1){
  width: 126px;
  height: 24px;
  font-size: 18px;
  margin-left: 33px;
  margin-top: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hotp li p:nth-child(2){
  font-size: 12px;
  margin-left: 22px;
  margin-top: 3px;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hotp li .boxyx img{
  width: 100%;
  height: 100%;
}
.hotp li .boxyx img.hover {
  /* box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.55); */
  transform: scale(1.1);
  margin-top: -5px;
}
</style>
<script>
import { mapGetters } from 'vuex';
import { bp as bi } from '../js/ga.js';
import { hp } from '../util/dom.js';
import { yst } from '../js/yst.js';
import c from '../js/common.js'
import { client as yh} from '../js/client.js'; //播放器
export default {
  props: ['initData', 'catCode', 'catId', 'itemSort'],
  name: 'hotPrograma',
  data () {
    return {
      name: 'hotPrograma',
      itemNo: 0,
      position: 0,
      pos: '',
      eleId: '',
      hot: [
        {
          bulgeImg: '',
          elementId: '',
          elementImg: '',
          elementName: '',
          elementType: '',
          jsonUrl: '',
          layout: ''
        }
      ],
      isShow: false,
      isActive: -1,
      isLast: 0,
      load_start: 0,
      load_time: 0,
      Panel_id: '',
      Recommend_id: ''
    };
  },
  computed: {
    ...mapGetters(['navpos','categorys'])
  },
  created () {
    this.load_start = new Date() - 0;
  },
  mounted () {
    this.load_time = new Date() - this.load_start;
    this.hot = this.initData.elementList;
    console.log('zhongbu');
    console.log(this.hot);
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
        let posId = this.itemSort + '0' + (this.itemNo + 1);
        let columnId = '0' + this.navpos;
        c.setPosition(columnId, posId); // 保存推荐位置
        c.setParentPageType('0101');
        c.setParentPageId(this.categorys[this.navpos].catId);
         this.$store.commit('GET_ISSHOWPLAY', false);
        // 关闭小窗口播放
        // 数据采集
        this.$emit('isremove');
        this.clickPage();
        let pageType = this.$route.name;
        if (pageType == 'index') {
          try {
            let traceId =
              '|' + this.catId + '|' + this.hot[this.itemNo].elementId;
            let traceType = '|1|';
            bi.categoryClick(
              this.catId,
              this.hot[this.itemNo].elementId,
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
        let url = this.hot[this.itemNo].jsonUrl;
        // this.$router.push({
        //   name: 'hotTopics',
        //   params: {
        //     jsonUrl: url,
        //     catCode: 1,
        //     catId: this.catId,
        //     Panel_id: this.Panel_id,
        //     Recommend_id: this.Recommend_id
        //   }
        // });
        c.routerSkip(this.hot[this.itemNo].jsonUrl,
                      this.hot[this.itemNo].elementType,
                      this.hot[this.itemNo].layout,{},
                      this.$router);
      }
    },
    clickPage () {
      let ystObj = {};
      ystObj.ip = '';
      ystObj.time = this.getDate();
      ystObj.page_name = 'pageIndex_0' + (this.navpos + 1);
      ystObj.page_level = '1';
      ystObj.Panel_id = '0' + (this.navpos + 1);
      this.Panel_id = ystObj.Panel_id;
      ystObj.Recommend_id =
        ystObj.Panel_id + this.itemSort + '0' + (this.itemNo + 1);
      this.Recommend_id = ystObj.Recommend_id;
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
    back () {
      this.isShow = false;
      this.isLast = this.itemNo;
      this.isActive = -1;
      this.$emit('pressDown', this.isShow, this.eleId, 'back');
    },
    up () {
      this.isShow = false;
      this.isLast = this.itemNo;
      this.isActive = -1;
      this.$emit('pressDown', this.isShow, this.eleId, 'up');
    },
    down () {
      this.isShow = false;
      this.isLast = this.itemNo;
      this.isActive = -1;
      this.$emit('pressDown', this.isShow, this.eleId, 'down');
    },
    left () {
      if (this.itemNo == 0) return;

      this.itemNo--;
    },
    right () {
      // console.log(this.itemNo);
      if (this.itemNo >= 3) return;

      this.itemNo++;
    },
    updateStast (bl, pos, isEnd) {
      this.isShow = bl;
      this.pos = pos;
      if (bl) {
        //
        this.isActive = this.isLast;
        let eleH = this.cEleOffsetTop('#hot' + this.itemNo + ' img');
        this.$emit('eleScroll', this.eleId, this.pos, eleH);
      }
    },
    cEleOffsetTop (ele) {
      let fEleDistance = hp.offset(hp.$(ele)).top;
      // console.log("元素距离文档顶部的距离:"+fEleDistance);
      // console.log(this.name,"元素距离文档顶部的距离:"+(fEleDistance+95));
      let realHeight = fEleDistance + 95;
      return realHeight;
    },
    changeIsActive (index) {
      this.isActive = index;
    }
  },
  components: {},
  watch: {
    initData () {
      this.hot = this.initData.elementList;
      this.eleId = this.initData.specialId;
    },
    itemNo () {
      // console.log("itemNo update-"+this.itemNo);
      this.changeIsActive(this.itemNo);
    }
  }
};
</script>
