<template>
  <div></div>
</template>
<script>
import {HTTPUtil as api} from '../fetch/api.js'

window.getCallBack = function (params) {
  console.log(params);
}

export default {
  created (){
    //   console.log('created');
    //  // api.methods.foo();
    //  let rootPath = "http://winnow-ds.yanhuamedia.tv/";
    //   this.$http.jsonp(rootPath,{//请求参数
    //     params: {
    //       returnType:'jsonp',
    //       jsonpCallback: "getCallBack"
    //     },
    //    emulateJSON:true,
    //   }).then(resp=>{
    //       console.log(resp);
    //   },response => {
    //      console.log(response);
    //       console.log("发送失败"+response.status+","+response.statusText);
    //   });
    let rootPath = 'https://183.131.15.28/?s=9|1&p=yhSystemTheme&k=1&v=1&returnType=jsonp';
    api.getTheme().then((json) => {
      // 处理 请求success
      console.log(json);
    }, (json) => {
      // TODO 处理请求fail
    });
  },
  mounted (){
    // fetchJsonp('https://183.131.15.28/?s=9|1&p=yhSystemTheme&k=1&v=1&returnType=jsonp',{
    //    timeout: 3000,
    //    jsonpCallback: 'jsonpCallback',
    // })
    // .then(function(response) {
    //   return response.json()
    // }).then(function(json) {
    //   console.log('parsed json', json)
    // }).catch(function(ex) {
    //   console.log('parsing failed', ex)
    // })
  }
}
</script>
