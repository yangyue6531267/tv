<style type="text/css" scoped="LFirm">
.loading {
  width: 120px;
  height: 120px;
  position: relative;
  margin: 0 auto;
  margin-top: 300px;
}
.loading span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  -webkit-animation: load 1.04s ease infinite;
}
@-webkit-keyframes load {
  0% {
    -webkit-transform: scale(1.2);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0.3);
    opacity: 0.5;
  }
}
.loading span:nth-child(1) {
  left: 0;
  top: 50%;
  margin-top: -10px;
  -webkit-animation-delay: 0.13s;
  background: #990066;
}
.loading span:nth-child(2) {
  left: 14px;
  top: 14px;
  -webkit-animation-delay: 0.26s;
  background: #ffcc00;
}
.loading span:nth-child(3) {
  left: 50%;
  top: 0;
  margin-left: -10px;
  -webkit-animation-delay: 0.39s;
  background: #cc0033;
}
.loading span:nth-child(4) {
  top: 14px;
  right: 14px;
  -webkit-animation-delay: 0.52s;
  background: #ffcc33;
}
.loading span:nth-child(5) {
  right: 0;
  top: 50%;
  margin-top: -10px;
  -webkit-animation-delay: 0.65s;
  background: #333399;
}
.loading span:nth-child(6) {
  right: 14px;
  bottom: 14px;
  -webkit-animation-delay: 0.78s;
  background: #ff0033;
}
.loading span:nth-child(7) {
  bottom: 0;
  left: 50%;
  margin-left: -10px;
  -webkit-animation-delay: 0.91s;
  background: #cc3366;
}
.loading span:nth-child(8) {
  bottom: 14px;
  left: 14px;
  -webkit-animation-delay: 1.04s;
  background: #009999;
}
</style>
<template>
  <div
    class="loading"
    v-if="show"
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: true
    };
  },
  methods: {},
  mounted () {},
  watch: {}
};
</script>
