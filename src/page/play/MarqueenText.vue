<template>
    <div :id="id" class="scroll-area">
        <div class="scroll-area1 scroll" :id="'scroll_'+id"  :style="customStyle">
            <span :id="'scrolltext_'+id"   v-html="text"></span>
            <span :id="'1scrolltext_'+id"  :class="needScroll?'scroll_hidden':'scroll_none'"
                ></span>
        </div>
        <div class="scroll-area2 scroll"  v-show="needScroll" :id="'scroll2_'+id" :style="customStyle">
            <span :id="'2scrolltext_'+id" class="scroll_hidden" ></span>
            <span :id="'scrolltext2_'+id"  v-html="text"></span>
        </div>
    </div>
</template>

<script>
import CommonUtils from './CommonUtils'

export default {
  name: 'MarqueenText',
  props: ['id', 'text', 'customStyle', 'scroll'],
  data () {
    return {
      needScroll: false,
      timer: -1
    }
  },
  watch: {
    scroll: function () {
      console.log('marquee is scroll:' + this.scroll);
      this.scroll ? this.startScroll() : this.stopScroll();
    },
    deep: true,
    text: function () {
      console.log('marqueetext text changed = ' + this.text);
      this.scroll ? this.startScroll() : this.stopScroll();
    }
  },
  created () {
    this.$nextTick(function () {
      this.scroll ? this.startScroll() : this.stopScroll();
    });
  },
  beforeDestroy () {
    if (this.timer != -1) { clearInterval(this.timer); }
  },
  methods: {
    startScroll () {
      console.log('开始滚动!');
      var divWidth = document.getElementById('scroll_' + this.id).offsetWidth;
      var scrollWidth = document.getElementById('scroll_' + this.id).scrollWidth;
      //  console.log("divWidth: " + divWidth + "; textWidth : " + textWidth + "scrollWidth = " + scrollWidth);
      console.log(divWidth + '----------------------' + scrollWidth);
      if (scrollWidth > divWidth) {
        this.needScroll = true;
        this.startMarquee();
      } else {
        this.needScroll = false;
      }
    },
    stopScroll () {
      this.needScroll = false;
      this.stopMarquee();
    },
    startMarquee () {
      // var root = window.FocusEngine.render();
      // root.getWidgetById('detailRecommendItem' + this.index).focus();
      if (this.timer != -1) {
        console.log('this.timer != -1');
        this.stopMarquee();
      }
      this.timer = CommonUtils.startMarqueeV2('scroll_' + this.id, 'scroll2_' + this.id);
      // alert(this.id);
      // , document.getElementById('scrolltext_'+this.id).offsetWidth);
    },
    stopMarquee () {
      if (this.timer != -1) {
        CommonUtils.clearMarqueeV2('scroll_' + this.id, 'scroll2_' + this.id, this.timer);
        this.timer = -1;
      }
    }
  }
}
</script>

<style scoped>
    .scroll-area {
        position: relative;
        /*border: 0px solid #ccc;*/
        overflow: hidden;
    }
    .scroll-area1 {
        position: absolute;
        top:0;
        left: 0;
        width:100%;
        overflow: hidden;
        text-align: center;
        /*border: 0px solid #ccc;*/
    }
    .scroll-area2 {
        position: absolute;
        top:0;
        left: 0;
        width:100%;
        overflow: hidden;
        text-align: center;
        /*border: 0px solid #ccc;*/
        /* z-index: 999; */
    }
    .scroll_hidden {
        visibility:hidden;
        display:inline-block;width:100%;
    }
    .scroll_none {
        display: none;
    }

    .scroll {
        white-space: nowrap;
    }

    .scroll-focus {
        position: absolute;
        left: 100%;
        -webkit-animation: todayScroll 5s linear infinite;
        animation: todayScroll 5s linear infinite;
    }

    .scroll-content {
        margin-right: 3em;
    }

    @keyframes todayScroll {
        0% {
            transform: translate(-50%);
            -webkit-transform: translate(-50%);
        }

        100% {
            transform: translate(-100%);
            -webkit-transform: translate(-100%);
        }
    }
    @-webkit-keyframes todayScroll {
        0% {
            transform: translate(-50%);
            -webkit-transform: translate(-50%);
        }

        100% {
            transform: translate(-100%);
            -webkit-transform: translate(-100%);
        }
    }
</style>
