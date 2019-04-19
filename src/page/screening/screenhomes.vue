<template>
  <div class="box">
    <div class="bg"></div>
    <div class="historical">
      <div class="tit"></div>
      <!-- :class="{'active':isActive==true}" -->
      <div class="content" id="d1" >
        <div class="writediv" id="b1" :class="{'changebac':isActive==true}"></div>
        <ul class="cul" id="c0">
          <li  class="text_n" v-for="(item,index) in topList.contentList"  :key="item.id" :id="('T'+index)">
            {{item.categoryName}}
          </li>
        </ul>
      </div>
      <!-- :class="{'active':isActive ==false}" -->
      <div class="content right_con" id="d2">
        
        <div class="writediv" id="b2" :class="{'changebac':isActive ==false}"></div>
        <ul class="cul"  id="c1">
          <li  class="text_n" v-for="(item,index) in topList.areaList"  :key="item.id" :id="('j'+index)" >
            {{item.categoryName}}
          </li>
        </ul>
      </div>
    </div>
    <div class="changebacss"></div>
    <keyDo v-on:listenKeyCode="keyCode" v-if="isShow" ref="keyDo"></keyDo>
    <SCenter ref="SCenter" v-on:Center="Center" :jsonUrl="urls"></SCenter>
</div>
</template>
<style scoped="historical">
.bg{
    width: 1280px;
    height: 720px;
    background: url('../../../static/images/history/1761.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    z-index: -111;
  }
  .box{
    width: 1280px;
    height: 720px;
    overflow: hidden;
    position:relative;
  }
  .box:after{
    clear: both;
    content: '';
    display: block;
  }
  .historical{
    width: 439px;
    height: 720px;
    background: url('../../../static/images/Scroll/663.png') no-repeat;
    border-top: 1px solid #A8977C;
    float: left;
  }
  .tit{
    width: 254px;
    height: 58px;
    background: url('../../../static/images/Scroll/1768.png') no-repeat;
    background-size: 100% 100%;
  }
  .content{
    float: left;
    width: 135px;
    height: 375px;
    background: url('../../../static/images/Scroll/1181.png') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    margin-top: 146px;
    margin-left: 56px;
  }
  .content.right_con{
    float: left;
    width: 135px;
    height: 375px;
    position: relative;
    margin-top: 146px;
    margin-left: 27px;
    overflow: hidden;
  }
  .content ul{
    width: 100%;
    position: absolute;
    left: 0;
    top: 210px;
  }
  .content ul .text_n{
    color: rgba(255,255,255,0.7);
    width: 100%;
    height: 52px;
    font-size: 20px;
    text-align: center;
    line-height: 70px;
  }
  .content .writediv{
    width: 100%;
    height: 68px;
    background: url(../../../static/images/history/1881.png) no-repeat;
    background-size: 100% 100%; 
    position: absolute;
    left:0;
    top: 210px;
  }

  .content .changebac{
    width: 100%;
    height: 68px;
    background: url(../../../static/images/history/1762.png) no-repeat;
    background-size: 100% 100%; 
    position: absolute;
    left:0;
    top: 210px;
    border-radius: 15px;
  }

.changebacss{
    width: 8px;
    height: 69px;
    background: url(../../../static/images/Scroll/1.png) no-repeat;
    background-size: 100% 100%; 
    position: absolute;
    left: 363px;
    top: 414px;
    border-radius: 15px;
  }
  .content.active{
    background: rgba(255,255,255,0.4);
    border: 1px solid white;
    border-radius: 15px;
  }
</style>

<script>
  import SCenter from '../screening/screenCenter.vue'
  import c from '../../js/common.js'
  import {HTTPUtil as api} from '../../fetch/api.js'
  // import $ from '../../../static/jquery/jquery.min.js'
  export default {
    props:['jsonUrl','bp'],
    data() {
      return {
        num:0,
        urls:[],
        op:0,
        name:"Screening",
        isShow:true,
        isActive:true,
        itemNo:0,
        top:"",
        topList:''
      }
    },
    activated(){
      if (this.$route.meta.keep) {
        console.log('缓存页面');
      } else {
        this.isShow = true;
        this.isActive = true;
        this.op = 0;
        this.itemNo = 0;
        let url = api.getFilter('game');
        var that = this;
        api.jsonp(url,(json)=> {
          that.top = json.data.categoryList;
          let jsons = that.top[0].dimensionMap.contentList;
          that.topList = that.top[0].dimensionMap;
          
          if (that.jsonUrl) {
            for (let index = 0; index < jsons.length; index++) {
              if (that.jsonUrl == jsons[index].categoryId) {
                that.num = index;
              }
            }
          }
          that.getJsons();
        });
      }
    },
    created() {
      let url = api.getFilter('game');
      var that = this;
      api.jsonp(url,(json)=> {
        that.top = json.data.categoryList;
        let jsons = that.top[0].dimensionMap.contentList;
        that.topList = that.top[0].dimensionMap;
        if (that.jsonUrl) {
          for (let index = 0; index < jsons.length; index++) {
            if (that.jsonUrl == jsons[index].categoryId) {
              that.num = index;
              
            }
          }
        }
        
        that.getJsons();
      });
    },
    mounted() {
    },
    updated() {
      var C = document.getElementById('c0');
      var C1 = document.getElementById('c1');
      C.style.marginTop =  - (this.num) * 52 + "px";
      C1.style.marginTop =  - (this.itemNo) * 52 + "px";
    },
    methods: {
      keyCode(kc) {
        if (kc == "KeyBack") {
          this.back();
        } else if (kc == "right") {
          this.right();
        } else if (kc == "down") {
          this.down();
        } else if (kc == "up") {
          this.up();
        } else if (kc == "left") {
          this.left();
        }
      },
      Center(pos,url,actor,clear){
//        右边内容
        if (pos == 'left'){
          this.isShow = true;
          this.isActive = false;
        }
        if(pos =='json'){
          this.sendJson();
        }
      },
      back() {
        // this.isShow = false;
        if(this.$route.query.jsonUrl!=undefined){
          console.log("详情页从外部打开");
          yh.back();
        }else{
          this.$router.push({ path:'/jx/index'});
        }
      },
      left(){
        if(this.op ==1){
          this.isActive = true;
         this.op--;
        }
      },
      right(){
        if(this.op ==0){
          this.isActive = false;
          this.op++;
        }else {
          if(!this.urls.length)return;
          this.isShow = false;
          console.log(this.$refs.SCenter);
          this.isActive = null;
          this.$refs.SCenter.updateStast("right");
        }
      },
      getJsons(){
        var that = this;
        console.log(this.top);
        let urls = api.getFilterResult(
          this.top[0].dimensionMap.contentList[this.num].categoryId,
          this.top[0].dimensionMap.areaList[this.itemNo].categoryId,
          0,
          50,
          this.top[0].catCode
        );
        console.log(urls);
        api.jsonp(urls,function(json){
          that.urls = json.data.assetList;
          if (that.urls.length==0) {
            that.$refs.SCenter.change(false);
          }else{
            that.$refs.SCenter.change(true);
          }
        })
      },
      down() {
        var C = document.getElementById('c0');
        var C1 = document.getElementById('c1');
        if(this.op == 0){
          if(this.num>=this.top[0].dimensionMap.contentList.length-1){
            return;
          }else{
            this.urls = [];
            this.num++;
            this.itemNo = 0;
            C.style.marginTop =  - (this.num) * 52 + "px";
            C1.style.marginTop =  - (this.itemNo) * 52 + "px";
            this.getJsons();
          }
          // $('#c'+this.op).css({'transition':'all 0.3s','transform':'translateY(-'+ 52*this.num +'px)'});
          // $('#c'+(this.op+1)).css({'transition':'all 0.3s','transform':'translateY(-'+ 52*this.itemNo +'px)'});
        }else {
            if (this.itemNo>=this.top[0].dimensionMap.areaList.length-1){
              return
            }else{
              this.urls = [];
              this.itemNo++;
              C1.style.marginTop =  - (this.itemNo) * 52 + "px";
              this.getJsons();
            }
            // $('#c'+this.op).css({'transition':'all 0.3s','transform':'translateY(-'+ 52*this.itemNo +'px)'})
        }
      },
      up(){
        var C = document.getElementById('c0');
        var C1 = document.getElementById('c1');
        if(this.op ===0){
          if (this.num<=0) {
            return;
          }else{
            this.urls = [];
            this.num--;
            this.itemNo = 0;
            C.style.marginTop =  - (this.num) * 52 + "px";
            C1.style.marginTop =  - (this.itemNo) * 68 + "px";
          }
          this.getJsons();
        }else {
          if (this.itemNo<=0){
            return
          }else{
            this.urls = [];
            this.itemNo--;
            C1.style.marginTop =  - (this.itemNo) * 52 + "px";
            this.getJsons();
          }
        }
      },
      updateStast(bl,pos){
        this.isShow = bl;
        this.pos = pos;
      }
    },
    beforeRouteLeave(to ,from , next){
      if (to.name=="index") {
        from.meta.keep = false;
      }else{
        from.meta.keep = true;
      }
      next();
    },
    //  beforeRouteLeave(to ,from , next){
    //     const toRoute = to.path;
    //     const fromeRoute = from.path;
    //     const h = JSON.parse(sessionStorage.getItem(toRoute));
    //     if (to.name=="index") {
    //       from.meta.keepAlive = false;
    //       this.$destroy();
    //     }else{
    //       if (!from.meta.keepAlive) {
    //         from.meta.keepAlive = true;
    //       }
    //     }
    //     if (h&&h.history) {
    //         this.$destroy();
    //         next();
    //     } else {
    //         next();
    //     }
    //     next();
    // },
    
components: {
      SCenter
    },
  }
</script>
