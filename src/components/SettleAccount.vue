<template>
  <div class="settleAccount">
    <div class="header">
      <div class="header-order-settlement">订单结算</div>
      <div class="header-fill-check">填写并核对订单信息</div>
    </div>
    <div class="address">
      <div class="edit-address">
        <div class="address-head">
          <span>收货人信息</span>
          <a>新增收货地址+</a>
        </div>
        <div class="address-info">
          <span>华工小羊人</span>
          <span>131****1618</span>
          <span
            >广东省 广州市 天河区 小谷围街道 外环东路382号
            华南理工大学大学城校区</span
          >
          <a class="icon-beautyEdit">编辑</a>
        </div>
      </div>
    </div>

    <div class="list">
      <template v-for="item in list" :key="item">
        <div class="list-item" v-if="list.length != 0">
          <img src="../assets/good.jpg" />
          <div class="list-item-detail TBmid">
            {{ item.goodsName }}
          </div>
          <div class="main-detail-cont-num TBmid">
            <div>{{ item.number }}</div>
          </div>

          <div class="list-item-info TBmid">
            <div class="list-item-info-price">
              ￥{{ item.price * item.number }}
            </div>
            <!-- <div class="list-item-info-opration">删除商品</div> -->
          </div>
        </div>
      </template>
    </div>

    <div class="shop-account-detail">
      <div class="account-all">
        <span>订单合计</span>
      </div>
      <div class="account-address">
        <span><i>3</i> 件商品，总商品金额：</span>
        <span>&yen;540.00</span>
        <span>运费：</span>
        <span><i>&yen;0.00</i></span>
        <span>商品优惠：</span>
        <span>-￥5.00</span>
      </div>
      <div class="account-pay">
        <span> 应付总额： <i>&yen;535.00 </i></span>
        <span
          >寄送至：广东省 广州市 天河区 小谷围街道 外环东路382号
          华南理工大学大学城校区</span
        >
      </div>
    </div>
    <div class="pay-method">
      <div class="pay-head">支付方式</div>
      <div class="pay-info">
        <span class="icon-alipay">支付宝</span>
        <span class="icon-wechat">微信支付</span>
        <span>货到付款</span>
      </div>
      <div class="account-btn"><button>提交订单</button></div>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";
import axios from "axios";
// import axios from "axios";
export default {
  data() {
    return {
      list: [],
      user: {},
      store: {},
    };
  },
  beforeMount() {
    this.store = useStore();
    this.user = this.store.state.userInfo;
    this.getList();
  },
  methods: {
    getList() {
      let url = `api/shoppingcart/queryByUserId?userId=${this.user.id}`;
      console.log(url);
      axios.get(url).then((data) => {
        this.list = data.data.result.itemList;
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].number = 1;
          this.list[i].price = this.list[i].amount / this.list[i].itemCount;
        }
        console.log(this.list);
      });
      // 这里后面换成当次购买订单
    },
  },
};
</script>

<style scoped>
.list {
  width: 1440px;
  margin: 50px auto;
  border-top: 1px solid #999;
  padding: 50px 0;
  /* height: 500px; */
}
.list-item {
  
  box-shadow: 0px 0px 20px -8px rgba(0, 0, 0, 1);
  margin-bottom: 50px;
  width: 100%;
  height: 250px;
  position: relative;
  border-radius: 20px;
}
.list-item img {
  width: 200px;
  height: 160px;
  margin-top: 25px;
  margin-left: 15%;
}
.list-item div {
  display: inline-block;
  vertical-align: top;
}
.list-item input {
  left: 3%;

  width: 50px;
  height: 50px;
}
.list-item-detail {
  width: 300px;
  height: fit-content;
  font-size: 18px;
  position: absolute;
  left: 40%;
}
.list-item-order {
  font-size: 18px;
}
.LRmid {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}

.TBmid {
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
}

.mid {
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
}

