<style type="text/css" scoped="firm">
  .bounce-enter-active {
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  .bounce-leave-active {
    -webkit-transform: scale(2);
    -moz-transform: scale(2);
    -ms-transform: scale(2);
    transform: scale(2);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  .yy-confirm {
    position: fixed;
    top: 0;
    left: 0;
    width: 1280px;
    height: 720px;
    z-index: 9999999;
  }

  .yy-confirm .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #000;
    opacity: 0.3;
    z-index: 99999;
  }

  .yy-confirm .yy-container {
    position: absolute;
    display: inline-block;
      top: 160px;
      left: 360px;
    max-width: 1280px;
    z-index: 9999999999999;
    width: 600px;
    border: 1px solid white;
  }

  .yy-confirm .yy-container .header {
    height: 50px;
    padding-left: 30px;
    line-height: 50px;
    background-color: rgba(21, 48, 57, 0.9);
    border-bottom: 1px rgba(0, 128, 128, 0.95) solid;
    color: #fff;
    text-align: left;
    box-sizing: border-box;
    margin-top: 0px;
  }

  .yy-confirm .yy-container .yy-footer {
    background: rgba(34, 78, 96, 0.9);
    height: 300px;
    box-sizing: border-box;
  }

  .yy-btn {
    text-decoration: none !important;
    border-radius: 14px;
    text-align: center;
    width: 30%;
    float: left;
    margin-top: 120px;
    margin-left: 80px;
    height: 50px;
    line-height: 50px;
    border: 2px white solid;
    background-color: #152F3A;
    color: #fff;
  }

  .yy-btn.select-on {
    background-color: #992121;
    color: #fff;
  }

  .yy-close-btn {
    cursor: pointer;
    float: right;
  }

</style>

<template> 
  <div class="yy-confirm" v-show="visible">
    <div class="bg"></div>
    <div class="yy-container" :style="{width: width}">
      <div class="header" v-if="mx">
        <i class="iconfont" style="font-size: 24px;line-height: 50px">&#xe6a3</i>
          视频管理
      </div>

      <div class="header" v-else>
        <i class="iconfont" style="font-size: 24px;line-height: 50px">&#xe6a3</i>
        视频管理
      </div>
      <slot name="footer">
        <div class="yy-footer" slot="footer">
          <a href="javscript:void(0)" class="yy-btn make-sure select-on">视频详情
            <i class="iconfont" style="font-size: 22px;line-height: 50px">&#xe98c</i>
          </a>
          <a href="javscript:void(0)" class="yy-btn cancel">删除视频
            <i class="iconfont" style="font-size: 22px;line-height: 50px">&#xe606</i>
          </a>
        </div>
      </slot>
    </div>
    <keyDo v-on:listenKeyCode="keyCode" v-if="isShow" ref="keyDo"></keyDo>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import {
    HTTPUtil as api
  } from '../../fetch/api.js'
  import {
    client as yh
  } from '../../js/client.js'
  import c from '../../js/common.js'


  export default {
    data: function () {
      return {
        width: {
          type: String,
          value: '360px'
        },
        title: {
          type: String,
          value: '明星管理',
          value2: '明星详情',
          value3: '删除明星'
        },
        isShow: false,
        addRemver: 0,
        catCode: "",
        act: true,
        num: 0,
        urlss: '',
        name: "CFirm",
        jsonUrl: '',
        asID: '',
        usename: '',
        zt: true,
        visible: false,
        enterType:4,
        mx:true,
        userToken:''

      }
    },
    methods: {

      keyCode(kc) {
        if (kc == "left") {
          this.left();
        } else if (kc == "right") {
          this.right();
        } else if (kc == "KeyEnter") {
          this.KeyEnter();
        } else if (kc == "KeyBack") {
          this.KeyBack();
        }
      },
      KeyBack() {
        this.visible = false;
        this.isShow = false;
        console.log(this.usename);
        this.$emit("listernpopup", false, this.usename, 'back');
      },
      KeyEnter() {
        this.visible = false;
        this.isShow = false;
        if (this.num == 0) {
          //          收藏
          this.addRemver = 1;
            let obj ={
              enterType: this.enterType
            };
          if (!this.zt) {
              //              跳转详情
                console.log(this.jsonUrl);
              c.routerSkip(this.jsonUrl, "1",this.urlss.layout, obj, this.$router);
//            else {
//              c.routerSkip(this.jsonUrl, "2", '', this.$router);
//            }
          } else {
            if (this.urlss.collectType == 2) {
              c.routerSkip(this.jsonUrl, '5', '','', this.$router);
            } else {
              c.routerSkip(this.jsonUrl, '4', '', '', this.$router);
            }
          }
          if (this.usename == 0) {
            localStorage.setItem('favColl','收藏');
          }else{
            localStorage.setItem('favColl','历史');
          }
        } else {
          this.addRemver = 2;
          //          删除
          if (this.usename == 0) {
              let id = this.asID;
          } else {
              // alert('删除历史')
          }
        }
      },
      right() {
        this.num++;
        if (this.num > 1) {
          this.num = 1
        }
        $('.make-sure').removeClass('select-on');
        $('.cancel').addClass('select-on');
      },
      left() {
        this.num--;
        if (this.num < 0) {
          this.num = 0
        }
        $('.cancel').removeClass('select-on');
        $('.make-sure').addClass('select-on');
      },
      updateStast(url, Id, name, type, actor) {
        console.log(url, Id, name + '过来的数据');
        this.num = 0;
        $('.cancel').removeClass('select-on');
        $('.make-sure').addClass('select-on');
        this.isShow = true;
        this.visible = true;
        this.urlss = url;
        if (name == 0) {
          this.jsonUrl = url.relateUrl;
        } else {
          this.jsonUrl = url.jsonUrl;
        }
        this.asID = url.relateId;
        this.catCode = type;
        this.usename = name;
        this.act = actor;
        if (url.collectType == 2) {
          this.zt = true;
        } else {
          this.zt = false;
        }
      },
    },
    components: {

    }
  }

</script>
