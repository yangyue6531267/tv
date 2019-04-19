// 监听键盘及遥控器按键
<template>
  <div class="addListenKeyDown">
  </div>
</template>
<script>
import firm from '../../page/firm.vue';
import { client } from '../../js/client';
var Kv = {};

Kv.inputNo = 0;
Kv.itemNo = 0;
Kv.position = 0;
Kv.keyboardSelected = false;

export default {
  data () {
    return {
      name: 'keyboard',
      isKeydown: 'false',
      isRunning: [],
      preventCode: []
    };
  },
  created: function () {
    this.initListen();
  },
  activated () {
    this.initListen();
  },
  components: {
    firm
  },
  methods: {
    initListen () {
      var timer = null;
      var _this = this;
      document.onkeydown = function (e) {
        e = event || window.event || arguments.callee.caller.arguments[0];
        var keycode = e.which || e.keyCode;
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (_this.handleKeyCode(keycode)) {
            e.preventDefault();
          }
        }, 100);
      };
    },
    handleKeyCode (kc) {
      // if ($('.scroll-box').is(':animated')) {
      //   return;
      // }  
      kc = parseInt(kc)
      if (kc === 39 || kc === 5) {
        this.KeyRight()
        return true
      } else if (kc === 37 || kc === 3) {
        this.KeyLeft()
        return true
      } else if (kc === 13) {
        this.KeyEnter()
        return true
      } else if (kc === 38 || kc === 1) {
        this.KeyUp()
        return true
      } else if (kc === 40 || kc === 2) {
        this.KeyDown()
        return true
      } else if (kc === 8 || kc === 22 || kc === 340 || kc === 27 || kc === 461) {
        this.KeyBack()
        return true
      } else if (kc === 513 || kc === 832 || kc === 835) {
        this.gotoIndex()
        return true
      } else if (kc === 125 || kc === 415) {
        return true
      } else if (kc === 127 || kc === 19) {
        return true
      }
      return false
    },
    KeyDown () {
      this.$emit('listenKeyCode', 'down');
    },
    KeyUp () {
      this.$emit('listenKeyCode', 'up');
    },
    KeyLeft () {
      this.$emit('listenKeyCode', 'left');
    },
    KeyRight () {
      this.$emit('listenKeyCode', 'right');
    },
    KeyEnter () {
      this.$emit('listenKeyCode', 'KeyEnter');
    },
    KeyBack () {
      this.$emit('listenKeyCode', 'KeyBack');
    }
  },
  destroyed () {
    console.log('keyDo component destroyed');
  }
};
</script>
