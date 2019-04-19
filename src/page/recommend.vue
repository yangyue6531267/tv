<template>
  <div>
    <component
      v-for='(item,index) in child'
      :is='item.ele'
      :key='index'
      v-on:pressDown='pressDown(arguments)'
      v-on:eleScroll='eleScroll(arguments)'
      v-on:getMsg='getMsg(arguments)'
      v-on:isremove='isremove()'
      ref='childDo'
      :cat-code='catType'
      :cat-id='focusId'
      :initData='item.childData'
      :itemSort="'0'+(index+1)"
      :isPlay='isPlay'
    ></component>
  </div>
</template>
<style scoped='series'>
.box {
  margin-left: -20px;
  margin-top: -50px;
  position: absolute;
  width: 1227px;
  height: 663px;
  overflow: hidden;
  background-color: #a8977c;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.scroll-box {
  position: relative;
}
</style>
<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { HTTPUtil as api } from '../fetch/api.js';
import { bp as bi } from '../js/ga.js';
import { hp } from '../util/dom.js';
import { yst } from '../js/yst.js';
export default {
  props: ['categoryData', 'focusId', 'lastId', 'itemSort','isPlay'],
  name: 'recommond',
  data () {
    return {
      name: 'recommond',
      currentView: 'recommond',
      currentC: 0,
      componentsId: [],
      pageSize: 0,
      child: [],
      cheight: [],
      catType: '',
      firstLoad: true,
      isAnimate: false,
      exposureStartTime: 0,
      exposureEndTime: 0
    };
  },
  computed: {
    ...mapGetters([
      'categorys',
      'behindParams',
      'isHTTPS',
      'startTime',
      'httpRequestTime',
      'httpResponseTime'
    ])
  },
  activated () {
    
  },
  updated () {
    this.$nextTick(function () {
      this.$lazyImages.loadImage();
    });
  },
  created () {
    if (!this.categoryData) return;
    this.initData(this.categoryData);
    this.catType = this.categoryData.catCode;
  },
  methods: {
    getMsg (){
      console.log(arguments[0][0])
    },
    initData (purl) {
      // 请求栏目数据
      if (!purl.jsonUrl) return;
      document.title = purl.catName;
      var url = purl.jsonUrl + this.behindParams;
      var self = this;
      api.jsonp(
        url,
        response => {
          var components = [];
          var componentsId = [];
          if (response.data.specialList != undefined) {
            var specialList = response.data.specialList;
            console.log(specialList);
            try {
              for (var i = 0; i < specialList.length; i++) {
                // 化繁为简，重新设计数据结构
                var templateName = specialList[i].layout;
                var isComponent = self.registerComponent(templateName); // 此方案可行
                if (isComponent) {
                  components.push({
                    ele: templateName,
                    childData: specialList[i]
                  });
                  componentsId.push(specialList[i].specialId);
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
          self.child = [];
          self.componentsId = [];
          self.child = components;
          self.componentsId = componentsId;
          console.log(self.componentsId.join('-'));
          self.$nextTick(function () {
            // $('.loading').hide(); // 关闭loading状态
            // console.log('当前url'+this.category[this.navpos].jsonUrl);
            // console.log('请求数据url'+url);
            // if (url.indexOf(this.category[this.navpos].jsonUrl) >= 0) {
            //   console.info('url数据一致');
            //   this.$store.commit('GET_LOADSTATUS', true) // 修改加载状态
            // } else {
            //   console.error('url数据不一致,不允许键值按下')
            // }
          });
        },
        response => {
          console.log('栏目推荐数据获取超时重新获取', response);
          $('.loading').show(); // 打开loading状态
          self.timeOutS++;
          if (self.timeOutS > 3) {
            self.timeOutS = 0;
            console.log(
              'request programa Data error, reload three times  faill '
            );
            return false;
          }
          self.initData(this.categoryData);
        }
      );
    },
    registerComponent (templateName) {
      console.log(templateName);
      try {
        //  vue-loader 13.0.0升级以后不支持require vue文件需要单独在后面加default
        Vue.component(templateName, require(`./${templateName}.vue`).default);
        return true;
      } catch (error) {
        console.log('注册组件异常:' + error);
        return false;
      }
    },
    pressDown () {
      console.log(arguments);
      var bl = arguments[0][0]
      var name = arguments[0][1]
      var pos = arguments[0][2]
      // console.log(bl, name, pos);
      // 从非导航条控制权转移
      var childComponents = this.$refs.childDo;
      var componentsSize = childComponents.length - 1;
      var _cdown = null;
      // console.log(childComponents.length);
      if (pos == 'back') {
        this.pageSize = 0;
        this.cheight = [];
        $('.scroll-box')
          .stop(false, true)
          .animate({ top: '0px' }, 200);
        this.$emit('navigation', this.name, this.pos, true);
      }
      for (var i = 0; i < childComponents.length; i++) {
        // 遍历组件ref 给对应的组件排序
        if (name == childComponents[i].eleId) {
          // 当对应组件上下没有焦点时会抛出控制权，此时父组件需要根据子组件抛出的信息来决定控制权交给其他父组件
          // console.log('已找到对应的组件'+index+'pos===='+pos);
          var _num = this.componentsId.indexOf(name); // 判断当前抛出键值的组件在数组中的位置
          // console.log('当前组件在数组中的第:'+this.componentsId.indexOf(name),this.componentsId.length);
          if (pos == 'down') {
            if (_num == componentsSize) {
              // console.error('已经到最后一个组件啦');
              this.getChildRef(name).updateStast(true, pos, true);
            } else {
              _cdown = this.componentsId[_num + 1];
              console.log(this.getChildRef(_cdown));
              this.getChildRef(_cdown).updateStast(true, pos, false);
            }
          } else if (pos == 'up') {
            if (_num == 0) {
              // $('.scroll-box')
              //   .stop(false, true)
              //   .animate({ top: '0px' }, 200);
              this.$emit('navigation', this.name, this.pos, true);
            } else {
              _cdown = this.componentsId[_num - 1];
              this.getChildRef(_cdown).updateStast(true, pos, false);
            }
            /* if (i == 0) {
                  childComponents[i - 1].updateStast(true, pos, false);
                } */
          }
          break; // 找到组件需终止循环foreach则不会，需要抛异常才会终止
        }
      }
    },
    getChildRef (id) {
      // 根据元素ID查找ref中的组件
      console.log('getChildRef:'+id);
      var childComponents = this.$refs.childDo;
      for (var i = 0; i < childComponents.length; i++) {
        console.log(childComponents[i].eleId);
        if (id == childComponents[i].eleId) {
          console.log(childComponents[i]);
          return childComponents[i];
        }
      }
    },
    eleScroll () {
      try {
        console.log(arguments)
        var id = arguments[0][0];
        var pos = arguments[0][1];
        var height = arguments[0][2];
        console.log('接受emit参数');
        console.log(id + pos + height);
        var itemSort = this.componentsId.indexOf(id); // 组件位置
        console.log('步骤1');
        var logObj = this.child[itemSort].childData;
        console.log('步骤2');
        console.log(document.getElementsByClassName('scroll-box')[0].offsetTop);
        console.log(hp.position(hp.$('.scroll-box')).top);
        // var scrollY = hp.position(hp.$('.scroll-box')).top - 57;
        var scrollY = $('.scroll-box').position().top - 57;
        console.log('步骤3');
        var _this = this;
        console.log('开始处理');
        if (pos == 'down') {
          if (height > 700) {
            console.log('scrollY:' + scrollY);
            var _temp = height - 640;
            scrollY -= _temp;
            console.log('向下需要滚动的距离：' + _temp);
            if (this.exposureStartTime != 0) {
              // this.exposureEndTime = new Date().format('yyyy-MM-dd hh:mm:ss'); // 上一次曝光时间
            }
            $('.scroll-box')
              .stop(false, true)
              .animate({ top: scrollY + 'px' }, 250, function () {
                _this.cheight.push(_temp);
                _this.pageSize++;
                // if (_this.exposureStartTime != 0) {
                //   _this.logUp(
                //     logObj.specialId,
                //     logObj.layout,
                //     logObj.jsonUrl,
                //     logObj.specialName,
                //     _this.exposureStartTime,
                //     _this.exposureEndTime
                //   );
                // }
                // _this.exposureStartTime = new Date().format(
                //   'yyyy-MM-dd hh:mm:ss'
                // ); // 曝光开始时间
              });
          }
        } else if (pos == 'up') {
        // console.log('up子组件元素的高度:'+height);
          if (this.pageSize == 0) {
            $('.scroll-box')
              .stop(false, true)
              .animate({ top: '0px' }, 200);
            return;
          }
          // console.log('向上需要滚动的距离:'+this.cheight[this.pageSize-1]);
          scrollY += this.cheight[this.pageSize - 1];
          $('.scroll-box')
            .stop(true, true)
            .animate({ top: scrollY + 'px' }, 100, function () {
              _this.cheight.splice(_this.pageSize - 1, 1);
              _this.pageSize--;
            });
        }
      } catch (error) {
        console.log(error)
      }
    },
    updateStast (bl, pos, isEnd) {
      var cs = this.$refs.childDo;
      for (var i = 0; i < cs.length; i++) {
        if (this.componentsId[0] == cs[i].eleId) {
          console.log('this.componentsId[0]' + this.componentsId[0]);
          try {
            cs[i].updateStast(true, pos, false);
          } catch (error) {
            console.log(error);
          }
          return;
        }
      }
    },
    isBlay(){
      // alert('播放');
      // if (this.isPlay) {
      //   this.getChildRef("203471").isPlayNow();
      // }
    },
    isremove(){
      // alert("关闭播放器");
      // if (this.isPlay) {
      //   this.getChildRef("203471").removrplay();
      // }
    },
    isPlays(){
      // alert('隐藏')
      // if (this.isPlay) {
      //   this.getChildRef("203471").hideplay();
      // }
    },
    isshows(){
      // alert('显示')
      // if (this.isPlay) {
      //   this.getChildRef("203471").isshowplay();
      // }
    },
    logUp (id, type, contentId, contentType, startTime, endTime) {
      try {
        var obj = {};
        obj.Exposure_id = id;
        obj.Exposure_type = type;
        obj.Exposure_content_id = contentId;
        obj.Exposure_content_type = contentType;
        obj.Exposure_start_time = startTime;
        obj.Exposure_end_time = endTime;
        yst.exposure(obj);
      } catch (error) {
        console.log('曝光采集异常');
      }
    }
  },
  watch: {
    categoryData () {
      console.log('update:' + JSON.stringify(this.categoryData));
      this.initData(this.categoryData);
      this.catType = this.categoryData.catCode;
      this.$lazyImages.loadImage();
    },
    child () {
      // this.$nextTick(function () {
      //   // httpResponseTime = new Date().getTime();
      //   this.$store.commit('GET_HTTPRESPONSETIME', new Date().getTime());
      //   var overTime = 0;
      //   if (this.firstLoad) {
      //     overTime = this.httpResponseTime - this.startTime;
      //     this.firstLoad = false;
      //   } else {
      //     overTime = this.httpResponseTime - this.httpRequestTime;
      //   }
      //   bi.loadPage(this.focusId, 1, 1, this.focusId, 0, 0, 0, overTime);
      // });
      console.log('更新栏目组件');
    }
  },
  beforeRouteLeave (to, from, next) {
    try {
      // this.$store.commit('GET_STARTTIME', new Date().getTime());
      // var overTime = 0;
      // overTime = new Date().getTime() - this.httpResponseTime;
      // bi.closPage(this.focusId, 1, 1, this.focusId, 0, 0, 0, overTime);
    } catch (error) {
      console.log(error);
    } finally {
      next();
    }
  }
};
</script>
