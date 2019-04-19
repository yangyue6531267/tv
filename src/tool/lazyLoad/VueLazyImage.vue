<template>
  <div class="imglazy">
    <div class="assetsMark" v-show="(oragin!=='' && getMarkS(oragin)!=='')">{{getMarkS(oragin)}}</div>
    <div class="score" v-if="score&&score>=1" :style="{backgroundImage:'url('+initScore+')'}" >{{score}}</div>
    <img
      ref="target"
      :class="_class"
      :data-src="src"
      :src="placeholder"
      width="100%"
      height="100%"
    >
    <div v-if="title" :class="_s_title_Class">
      <div class="s-title-name">{{title}}</div>
      <div class="s-title-temp"></div>
    </div>

  </div>
</template>
<style scoped>
  .imglazy{
    position: relative;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    /*border: 1px rgba(255, 255, 255, 0.5) solid;*/
    margin-bottom: 30px;
  }
  div{height:100%}
  .score{
    position:absolute;
    display:inline-block;
    z-index:99;
    width:50px;
    height:60px;
    top:0px;
    right:0px;
    color:#DF9720;
    text-align:center;
    line-height:23px;
    padding-left:17px;
    box-sizing: border-box;
    border-radius: 0px 15px 0px 0px;
  }
  .assetsMark{
    position:absolute;
    display:inline-block;
    z-index:99;
    min-width:40px;
    height:30px;
    top:0px;
    left:0px;
    color:#DF9720;
    line-height:30px;
    padding:0px 8px;
    box-sizing: border-box;
    border-radius: 15px 0px 15px 0px;
    overflow: hidden;
    background-color: rgba(106,106,106,0.8);
    text-align: center;
    white-space: nowrap;
    text-overflow:ellipsis;
  }
  .change{
    position:absolute;
    top:0px;
    left:100px;
    border-radius:0px 15px 0px 0px;
  }
  .s-title{
    position:absolute;
    display: inline-block;
    z-index:99;
    width:93.7%;
    height: 25px;
    line-height: 25px;
    padding-top:5px;
    /* padding-left: 18px; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
    text-align: center;
  }
  .s-title-name,.s-title-temp{display:inline;}
  /* .s-title-temp{padding-left:25px;} */
</style>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    _class () {
      let className;
      if (this.show) {
        if (this.imgClass instanceof Array) {
          className = this.imgClass.concat(['show']);
        } else if (this.imgClass instanceof Object){
          if (this.imgClass != undefined && this.imgClass.hover == true){
            console.log(this.imgClass);
          }
        } else className = this.imgClass + ' show';
      }
      return className;
    },
    _s_title_Class (){
      if (this.show){
        return this.titleClass + ' s-title';
      }
    }
  },
  methods: {

  },
  mounted () {
    this.$lazyImages.addImage(this.$refs.target);
    this.$refs.target.onload = () => {
      this.show = true;
    };
    // this.$lazyImages.loadImage();
    // this.$lazyImages.debounce(this.$lazyImages.loadImage(),200);
  },
  // eslint-disable-next-line no-dupe-keys
  methods: {
    getMarkS (provideId){
      switch (provideId) {
        case 'YPYS':
          return '优品影视';
          break;
        case 'YK':
          return '优酷';
          break;
        case 'SH':
          return '搜狐';
          break;
        case 'TX':
          return '腾讯';
          break;
        case 'XIANGX':
          return '优品影视';
          break;
        case 'YH':
          return '岩华';
          break;
        case 'QS':
          return '求索';
          break;
        case 'YSHY':
          return '影视会员';
          break;
        case 'AQY':
          return '爱奇艺';
          break;
        case 'BST':
          return '';
          break;
        case 'GUOG':
          return '优酷';
          break;
        case 'HS':
          return '';
          break;
        case 'HSJP':
          return '华数精品';
          break;
        case 'LS':
          return '乐视';
          break;
        case 'LYZQ':
          return '梨园专区';
          break;
        case 'MG':
          return '芒果';
          break;
        case 'CWLY':
          return '宠物乐园';
          break;
        default:
          return '';
          break;
      }
    }
  },
  beforeDestroy () {
    this.$lazyImages.removeImage(this.$refs.target);
  },
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: String,
    imgClass: {
      type: [Array, String],
      default: ''
    },
    initScore: {
      type: String,
      default: ''
    },
    score: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleClass: {
      type: String,
      default: ''
    },
    oragin: {
      type: String,
      default: ''
    }
  },
  watch: {
    src (){
      // console.log("data-src 已经更新");
      this.$lazyImages.addImage(this.$refs.target);
      this.$refs.target.onload = () => {
        this.show = true;
      };
      this.$nextTick(function () {
        this.$lazyImages.loadImage();
      })
    }
  }
}
</script>
