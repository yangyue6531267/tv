<!-- 搜索页 -->
<template>
  <div class="filter">
    <timeClock></timeClock>
    <div class="filter-left">
      <h3>筛选</h3>
      <Sizer
        :cat-code="catCode"
        ref="fr"
        :category-name="categoryName"
        v-on:filterIssue="getSql"
        v-on:keepDo="toRight"
        v-if="isKeepAlive"
      ></Sizer>
    </div>
    <div class="filter-right">
      <ul>
        <template v-for="(item,index) in assetList">
          <li
            :class="(index==itemNo?'change':'')"
            :key="index"
            :id="('a'+index)"
          >
            <lazy-image
              :src='item.assetImg'
              :placeholder='placeholder'
              :initScore='initScore'
              :score="item.score"
              :title="item.assetName"
            />
          </li>
        </template>
      </ul>
    </div>
    <keyDo
      v-on:listenKeyCode="keyCode"
      v-if="isShow"
      ref="keyDo"
    ></keyDo>
  </div>
</template>

<style>
.filter {
  width: 1280px;
  height: 720px;
  background: #a28f71;
  overflow: hidden;
}
.filter:after {
  clear: both;
  content: "";
  display: block;
}

.filter-left {
  width: 400px;
  height: 720px;
  padding-left: 50px;
  float: left;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
}

