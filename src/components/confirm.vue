<template>
  <transition name="bounce">
    <div
      class="yy-confirm"
      v-show="visible"
    >
      <div class="bg"></div>
      <div
        class="yy-container"
        :style="{width: width}"
      >
        <div class="header">
          {{title.value}}
          <!--<i @click="close" class="icon-remove icon-large yy-close-btn" v-if="closeVisible"></i>-->
        </div>
        <div class="yy-content">
          <slot>
            {{content.value}}
          </slot>
        </div>
        <slot name="footer">
          <div
            class="yy-footer"
            slot="footer"
          >
            <a class="yy-btn make-sure select-on">确定</a>
            <a class="yy-btn cancel">返回</a>
          </div>
        </slot>
      </div>
    </div>
    <!--<keyDo v-on:listenKeyCode="keyCode"></keyDo>-->
  </transition>
</template>

<script type="text/javascript">
import $ from 'jquery';
import keyDo from '../components/keyDo.vue';
// import '../../lib/icon/css/font-awesome.css'
export default {
  name: 'pop',
  data: function () {
    return {
      width: {
        type: String,
        default: '360px'
      },
      title: {
        type: String,
        default: '三角警告标',
        value: 'icon'
      },
      content: {
        value: '选择“确定”注销账号，选择“返回”退出此页面'
      },
      visible: false,
      closeVisible: {
        type: Boolean,
        default: true
      }
    };
  },
  methods: {
    close () {
      this.$emit('update:visible', false);
    },
    showBox () {
      this.visible = true;
    },
    keyCode (kc) {
      // console.log("父组件接收子组件触发事件传上来的值");
      if (kc == 'down') {
        this.down();
      } else if (kc == 'up') {
        this.up();
      } else if (kc == 'left') {
        this.left();
      } else if (kc == 'right') {
        this.right();
      } else if (kc == 'KeyEnter') {
        this.KeyEnter();
      } else if (kc == 'KeyBack') {
        this.KeyBack();
      }
    },
    KeyBack () {
      this.visible = false;
      this.$emit('listernPopUp', false);
    },
    KeyEnter () {
      this.visible = false;
      this.$emit('listernPopUp', true);
    },
    right () {
      $('.make-sure').removeClass('select-on');
      $('.cancel').addClass('select-on');
    },
    left () {
      $('.cancel').removeClass('select-on');
      $('.make-sure').addClass('select-on');
    }
  },
  components: {
    keyDo
  }
};
</script>

<style type="text/css" scoped="confirm">
.yy-btn {
  width: 30%;
  float: left;
}
.yy-content {
  color: darkgray;
  height: 90px;
  min-height: 90px;
  text-align: center;
  line-height: 90px;
  font-size: 16px;
  font-family: "proxima nova", "Roboto", "helvetica", Arial, sans-serif;
  background: #ffffff;
}
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
/*@keyframes bounce-in {*/
/*-webkit-transform: scale(2);*/
/*-moz-transform: scale(2);*/
/*-ms-transform: scale(2);*/
/*transform: scale(2);*/
/*opacity: 0;*/
/*-webkit-transition: all 0.3s;*/
/*-moz-transition: all 0.3s;*/
/*transition: all 0.3s;*/
/*}*/
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
  /*background-color: #FFFFFF;*/
  background-color: #000;
  opacity: 0.3;
  z-index: 99999;
}
.yy-confirm .yy-container {
  position: absolute;
  display: inline-block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1280px;
  z-index: 9999999999999;
}
.yy-confirm .yy-container .header {
  width: 100%;
  padding: 10px;
  background-color: #4575a6;
  border-bottom: 1px solid #eee;
  color: #fff;
  text-align: left;
}
.yy-confirm .yy-container .yy-content {
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
}
.yy-confirm .yy-container .yy-footer {
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  height: 40px;
}
.yy-btn {
  padding: 5px 15px;
  text-decoration: none !important;
  border-radius: 6px;
  text-align: center;
  margin: 0 6px 0 20px;
}
.yy:hover {
  text-decoration: none !important;
}
.yy-btn:active {
  text-decoration: none !important;
}
.yy-btn.select-on {
  background-color: #4575a6;
  color: #fff;
}
.yy-btn {
  background-color: #bbb5b5;
  color: #fff;
}
.yy-close-btn {
  cursor: pointer;
  float: right;
}
</style>
