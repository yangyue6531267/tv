<template>
  <div class="box">
    <div class="bg"></div>
    <div class="historical">
      <div class="tit"></div>
      <div class="content active" id="d1">
        <div   id="b1" :class="{'writediv':isShow,'changebac':!isShow}" ></div>
        <div class="changebacss"></div>
        <ul class="cul" id="c0">
          <li class="text_n" id="jv">{{conten.acc}}</li>
          <li class="text_n" id="sc">{{conten.his}}</li>
        </ul>
      </div>
    </div>
    <keyDo v-on:listenKeyCode="keyCode" v-if="isShow" ref="keyDo"></keyDo>
    <hCenter ref="hCenter" v-on:Center="Center" v-on:itnum="takehistory" :jsonUrl="urls"
           v-on:getjson ='takeJson'></hCenter>
    <!-- <CFirm ref="CFirm" v-on:listernpopup="firm"></CFirm> -->
  </div>
</template>
<style scoped="historical">
  .box{
    width: 1280px;
    height: 720px;
    overflow: hidden;
  }
  .bg{
    width: 1280px;
    height: 720px;
    background: url('../../../static/images/history/1761.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    z-index: -111;
    
  }
  .box:after{
    clear: both;
    content: '';
    display: block;
  }
  .historical{
    width: 333px;
    height: 720px;
    background: url('../../../static/images/history/330.png') no-repeat;
    background-size: 100% 100%;
    border-top: 1px solid #A8977C;
    float: left;
  }
  .tit{
    width: 254px;
    height: 60px;
    background: url('../../../static/images/history/1768.png') no-repeat;
    background-size: 100% 100%;
  }
  .content{
    float: left;
    width: 135px;
    height: 375px;
    background: -webkit-linear-gradient(to bottom, rgba(255,255,255,0.01) 0%,rgba(255,255,255,0.2) 50%,rgba(255,255,255,0.01) 100%);
    background: linear-gradient(to bottom, rgba(255,255,255,0.01) 0%,rgba(255,255,255,0.2) 50%,rgba(255,255,255,0.01) 100%);
    position: relative;
    margin-top: 150px;
    margin-left: 92px;
  }
  .content.right_con{
    float: left;
    width: 114px;
    height: 70%;
    background: -webkit-linear-gradient(to bottom, rgba(255,255,255,0.01) 0%,rgba(255,255,255,0.2) 50%,rgba(255,255,255,0.01) 100%);
    background: linear-gradient(to bottom, rgba(255,255,255,0.01) 0%,rgba(255,255,255,0.2) 50%,rgba(255,255,255,0.01) 100%);
    position: relative;
    margin-top: 39px;
    margin-left: 2px;
    overflow: hidden;
  }
  .content ul{
    width: 100%;
    position: absolute;
    left: 0;
    top: 153px;
  }
  .content ul .text_n{
    color: rgba(255,255,255,0.7);
    width: 100%;
    height: 68px;
    font-size: 26px;
    text-align: center;
    line-height: 70px;
  }
  .content .writediv{
    width: 106%;
    height: 68px;
    background: url(../../../static/images/history/1762.png) no-repeat;
    background-size: 100% 100%; 
    position: absolute;
    left:-4px;
    top: 155px;
    border-radius: 15px;
  }
  .content .changebac{
   width: 106%;
    height: 68px;
    background: url(../../../static/images/Scroll/1769.png) no-repeat;
    background-size: 100% 100%; 
    position: absolute;
    left:-4px;
    top: 155px;
    border-radius: 15px;
  }
  .content .changebacss{
    width: 8%;
    height: 68px;
    background: url(../../../static/images/Scroll/1.png) no-repeat;
    background-size: 100% 100%; 
    position: absolute;
    left:148px;
    top: 155px;
    border-radius: 15px;
  }
  .content.active{
    background: rgba(255,255,255,0.4);
    border: 1px solid white;
    border-radius: 15px;

  }
</style>
<script>
  import { HTTPUtil as api } from '../../fetch/api.js';
  import hCenter from '../historyHome/historyCenter.vue'
  import CFirm from '../historyHome/CFirm.vue'
  import c from '../../js/common.js'
  import { client as yh } from '../../js/client.js';

  export default {
    props:['type'],
    data() {
      return {
        title:'记录与收藏',
        num:0,
        urls:[],
        name:"Historical",
        isShow:true,
        itemNo:0,
        userToken:'',
        eleList:[],
        historyList:[],
        conten: {
            his:'播放记录',
            acc:'内容收藏'
          },
        jsontyb:[],
      }
    },
    activated(){
      if (!this.$route.meta.keep) {
            this.isShow = true;
            if(this.type){
                this.takeJson();
            }else {
                this.takehistory();
            }
            this.$nextTick(()=>{
                this.ifHistory(this.type);
            })
      }
    },
    created() {
        try{
            if(this.type){
                this.takeJson();
            }else {
                this.takehistory();
            }
            this.$nextTick(()=>{
                this.ifHistory(this.type);
            })
        }catch (error){
            console.log(error);
            let fav = localStorage.getItem('favColl');
            if(fav =='收藏'){
                this.takeJson();
                this.$nextTick(()=>{
                    this.ifHistory(true);
                })
            }else {
                this.takehistory();
                this.$nextTick(()=>{
                    this.ifHistory(false);
                })
            }
        };
        
    },
    mounted() {
    },
    updated () {
      this.$nextTick(function () {
        this.$lazyImages.loadImage();
      });
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
      ifHistory(show){
        if (show){
          this.num = 0;
          this.accScroll();
        }else {
          this.num = 1;
          this.accScroll();
        }
      },
      Center(pos,url,type,clear){
//        右边内容
        if (pos == 'left'){
          this.isShow = true;
        }
        if(pos =='KeyEnter'){
          if(clear=='clear'){
            this.isShow = true;
//            点击清空内容
            if(this.num == 0){
              this.urls = [];
            }else {
              this.urls = [];
            }
          }else {
            this.$refs.CFirm.updateStast(url,"KeyEnter",this.num,type);
          }
        }
        if(pos =='json'){
          this.sendJson();
        }
      },
      back() {
        if(this.$route.query.jsonUrl!=undefined){
          console.log("详情页从外部打开");
          yh.back();
        }else{
          this.$router.push({ path:'/jx/index'});
        }
      },
      accScroll(){
        var list1 = document.getElementById("c0");
        list1.style.marginTop = -68*this.num + "px"
      },
      left(){
      },
      right(){
          if(!this.urls.length)return;
          this.isShow = false;
          this.$refs.hCenter.updateStast("right");
      },
      down() {
          if(this.num==1)return   
          this.urls = [];
          this.num=1;
          this.takehistory();
          this.urls = this.historyList;
          if (this.urls==null) {
            this.urls = [];
          }
          this.accScroll();
          
      },
      up(){
          if(this.num==0)return;
          this.urls = [];
          this.num =0;
          if (this.eleList.length==0) {
            this.takeJson();
          }
          if (this.eleList.length!=0) {
            this.urls = this.eleList;
            this.takeJson();
          }
          this.accScroll(); 
      },
//      筛选数据，jsonDa为类别参数,jsonDb为传入赛选数据
      screen(jsonDa,jsonDb){
        let jsonObj = [];
          if(jsonDb){
          for(let i= 0;i<jsonDb.length;i++){
            if (jsonDb[i].folderId == jsonDa[0] ||jsonDb[i].folderId == jsonDa[1]){
              jsonObj.unshift(jsonDb[i]);
            }
          }
        }
          return jsonObj;
      },
        takeJson(){
//          获取收藏
//            userFlag,栏目id,pageSize,userToken,spCode
            let that = this;
            var shouc =  api.getShoucang(yh.userId,yh.siteId);
            console.log(shouc);
            var ajax = new XMLHttpRequest();
            ajax.open('get',shouc);
            ajax.send();
            ajax.onreadystatechange = function () {
              if (ajax.readyState==4 &&ajax.status==200) {
            　　　　console.log(ajax.responseText);//输入相应的内容
                   let catList = JSON.parse(ajax.responseText);
                   console.log(catList);
                    // that.eleList.splice(0, that.eleList.length); // 清空数组
                    // that.eleList.push(catList.data.resultList);
                    that.eleList = catList.data.resultList;
                    that.urls = that.eleList;
                    console.log(that.urls);
                    if (that.urls.length==0) {
                      that.$refs.hCenter.change(false);
                    }else{
                      that.$refs.hCenter.change(true);
                    }
            　　}
            }
        },
        takehistory(){
//            获取历史
          this.historyList = JSON.parse(localStorage.getItem('historyList'));
          this.$nextTick(()=> {
            if (this.historyList) {
              this.urls = this.historyList;
              this.$refs.hCenter.change(true);
            }else{
              this.urls = [];
              this.$refs.hCenter.change(false);
            }
          })
        },
      changeJson(jsonDB){
//        按时间排序
          let _tempArray = [];
          if(jsonDB.length <= 1){
              _tempArray = jsonDB;
          }else {
              let jsontyb = jsonDB;
              //  sort 作用域在windows下面需要注意
              let sortedObjKeys = Object.keys(jsontyb).sort(function(a, b) {
                  return jsontyb[b].bookmarkTime - jsontyb[a].bookmarkTime;
              });
              console.log(sortedObjKeys);
              for (let i in sortedObjKeys) {
                  console.log(sortedObjKeys.hasOwnProperty(i));
                  if(sortedObjKeys.hasOwnProperty(i)){
                      _tempArray.push(jsontyb[sortedObjKeys[i]]);
                  }
              }
          }
          console.log(_tempArray);
          return _tempArray;
      },
      Data(gettime){
        let newtime =new Date(new Date().setHours(0,0,0,0));
        var timestamp = Date.parse(newtime);
        let timeout = Math.ceil((timestamp-gettime)/86400000);
//        console.log("gettime:============"+timeout);
        return timeout;
        console.log(timeout);
      },
      firm(bl,name,pos){
        if (!bl){
          this.$refs.hCenter.updateStast(pos);
          if (name == 0){
            this.takeJson();
          }else {
            this.historyJson();
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
    components: {
      hCenter,CFirm
    },
  }
</script>
