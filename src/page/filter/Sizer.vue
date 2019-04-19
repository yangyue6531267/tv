<!-- 筛选条件 -->
<template>
  <div class="filterBox">
      <!-- 筛选类型 -->
      <div class="filterType hover">
          <ul>
              <template v-for="(item,index) in dimensionMap.contentList">
  <li :key="'s1'+index">{{item.categoryName}}</li>
</template>
          </ul>
      </div>
      <!-- 筛选地区 -->
      <div class="filterLocal">
          <ul>
              <template v-for="(item,index) in dimensionMap.areaList">
  <li :key="'s2'+index">{{item.categoryName}}</li>
</template>
          </ul>
      </div>
      <!-- 筛选年份 -->
      <div class="filterYear">
          <ul>
              <template v-for="(item,index) in dimensionMap.yearsList">
  <li :key="'s3'+index">{{item.categoryName}}</li>
</template>
          </ul>
      </div>
      <!-- 筛选排序 -->
      <div class="filterSort">
          <ul>
              <template v-for="(item,index) in dimensionMap.sortList">
  <li :key="'s4'+index">{{item.categoryName}}</li>
</template>
          </ul>
      </div>
      <!-- 按键监听 -->
      <keyDo ref="keydo" v-on:listenKeyCode="keyCode" v-if="isShow"></keyDo>
  </div>
