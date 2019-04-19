<template>
  <div class="keyboardBox">
      <!-- 输入框 -->
      <div class="k-input">{{keyword}}</div>
      <!-- 键盘按键 -->
      <div class="k-code">
          <ul>
            <li v-for="(item,index) in kcode" :key="item.id" :id="('t'+index)" :class="{'active':index===iskc}" >{{item}}</li>
          </ul>
      </div>
      <!-- 功能键 -->
      <div class="k-do">
          <button class="button" :class="{'hover':isDel}" >删除</button>
      </div>
      <!-- 按键监听 -->
      <keyDo ref="keydo" v-on:listenKeyCode="keyCode" v-if="isShow"></keyDo>
  </div>
</template>
<style scoped="keyboard">
    .keyboardBox{
        position:relative;
        box-sizing: border-box;
        width:280px;
        height:325px;
        margin-bottom:100px;
    }
    .k-input{
        width:100%;
        height:45px;
        border: 1px solid gold;
        line-height:45px;
        overflow:hidden;
        font-family:"Arial","Microsoft YaHei","黑体","宋体",sans-serif ;
        font-weight:400;
        font-size:21px;
        background-color:#FFFFFF;
        color:#868686;
    }

    .k-code{
        width:280px;
        height:280px;
        background-color:#AA997E;
        box-sizing: border-box;
    }
    .k-code ul{
         box-sizing: border-box;
    }
    .k-code li{
        float:left;
        height:45px;
        width:46px;
        line-height:45px;
        text-align:center;
        background-color:#AA997E;
        box-sizing: border-box;
    }
    .k-do{
        position:relative;
        margin-top:10px;
        width:280px;
        height:60px;
        text-align:center;
    }
    .button {
        width:100%;
        background-color: #71644F; /* Green */
        border: none;
        color: white;
        padding: 15px 0px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius:5px;
    }
    .button.hover{
       border:4px solid #fff;
       margin:0px 2px;
    }
    .k-code li.active{
        border:4px solid #fff;
        border-radius:5px;
        line-height:37px;
    }
</style>
<script>
export default {
  props: ['type'],
  name: 'keyboard',
  data (){
    return {
      kcode: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      isShow: true,
      position: 0,
      itemNo: 0,
      iskc: 0,
      keyword: '',
      isDel: false,
      eleId: 'kb',
      lastFocus: 0

    }
  },
  created (){
    this.addCss();
  },
  activated (){
    // if(this.type!=undefined){ // 当组件被复用时相关信息需要初始化
    //     console.log("keep-alive:小键盘激活");
    //     this.keyword = "";
    //     this.isShow = true;
    //     this.itemNo = 0;
    //  }
  },
  methods: {

    keyCode (kc){
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
        //   this.KeyBack();
        this.$router.go(-1);
      }
    },
    down (){
      if (this.itemNo >= 30){
        this.position = 1;

        this.itemNo = this.iskc = -1;
      };
      if (this.position == 0){
        this.itemNo += 6;
      }
    },
    up (){
      if (this.position == 0){
        if (this.itemNo <= 5) return;
        this.itemNo -= 6;
      } else {
        this.position = 0;
        this.itemNo = this.iskc = 33;
        this.isDel = false;
      }
    },
    left (){
      if (this.itemNo == 0) return;
      if (this.position == 0){
        this.itemNo--;
      }
    },
    right (){
      let kcodeSize = this.kcode.length - 1;
      if (this.itemNo > kcodeSize) return;
      if (this.position == 0){
        if (this.itemNo == 5 || this.itemNo == 11 || this.itemNo == 17 || this.itemNo == 23 || this.itemNo == 29 || this.itemNo == 35){
          this.isShow = false;
          this.lastFocus = this.itemNo;
          this.itemNo = -1;
          this.$emit('pressDown', this.isShow, this.eleId, 'right');
        } else {
          this.itemNo++;
        }
      } else {
        this.isShow = false;
        this.isDel = false;
        this.lastFocus = 0;
        this.$emit('pressDown', this.isShow, this.eleId, 'right');
      }
    },
    KeyEnter (){
      if (this.position == 0){
        this.keyword += this.kcode[this.itemNo];
      } else if (this.position == 1){
        let pSize = this.keyword.length - 1;
        this.keyword = this.keyword.substring(0, pSize);
      }
    },
    KeyBack (){

    },
    addCss (){
      if (this.position == 0){
        this.iskc = this.itemNo;
      } else {
        this.isDel = true;
      }
    },
    removeCss (){

    },
    getKeyListen (num){
      this.isShow = true;
      console.log(num);
      if (num != undefined && num != ''){
        this.itemNo = num;
      } else {
        this.itemNo = this.lastFocus;
      }
      this.position = 0;
    }
  },
  watch: {
    itemNo (){
      this.addCss();
    },
    keyword (){
      console.log('搜索关键字:' + this.keyword);
      this.$emit('pressDown', this.isShow, this.keyword, 'search');
    }
  }
}
</script>
