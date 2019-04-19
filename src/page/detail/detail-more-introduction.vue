<!-- 详情页公共介绍弹出层——wzh -->
<template>
  <div class="more-introduction" v-show="visible">
    <div class="bg"></div>
    <span class="top" v-show="pageNum>0"></span>
    <span class="buttom" v-show="pageNum<pageTotal"></span>
    <div class="container">
      <div class="scroll-content" ref="contentBox">
        <p class="con" ref="content">{{isAlert}}</p>
      </div>
    </div>
    <keyDo v-on:listenKeyCode="keyCode" v-if="isShow" ref="keyDo"></keyDo>
  </div>
</template>

<style scoped="MIntroduction">
  .more-introduction {
    position: fixed;
    width: 1280px;
    height: 720px;
  }

  .bg {
    position: fixed;
    width: 1280px;
    height: 720px;
    top: 0;
    left: 0;
    background:rgba(0, 0, 0,0.8);
    z-index: 10;
  }

  .top {
    position:absolute;
    top: 40px;
    left:630px;
    background-image: url("../../assets/detail/introduction-icon.png");
    width: 35px;
    height: 31px;
    z-index: 1000;
    transform: rotate(180deg);
  }

  .buttom {
    position:absolute;
    top: 440px;
    left:630px;
    background-image: url("../../assets/detail/introduction-icon.png");
    width: 35px;
    height: 31px;
    z-index: 1000;
  }

  .container {
    position: fixed;
    top: 160px;
    left: 300px;
    width: 680px;
    height: 351px;
    background: url("../../assets/detail/introduction-bg.png");
    z-index: 100;
  }

  .container .scroll-content {
    margin-top: 60px;
    padding-left: 70px;
    width: 540px;
    height: 245px;
    text-align: left;
    font-size: 20px;
    line-height: 28px;
    overflow:hidden
  }
  .scroll-content .con{
      transition: all 0.3s;
    }
</style>

<script>
 import {
    client as yh
  } from '../../js/client.js'
  export default {
    props: ['isAlert'],
    data() {
      return {
        isShow: false,
        page: 0,
        visible: false,
        pageNum:0,
        pageTotal:0,
        isState:true,
      }
    },
    methods: {
      keyCode(kc) {
        if (kc === "down") {
          this.down();
        } else if (kc === "up") {
          this.up();
        } else if (kc === "left") {
          return
        } else if (kc === "right") {
          return
        } else if (kc === "KeyBack") {
          if(this.isState){
            // 需要显示播放器
            console.log('需要显示播放器')
            // yh.showPlayer();
          }
          this.visible = false;
          this.isShow = false;
          this.$emit('pressDown', "introduction", "back");
        }
      },
      getKeyListen(state) {
        this.visible = true;
        this.isShow = true;
        this.isState = state;
        this.$nextTick(()=>{
        let height =this.$refs.content.offsetHeight
        console.log(height);
        this.pageTotal = Math.floor(height / 245);
        })
      },
      down() {
        if(this.pageNum===this.pageTotal) return
        this.pageNum++
        this.$refs.content.style.marginTop= -this.pageNum*246 +"px";
      },
      up() {
        if(this.pageNum===0) return
        this.pageNum--
        this.$refs.content.style.marginTop= -this.pageNum*246 +"px";
      }
    }
  }
</script>