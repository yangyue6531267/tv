
<template>
    <div class="his_right">
        <div class="btn_num" :class="{'hover':isTop}">
        </div>
        <div class="left-icon" :class="{'accnone':time==0}"></div>
        <div class="left-icon1" :class="{'accnone':time==list||list <= 0}"></div>
        <div class="btn_center">
            <ul class="his_ul">
                <li v-for="(item,index) in top[time]" :key="item.id" :id="('Img'+index)" class="imgs">
                    <lazy-image 
                    :src='item.relateImg'
                    :placeholder='placeholder' 
                    :initScore='initScore' />
                    <div :class="{'hover':index==itemNo&&isShow&&!isTop}"></div>
                </li>
            </ul>
        </div>
        <div class="NoList" :class="{'accnone':isList}">{{text_list}}</div>
        <div class="hang" v-if="this.top.length>0" >{{time+1}}/{{this.list+1}}</div>
        <keyDo v-on:listenKeyCode="keyCode" v-if="isShow" ref="keyDo"></keyDo>
    </div>
</template>
<style scoped="hCenterssss">
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
    .left-icon1.accnone{
    display: none;
    }
    .left-icon{
    width: 66px;
    height: 66px;
    background: url(../../../static/images/category/111.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 841px;
    top:335px;
    }
    .left-icon1{
    width: 66px;
    height: 66px;
    background: url(../../../static/images/category/222.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 12px;
    top:335px;
    }
    .gunLun {
        width: 6px;
        height: 490px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 5px;
        margin-top: 45px;
        position: absolute;
        left: 1210px;
        top: 100px;
    }

    .hang {
        position: absolute;
        left: 842px;
        top: 625px;
        font-size: 20px;
        background: url(../../../static/images/history/861.png) no-repeat;
        background-size:100% 100%;
        width: 122px;
        height: 58px;
        text-align: center;
        line-height: 57px;
    }

    .gunLun .btn_nums {
        width: 10px;
        height: 140px;
        background: white;
        border-radius: 5px;
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
        margin-top:152px;
        margin-left:115px;
    }

    .imgs .hover {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../../static/images/special/915.png) no-repeat;
        background-size:100% 100%;
        z-index: 99; 
        left: 0px;
        top: 0px;
    }

    .his_right {
        width: 944px;
        height: 720px;
        overflow: hidden;
        float: left;
        position: relative;
    }

    .btn_num {
        position: absolute;
        width: 104px;
        height: 45px;
        overflow: hidden;
        top:28px;
        right: 106px;
        background: url('../../../static/images/history/1879.png') no-repeat;
        background-size: 100% 100%;
    }
    .btn_num.hover{
        background: url('../../../static/images/history/1775.png') no-repeat;
        background-size: 100% 100%;
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

    .imgss {
        width: 125px;
        height: 125px;
        float: left;
        margin: 40px 60px 110px 0;
        border-radius: 50%;
    }

    .imgss.box_border {
        border: 4px solid #ffffff;
        text-align: center;
        margin-bottom: 100px;
        margin-left: -4px;
        /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.55); */
        box-shadow: 0 0 15px #fff;

    }

    .his_ul {
        margin-left: 8px;
        display: -webkit-flex;
        /* Safari */
        display: flex;
        flex-wrap: wrap;
    }

    .imgss p {
        max-width: 125px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        width: 100%;
        height: 20px;
    }

    .sprite_img {
        width: 35px;
        height: 35px;
        padding: 5px 2.5px 7px 35px;
        /* background: url("../../assets/icon.png") no-repeat -35px -245px; */
    }

    .text-css {
        text-shadow: 0px 0px 15px #DBC473;
    }
</style>

<script>
    import {
        HTTPUtil as api
    } from '../../fetch/api.js'

    // import {
    //     bp as bi
    // } from '../js/ga.js'
    import { client as yh } from '../../js/client.js';
    import c from '../../js/common.js'
    export default {
        props: ['jsonUrl'],
        data() {
            return {
                num: 1,
                itemNo: 0,
                op: 0,
                isHis: false,
                isTop:false,
                placeholder: require('../../assets/img_loading_160x230.png'),
                initScore: require('../../assets/corner_mark.png'),
                isShow: false,
                numop: false,
                timer: null,
                time: 0,
                CLEARTIMES:null,
                userToken:'',
                top:'',
                list:'',
                isList:true,
                text_list:'暂无资产'
            }
        },
        activated(){
            if (!this.$route.meta.keep) {
                this.isShow = false;
                this.isTop = false;
                this.time =  0;
                this.itemNo = 0;
            }
        },
        created() {
        },
        mounted() {

        },
        updated() {},

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
            down() {
                if (this.isTop) {
                    this.isTop = false;
                } else {
                    if (this.itemNo==6||this.itemNo==7||this.itemNo==8) {
                        return;
                    } else {
                        this.itemNo+=3;
                        if (this.itemNo>this.top[this.time].length-1) {
                            this.itemNo = this.top[this.time].length-1;
                        }
                    }
                }
            },
            up() {
                if (this.isTop) return;
               if (this.itemNo==0||this.itemNo==1||this.itemNo==2) {
                   this.isTop = true;
               } else {
                 this.itemNo-=3;
               }
            },
            right() {
                if (this.isTop) return;
               if (this.itemNo==2||this.itemNo==5||this.itemNo==8) {
                   
                   if (this.itemNo>this.top[this.time].length-1) {
                    this.itemNo = this.top[this.time].length-1;
                    }else{
                        if (this.time>=this.top.length-1) {
                            return
                        } else {
                            this.time++;
                            this.itemNo-=2;
                            if (this.itemNo>this.top[this.time].length-1) {
                                this.itemNo = this.top[this.time].length-1;
                            }
                        }
                    }
               }else{
                    this.itemNo++;
                   if (this.itemNo>this.top[this.time].length-1) {
                    this.itemNo = this.top[this.time].length-1;
                    }
               }
               
            },
            left() {
                if (this.isTop) {
                    this.isTop = false;
                    this.$emit("Center", 'left');
                    this.isShow = false;
                } else {
                    if (this.itemNo==0||this.itemNo==3||this.itemNo==6) {
                        if (this.time==0) {
                            this.$emit("Center", 'left');
                            this.isShow = false;
                        }else{
                            this.time--;
                            this.itemNo+=2;
                        }
                    } else {
                        this.itemNo--;
                    }
                }
            },
            allDelCollect() {
                    let url = "http://47.97.96.103/uds/cloud/collection/del?version=1"
                    let data = {
                    siteId: yh.siteId,
                    userId: yh.userId,
                    }
                    api.post(url, data, (res) => {
                    console.log(res);
                    if (res.mes === "ok")
                        console.log("删除收藏成功");
                    })
                },
            KeyEnter() {
                if (this.isTop) {
                    this.isShow = false;
                    this.isTop = false;
                    if (this.isHis) {
                        localStorage.removeItem("historyList")
                    } else {
                        this.allDelCollect();
                    }
                    this.$emit("Center", 'KeyEnter', "", "","clear");
                } else {
                    let url = this.top[this.time][this.itemNo];
                    if (this.isHis) {
                        c.setParentPageType('0601');
                        c.setParentPageId('101-1');
                        c.routerSkip(url.jsonUrl, "1",url.layout, {type:'history'}, this.$router);
                    } else {
                        c.setParentPageType('0501');
                        c.setParentPageId('103-1');
                        if (url.collectType == 2) {
                                c.routerSkip(url.relateUrl, '5', url.relateLayout,'收藏跳入', this.$router);
                            }else{
                                c.routerSkip(url.relateUrl, "1",url.relateLayout, {type:'history'}, this.$router);
                            }
                        // c.routerSkip(url, "1", '', this.$router);
                        // this.$emit("Center", 'KeyEnter', url, "fall");
                        //            收藏点击
                    }
                    // this.isShow = false;
                }
                
            },
            change(pos){
                this.isList = pos;
            },
            updateStast(pos) {
                this.isShow = true;
                if (pos == 'right') {
                    this.itemNo = 0;
                    this.op = 0;
                }
                if (pos == 'remove' || pos == 'back') {
                    //            弹出页返回
                    this.itemNo = 0;
                    this.op = 0;
                    this.$emit("Center", 'json');
                }
            },
            cEleOffsetTop(ele) {
                let fEleDistance = $(ele).offset();
                let realHeight = fEleDistance.top + 275;
                return realHeight;
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
        },
        watch: {
            jsonUrl() {
                this.top = this.split_array(this.jsonUrl,9);
                this.list = this.top.length-1;
                this.time = 0;
                try {
                    if (this.top[0][0].bookMarkTime) {
                        this.isHis = true;
                    } else {
                        this.isHis = false;
                    }
                } catch (error) {
                    console.log(error);
                }
                this.op = 0;
            }
        },
        components: {

        }
    }

</script>
