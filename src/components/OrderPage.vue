<template>
  <div class="orderPage">
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
      <div class="header1-login" @click="gotoOrder()" v-else>{{ user.username }}的订单</div>
      <div
        class="header1-register"
        @click="goPage('RegisterPage')"
        v-if="user == null"
      >
        注册
      </div>
    </div>

    <!-- <div class="header">
      
      <span style="color:white">我的购物车</span>
      <div class="header-order-type">
        <a href="">全部订单</a>
        <a href="">待付款</a>
        <a href="">待发货</a>
        <a href="">待评价</a>
        <span>价格</span>
      </div>
    </div> -->
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
    };
  },
  beforeMount() {
    this.store = useStore();
    this.user = this.store.state.userInfo;
    this.getList();
  },
  methods: {
    




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

      // 这里后面换成历史订单

      // let url = `api/orderBase/queryOrderBaseByUserId?userId=${this.user.id}`;
      // console.log(url);
      // axios.get(url).then((data) => {
      //   console.log(data);
      // });
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

.list {
  width: 1440px;
  margin: 0 auto;
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
  height: 200px;
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
.orderPage {
  margin: 0 auto;
  width: 1440px;
  margin-bottom: 200px;
}
.header {
  padding-bottom: 30px;
  width: 1440px;
  display: inline-block;
  /*border-bottom: 1px solid #999;*/
}
.header-my-order {
  font-size: 30px;
  text-align: left;
  font-weight: bolder;
}
.header-order-type {
  font-size: 15px;
  color: steelblue;
  display: flex;
  padding: 10px;
  justify-content: space-evenly;
}
.header-order-type > a{
  color: steelblue;
}
a{ text-decoration: none}
a:hover{ text-decoration: none}
.header-order-type > span:last-of-type{
  color: #222222;
  margin-right: 0px;
}
</style>