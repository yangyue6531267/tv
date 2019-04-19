<!-- 搜索页 ----wzh  -->
<template>
  <div class="search">
    <div class="search-left">
      <keyboard ref="kbc" v-on:pressDown="keepDo"></keyboard>
    </div>
    <div class="search-right">
      <template v-if="isHotSearch">
        <div class="hot-search">
          <div class="hot-search-top">
            <span>大家都再搜：</span>
            <ul>
              <li>
                <div>关键词1</div>
              </li>
              <li>
                <div>关键词2</div>
              </li>
              <li>
                <div>关键词3</div>
              </li>
            </ul>
          </div>
          <div class="hot-search-content">
            <h3>热门榜单</h3>
            <ul>
              <template v-for="(item,index) in this.recommendData">
                <li :key="index" :id="('list-index-'+index)" :class="{'active':index===hotNum}" v-if="index<3">
                  <img :src=(item.elementImg) alt="">
                </li>
              </template>
            </ul>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="user-search" v-if="haveSearchData">
          <div class="user-search-top">
            <ul>
              <li>
                <div>
                  <p>巅峰对决</p><span>(10)</span>
                </div>
              </li>
              <li>
                <div>
                  <p>新游速讯</p><span>(10)</span>
                </div>
              </li>
              <li>
                <div>
                  <p>主播解说</p><span>(10)</span>
                </div>
              </li>
              <li>
                <div>
                  <p>电竞综艺</p><span>(10)</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="user-search-content">
            <div class="next-L" v-show="pageNum>0"></div>
            <div class="next-R" v-show="pageNum<total&&pageNum!=total-1"></div>
            <ul>
              <li v-for="(item,index) in this.searchData" :key="index" :id="('list-index-'+index)" :class="{'active':index===searchNum}">
                <img src="../../assets/search/img_230x130.png" alt="" border="0">
                <span>{{item.elementName}}</span>
              </li>
            </ul>
          </div>
          <div class="current"><span>{{this.pageNum+1}}/{{total}}</span> </div>
        </div>
        <div class="noData" v-else>无搜索结果 (╥﹏╥)</div>
      </template>
    </div>
    <keyDo ref="keydo" v-on:listenKeyCode="keyCode" v-if="isShow"></keyDo>
  </div>
</template>

