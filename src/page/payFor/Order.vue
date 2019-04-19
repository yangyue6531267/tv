<template>
  <div class='creatOrder'>
    <h1 class="orderTitle">订购页面</h1>
    <div class="orderList">
      <ul>
        <li v-for="(item,index) in orderList" :key="'order'+index" :class="{'orderFocus':itemNo===index&&pos===0}">
          <div class="orderDetail">
            <div class="orderName">
              <p>{{item.name}}</p>
            </div>
          </div>
          <div class="orderPrice">
            <p>{{item.price}}元/月</p>
          </div>
          <div class="orderTime">
            <p>(有效期:{{item.expirydata}})</p>
          </div>
        </li>
      </ul>
    </div>
    <div :class="{'orderButtonFocus':pos ===1,'orderBottom':true}">
      <span>暂不订购</span>
      <i></i>
    </div>
    <keyDo v-on:listenKeyCode="keyCode" v-if="isShow" ref="keyDo"></keyDo>
  </div>
</template>
<style scoped>
  .creatOrder{
    position: absolute;
    width: 1280px;
    height: 720px;
    background: url('../../assets/payfor/orderBg.png') no-repeat;
    background-size: 100% 100%;
  }
  .orderTitle{
    position: absolute;
    color: #AC9065;
    font-size: 41px;
    top: 40px;
    left: 52px;
    width: 164px;
    height: 57px;
    text-align: center;
    font-weight: 400;
  }
  .orderList{
    position: absolute;
    top: 250px;
    left: 180px;
    width: 950px;
    height: 175px;
  }
  .orderList li{
    list-style: none;
    float: left;
    width: 270px;
    height: 170px;
    margin-right: 33px;
    border-radius: 20px;
    background: url('../../assets/payfor/order_init.png') no-repeat;
    background-size: 100% 100%;
  }
  .orderFocus{
    background: url('../../assets/payfor/orderFocus.png') no-repeat !important;
    background-size: 100% 100%;
    box-shadow: black 10px 10px 10px;
  }
  .orderName{
    position: relative;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 35px;
    font-weight: bolder;
  }
  .orderPrice{
    position: relative;
    width: 100%;
    height: 50px;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    color: #FFB43B;
    letter-spacing: 2px;
  }
  .orderTime{
    position: relative;
    width: 100%;
    height: 50px;
    font-size: 25px;
    text-align: center;
    line-height: 25px;
    color: #FFB43B;
    letter-spacing: 3px;
  }
  .orderBottom{
    position: absolute;
    top: 624px;
    left: 42px;
    width: 207px;
    height: 60px;
    background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.3) 100%
    );
    border-radius: 15px;
  }
  .orderButtonFocus{
    background: #0098BC;
    border: 2px solid #FFFFFF;
  }
  .orderBottom span{
    position: absolute;
    width: 130px;
    height: 100%;
    padding-left: 20px;
    text-align: left;
    line-height: 58px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 2px;
  }
  .orderBottom i{
    position: absolute;
    width: 25px;
    height: 25px;
    left: 150px;
    top: 17px;
    background: url('../../assets/payfor/close.png') no-repeat;
    background-size: 100% 100%;
  }
</style>
<script>
import {bi} from '../../js/logApi.js'
import c from '../../js/common.js'
export default {
  data (){
    return {
      orderList: [
        {name: '赛驰电竞', price: '18', expirydata: '一个月', productType: 1, id: 0},
        {name: '小鬼当家', price: '20', expirydata: '一个月', productType: 1, id: 1},
        {name: '3元单点', price: '3', expirydata: '2天', productType: 0, id: 2}
      ],
      isShow: true,
      itemNo: 1,
      pos: 0,
      order_msg: '订购失败',
      preView: 0
    }
  },
  methods: {
    keyCode (kc) {
      if (kc == 'down') {
        if (this.pos === 0){
          this.pos = 1;
        }
      } else if (kc == 'up') {
        if (this.pos === 1){
          this.pos = 0;
        }
      } else if (kc == 'left') {
        if (this.pos === 0){
          if (this.itemNo === 0) return;
          this.itemNo--;
        }
      } else if (kc == 'right') {
        if (this.pos === 0){
          if (this.itemNo >= (this.orderList.length - 1)) return;
          this.itemNo++;
        }
      } else if (kc == 'KeyEnter') {
        var logOb = {
          pkg_type: this.orderList[this.itemNo].productType,
          pkg_id: this.orderList[this.itemNo].id,
          pkg_price: this.orderList[this.itemNo].price,
          action: '1',
          order_msg: this.order_msg,
          parent_page_id: c.getParentPageId(),
          parent_page_type: c.getParentPageType(),
          preview: this.preView
        };
        bi.order(logOb);
      } else if (kc == 'KeyBack') {
        // this.$router.push({name: 'detail'});
        this.$router.go(-1);
      }
    }
  }
}
</script>