.main-detail-cont-num {
  left: 65%;
}
.main-detail-cont-num > div {
  display: inline-block;
  width: 50px;
  text-align: center;
  height: 50px;
  vertical-align: top;
  background-color: #fff;
  line-height: 50px;
  cursor: pointer;
  border: 1px solid #999;
  border-radius: 10px;
}
.main-detail-cont-num > input {
  vertical-align: top;
  border: none;
  padding-left: 10px;
  margin: 0 5px;
  background-color: #fff;
  width: 50px;
  text-align: center;
  height: 50px;
  border: 1px solid;
  padding: 0;
}
.list-item-info {
  left: 90%;
}
.list-item-info .list-item-info-price {
  font-size: 26px;
  color: #ce0000;
  display: block;
  margin-bottom: 20px;
}
.list-item-info-opration {
  width: 100%;
  text-align: center;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.settleAccount {
  margin: 0 auto;
  width: 1440px;
}
.header {
  padding-bottom: 30px;
  width: 1440px;
  display: inline-block;
  border-bottom: 1px solid #999;
}
.header-order-settlement {
  font-size: 30px;
  text-align: left;
  font-weight: bolder;
}
.address {
  padding: 10px;
}
.address-head {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.address-head > span {
  font-size: 18px;
  font-weight: bold;
  margin-left: 35px;
}
.address-head > a {
  color: #005ea7;
  font-size: 12px;
}
.address-head > a:hover {
  color: #e2231a;
}
.address-info {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}
.address-info > span:first-of-type {
  width: 120px;
  height: 30px;
  border: 3px solid #349efa;
  border-radius: 10px;
  text-align: center;
  margin-right: 10px;
  font-size: 16px;
  line-height: 30px;
}
.header-fill-check {
  width: 100%;
  text-align: left;
  margin-top: 10px;
  cursor: pointer;
  color: steelblue;
}

.main-detail-cont-num {
  left: 65%;
}

.list-item-info {
  left: 90%;
}
.list-item-info .list-item-info-price {
  font-size: 26px;
  color: #ce0000;
  display: block;
  margin-bottom: 20px;
}
.list-item-info-opration {
  width: 100%;
  text-align: center;
}
.shop-account-detail > .account-all {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.shop-account-detail > .account-all > span {
  font-size: 18px;
  font-weight: bold;
  margin-left: 35px;
}
.shop-account-detail > .account-address {
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 150px;
  grid-template-rows: repeat(3, 30px);
  justify-items: end;
}
.shop-account-detail > .account-address i {
  font-style: normal;
  color: #e2231a;
}
.shop-account-detail > .account-pay {
  height: 80px;
  background-color: #eee;
  border: 1px solid #ccc;
  display: flex;
  padding: 10px 20px 0 0;
  flex-direction: column;
  align-items: flex-end;
}
.shop-account-detail > .account-pay > span > i {
  font-style: normal;
  font-size: 20px;
  color: #e2231a;
}
.pay-method > .pay-head {
  font-size: 18px;
  font-weight: bold;
  margin-left: 35px;
  padding: 20px 0;
}
.pay-method > .pay-info {
  display: flex;
  align-items: center;
}
.pay-method > .pay-info > span:nth-of-type(1) {
  width: 100px;
  height: 30px;
  color: #027aff;
  border: 2px solid #027aff;
  margin: 10px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
.pay-method > .pay-info > span:nth-of-type(2) {
  width: 100px;
  height: 30px;
  color: #09bb07;
  border: 2px solid #09bb07;
  margin: 10px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
.pay-method > .pay-info > span:nth-of-type(3) {
  width: 100px;
  height: 30px;
  border: 2px solid #6c6c6c;
  margin: 10px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
.account-btn {
  display: flex;
  justify-content: flex-end;
}
.account-btn > button {
  border: none;
  background-color: #e2231a;
  color: #fff;
  width: 120px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
</style>