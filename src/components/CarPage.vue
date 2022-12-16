<template>
  <div class="carPage">
    <div class="header1">
      <div class="header1-scut" @click="goPage('MainPage')">
        <div class="header1-scut-name">华工在线购物</div>
        <div class="header1-scut-url">WWW.SCUT.SHOPPING.COM</div>
      </div>
      <div class="header1-search">
        <input
          type="text"
          class="header1-search-input"
          placeholder="请输入"
          v-model="keyword"
        />
        <div class="header1-search-click" @click="gotoSearch('GoodList')">
          搜索
        </div>
      </div>
      <div class="header1-car" @click="gotoCar()">购物车结算</div>
      <div
        class="header1-login"
        @click="goPage('LoginPage')"
        v-if="user == null"
      >
        登录
      </div>
      <div class="header1-login" @click="gotoOrder()" v-else>
        {{ user.username }}的订单
      </div>
      <div
        class="header1-register"
        @click="goPage('RegisterPage')"
        v-if="user == null"
      >
        注册
      </div>
    </div>

    <div class="header">
      <div class="header-shopping-car">
        <span style="color: white">我的购物车</span>
        <span><button @click="handleBuy()">结算</button></span>
      </div>
      <div class="header-select-all">
        <!-- <span>
          <input type="checkbox" id="all">
          <label for="all">全选所有商品</label>
        </span>
        <span>价格</span> -->
      </div>
    </div>
    <div class="list">
      <template v-for="(item, index) in list" :key="item">
        <div class="list-item" v-if="list.length != 0">
          <input
            type="checkbox"
            class="TBmid"
            v-model="item.isSelect"
            style="cursor: pointer"
          />
          <img :src="item.goodsPicurl" />
          <div class="list-item-detail TBmid">
            {{ item.goodsName }}
          </div>
          <div class="main-detail-cont-num TBmid">
            <div @click="handleChangeNum(-1, index)">-</div>
            <div>{{ item.number }}</div>
            <div @click="handleChangeNum(1, index)">+</div>
          </div>

          <div class="list-item-info TBmid">
            <div class="list-item-info-price">
              ￥{{ item.price * item.number }}
            </div>
            <div
              class="list-item-info-opration"
              @click="handleDeleteGood(index)"
            >
              删除商品
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


  
  <script>
import { useStore } from "vuex";
import axios from "axios";
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
      carId: "",
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
      axios.get(url).then((data) => {
        this.list = data.data.result.itemList;
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].isSelect = false;
          this.list[i].number = this.list[i].itemCount;
          this.list[i].price = this.list[i].amount / this.list[i].itemCount;
        }
        this.carId = data.data.result.shoppingcartId;
        // console.log(this.carId);
        console.log(data);
      });
    },
    handleDeleteGood(index) {
      this.$confirm("是否删除该收获信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteGood(index)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteGood(index) {
      let newList = this.list;

      let amount = 0;

      let order = [];
      for (let i = 0; i < newList.length; i++) {
        if(i==index)continue;
        let k = order.length;
        order[k] = {};
        order[k].Amount = newList[i].amount;
        order[k].itemCount = newList[i].itemCount;
        order[k].goodsName = newList[i].goodsName;
        order[k].goodsId = newList[i].goodsId;

        amount += newList[i].amount;
      }

      // console.log(order);
      let data = {
        ShoppingcartId: this.carId,
        totalAmount: amount,
        realAmount: amount,
        itemList: order,
      };

      let url = `api/shoppingcart/updateShoppingcart`;

      axios({
        url: url,
        data: data,
        method: "post",
        contentType: "application/json;charset=utf-8",
      }) //传参
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            console.log(res);
            this.$message({
              type: "error",
              message: "删除成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "删除失败",
          });
        });
    },
    gotoSettle(json) {
      this.router.push({ name: "SettleAccount", params: { json: json } });
    },
    handleBuy() {
      let amount = 0;

      let order = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].isSelect) {
          let k = order.length;
          order[k] = {};
          order[k].Amount = this.list[i].amount;
          order[k].itemCount = this.list[i].itemCount;
          order[k].goodsName = this.list[i].goodsName;
          order[k].goodsId = this.list[i].goodsId;

          amount += this.list[i].amount;
        }
      }

      let data = {
        buyerId: this.user.id,
        sellerId: 1,
        totalAmount: amount,
        realAmount: amount,
        itemList: order,
      };

      if (order.length == 0) {
        this.$message({
          type: "error",
          message: "未选择商品",
        });
        return;
      }

      let url = `api/orderBase/createOrderBase`;

      axios({
        url: url,
        data: data,
        method: "post",
        contentType: "application/json;charset=utf-8",
      }) //传参
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            let data = res.data.result;
            let json = JSON.stringify(data);

            this.list = this.list.filter((item) => {
              return item.isSelect == false;
            });

            this.gotoSettle(json);
          } else {
            this.$message({
              type: "error",
              message: "添加失败",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "添加失败",
          });
        });
    },
    handleChangeNum(num, index) {
      if (
        num + this.list[index].number >= 1 &&
        num + this.list[index].number <= this.list[index].itemCount
      ) {
        console.log(num, this.list[index].number, this.list[index].itemCount);
        this.list[index].number = num + this.list[index].number;
      }
    },

    goPage(pageName) {
      this.router.push({ name: pageName });
    },
    gotoSearch() {
      this.router.push({
        name: "GoodList",
        params: { keyword: this.keyword, category: "" },
      });
    },

    gotoCar() {
      if (this.user == null) {
        this.$message({
          type: "error",
          message: "用户未登录",
        });
        return;
      }

      this.goPage("CarPage");
    },
    gotoOrder() {
      if (this.user == null) {
        this.$message({
          type: "error",
          message: "用户未登录",
        });
        return;
      }

      this.goPage("OrderPage");
    },
  },
};
</script>
  
