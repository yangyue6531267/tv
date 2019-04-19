<!-- 筛选条件 -->
<template>
  <div class="filterBox">
      <!-- 筛选类型 -->
      <div class="filterType">
          <ul>
              <template v-for="(item,index) in dimensionMap.contentList">
  <li :key="'f1'+index">{{item.categoryName}}</li>
</template>
              <template v-if="dimensionMap.contentList.length<7"  >
  <template v-for="n in 7-dimensionMap.contentList.length">
    <li :key="n"></li>
  </template>
</template>
          </ul>
      </div>
      <!-- 筛选地区 -->
      <div class="filterLocal">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <template v-for="(item,index) in dimensionMap.areaList">
  <li :key="'f2'+index">{{item.categoryName}}</li>
</template>
              <template v-if="dimensionMap.areaList.length<4"  >
  <template v-for="n in 4-dimensionMap.areaList.length">
    <li :key="'f3'+n"></li>
  </template>
</template>
          </ul>
      </div>
      <!-- 筛选年份 -->
      <div class="filterYear">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <template v-for="(item,index) in dimensionMap.yearsList">
  <li :key="'f4'+index">{{item.categoryName}}</li>
</template>
              <template v-if="dimensionMap.yearsList.length<4"  >
  <template v-for="n in 4-dimensionMap.yearsList.length">
    <li :key="'f5'+n"></li>
  </template>
</template>
          </ul>
      </div>
      <!-- 筛选排序 -->
      <div class="filterSort">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <template>
  <template v-for="(item,index) in dimensionMap.sortList">
    <li :key="'f6'+index">{{item.categoryName}}</li>
  </template>