<style scoped> 
  .search {
    width: 1280px;
    height: 720px;
    background: url("../../assets/search/search-bg.png");
    overflow:hidden
  }

  .search-left {
    width: 380px;
    float: left;
  }

  .search-right {
    width: 900px;
    height: 720px;
    padding-left: 380px
  }

  .hot-search {
    font-size: 20px;
    position: relative;
  }

  .hot-search .hot-search-top {
    position: absolute;
    top: 60px;
    left: 20px;
    width: 800px;

  }

  .hot-search-top span {
    float: left;
    line-height: 42px;
  }

  .hot-search-top ul li {
    float: left;
    width: 120px;
    height: 42px;
    margin-left: 20px;
    background-color: #5C8AC0;
    line-height: 42px;
    text-align: center;
    transform: skewX(-30deg);
  }

  .hot-search-top ul li div {
    transform: skewx(30deg);
  }

  .hot-search .hot-search-content {
    width: 800px;
    height: 720px;
    overflow: hidden;
    position: absolute;
    top: 140px;
    left: 20px;
  }

  .hot-search-content h3 {
    font-weight: 400;
    font-size: 20px;
    opacity: 0.4;
  }

  .hot-search-content ul {
    width: 760px;
    margin-top: 60px;
    margin-left: 30px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;
  }

  .hot-search-content ul li {
    width: 215px;
    height: 325px;
    /* margin-left: 25px; */
    text-align: center;
  }

  .hot-search-content ul li img {
    width: 100%;
    height: 100%;
    /* background: url("../../assets/search/img_215x325.png") no-repeat; */
    background-size: cover;
  }

  .hot-search-content ul li.active {
    width: 260px;
    height: 395px;
  }

  .hot-search .current {
    position: absolute;
    top: 640px;
    right: 40px;
  }

  .user-search {
    font-size: 20px;
    position: relative;
  }

  .user-search .user-search-top {
    position: absolute;
    top: 50px;
    left: 90px;
    width: 800px;
  }

  .user-search-top ul li {
    float: left;
    width: 120px;
    height: 57px;
    margin-left: 20px;
    background-color: #5C8AC0;
    text-align: center;
    transform: skewX(-25deg);
  }

  .user-search-top ul li div {
    transform: skewx(25deg);
  }

  .user-search .current {
    position: absolute;
    top: 640px;
    right: -12px;
    width: 120px;
    height: 58px;
    margin-left: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    line-height: 58px;
    text-align: center;
    transform: skewX(-20deg);
  }

  .user-search .current span {
    transform: skewX(20deg);
  }

  .user-search .next-L {
    width: 66px;
    height: 66px;
    background: url('../../assets/search/icons_dark_next.png');
    position: absolute;
    top: 225px;
    left: -60px;
  }

  .user-search .next-R {
    width: 66px;
    height: 66px;
    background: url('../../assets/search/icons_dark_next.png');
    position: absolute;
    top: 225px;
    right: -50px;
    transform: rotate(180deg)
  }

  .user-search-content {
    position: absolute;
    top: 130px;
    left: 60px;
  }

  .user-search-content ul {
    width: 780px;
    height: 500px;
    display: flex;
    flex-flow: row wrap;
    overflow: hidden;
  }

  .user-search-content ul li {
    text-align: center;
    width: 231px;
    height: 130px;
    margin-left: 20px;
    margin-top: 30px;
  }

  .user-search-content ul li.active {
    background: url("../../assets/detail/img_230x130_active.png");
    background-size: cover;
  }

  .user-search-content ul li img {
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  .noData {
    font-size: 30px;
    position: relative;
    top: 360px;
    left: 340px
  }
</style>

<script>
  import keyboard from './keyboard.vue';
  import c from '../../js/common.js';
  import {
    HTTPUtil as api
  } from "../../fetch/api.js";
  import {
    mapGetters
  } from 'vuex';
  export default {
    name: 'search',
    data() {
      return {
        isShow: false,
        isHotSearch: true,
        hotNum: -1, //推荐资产编号
        searchNum: -1, //搜索资产编号
        keyWord: '',
        recommendData: [],
        searchData: [],
        haveSearchData: true,
        total: 0, //搜索结果总页数
        pageNum: 0, //当前搜索页码
        pageIndex:0,
      }
    },
    components: {
      keyboard
    },
    created() {
      this.getSearchRecommend();
    },
    activated() {
      if(this.$route.params.type == 'search'){
        // 组件被缓存时需要重新进行初始化
        this.isShow = false;
        this.isHotSearch= true;
        this.$refs.kbc.keyword = '';
        this.$refs.kbc.getKeyListen(0);
      }
    },
    computed: {
      ...mapGetters([
        'behindParams',
      ])
    },
    watch: {
      keyWord() {
        if (this.keyWord.length === 0) {
          this.isHotSearch = true
        } else {
          this.isHotSearch = false
          this.pageNum = 0;
          this.pageIndex = 0;
          this.getSearchData(this.keyWord, this.pageIndex)
        }
      }

    },
    methods: {
      getSearchRecommend() {
        console.log("请求搜索推荐数据");
        const url = api.getSearchHot + this.behindParams
        api.jsonp(url, (res) => {
          this.recommendData = res.data.hotAssetList
        })
      },
      getSearchData(keyWord, pageIndex) {
        console.log("");
        const url = api.getSearchData(keyWord, pageIndex)
        api.jsonp(url, (res) => {
          console.log(res);
          if (res.data != null) {
            this.searchData = res.data[0].resultList
            if (res.data[0].resultNum <= 0) {
              this.haveSearchData = false;
            } else {
              this.haveSearchData = true;
            }
          } else {
            this.haveSearchData = false;
          }

          this.total = Math.ceil(res.data[0].resultNum / 9)
        })
      },
      keepDo(isShow, keyWord, position) {
        if (isShow) { //键值在左
          if (position === "search") {
            this.isHotSearch = false;
            this.keyWord = keyWord
          }
        } else { //键值向右
          this.isShow = true;
          if (this.isHotSearch) {
            this.hotNum = 0;
          } else {
            this.searchNum = 0;
          }
        }
      },
      keyCode(kc) {
        if (kc === "down") {
          this.down();
        } else if (kc === "up") {
          this.up();
        } else if (kc === "left") {
          this.left();
        } else if (kc === "right") {
          this.right();
        } else if (kc === "KeyEnter") {
          this.KeyEnter();
        } else if (kc === "KeyBack") {
          // this.KeyBack();
          this.isShow=false;
          this.hotNum=this.searchNum=-1
          this.$refs.kbc.getKeyListen();
        }
      },
      up() {
        if (this.isHotSearch) return;
        if(this.searchNum<=2){
          return
        } else {
          this.searchNum-=3;
        }
      },
      down() {
        if (this.isHotSearch) return;
        if (this.searchNum > this.searchData.length - 4) { //最后一行或下面无资产
              const num1 = Math.floor(this.searchData.length / 3) * 3;
              if (this.searchNum >= num1 || num1 === this.searchData.length) { //最后一行
              return
          } else { //倒数第二行，下面无资产
            this.searchNum = this.searchData.length - 1;
          }
        } else {
          this.searchNum+=3
        }
      },
      left() {
        if (this.isHotSearch) {
          if (this.hotNum === 0) {
            this.isShow = false;
            this.$refs.kbc.getKeyListen();
          }
          this.hotNum--
        } else { //搜索资产
          if ((this.searchNum) % 3 === 0) { //向左
            if (this.pageNum === 0) {  //第一页的最左边
              this.searchNum = -1;
              this.isShow = false;
              this.$refs.kbc.getKeyListen();
            } else {  //非第一页最左边
              this.pageNum--
              this.pageIndex-=9;
              this.getSearchData(this.keyWord, this.pageIndex)
              this.$nextTick(() => {
                this.searchNum = 0
              })
            }
          } else {
            this.searchNum--
          }
        }
      },
      right() {
        if (this.isHotSearch) {
          if (this.hotNum === 2) return
          this.hotNum++
        } else {  //搜索资产
          if ((this.searchNum + 1) % 3 === 0 && this.pageNum < this.total - 1) { //非最后一页最右边
            this.pageNum++
            this.pageIndex+=9;
            this.getSearchData(this.keyWord, this.pageIndex)
            this.$nextTick(() => {
              this.searchNum = 0
            })
          } else {
            if(this.pageNum===this.total-1&&this.searchNum===this.searchData.length-1) return; //最后一页最后一个
            this.searchNum++
          }
        }
      },
      KeyEnter() {
        let url = '';
        let layType = '';
        let elementType = '';
        c.setParentPageType('0201');
        c.setParentPageId('100-1');
        if(this.isHotSearch){
          localStorage.setItem('BI_recmd_id', 1);
          url = this.recommendData[this.hotNum].jsonUrl;
          layType = this.recommendData[this.hotNum].layout;
          elementType = this.recommendData[this.hotNum].elementType;
        }else{
          url = this.searchData[searchNum].jsonUrl;
          layType = this.searchData[searchNum].layout;
          elementType = this.searchData[searchNum].elementType;
        }
        c.routerSkip(url,elementType.toString(),layType,{type:'search'},this.$router);
      },
    }
  }
</script>