<style scoped>
.header1 {
  padding-bottom: 30px;
  width: 1440px;
  display: inline-block;
  border-bottom: 1px solid #999;
}
.header1-scut {
  margin-left: 150px;
  width: 200px;
  display: inline-block;
  cursor: pointer;
}
.header1-scut-name {
  font-size: 30px;
  text-align: center;
}
.header1-scut-url {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}

.header1-search {
  display: inline-block;
  vertical-align: top;
  margin-left: 150px;
  margin-top: 20px;
}
.header1-search-input {
  display: inline-block;
  outline: none;
  width: 360px;
  height: 40px;
  padding-left: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid #999;
  box-sizing: border-box;
}
.header1-search-click {
  display: inline-block;
  height: 40px;
  width: 80px;
  text-align: center;
  line-height: 40px;
  background-color: #349efa;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  vertical-align: top;
  cursor: pointer;
}
.header1-car {
  display: inline-block;
  height: 25px;
  padding: 0 4px;
  margin-left: 150px;
  margin-top: 20px;
  line-height: 25px;
  text-align: center;
  vertical-align: top;
  border-radius: 5px;
  border: 1px solid #349efa;
  color: #349efa;
  cursor: pointer;
}
.header1-login {
  display: inline-block;
  height: 25px;
  margin-left: 100px;
  margin-top: 20px;
  line-height: 25px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
}
.header1-register {
  display: inline-block;
  height: 25px;
  margin-left: 10px;
  margin-top: 20px;
  line-height: 25px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
}

.carPage {
  margin: 0 auto;
  width: 1440px;
  margin-bottom: 200px;
}
.header-shopping-car > span:first-of-type {
  font-size: 30px;
  text-align: left;
  font-weight: bolder;
}
.header-shopping-car > span:last-of-type {
  display: flex;
  justify-content: flex-end;
}
.header-shopping-car > span:last-of-type > button {
  border: none;
  background-color: #ffeb3b;
  color: #222222;
  width: 120px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0;
  border-radius: 10px;
  cursor: pointer;
}
.header-select-all {
  font-size: 15px;
  color: steelblue;
  display: flex;
  padding: 10px;
  justify-content: space-around;
}
.header-select-all > span:last-of-type {
  color: #222222;
  margin-right: 0px;
}

.list {
  width: 1440px;
  margin: 0 auto;
  /* height: 500px; */
  padding: 50px 0;
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
  height: 200px;
  margin-top: 25px;
  margin-left: 15%;
}
.list-item div {
  display: inline-block;
  vertical-align: top;
  cursor: pointer;
}
.list-item div:hover {
  color: #349efa;
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

.main-detail-cont-num {
  left: 65%;
}
.main-detail-cont-num > div {
  margin-right: 10px;
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

.LRmid {
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
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
</style>