</template>
              <template v-if="dimensionMap.sortList.length<4"  >
  <template v-for="n in 4-dimensionMap.sortList.length">
    <li :key="'f7'+n"></li>
  </template>
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
  /* background: -moz-linear-gradient(top, #A28F71 0%, #ffffff 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#A28F71), color-stop(100%,#ffffff));
        background: -webkit-linear-gradient(top, #A28F71 0%,#ffffff 100%);
        background: -o-linear-gradient(top, #A28F71 0%,#ffffff 100%);
        background: -ms-linear-gradient(top, #A28F71 0%,#ffffff 100%); */
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
  name: 'filtro',
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
      eleId: 'filter',
      dimensionMap: {
        contentList: [
          { categoryName: '类型', categoryId: '', catCode: '' },
          {
            categoryName: '奇幻',
            categoryId: '1491378716804914758',
            catCode: ''
          },
          {
            categoryName: '战争',
            categoryId: '1491378723409642868',
            catCode: ''
          },
          {
            categoryName: '传奇',
            categoryId: '1491378732345359978',
            catCode: ''
          },
          {
            categoryName: '古装',
            categoryId: '1491378864369787737',
            catCode: ''
          },
          {
            categoryName: '谍战',
            categoryId: '1491378878692898072',
            catCode: ''
          },
          {
            categoryName: '家庭',
            categoryId: '1491378907762476927',
            catCode: ''
          },
          {
            categoryName: '刑侦',
            categoryId: '1491378916626821438',
            catCode: ''
          },
          {
            categoryName: '爱情',
            categoryId: '1491378924986288318',
            catCode: ''
          },
          {
            categoryName: '都市',
            categoryId: '1491378937013934939',
            catCode: ''
          },
          {
            categoryName: '乡村',
            categoryId: '1491378946577965549',
            catCode: ''
          },
          {
            categoryName: '悬疑',
            categoryId: '1491378954651528010',
            catCode: ''
          },
          {
            categoryName: '职场',
            categoryId: '1491378964212388357',
            catCode: ''
          }
        ],
        areaList: [
          { categoryName: '地区', categoryId: '', catCode: '' },
          {
            categoryName: '大陆',
            categoryId: '1491379100827595987',
            catCode: ''
          },
          {
            categoryName: '港台',
            categoryId: '1491379110098810153',
            catCode: ''
          },
          {
            categoryName: '其他',
            categoryId: '1491379132354989490',
            catCode: ''
          }
        ],
        sortList: [
          { categoryName: '排序', categoryId: '', catCode: '' },
          {
            categoryName: '评分',
            categoryId: '1491381431106739628',
            catCode: ''
          }
        ],
        yearsList: [
          { categoryName: '年份', categoryId: '', catCode: '' },
          {
            categoryName: '2017',
            categoryId: '1491379012225784408',
            catCode: ''
          },
          {
            categoryName: '2016',
            categoryId: '1491379022467222462',
            catCode: ''
          },
          {
            categoryName: '2015',
            categoryId: '1491379029786312642',
            catCode: ''
          },
          {
            categoryName: '2014',
            categoryId: '1491379036721390037',
            catCode: ''
          },
          {
            categoryName: '2013',
            categoryId: '1491379045610100702',
            catCode: ''
          },
          {
            categoryName: '2012',
            categoryId: 1491379051523137001,
            catCode: ''
          },
          {
            categoryName: '2011',
            categoryId: '1491379058618954028',
            catCode: ''
          },
          {
            categoryName: '2010',
            categoryId: '1491379067747806281',
            catCode: ''
          },
          {
            categoryName: '00年代',
            categoryId: '1491379084818803444',
            catCode: ''
          },
          {
            categoryName: '更早',
            categoryId: '1491379092395105697',
            catCode: ''
          }
        ]
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
    this.initData();
    //    this.dimensionMap.contentList.unshift({categoryName:"不限",categoryId:"",catCode:""});
    //    this.dimensionMap.areaList.unshift({categoryName:"地区",categoryId:"",catCode:""});
    //    this.dimensionMap.sortList.unshift({categoryName:"排序",categoryId:"",catCode:""});
    //    this.dimensionMap.yearsList.unshift({categoryName:"年份",categoryId:"",catCode:""});
    //    if(this.dimensionMap.yearsList.length>7){
    //        this.whiteSpace[2] = 4;
    //    }else if(this.dimensionMap.areaList.length>7){
    //        this.whiteSpace[1] = 4;
    //    }else if(this.dimensionMap.sortList.length>7){
    //        this.whiteSpace[3] = 4;
    //    }
    //    let xh = 0;
    //     for (let index = 0; index <  this.dimensionMap.contentList.length; index++) {
    //         const element =  this.dimensionMap.contentList[index];

    //         if(element.categoryName==this.categoryName){
    //             xh = index;
    //             break;
    //         }else if(this.categoryName=="全部类别"&&(element.categoryName=="类型"||element.categoryName=="不限")){
    //             xh = index;
    //             break;
    //         }
    //     }
    //     this.dimensionMap.contentList[3] = this.dimensionMap.contentList.splice(xh,1,this.dimensionMap.contentList[3])[0];
    //          this.$nextTick(function() {
    //                 $('.filterType ul').addClass('hover');
    //                 $('.filterType li').eq(3).addClass('hover');
    //                 setTimeout(() => {
    //                     this.gather++;
    //                 }, 0);
    //         });
  },
  activated () {},
  mounted () {},
  methods: {
    initData () {
      window.responseCallback = this.responseCallback;
      if (this.catCode == undefined) {
        this.catCode = sessionStorage.getItem('catCode');
      }
      let curl = api.getFilter(this.catCode);
      console.log('筛选地址:' + curl);
      yh.httpClient(curl);
      // this.responseCallback();
    },
    responseCallback (jsonData) {
      //   jsonData = {
      //       contentList:[{"categoryName":"奇幻","categoryId":"1491378716804914758","catCode":""},{"categoryName":"战争","categoryId":"1491378723409642868","catCode":""},{"categoryName":"传奇","categoryId":"1491378732345359978","catCode":""},{"categoryName":"古装","categoryId":"1491378864369787737","catCode":""},{"categoryName":"谍战","categoryId":"1491378878692898072","catCode":""},{"categoryName":"家庭","categoryId":"1491378907762476927","catCode":""},{"categoryName":"刑侦","categoryId":"1491378916626821438","catCode":""},{"categoryName":"爱情","categoryId":"1491378924986288318","catCode":""},{"categoryName":"都市","categoryId":"1491378937013934939","catCode":""},{"categoryName":"乡村","categoryId":"1491378946577965549","catCode":""},{"categoryName":"悬疑","categoryId":"1491378954651528010","catCode":""},{"categoryName":"职场","categoryId":"1491378964212388357","catCode":""}],
      //       areaList:[{"categoryName":"不限","categoryId":"","catCode":""},{"categoryName":"大陆","categoryId":"1491379100827595987","catCode":""},{"categoryName":"港台","categoryId":"1491379110098810153","catCode":""},{"categoryName":"其他","categoryId":"1491379132354989490","catCode":""}],
      //       sortList:[{"categoryName":"不限","categoryId":"","catCode":""},{"categoryName":"评分","categoryId":"1491381431106739628","catCode":""}],
      //       yearsList:[{"categoryName":"不限","categoryId":"","catCode":""},{"categoryName":"2017","categoryId":"1491379012225784408","catCode":""},{"categoryName":"2016","categoryId":"1491379022467222462","catCode":""},{"categoryName":"2015","categoryId":"1491379029786312642","catCode":""},{"categoryName":"2014","categoryId":"1491379036721390037","catCode":""},{"categoryName":"2013","categoryId":"1491379045610100702","catCode":""},{"categoryName":"2012","categoryId":1491379051523137001,"catCode":""},{"categoryName":"2011","categoryId":"1491379058618954028","catCode":""},{"categoryName":"2010","categoryId":"1491379067747806281","catCode":""},{"categoryName":"00年代","categoryId":"1491379084818803444","catCode":""},{"categoryName":"更早","categoryId":"1491379092395105697","catCode":""}]
      //   };
      console.log('客户端返回筛选结果:' + jsonData.code);

      if (jsonData.code == 200) {
        console.log(jsonData.data.categoryList[0].dimensionMap.contentList);
        sessionStorage.setItem('catCode', this.catCode);
        this.dimensionMap = jsonData.data.categoryList[0].dimensionMap;
        this.dimensionMap.contentList.unshift({
          categoryName: '不限',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.areaList.unshift({
          categoryName: '地区',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.sortList.unshift({
          categoryName: '排序',
          categoryId: '',
          catCode: ''
        });
        this.dimensionMap.yearsList.unshift({
          categoryName: '年份',
          categoryId: '',
          catCode: ''
        });
        if (this.dimensionMap.yearsList.length > 7) {
          this.whiteSpace[2] = 4;
        } else if (this.dimensionMap.areaList.length > 7) {
          this.whiteSpace[1] = 4;
        } else if (this.dimensionMap.sortList.length > 7) {
          this.whiteSpace[3] = 4;
        }
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
        this.dimensionMap.contentList[3] = this.dimensionMap.contentList.splice(
          xh,
          1,
          this.dimensionMap.contentList[3]
        )[0];
        console.log(
          '当前筛选的栏目名称:' + this.dimensionMap.contentList[3].categoryName
        );
        this.$nextTick(function () {
          let _name = this.dimensionMap.contentList[3].categoryName;
          $('.filterLocal li')
            .eq(3)
            .removeClass('hover');
          $('.filterYear ul').removeClass('hover');
          $('.filterSort ul').removeClass('hover');
          $('.filterType ul').addClass('hover');
          $('.filterType li')
            .eq(3)
            .text(_name)
            .addClass('hover');
          setTimeout(() => {
            this.gather++;
            _this.$lazyImages.loadImage();
          }, 0);
        });
      }
    },
    sortDefault () {
      if (this.col == 0) {
        if (
          $('.filterType li')
            .eq(3)
            .text() == '不限'
        ) {
          $('.filterType li')
            .eq(3)
            .text('类型');
        } else if (
          $('.filterType li')
            .eq(3)
            .text() == '类型'
        ) {
          $('.filterType li')
            .eq(3)
            .text('不限');
        }
      } else if (this.col == 1) {
        if (
          $('.filterLocal li')
            .eq(3)
            .text() == '不限'
        ) {
          $('.filterLocal li')
            .eq(3)
            .text('地区');
        } else if (
          $('.filterLocal li')
            .eq(3)
            .text() == '地区'
        ) {
          $('.filterLocal li')
            .eq(3)
            .text('不限');
        }
      } else if (this.col == 2) {
        if (
          $('.filterYear li')
            .eq(3)
            .text() == '不限'
        ) {
          $('.filterYear li')
            .eq(3)
            .text('年份');
        } else if (
          $('.filterYear li')
            .eq(3)
            .text() == '年份'
        ) {
          $('.filterYear li')
            .eq(3)
            .text('不限');
        }
      } else if (this.col == 3) {
        if (
          $('.filterSort li')
            .eq(3)
            .text() == '默认'
        ) {
          $('.filterSort li')
            .eq(3)
            .text('排序');
        } else if (
          $('.filterSort li')
            .eq(3)
            .text() == '排序'
        ) {
          $('.filterSort li')
            .eq(3)
            .text('默认');
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
        $('.filterType ul').addClass('hover');
        $('.filterType li')
          .eq(3)
          .addClass('hover');
      } else if (this.col == 1) {
        $('.filterLocal ul').addClass('hover');
        $('.filterLocal li')
          .eq(3)
          .addClass('hover');
      } else if (this.col == 2) {
        $('.filterYear ul').addClass('hover');
        $('.filterYear li')
          .eq(3)
          .addClass('hover');
      } else if (this.col == 3) {
        $('.filterSort ul').addClass('hover');
        $('.filterSort li')
          .eq(3)
          .addClass('hover');
      }
    },
    removeCss () {
      if (this.col == 0) {
        $('.filterType ul').removeClass('hover');
        $('.filterType li')
          .eq(3)
          .removeClass('hover');
      } else if (this.col == 1) {
        $('.filterLocal ul').removeClass('hover');
        $('.filterLocal li')
          .eq(3)
          .removeClass('hover');
      } else if (this.col == 2) {
        $('.filterYear ul').removeClass('hover');
        $('.filterYear li')
          .eq(3)
          .removeClass('hover');
      } else if (this.col == 3) {
        $('.filterSort ul').removeClass('hover');
        $('.filterSort li')
          .eq(3)
          .removeClass('hover');
      }
    },
    TurnDown () {
      let t1 = null;
      let _tem = '';
      let _content = '';
      if (this.col == 0) {
        if (this.dimensionMap.contentList.length >= 7) {
          // 移除顶部元素增加到最后
          t1 = this.dimensionMap.contentList.shift();
          this.dimensionMap.contentList.push(t1);
          _content = $('.filterType li')
            .eq(4)
            .text();
          if (_content == '类型') {
            $('.filterType li')
              .eq(3)
              .text('不限');
          } else {
            $('.filterType li')
              .eq(3)
              .text(_content);
          }
        } else {
          // 当筛选条件不足7个的时候
          if (
            $('.filterType li')
              .eq(4)
              .text().length == 0
          ) {
            // 向下移动的时候判断有没有，没有返回
            return;
          }
          $('.filterType li')
            .eq(3)
            .removeClass('hover');
          _tem = $('.filterType li:first')
            .remove()
            .text();
          if (_tem.length > 0) {
            // 将移除的元素放入移除数组中
            this.removeList.type.push(_tem);
          }
          let _name = '';
          if (this.removeList.type.length > 0) {
            // 判断移除数组中有没有值,有的话需赋值给li
            _name = this.removeList.type.pop();
          }
          $('.filterType ul').append(
            "<li style='height:50px;line-height:50px;text-align:center;'>" +
              _name +
              '</li>'
          );
          $('.filterType li')
            .eq(3)
            .addClass('hover');
          _content = $('.filterType li')
            .eq(3)
            .text();
          if (_content == '类型') {
            $('.filterType li')
              .eq(3)
              .text('不限');
          } else {
            $('.filterType li')
              .eq(3)
              .text(_content);
          }
        }
      } else if (this.col == 1) {
        if (this.dimensionMap.areaList.length >= 7) {
          if (this.whiteSpace[1] == 0) {
            // 当筛选条件铺满li的时候就不需要再做处理了
            t1 = this.dimensionMap.areaList.shift();
            this.dimensionMap.areaList.push(t1);
            _content = $('.filterLocal li')
              .eq(4)
              .text();
            if (_content == '地区') {
              // 将地区转不限
              $('.filterLocal li')
                .eq(3)
                .text('不限');
            } else {
              $('.filterLocal li')
                .eq(3)
                .text(_content);
            }
            return;
          }
          $('.filterLocal li')
            .eq(3)
            .removeClass('hover');
          $('.filterLocal li:first').remove();
          this.whiteSpace[1] = this.whiteSpace[1] - 1; // 筛选条件需要上移3个单位
          //  t1 =  this.dimensionMap.areaList.shift();
          //  this.dimensionMap.areaList.push(t1);
          $('.filterLocal li')
            .eq(3)
            .addClass('hover');
        } else {
          // 当筛选条件不足7个的时候
          if (
            $('.filterLocal li')
              .eq(4)
              .text().length == 0
          ) {
            return;
          }
          $('.filterLocal li')
            .eq(3)
            .removeClass('hover');
          _tem = $('.filterLocal li:first')
            .remove()
            .text();
          if (_tem.length > 0) {
            this.removeList.local.push(_tem);
          }
          let _name = '';
          if (this.removeList.local.length > 0) {
            _name = this.removeList.local.pop();
          }
          $('.filterLocal ul').append(
            "<li style='height:50px;line-height:50px;text-align:center;'>" +
              _name +
              '</li>'
          );
          $('.filterLocal li')
            .eq(3)
            .addClass('hover');
          _content = $('.filterLocal li')
            .eq(3)
            .text();
          if (_content == '地区') {
            $('.filterLocal li')
              .eq(3)
              .text('不限');
          } else {
            $('.filterLocal li')
              .eq(3)
              .text(_content);
          }
        }
      } else if (this.col == 2) {
        if (this.dimensionMap.yearsList.length >= 7) {
          if (this.whiteSpace[2] == 0) {
            // 当筛选条件铺满li的时候就不需要再做处理了
            t1 = this.dimensionMap.yearsList.shift();
            this.dimensionMap.yearsList.push(t1);
            _content = $('.filterYear li')
              .eq(4)
              .text();
            if (_content == '年份') {
              $('.filterYear li')
                .eq(3)
                .text('不限');
            } else {
              $('.filterYear li')
                .eq(3)
                .text(_content);
            }
            return;
          }
          $('.filterYear li')
            .eq(3)
            .removeClass('hover');
          $('.filterYear li:first').remove();
          this.whiteSpace[2] = this.whiteSpace[2] - 1; // 筛选条件需要上移3个单位
          //  t1 =  this.dimensionMap.yearsList.shift();
          //  this.dimensionMap.yearsList.push(t1);
          // console.log("down:"+this.whiteSpace[2]);
          $('.filterYear li')
            .eq(3)
            .addClass('hover');
        } else {
          if (
            $('.filterYear li')
              .eq(4)
              .text().length == 0
          ) {
            return;
          }
          $('.filterYear li')
            .eq(3)
            .removeClass('hover');
          _tem = $('.filterYear li:first')
            .remove()
            .text();
          if (_tem.length > 0) {
            this.removeList.year.push(_tem);
          }
          let _name = '';
          if (this.removeList.year.length > 0) {
            _name = this.removeList.year.pop();
          }
          $('.filterYear ul').append(
            "<li style='height:50px;line-height:50px;text-align:center;'>" +
              _name +
              '</li>'
          );
          $('.filterYear li')
            .eq(3)
            .addClass('hover');
          _content = $('.filterYear li')
            .eq(3)
            .text();
          if (_content == '年份') {
            $('.filterYear li')
              .eq(3)
              .text('不限');
          } else {
            $('.filterYear li')
              .eq(3)
              .text(_content);
          }
        }
      } else if (this.col == 3) {
        if (this.dimensionMap.sortList.length >= 7) {
          if (this.whiteSpace[3] == 0) {
            // 当筛选条件铺满li的时候就不需要再做处理了
            t1 = this.dimensionMap.sortList.shift();
            this.dimensionMap.sortList.push(t1);
            _content = $('.filterSort li')
              .eq(4)
              .text();
            if (_content == '排序') {
              $('.filterSort li')
                .eq(3)
                .text('默认');
            } else {
              $('.filterSort li')
                .eq(3)
                .text(_content);
            }
            return;
          }
          $('.filterSort li')
            .eq(3)
            .removeClass('hover');
          $('.filterSort li:first').remove();
          this.whiteSpace[3] = this.whiteSpace[3] - 1; // 筛选条件需要上移3个单位
          //  t1 =  this.dimensionMap.sortList.shift();
          //  this.dimensionMap.sortList.push(t1);
          $('.filterSort li')
            .eq(3)
            .addClass('hover');
        } else {
          if (
            $('.filterSort li')
              .eq(4)
              .text().length == 0
          ) {
            return;
          }
          $('.filterSort li')
            .eq(3)
            .removeClass('hover');
          _tem = $('.filterSort li:first')
            .remove()
            .text();
          if (_tem.length > 0) {
            this.removeList.sort.push(_tem);
          }
          let _name = '';
          if (this.removeList.sort.length > 0) {
            _name = this.removeList.sort.pop();
          }
          $('.filterSort ul').append(
            "<li style='height:50px;line-height:50px;text-align:center;'>" +
              _name +
              '</li>'
          );
          $('.filterSort li')
            .eq(3)
            .addClass('hover');
          _content = $('.filterSort li')
            .eq(3)
            .text();
          if (_content == '排序') {
            $('.filterSort li')
              .eq(3)
              .text('默认');
          } else {
            $('.filterSort li')
              .eq(3)
              .text(_content);
          }
        }
      }
    },
    TurnUp () {
      let t2 = null;
      let _tem = '';
      let _content = '';
      if (this.col == 0) {
        if (this.dimensionMap.contentList.length >= 7) {
          t2 = this.dimensionMap.contentList.pop();
          this.dimensionMap.contentList.unshift(t2);
          _content = $('.filterType li')
            .eq(2)
            .text();
          if (_content == '类型') {
            $('.filterType li')
              .eq(3)
              .text('不限');
          } else {
            $('.filterType li')
              .eq(3)
              .text(_content);
          }
        } else {
          // 当元素小于7个的时候
          if (
            $('.filterType li')
              .eq(2)
              .text().length == 0
          ) {
            return;
          }

          $('.filterType li')
            .eq(3)
            .removeClass('hover');
          _tem = $('.filterType li:last')
            .remove()
            .text();
          if (_tem.length > 0) {
            // 移除元素并push进移除数组
            this.removeList.type.push(_tem);
          }
          let _name = '';
          if (this.removeList.type.length > 0) {
            // 拿最后一个数组最后一个填充li
            _name = this.removeList.type.pop();
          }
          $('.filterType ul').prepend(
            "<li style='height:50px;line-height:50px;text-align:center;'>" +
              _name +
              '</li>'
          );
          $('.filterType li')
            .eq(3)
            .addClass('hover');
          _content = $('.filterType li')
            .eq(3)
            .text();
          if (_content == '类型') {
            $('.filterType li')
              .eq(3)
              .text('不限');
          } else {
            $('.filterType li')
              .eq(3)
              .text(_content);
          }
        }
      } else if (this.col == 1) {
        if (this.dimensionMap.areaList.length >= 7) {
          if (
            $('.filterLocal li')
              .eq(2)
              .text().length == 0
          ) {
            return;
          } // 判断上一个是否为空
          if (
            this.whiteSpace[1] == 1 ||
            ($('.filterLocal li')
              .eq(0)
              .text().length == 0 &&
              $('.filterLocal li')
                .eq(2)
                .text().length > 0)
          ) {
            // 判断顶部的li是否已经被填充完
            this.whiteSpace[1] += 1;
            $('.filterLocal li')
              .eq(3)
              .removeClass('hover');
            $('.filterLocal ul').prepend(
              "<li style='height:50px;line-height:50px;text-align:center;'></li>"
            );
            $('.filterLocal li')
              .eq(3)
              .addClass('hover');
          } else {
            t2 = this.dimensionMap.areaList.pop();
            this.dimensionMap.areaList.unshift(t2);
            _content = $('.filterLocal li')
              .eq(2)
              .text();
            if (_content == '地区') {
              $('.filterLocal li')
                .eq(3)
                .text('不限');
            } else {
              $('.filterLocal li')
                .eq(3)
                .text(_content);
            }
          }
        } else {
          // 当筛选条件不足7个的时候
          if (
            $('.filterLocal li')
              .eq(2)
              .text().length == 0
          ) {
            return;
          }
          $('.filterLocal li')
            .eq(3)
            .removeClass('hover');
          _tem = $('.filterLocal li:last')
            .remove()
            .text();
          if (_tem.length > 0) {
            this.removeList.local.push(_tem);
          }
          let _name = '';
          if (this.removeList.local.length > 0) {
            _name = this.removeList.local.pop();
          }
          $('.filterLocal ul').prepend(
            "<li style='height:50px;line-height:50px;text-align:center;'>" +
              _name +
              '</li>'
          );
          $('.filterLocal li')
            .eq(3)
            .addClass('hover');
          _content = $('.filterLocal li')
            .eq(3)
            .text();
          if (_content == '地区') {
            $('.filterLocal li')
              .eq(3)
              .text('不限');
          } else {
            $('.filterLocal li')
              .eq(3)
              .text(_content);
          }
        }
      } else if (this.col == 2) {
        if (this.dimensionMap.yearsList.length >= 7) {
          if (
            $('.filterYear li')
              .eq(2)
              .text().length == 0
          ) {
            return;
          }
          if (
            this.whiteSpace[2] == 1 ||
            ($('.filterYear li')
              .eq(0)
              .text().length == 0 &&
              $('.filterYear li')
                .eq(2)
                .text().length > 0)
          ) {
            this.whiteSpace[2] += 1;
            $('.filterYear li')
              .eq(3)
              .removeClass('hover');
            $('.filterYear ul').prepend(
              "<li style='height:50px;line-height:50px;text-align:center;'></li>"
            );
            $('.filterYear li')
              .eq(3)
              .addClass('hover');
          } else {
            t2 = this.dimensionMap.yearsList.pop();
            this.dimensionMap.yearsList.unshift(t2);
            _content = $('.filterYear li')
              .eq(2)
              .text();
            if (_content == '年份') {
              $('.filterYear li')
                .eq(3)
                .text('不限');
            } else {
              $('.filterYear li')
                .eq(3)
                .text(_content);
            }
          }
        } else {
          if (
            $('.filterYear li')
              .eq(2)
              .text().length == 0
          ) {
            return;
          }
          $('.filterYear li')
            .eq(3)
            .removeClass('hover');
          _tem = $('.filterYear li:last')
            .remove()
            .text();
          if (_tem.length > 0) {
            this.removeList.year.push(_tem);
          }
          let _name = '';
          if (this.removeList.year.length > 0) {
            _name = this.removeList.year.pop();
          }
          $('.filterYear ul').prepend(
            "<li style='height:50px;line-height:50px;text-align:center;'>" +
              _name +
              '</li>'
          );
          $('.filterYear li')
            .eq(3)
            .addClass('hover');
          _content = $('.filterLocal li')
            .eq(3)
            .text();
          if (_content == '年份') {
            $('.filterLocal li')
              .eq(3)
              .text('不限');
          } else {
            $('.filterLocal li')
              .eq(3)
              .text(_content);
          }
        }
      } else if (this.col == 3) {
        if (this.dimensionMap.sortList.length >= 7) {
          if (
            $('.filterSort li')
              .eq(2)
              .text().length == 0
          ) {
            return;
          }
          if (
            this.whiteSpace[3] == 1 ||
            ($('.filterSort li')
              .eq(0)
              .text().length == 0 &&
              $('.filterSort li')
                .eq(2)
                .text().length > 0)
          ) {
            this.whiteSpace[3] += 1;
            $('.filterSort li')
              .eq(3)
              .removeClass('hover');
            $('.filterSort ul').prepend(
              "<li style='height:50px;line-height:50px;text-align:center;'></li>"
            );
            $('.filterSort li')
              .eq(3)
              .addClass('hover');
          } else {
            t2 = this.dimensionMap.sortList.pop();
            this.dimensionMap.sortList.unshift(t2);
            _content = $('.filterSort li')
              .eq(2)
              .text();
            if (_content == '排序') {
              $('.filterSort li')
                .eq(3)
                .text('默认');
            } else {
              $('.filterSort li')
                .eq(3)
                .text(_content);
            }
          }
        } else {
          if (
            $('.filterSort li')
              .eq(2)
              .text().length == 0
          ) {
            return;
          }
          $('.filterSort li')
            .eq(3)
            .removeClass('hover');
          _tem = $('.filterSort li:last')
            .remove()
            .text();
          if (_tem.length > 0) {
            this.removeList.sort.push(_tem);
          }
          let _name = '';
          if (this.removeList.sort.length > 0) {
            _name = this.removeList.sort.pop();
          }
          $('.filterSort ul').prepend(
            "<li style='height:50px;line-height:50px;text-align:center;'>" +
              _name +
              '</li>'
          );
          $('.filterSort li')
            .eq(3)
            .addClass('hover');
          _content = $('.filterSort li')
            .eq(3)
            .text();
          if (_content == '排序') {
            $('.filterSort li')
              .eq(3)
              .text('默认');
          } else {
            $('.filterSort li')
              .eq(3)
              .text(_content);
          }
        }
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
      let reqStr = '';
      let t1 = $('.filterType li')
        .eq(3)
        .text();
      let t2 = $('.filterLocal li')
        .eq(3)
        .text();
      let t3 = $('.filterYear li')
        .eq(3)
        .text();
      let t4 = $('.filterSort li')
        .eq(3)
        .text();
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
    }
  }
};
</script>
