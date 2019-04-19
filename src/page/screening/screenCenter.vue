<style>
    .HistoryImg {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .Img {
        width: 125px;
        height: 125px;
        border-radius: 50%;
    }

</style>
<template>
    <div class="his_right">
        <div class="left-icon" :class="{'accnone':time==0}"></div>
        <div class="left-icon1" :class="{'accnone':time==list||list <= 0}"></div>
        <div class="btn_center">
            <ul class="his_ul" v-if="show">
                <li v-for="(item,index) in top[time]" 
                    :key="item.id" 
                    :id="('Img'+index)" 
                    class="imgs">
                    <lazy-image 
                    :src="item.assetImg" 
                    :placeholder='placeholder' 
                    :initScore='initScore' 
                    :imgClass='HistoryImg' />
                    <div :class="{'hover':itemNo==index&& isActive}"></div>
                </li>
            </ul>
        </div>
        <div class="NoList" :class="{'accnone':isList}">{{text_list}}</div>
        <div class="hang" v-if="this.jsonUrl.length>0">{{time+1}}/{{this.pagination+1}}</div>
        <keyDo v-on:listenKeyCode="keyCode" v-if="isShow" ref="keyDo"></keyDo>
    </div>
</template>
<style scoped="hCenterssssc">
    .NoList{
        width: 843px;
        height: 719px;
        overflow: hidden;
        color:#ffffff;
        position: absolute;
        top:0px;
        left:0px;
        line-height:719px;
        font-size:30px;
        text-align: center;
    }
    .accnone{
        display: none;
    }
    .imgs .hover{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../../static/images/special/915.png) no-repeat;
        background-size:100% 100%;
        z-index: 99; 
        left: 0px;
        top: 0px;
    }
    .left-icon{
    width: 66px;
    height: 66px;
    background: url(../../../static/images/category/111.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0px;
    top:335px;
    }
    .left-icon1{
        width: 66px;
        height: 66px;
        background: url(../../../static/images/category/222.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: -14px;
        top:335px;
    }
    .hang {
        position: absolute;
        left: 1200px;
        top: 90px;
        font-size: 20px;
    }

    .gunLun .btn_nums {
        width: 10px;
        height: 140px;
        background: white;
        text-align: center;
        position: absolute;
        left: -2px;
        top: -10px;
        color: black;
    }

    .removeBorder {
        border: 3px solid white;
        box-sizing: border-box;
    }

    .btn_center {
        width: 780px;
        height: 550px;
        overflow: hidden;
    }

    .his_right {
        width: 785px;
        height: 695px;
        overflow: hidden;
        float: left;
        padding-left: 53px;
        padding-top: 132px;
        position: relative;
    }

    .his_right ul {
        width: 780px;
        height: 550px;
        clear: both;
            content: "";
            display: block;
    }

    .imgs {
        width: 231px;
        height: 130px;
        margin-bottom: 30px;
        margin-right: 20px;
        float: left;
        position: relative;
    }

    .his_ul {
        margin-left: 8px;
        display: -webkit-flex;
        /* Safari */
        display: flex;
        flex-wrap: wrap;
    }

    .sprite_img {
        width: 35px;
        height: 35px;
        padding: 5px 2.5px 7px 35px;
        /* background: url("../../assets/icon.png") no-repeat -35px -245px; */
    }
</style>

<script>
    // import {
    //     HTTPUtil as api
    // } from '../fetch/api.js'

    // import {
    //     bp as bi
    // } from '../js/ga.js'
    import c from '../../js/common.js'
    
    export default {
        props: ['jsonUrl'],
        data() {
            return {
                itemNo: 0,
                op: 0,
                isHis: false,
                show: true,
                HistoryImg: 'HistoryImg',
                placeholder: require('../../assets/img_loading_160x230.png'),
                initScore: require('../../assets/corner_mark.png'),
                isShow: false,
                numop: false,
                timer: null,
                time: 0,
                pagination: 0,
                CLEARTIMES:null,
                userToken:'',
                isActive:false,
                top:'',
                list:'',
                isList:true,
                text_list:'暂无资产，敬请期待'
            }
        },
        created() {
            
        },
        mounted() {

        },
        activated(){
            if (this.$route.meta.keep) {
            } else {
              this.isShow = false;
              this.isActive = false;
              this.time =  0;
              this.itemNo = 0;
            }
        },
        updated() {
            
        },
        methods: {
            keyCode(kc) {
                if (kc == "KeyBack") {
                    this.$router.push({ path:'/jx/index'});
                } else if (kc == "right") {
                    this.right();
                } else if (kc == "left") {
                    this.left();
                } else if (kc == "down") {
                        this.down();
                } else if (kc == "up") {
                    this.up();
                } else if (kc == "KeyEnter") {
                    this.KeyEnter();
                }
            },
            // addCss() {
            //     $('#Img' + this.itemNo).addClass('box_border');
            //     let p_title = $('.his_ul li').eq(this.itemNo).text();
            //     if (p_title.length > 8) {
            //         let id = '#Img' + this.itemNo;
            //         let speed = 40;
            //         const tab = document.querySelector(id + ' .s-title');
            //         const tab1 = document.querySelector(id + ' .s-title-name');
            //         const tab2 = document.querySelector(id + ' .s-title-temp');
            //         tab.style.textOverflow = 'clip';
            //         tab2.innerHTML = tab1.innerHTML;
            //         clearInterval(this.timer);
            //         this.timer = setInterval( function() {
            //              if (tab2.offsetWidth - tab.scrollLeft < 0) {
            //         tab.scrollLeft = 1; // 上面的写法会导致滚动时突然抖动                    console.log(tab.scrollLeft);
            //     } else {
            //         tab.scrollLeft += 2;
            //     }
            //         }, speed);
            //     }
            // },
            // removeCss() {
            //     $('#Img' + this.itemNo).removeClass('box_border');
            //     if (this.timer != 0) {
            //         clearInterval(this.timer);
            //         this.timer = 0;
            //         let id = '#Img' + this.itemNo;
            //         let tab = document.querySelector(id + ' .s-title');
            //         document.querySelector(id + ' .s-title-temp').innerHTML = '';
            //         tab.scrollLeft = 0;
            //         tab.style.textOverflow = 'ellipsis';
            //     }
            // },
            down() {
                if (this.itemNo==7||this.itemNo==8||this.itemNo==6) return;
                this.itemNo+=3;
                if (this.itemNo>=this.top[this.time].length-1) {
                    this.itemNo =this.top[this.time].length-1;
                }
            },
            up() {
                if (this.itemNo==0||this.itemNo==1||this.itemNo==2) return;
               this.itemNo-=3; 
            },
            split_array(arr, len){
                var a_len = arr.length;
                var result = [];    
                for(var i=0;i<a_len;i+=len)
                {        
                    result.push(arr.slice(i,i+len));    
                }    
                    return result;
            },
            right() {
                if (this.itemNo==2||this.itemNo==5||this.itemNo==8) {
                    if (this.time>=this.top.length-1){
                        return;
                    }else{
                        this.time++;
                        this.itemNo-=2;
                        if (this.itemNo>this.top[this.time].length-2) {
                            this.itemNo = 0;
                        }
                    }
                }else{
                    if (this.itemNo>=this.top[this.time].length-1)return;
                    this.itemNo++; 
                }
            },
            left() {
                if (this.itemNo <= 0 || this.itemNo ==3||this.itemNo==6) {
                    if (this.time<=0) {
                        this.isShow = false;
                        this.isActive = false;
                        this.$emit('Center', 'left');
                        this.itemNo = -1;
                    } else {
                        this.time--;
                        this.itemNo+=2;
                    }
                }else{
                    if (this.jsonUrl.length == 0) {
                    this.$emit('Center', 'left');
                    this.isShow = false;
                    this.isActive = false;
                    } else {
                        this.itemNo--;
                    }
                }
                
            },
            KeyEnter() {
                let url = this.top[this.time][this.itemNo];
                c.routerSkip(url.jsonUrl, "1", url.layout,{type:'filter'}, this.$router);
            },
            updateStast(pos) {
                this.isShow = true;
                this.isActive = true;
                if (pos == 'right') {
                    this.itemNo = 0;
                    this.op = 0;
                }
            },
            cEleOffsetTop(ele) {
                let fEleDistance = $(ele).offset();
                let realHeight = fEleDistance.top + 275;
                return realHeight;
            },
            change(br){
                if (br) {
                this.isList = true;
                } else {
                this.isList = false;
                }
            },
            
        },
        
        watch: {
            jsonUrl() {
                this.pagination = Math.floor(this.jsonUrl.length/ 9);
                this.op = 0;
                this.top = this.split_array(this.jsonUrl, 9);
                this.list = this.top.length-1;
            }
        },
        components: {

        }
    }

</script>
