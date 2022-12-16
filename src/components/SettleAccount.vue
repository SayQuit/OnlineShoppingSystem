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
          <a style="cursor: pointer" @click="addInfo()">新增收货地址+</a>
        </div>

        <template v-for="(item, index) in info" :key="item">
          <div class="address-info">
            <span
              style="cursor: pointer"
              class="address-info-select"
              v-if="item.select"
              @click="changeInfo(index)"
              >{{ item.name }}</span
            >
            <span
              style="cursor: pointer"
              class="address-info-notSelect"
              v-else
              @click="changeInfo(index)"
              >{{ item.name }}</span
            >

            <span>{{ item.phone }}</span>
            <span>{{ item.address }}</span>
            <a
              class="icon-beautyEdit"
              style="cursor: pointer"
              @click="deleteInfo(index)"
              >删除</a
            >
          </div>
        </template>

        <div class="address-info" v-if="showEdit">
          <div>
            <span style="margin-right: 20px">名字</span
            ><input type="text" v-model="editName" />
          </div>
          <div>
            <span style="margin-right: 20px">手机</span
            ><input type="text" v-model="editPhone" />
          </div>
          <div>
            <span style="margin-right: 20px">地址</span
            ><input type="text" v-model="editAddress" />
          </div>
          <div>
            <span
              style="border: 1px solid;
                padding: 0 10px;
                margin-right: 20px;
                cursor: pointer;
              "
              @click="makeSureInfo()"
              >确定</span
            ><span
              style="border: 1px solid; padding: 0 10px; cursor: pointer"
              @click="cancelInfo()"
              >取消</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="list">
      <template v-for="item in order.itemList" :key="item">
        <div class="list-item" v-if="order.itemList.length != 0">
          <img src="../assets/goodgood.jpg">
          <div class="list-item-detail TBmid">
            {{ item.goodsName }}
          </div>
          <div class="main-detail-cont-num TBmid">
            <div>{{ item.itemCount }}</div>
          </div>

          <div class="list-item-info TBmid">
            <div class="list-item-info-price">￥{{ item.amount }}</div>
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
        <span
          ><i>{{ order.itemList.length }}</i> 件商品，总商品金额：</span
        >
        <span>&yen;{{ totalPrice }}</span>
      </div>
      <div class="account-pay">
        <span>
          应付总额： <i>&yen;{{ totalPrice }}</i></span
        >
        <span>寄送至：{{ address }}</span>
      </div>
    </div>
    <div class="pay-method">
      <div class="pay-head">支付方式</div>
      <div class="pay-info">
        <span class="icon-alipay">支付宝</span>
        <span class="icon-wechat">微信支付</span>
        <span>货到付款</span>
      </div>
      <div class="account-btn">
        <button style="cursor: pointer">提交订单</button>
      </div>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";
// import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  data() {
    return {
      list: [],
      user: {},
      store: {},
      info: [],
      showEdit: 0,
      editName: "",
      editAddress: "",
      editPhone: "",
      totalPrice: 0,
      address: "",
      order: {},
    };
  },
  beforeMount() {
    this.store = useStore();
    this.user = this.store.state.userInfo;
    this.order = JSON.parse(this.$route.params.json);
    this.getLocalStorageInfo();
    this.updateAddress();
    this.getTotalPrice();
  },

  methods: {
    handleBuy() {
      if (this.address == "") {
        this.$message({
          type: "error",
          message: "未填写地址",
        });
        return;
      }
    },
    updateAddress() {
      for (let i = 0; i < this.info.length; i++) {
        if (this.info[i].select == true) {
          this.address = this.info[i].address;
          break;
        }
      }
    },
    getTotalPrice() {
      let t = 0;
      for (let i = 0; i < this.order.itemList.length; i++) {
        t += this.order.itemList[i].amount;
      }
      this.totalPrice = t;
    },
    deleteInfo(index) {
      this.$confirm("是否删除该收获信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.info.splice(index, 1);
          this.localStorageInfo();
          this.updateAddress();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getLocalStorageInfo() {
      if (JSON.parse(localStorage.getItem("shopping_info")))
        this.info = JSON.parse(localStorage.getItem("shopping_info"));
    },
    localStorageInfo() {
      localStorage.setItem("shopping_info", JSON.stringify(this.info));
    },
    addInfo() {
      this.showEdit = 1;
    },
    changeInfo(index) {
      this.clearChoose();
      this.info[index].select = true;
      this.localStorageInfo();

      this.updateAddress();
    },
    clearChoose() {
      for (let i = 0; i < this.info.length; i++) {
        this.info[i].select = false;
      }
    },
    makeSureInfo() {
      this.clearChoose();
      let data = {
        address: this.editAddress,
        name: this.editName,
        phone: this.editPhone,
        select: false,
      };

      this.info[this.info.length] = data;

      this.info[this.info.length - 1].select = true;

      this.localStorageInfo();
      this.updateAddress();

      this.$message({
        type: "success",
        message: "添加成功",
      });

      this.showEdit = 0;
      (this.editAddress = ""), (this.editName = ""), (this.editPhone = "");
    },
    cancelInfo() {
      this.showEdit = 0;
      (this.editAddress = ""), (this.editName = ""), (this.editPhone = "");
    },
  },
};
</script>

<style scoped>
.list {
  width: 1440px;
  margin: 50px auto;
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
  margin-left: 5%;
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
.address-info > .address-info-select {
  width: 120px;
  height: 30px;
  border: 3px solid #349efa;
  border-radius: 10px;
  text-align: center;
  margin-right: 10px;
  font-size: 16px;
  line-height: 30px;
}
.address-info > .address-info-notSelect {
  width: 120px;
  height: 30px;
  border: 3px solid #999;
  border-radius: 10px;
  text-align: center;
  margin-right: 10px;
  font-size: 16px;
  line-height: 30px;
}
.address-info > span {
  line-height: 30px;
  font-size: 16px;
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