h3 {
  margin-top: 20px;
  margin-bottom: 130px;
  font-size: 25px;
  color: #ffffff;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}
.tip {
  width: 280px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 18px;
  background-color: #c6a776;
}
.filter-left .filterName {
  font-size: 20px;
  text-align: center;
  margin-top: 15px;
}
.filter-left .introduce {
  font-size: 18px;
  color: #cfe6fe;
  margin-top: 15px;
}

.filter-right {
  position: relative;
  width: 840px;
  float: left;
  box-sizing: border-box;
  margin-top: 60px;
  margin-left: 40px;
}
.filter-right ul {
  position: relative;
}
.filter-right ul li {
  float: left;
  width: 160px;
  height: 220px;
  margin-left: 25px;
  margin-top: 25px;
  box-sizing: border-box;
}
.filter-right ul li.change {
  box-sizing: border-box;
  transform: scale(1.1);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.55);
  border: 4px #fff solid;
  margin: 29px 2px -4px 23px;
}
</style>
<script>
import { mapGetters } from 'vuex';
import Sizer from './Sizer.vue';
import { HTTPUtil as api } from '../../fetch/api.js';
import timeClock from '../../components/timeTask.vue';
import c from '../../js/common.js';
import { hp } from '../../util/dom.js';
import { yst } from '../../js/yst.js';
export default {
  props: [
    'catCode',
    'categoryName',
    'catId',
    'parentId',
    'Recommend_id',
    'Panel_id'
  ],
  data () {
    return {
      isShow: false,
      itemNo: -1,
      pageSize: 0,
      cheight: [],
      placeholder: require('../../assets/img_loading_160x230.png'),
      initScore: require('../../assets/corner_mark.png'),
      assetList: [],
      isKeepAlive: true,
      keyword: '',
      firstLoad: true,
      load_start: 0,
      load_time: 0,
      exposureStartTime: 0,
      exposureEndTime: 0
    };
  },
  activated () {
    this.firstLoad = true;
    this.$store.commit('GET_HTTPRESPONSETIME', new Date().getTime());
    //    if(this.catCode!=undefined){// 当组件被缓存的时候需要重新渲染
    this.isKeepAlive = false;
    hp.animate(document.querySelector('.filter-right ul'), { top: 0 });
    this.itemNo = -1;
    this.pageSize = 0;
    this.cheight = [];
    let _this = this;
    this.$refs.fr.removeCss();
    this.$refs.fr.col = 0;
    setTimeout(() => {
      _this.isKeepAlive = true;
    }, 0);
    setTimeout(() => {
      _this.$refs.fr.col = 0;
      _this.$refs.fr.isShow = true;
      _this.$refs.fr.initData();
      _this.$refs.fr.addCss();
    }, 50);
    this.$nextTick(function () {
      if (this.firstLoad) {
        console.log('筛选页第一次加载');
        this.firstLoad = false;
      } else {
        return '';
      }
      if (this.catCode == undefined) this.catCode = 0;
      if (this.catId == undefined) this.catId = 0;
    });

    //    }
  },
  created () {
    this.load_start = new Date() - 0;
    c.setLocal('sx-catCode', this.catCode);
  },
  mounted () {
    this.load_time = new Date() - this.load_start;
  },
  methods: {
    keyCode (kc) {
      if (kc == 'down') {
        this.down();
      } else if (kc == 'up') {
        this.up();
      } else if (kc == 'left') {
        this.left();
      } else if (kc == 'right') {
        this.right();
      } else if (kc == 'KeyEnter') {
        this.clickPage();
        c.setParentPageType('0901');
        c.setParentPageId('102-1');
        try {
          if (this.catCode == undefined) this.catCode = 0;
          if (this.catId == undefined) this.catId = 0;
        } catch (error) {
          console.log(error);
        }
        let url = this.assetList[this.itemNo].jsonUrl;
        this.$router.push({ name: 'detail', params: { jsonUrl: url,bp:'filterResult' } });
      } else if (kc == 'KeyBack') {
        this.isShow = false;
        this.$router.push({name:'index'})
      }
    },
    getSql (sql) {
      this.sql = sql;
      this.pIndex = 0;
      this.pSize = 20;
      this.pageSize = 0;
      //  sql = "&content=1491378716804914758&areaId=1491379110098810153";
      if (sql != '' && sql.length > 0) {
        this.keyword = sql;
      } else {
        this.keyword = '';
      }
      let _this = this;
      api.jsonp(
        api.getFilterResult(sql, this.pIndex, this.pSize, this.catCode),
        function (jsonData) {
          _this.assetList = jsonData.data.assetList;
          setTimeout(() => {
            _this.$lazyImages.loadImage();
          }, 0);
        }
      );
    },
    addtime () {
      let ptitle = document.querySelector(
        '#a' + this.itemNo + ' .s-title-name'
      ).innerText;
      if (ptitle.length >= 8) {
        let id = '#a' + this.itemNo;
        let speed = 40;
        let that = this;
        let tab = document.querySelector(id + ' .s-title');
        let tab1 = document.querySelector(id + ' .s-title-name');
        let tab2 = document.querySelector(id + ' .s-title-temp');
        tab.style.textOverflow = 'clip';
        tab2.innerHTML = tab1.innerHTML;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
          that.Marquee(tab, tab1, tab2);
        }, speed);
      }
    },
    removetime () {
      if (this.timer != 0) {
        clearInterval(this.timer);
        this.timer = 0;
        let id = '#a' + this.itemNo;
        let tab = document.querySelector(id + ' .s-title');
        let tab2 = document.querySelector(id + ' .s-title-temp');
        tab2.innerHTML = '';
        tab.scrollLeft = 0;
        tab.style.textOverflow = 'ellipsis';
      }
    },
    clickPage () {
      let ystObj = {};
      ystObj.ip = '';
      ystObj.time = this.getDate();
      ystObj.page_name = 'filter_' + this.Panel_id;
      ystObj.page_level = '2';
      ystObj.Panel_id = this.Panel_id;
      ystObj.Recommend_id = this.Recommend_id;
      ystObj.Page_url = '/esport/filter';
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
    Marquee (tab, tab1, tab2) {
      if (tab2.offsetWidth - tab.scrollLeft < 0) {
        tab.scrollLeft = 1; // 上面的写法会导致滚动时突然抖动                    console.log(tab.scrollLeft);
      } else {
        tab.scrollLeft += 2;
      }
    },
    down () {
      this.removetime();
      // if($('.filter-right ul').is(":animated")){return}
      if (this.itemNo > this.assetList.length - 5) return;
      this.itemNo += 4;
      let eh = this.getEleHeight();
      this.getNextPage('', '');
      this.changeHeight('down', eh);
      this.addtime();
    },
    up () {
      this.removetime();
      // if($('.filter-right ul').is(":animated")){return}
      if (this.itemNo < 4) return;
      this.itemNo -= 4;
      let eh = this.getEleHeight();
      this.changeHeight('up', eh);
      this.addtime();
    },
    left () {
      this.removetime();
      if (this.itemNo % 4 == 0) {
        this.itemNo = -1;
        this.isShow = false;
        hp.animate(document.querySelector('.filter-right ul'), { top: 0 });
        this.$refs.fr.getkeyCode(true);
        return;
      }
      this.itemNo--;
      this.addtime();
    },
    right () {
      this.removetime();
      if ((this.itemNo + 1) % 4 == 0) return;
      if (this.itemNo == this.assetList.length - 1) return;
      this.itemNo++;
      this.addtime();
    },
    toRight (arg) {
      if (!arg) {
        if (this.assetList.length == 0) {
          this.itemNo = -1;
          this.isShow = false;
          hp.animate(document.querySelector('.filter-right ul'), { top: 0 });
          this.$refs.fr.getkeyCode(true);
        } else {
          this.itemNo = 0;
          this.isShow = !arg;
          try {
            if (this.catCode == undefined) this.catCode = 0;
            if (this.catId == undefined) this.catId = 0;
          } catch (error) {
            console.log(error);
          }
        }
      }
      this.addtime();
    },
    changeHeight (action, height) {
      let _this = this;
      let scrollY = hp.position(document.querySelector('.filter-right ul')).top;
      let logObj = this.assetList[this.itemNo];
      if (action == 'down') {
        if (height > 720) {
          let _temp = height - 640;
          scrollY -= _temp;
          if (this.exposureStartTime != 0) {
            this.exposureEndTime = new Date().format('yyyy-MM-dd hh:mm:ss'); // 上一次曝光时间
          }
          hp.animate(
            document.querySelector('.filter-right ul'),
            { top: scrollY },
            30,
            0.2,
            function () {
              _this.cheight.push(_temp);
              _this.pageSize++;
            }
          );
        }
      } else if (action == 'up') {
        console.log('剩余滑动次数:' + this.pageSize);
        if (this.pageSize == 0) {
          hp.animate(document.querySelector('.filter-right ul'), { top: 0 });
          // $('.filter-right ul').stop(false,true).animate({'top':'0px'},200);
          return;
        }
        scrollY += this.cheight[this.pageSize - 1];
        hp.animate(
          document.querySelector('.filter-right ul'),
          { top: scrollY },
          30,
          0.2,
          function () {
            _this.cheight.splice(_this.pageSize - 1, 1);
            _this.pageSize--;
          }
        );
      }
    },
    getEleHeight () {
      // 兼容
      //    let left = hp.offset(obj).left + 175;
      let fEleDistance =
        hp.offset(document.querySelectorAll('.filter-right li')[this.itemNo])
          .top + 220;
      // let fEleDistance = $(".filter-right li").eq(this.itemNo).offset().top+220;
      console.log('fEleDistance:' + fEleDistance);
      return fEleDistance;
    },
    getNextPage (pIndex, pSize) {
      this.pIndex += this.pSize;
      this.pSize = 8;
      let _this = this;
      let _assetList = [];
      let _concat = [];
      _assetList = this.assetList;
      console.log(_assetList);
      if (this.catCode == 0 || this.catCode == undefined) {
        console.log('翻页catCode从缓存中取');
        this.catCode = c.getLocal('sx-catCode');
      }
      api.jsonp(
        api.getFilterResult(this.sql, this.pIndex, this.pSize, this.catCode),
        function (jsonData) {
          if (jsonData.data.assetList.length > 0) {
            _concat = jsonData.data.assetList;
            console.log(_concat);
            _this.assetList = _assetList.concat(_concat);
          }
        }
      );
    },
  },
  computed: {
    ...mapGetters([
      'categorys',
      'behindParams',
      'isHTTPS',
      'startTime',
      'httpRequestTime',
      'httpResponseTime'
    ])
  },
  components: {
    Sizer,
    timeClock
  },
  watch: {
    parentId () {
      if (this.parentId == undefined) this.parentId = 0;
    },
    assetList () {
      if (this.assetList.length == 0) {
        // 没有筛选结果
        try {
          // 筛选结果中点击
          if (this.catCode == undefined) this.catCode = 0;
          if (this.catId == undefined) this.catId = 0;
        } catch (error) {
          console.log(error);
        }
      }
      this.$nextTick(function () {
        this.$store.commit('GET_HTTPRESPONSETIME', new Date().getTime());
        if (this.firstLoad) {
          this.firstLoad = false;
        } else {
          return '';
        }
        if (this.catCode == undefined) this.catCode = 0;
        if (this.catId == undefined) this.catId = 0;
      });
    }
  },
  beforeRouteLeave (to, from, next) {
    try {
      this.$store.commit('GET_STARTTIME', new Date().getTime());
      if (this.catCode == undefined) this.catCode = 0;
      if (this.catId == undefined) this.catId = 0;
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }
};
</script>