</template>
<style>
.filterBox {
  position: relative;
  box-sizing: border-box;
  width: 328px;
  height: 353px;
  margin-bottom: 100px;
}
.filterType,
.filterLocal,
.filterYear,
.filterSort {
  position: relative;
  display: block;
  height: 100%;
  float: left;
  overflow: hidden;
  margin-left: 1px;
  background: linear-gradient(
    to bottom,
    rgba(162, 143, 113, 0) 0%,
    rgba(255, 255, 255, 0.4),
    rgba(162, 143, 113, 0) 100%
  );
}
.filterType,
.filterLocal {
  width: 90px;
}
.filterYear,
.filterSort {
  width: 70px;
}
.filterType li,
.filterLocal li,
.filterYear li,
.filterSort li {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.filterBox li:nth-child(4) {
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px rgba(255, 255, 255, 0.5);
}
.filterType ul.hover,
.filterLocal ul.hover,
.filterYear ul.hover,
.filterSort ul.hover {
  background-color: rgba(255, 255, 255, 0.3);
}
.filterBox div.hover {
  background-color: rgba(255, 255, 255, 0.3);
}
.filterType li.hover,
.filterLocal li.hover,
.filterYear li.hover,
.filterSort li.hover {
  background-color: #a26564;
}
</style>
<script>
import { HTTPUtil as api } from '../../fetch/api.js';
import { client as yh } from '../../js/client.js';

// window.responseCallback = function(params) {
//         console.log("客户端:"+JSON.stringify(params));
// }
export default {
  name: 'Sizer',
  props: ['catCode', 'categoryName'],
  data () {
    return {
      isShow: true,
      position: 0,
      col: 0,
      row: [],
      iskc: 0,
      keyword: '',
      isDel: false,
      eleId: 'Sizer',
      dimensionMap: {
        contentList: [
          { categoryName: '', categoryId: '1491378716804914758', catCode: '' }
        ],
        areaList: [
          { categoryName: '', categoryId: '1491379100827595987', catCode: '' }
        ],
        sortList: [
          { categoryName: '', categoryId: '1491381431106739628', catCode: '' }
        ],
        yearsList: [
          { categoryName: '', categoryId: '1491379012225784408', catCode: '' }
        ]
        //   contentList:[{"categoryName":"奇幻","categoryId":"1491378716804914758","catCode":""},{"categoryName":"战争","categoryId":"1491378723409642868","catCode":""},{"categoryName":"传奇","categoryId":"1491378732345359978","catCode":""},{"categoryName":"古装","categoryId":"1491378864369787737","catCode":""},{"categoryName":"谍战","categoryId":"1491378878692898072","catCode":""},{"categoryName":"家庭","categoryId":"1491378907762476927","catCode":""},{"categoryName":"刑侦","categoryId":"1491378916626821438","catCode":""},{"categoryName":"爱情","categoryId":"1491378924986288318","catCode":""},{"categoryName":"都市","categoryId":"1491378937013934939","catCode":""},{"categoryName":"乡村","categoryId":"1491378946577965549","catCode":""},{"categoryName":"悬疑","categoryId":"1491378954651528010","catCode":""},{"categoryName":"职场","categoryId":"1491378964212388357","catCode":""}],
        //   areaList:[{"categoryName":"大陆","categoryId":"1491379100827595987","catCode":""},{"categoryName":"港台","categoryId":"1491379110098810153","catCode":""},{"categoryName":"其他","categoryId":"1491379132354989490","catCode":""}],
        //   sortList:[{"categoryName":"评分","categoryId":"1491381431106739628","catCode":""}],
        //   yearsList:[{"categoryName":"2017","categoryId":"1491379012225784408","catCode":""},{"categoryName":"2016","categoryId":"1491379022467222462","catCode":""},{"categoryName":"2015","categoryId":"1491379029786312642","catCode":""},{"categoryName":"2014","categoryId":"1491379036721390037","catCode":""},{"categoryName":"2013","categoryId":"1491379045610100702","catCode":""},{"categoryName":"2012","categoryId":1491379051523137001,"catCode":""},{"categoryName":"2011","categoryId":"1491379058618954028","catCode":""},{"categoryName":"2010","categoryId":"1491379067747806281","catCode":""},{"categoryName":"00年代","categoryId":"1491379084818803444","catCode":""},{"categoryName":"更早","categoryId":"1491379092395105697","catCode":""}]
      },
      whiteSpace: [3, 3, 3, 3],
      removeList: {
        type: [],
        local: [],
        year: [],
        sort: []
      },
      gather: 0
    };
  },
  created () {
    // this.initData();
  },
  activated () {},
  mounted () {
    this.addCss();
  },
  methods: {
    initData () {
      window.responseCallback = this.responseCallback;
      if (this.catCode == undefined) {
        this.catCode = sessionStorage.getItem('catCode');
      }
      //    let curl = api.getFilter(this.catCode);
      //    console.log("筛选地址:"+curl);
      //    yh.httpClient(curl);
      // this.responseCallback();
      let _this = this;
      api.jsonp(api.getFilterCategory(this.catCode), function (jsonData) {
        _this.responseCallback(jsonData);
      });
    },
    responseCallback (jsonData) {
      // jsonData = this.dimensionMap;
      // jsonData.code = 200;
      console.log('客户端返回筛选结果:' + jsonData.code);

      if (jsonData.code == 200) {
        // console.log(jsonData.data.categoryList[0].dimensionMap.contentList);
        sessionStorage.setItem('catCode', this.catCode);
        this.dimensionMap = jsonData.data.categoryList[0].dimensionMap;
        this.dimensionMap.contentList.unshift({
          categoryName: '不限',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.contentList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.contentList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.contentList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });

        this.dimensionMap.areaList.unshift({
          categoryName: '地区',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.areaList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.areaList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.areaList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });

        this.dimensionMap.sortList.unshift({
          categoryName: '排序',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.sortList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.sortList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.sortList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });

        this.dimensionMap.yearsList.unshift({
          categoryName: '年份',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.yearsList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.yearsList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.yearsList.unshift({
          categoryName: '',
          categoryId: '',
          catCode: ''
        });
        let xh = 0;
        for (
          let index = 0;
          index < this.dimensionMap.contentList.length;
          index++
        ) {
          const element = this.dimensionMap.contentList[index];
          if (element.categoryName == this.categoryName) {
            xh = index;
            break;
          } else if (
            this.categoryName == '全部类别' &&
            (element.categoryName == '类型' || element.categoryName == '不限')
          ) {
            xh = index;
            break;
          }
        }

        xh = xh - 3;
        let delArr = this.dimensionMap.contentList.splice(0, xh);
        this.dimensionMap.contentList = this.dimensionMap.contentList.concat(
          delArr
        );
        this.$nextTick(function () {
          this.gather++;
          this.addCss();
        });
      }
    },
    sortDefault () {
      if (this.col == 0) {
        if (
          document.querySelectorAll('.filterType li')[3].innerText == '不限'
        ) {
          this.dimensionMap.contentList[3].categoryName = '类型';
        } else if (
          document.querySelectorAll('.filterType li')[3].innerText == '类型'
        ) {
          this.dimensionMap.contentList[3].categoryName = '不限';
        }
      } else if (this.col == 1) {
        if (
          document.querySelectorAll('.filterLocal li')[3].innerText == '不限'
        ) {
          this.dimensionMap.areaList[3].categoryName = '地区';
        } else if (
          document.querySelectorAll('.filterLocal li')[3].innerText == '地区'
        ) {
          this.dimensionMap.areaList[3].categoryName = '不限';
        }
      } else if (this.col == 2) {
        if (
          document.querySelectorAll('.filterYear li')[3].innerText == '不限'
        ) {
          this.dimensionMap.yearsList[3].categoryName = '年份';
        } else if (
          document.querySelectorAll('.filterYear li')[3].innerText == '年份'
        ) {
          this.dimensionMap.yearsList[3].categoryName = '不限';
        }
      } else if (this.col == 3) {
        if (
          document.querySelectorAll('.filterSort li')[3].innerText == '默认'
        ) {
          this.dimensionMap.sortList[3].categoryName = '排序';
        } else if (
          document.querySelectorAll('.filterSort li')[3].innerText == '排序'
        ) {
          this.dimensionMap.sortList[3].categoryName = '默认';
        }
      }
    },
    keyCode (kc) {
      if (kc == 'down') {
        this.down();
        this.gather++;
      } else if (kc == 'up') {
        this.up();
        this.gather++;
      } else if (kc == 'left') {
        this.left();
        this.gather++;
      } else if (kc == 'right') {
        this.right();
        this.gather++;
      } else if (kc == 'KeyEnter') {
        this.KeyEnter();
      } else if (kc == 'KeyBack') {
        this.isShow = false;
        this.$router.go(-1);
      }
    },
    left () {
      if (this.col == 0) return;
      this.removeCss();
      this.sortDefault();
      this.col--;
      this.addCss();
      this.sortDefault();
    },
    right () {
      this.removeCss();
      if (this.col == 3) {
        this.isShow = false;
        this.$emit('keepDo', this.isShow);
        return;
      }
      this.sortDefault();
      this.col++;
      this.addCss();
      this.sortDefault();
    },
    down () {
      this.TurnDown();
    },
    up () {
      this.TurnUp();
    },
    addCss () {
      if (this.col == 0) {
        document.querySelector('.filterType').className = 'filterType hover';
        if (document.querySelectorAll('.filterType li')[3]) {
          document.querySelectorAll('.filterType li')[3].className = 'hover';
        }
      } else if (this.col == 1) {
        document.querySelector('.filterLocal').className = 'filterLocal hover';
        if (document.querySelectorAll('.filterLocal li')[3]) {
          document.querySelectorAll('.filterLocal li')[3].className = 'hover';
        }
      } else if (this.col == 2) {
        document.querySelector('.filterYear').className = 'filterYear hover';
        if (document.querySelectorAll('.filterYear li')[3]) {
          document.querySelectorAll('.filterYear li')[3].className = 'hover';
        }
      } else if (this.col == 3) {
        document.querySelector('.filterSort').className = 'filterSort hover';
        if (document.querySelectorAll('.filterSort li')[3]) {
          document.querySelectorAll('.filterSort li')[3].className = 'hover';
        }
      }
    },
    removeCss () {
      if (this.col == 0) {
        document.querySelector('.filterType').className = 'filterType';
        if (document.querySelectorAll('.filterType li')[3]) {
          document.querySelectorAll('.filterType li')[3].className = '';
        }
      } else if (this.col == 1) {
        document.querySelector('.filterLocal').className = 'filterLocal';
        if (document.querySelectorAll('.filterLocal li')[3]) {
          document.querySelectorAll('.filterLocal li')[3].className = '';
        }
      } else if (this.col == 2) {
        document.querySelector('.filterYear').className = 'filterYear';
        if (document.querySelectorAll('.filterYear li')[3]) {
          document.querySelectorAll('.filterYear li')[3].className = '';
        }
      } else if (this.col == 3) {
        document.querySelector('.filterSort').className = 'filterSort';
        if (document.querySelectorAll('.filterSort li')[3]) {
          document.querySelectorAll('.filterSort li')[3].className = '';
        }
      }
    },
    TurnDown () {
      if (this.col == 0) {
        if (this.dimensionMap.contentList[4].categoryName == '') return;
        let t1 = this.dimensionMap.contentList.shift();
        this.dimensionMap.contentList.push(t1);
      } else if (this.col == 1) {
        if (this.dimensionMap.areaList[4].categoryName == '') return;
        let t1 = this.dimensionMap.areaList.shift();
        this.dimensionMap.areaList.push(t1);
      } else if (this.col == 2) {
        if (this.dimensionMap.yearsList[4].categoryName == '') return;
        let t1 = this.dimensionMap.yearsList.shift();
        this.dimensionMap.yearsList.push(t1);
      } else if (this.col == 3) {
        if (this.dimensionMap.sortList[4].categoryName == '') return;
        let t1 = this.dimensionMap.sortList.shift();
        this.dimensionMap.sortList.push(t1);
      }
    },
    TurnUp () {
      if (this.col == 0) {
        if (this.dimensionMap.contentList[2].categoryName == '') return;
        let t1 = this.dimensionMap.contentList.pop();
        this.dimensionMap.contentList.unshift(t1);
      } else if (this.col == 1) {
        if (this.dimensionMap.areaList[2].categoryName == '') return;
        let t1 = this.dimensionMap.areaList.pop();
        this.dimensionMap.areaList.unshift(t1);
      } else if (this.col == 2) {
        if (this.dimensionMap.yearsList[2].categoryName == '') return;
        let t1 = this.dimensionMap.yearsList.pop();
        this.dimensionMap.yearsList.unshift(t1);
      } else if (this.col == 3) {
        if (this.dimensionMap.sortList[2].categoryName == '') return;
        let t1 = this.dimensionMap.sortList.pop();
        this.dimensionMap.sortList.unshift(t1);
      }
    },
    noDefault (arg) {
      if (
        arg == '' ||
        arg == '默认' ||
        arg == '不限' ||
        arg == '类型' ||
        arg == '地区' ||
        arg == '年份' ||
        arg == '排序'
      ) {
        return true;
      }
      return false;
    },
    getkeyCode (bl) {
      this.isShow = bl;
      this.col = 3;
      this.addCss();
    }
  },
  watch: {
    gather () {
      this.$nextTick(function () {
        let reqStr = '';
        let t1 = document.querySelectorAll('.filterType li')[3].innerText;
        let t2 = document.querySelectorAll('.filterLocal li')[3].innerText;
        let t3 = document.querySelectorAll('.filterYear li')[3].innerText;
        let t4 = document.querySelectorAll('.filterSort li')[3].innerText;
        console.log(t1);
        if (!this.noDefault(t1)) {
          let categoryId = 0;
          for (
            let index = 0;
            index < this.dimensionMap.contentList.length;
            index++
          ) {
            const element = this.dimensionMap.contentList[index];
            if (element.categoryName == t1) {
              categoryId = this.dimensionMap.contentList[index].categoryId;
              console.log(this.dimensionMap.contentList[index]);
              break;
            }
          }
          reqStr += '&content=' + categoryId;
        }
        if (!this.noDefault(t2)) {
          let categoryId = 0;
          for (
            let index = 0;
            index < this.dimensionMap.areaList.length;
            index++
          ) {
            const element = this.dimensionMap.areaList[index];
            if (element.categoryName == t2) {
              categoryId = this.dimensionMap.areaList[index].categoryId;
              break;
            }
          }
          reqStr += '&areaId=' + categoryId;
        }
        if (!this.noDefault(t3)) {
          let categoryId = 0;
          for (
            let index = 0;
            index < this.dimensionMap.yearsList.length;
            index++
          ) {
            const element = this.dimensionMap.yearsList[index];
            if (element.categoryName == t3) {
              categoryId = this.dimensionMap.yearsList[index].categoryId;
              break;
            }
          }
          reqStr += '&year=' + categoryId;
        }
        if (!this.noDefault(t4)) {
          let categoryId = 0;
          for (
            let index = 0;
            index < this.dimensionMap.sortList.length;
            index++
          ) {
            const element = this.dimensionMap.sortList[index];
            if (element.categoryName == t4) {
              categoryId = this.dimensionMap.sortList[index].categoryId;
              break;
            }
          }
          reqStr += '&sortType=' + categoryId;
        }
        console.log('请求筛选条件:' + reqStr);
        this.$emit('filterIssue', reqStr);
      });
    }
  }
};
</script>
