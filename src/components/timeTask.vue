<template>
  <div class="timeClock">
    <p>{{time}}</p>
  </div>
</template>
<style scoped="timetask">
.timeClock {
  position: absolute;
  top: 23px;
  left: 1120px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
}
</style>
<script>
export default {
  data () {
    return {
      time: ''
    };
  },
  created () {
    this.getTime();
  },
  methods: {
    curentTime () {
      let now = new Date();
      let year = now.getFullYear(); // 年
      let month = now.getMonth() + 1; // 月
      let day = now.getDate(); // 日
      let hh = now.getHours(); // 时
      let mm = now.getMinutes(); // 分
      let clock = '';
      if (hh < 10) clock += '0';
      clock += hh + ':';
      if (mm < 10) clock += '0';
      clock += mm;
      return clock;
    },
    getTime () {
      let _this = this;
      setInterval(function () {
        _this.time = _this.curentTime();
      }, 1000);
    }
  }
};
</script>
