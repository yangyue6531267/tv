<template>
  <div id="app">
    <!-- 这里是需要keepalive的 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <!-- 这里不会被keepalive -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { client as yh } from './js/client.js';
import { yst as logUp } from './js/yst.js';
export default {
  name: 'app',
  beforeCreate () {
    // document.getElementsByClassName('openImage')[0].style.display='block';
    const userId = yh.getUserAccount();
    const deviceId = yh.getSTBDeviceId();
    const mac = yh.getSTBParameter(yh.STB_KEYS.MAC);
    const cdn = yh.getCdn(510100);
    const DeviceOb = {
      reserve_group: 'yanhua',
      model: 'Android4.4',
      content_id: '3',
      terrace_id: cdn,
      operator_id: '2',
      apk_version: '0.0.0',
      brand: 'mbh',
      site_id: '27',
      user_id: userId,
      device_id: deviceId,
      soft_v: '1.0.1',
      sys_v: '4.4.2',
      mode: 'CM101s-2',
      mac: mac,
      ip: '',
      apk_version_name: '四川移动精选',
      cdn: cdn
    };
    yh.setDeviceInfo(DeviceOb);
    logUp.init();
  },
  mounted () {
    console.log('app 已挂载');
  }
};
</script>
<style>
@import url(./font/iconfont.css);
</style>
