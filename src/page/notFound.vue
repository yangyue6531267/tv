<template>
  <div
    class="fullScreen"
    id="fullScreen"
  >
    <img
      class="rotating"
      src="../tool/error/images/spaceman.svg"
    />
    <div class="pagenotfound-text">
      <h1>页面找不到了</h1>
      <h2><a href="/index">返回上一级</a></h2>
    </div>
    <canvas id="canvas2d"></canvas>
    <keyDo v-on:listenKeyCode="keyCode"></keyDo>
  </div>
</template>
<script>
import ecss from '../tool/error/css/error.css';
import { StarField } from '../tool/error/js/error.js';

// console.log(StarField);
var backUrl = '/index';
export default {
  name: 'errorPage',
  data: function () {
    return {
      backUrl: '/index'
    };
  },
  mounted () {
    this.$nextTick(function () {
      new StarField('fullScreen').render(333, 3);
    });
  },
  methods: {
    keyCode (params) {
      if (params == 'KeyBack') {
        console.log('返回');
        this.back();
      }
    },
    back () {
      console.log('返回');
      // this.$router.push({path:this.backUrl});
      this.$router.go(-1);
    }
  },
  components: {},
  beforeRouteEnter (to, from, next) {
    // console.log(from.fullPath);
    // 导航进入该组件的对应路由时调用
    // 不可以可以访问组件实例 `this`，实例还未初始化
    backUrl = from.fullPath;
    next();
  }
};
</script>
