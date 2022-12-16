<template>
  <div class="goodDetail">
    <div class="header">
      <div class="header-scut" @click="goPage('MainPage')">
        <div class="header-scut-name">华工在线购物</div>
        <div class="header-scut-url">WWW.SCUT.SHOPPING.COM</div>
      </div>
      <div class="header-search">
        <input
          type="text"
          class="header-search-input"
          placeholder="请输入"
          v-model="keyword"
        />
        <div class="header-search-click" @click="gotoSearch('GoodList')">
          搜索
        </div>
      </div>

      <div class="header-car" @click="gotoCar()">购物车结算</div>
      <div
        class="header-login"
        @click="goPage('LoginPage')"
        v-if="user == null"
      >
        登录
      </div>
      <div class="header-login" v-else @click="gotoOrder">{{ user.username }}的订单</div>
      <div
        class="header-register"
        @click="goPage('RegisterPage')"
        v-if="user == null"
      >
        注册
      </div>
    </div>

    <div class="main bgrcolor">
      <div class="main-shop bgrwhite">
        <div class="main-shop-name">
          <div>213宿舍购物商店</div>
        </div>
        <div class="main-shop-evaluate">
          <div class="main-shop-evaluate-block mid">
            <div class="main-shop-evaluate-block-item">
              <div>宝贝描述</div>
              <div>9.6</div>
            </div>
            <div class="main-shop-evaluate-block-item">
              <div>卖家服务</div>
              <div>9.8</div>
            </div>
            <div class="main-shop-evaluate-block-item">
              <div>物流服务</div>
              <div>9.7</div>
            </div>
          </div>
        </div>
        <div class="main-shop-chat">
          <div class="mid">咨询客服</div>
        </div>
      </div>
      <div class="main-detail bgrwhite">
        <div class="main-detail-img">
          <img :src="detail.logo" class="mid" style="height: 80%; width: 80%" />
        </div>
        <div class="main-detail-cont">
          <div class="main-detail-cont-title">
            {{ detail.name }}
          </div>
          <!-- <div class="main-detail-cont-sell">销量:193</div> -->
          <div class="main-detail-cont-price">￥{{ detail.price }}</div>
            <el-input-number
              v-model="number"
              :min="1"
              :max="this.detail.number"
              label="商品数量"
              style="margin-top: 80px"
            ></el-input-number>

          <div class="main-detail-cont-opration">
            <div class="main-detail-cont-opration-add" @click="handlePostCar">
              加入购物车
            </div>
            <div class="main-detail-cont-opration-buy" @click="handleBuy">
              购买
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
export default {
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  data() {
    return {
      detail: {},
      number: 1,
      user: null,
      keyword:''
    };
  },
  mounted() {
    this.detail = JSON.parse(this.$route.params.good);
    this.store = useStore();
    this.user = this.store.state.userInfo;

    
    console.log(this.detail);

  },
  methods: {
    handleChangeNum(num) {
      if (num + this.number >= 1 && num + this.number <= this.detail.number) {
        this.number = num + this.number;
      }
    },
    goPage(pageName) {
      this.router.push({ name: pageName });
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
    handlePostCar() {
      if (this.user == null) {
        this.$message({
          type: "error",
          message: "用户未登录",
        });
        return;
      }
      let good = {
        Amount: this.detail.price * this.number,
        itemCount: JSON.stringify(this.number),
        goodsName: this.detail.name,
        goodsId: this.detail.id,
      };

      let url = `api/shoppingcart/addGoodsItem`;

      axios({
        url: url,
        data: good,
        method: "post",
      }) //传参
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "添加成功",
            });
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
    gotoSearch() {
      this.router.push({
        name: "GoodList",
        params: { keyword: this.keyword, category: "" },
      });
    },
    gotoSettle(json){
      this.router.push({ name: "SettleAccount", params: { json: json } });
    },
    handleBuy() {
      if (this.user == null) {
        this.$message({
          type: "error",
          message: "用户未登录",
        });
        return;
      }
      let good = [
        {
          Amount: this.detail.price * this.number,
          itemCount: JSON.stringify(this.number),
          goodsName: this.detail.name,
          goodsId: this.detail.id,
        },
      ];

      let data = {
        buyerId: this.user.id,
        sellerId: 1,
        totalAmount: this.detail.price * this.number,
        realAmount: this.detail.price * this.number,
        itemList: good,
      };
      // let testStr = encodeURIComponent(JSON.stringify(footerData));

      let url = `api/orderBase/createOrderBase`;

      axios({
        url: url,
        data: data,
        method: "post",
        contentType:"application/json;charset=utf-8"
      }) //传参
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            let data=res.data.result
            let json=JSON.stringify(data)
            this.gotoSettle(json)

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
  },
};
</script>
<style scoped>
.comment {
  width: 1300px;
  margin: 0 auto;
  padding-bottom: 100px;
  padding: 50px 30px;
}
.registerTitle {
  height: 43px;
}
.registerTitle > h1 {
  float: left;

  font-size: 20px;
  color: #666666;
}
.goodDetail {
  margin: 0 auto;
  width: 1440px;
}
.bgrcolor {
  background-color: white;
}
.bgrwhite {
  background-color: white;
}
.header {
  padding-bottom: 30px;
  width: 1440px;
  display: inline-block;
}
.header-scut {
  margin-left: 150px;
  width: 200px;
  display: inline-block;
  cursor: pointer;
}
.header-scut-name {
  font-size: 30px;
  text-align: center;
}
.header-scut-url {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}

.header-search {
  display: inline-block;
  vertical-align: top;
  margin-left: 150px;
  margin-top: 20px;
}
.header-search-input {
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
.header-search-click {
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
.header-car {
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
.header-login {
  display: inline-block;
  height: 25px;
  margin-left: 100px;
  margin-top: 20px;
  line-height: 25px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
}
.header-register {
  display: inline-block;
  height: 25px;
  margin-left: 10px;
  margin-top: 20px;
  line-height: 25px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
}
.main {
  width: 100%;
  padding: 100px 0;
}
.main-shop {
  width: 1300px;
  margin: 0 auto;
  display: block;
  border-radius: 80px;
  height: 80px;
  display: flex;
  padding: 3% 0;

  border: 1px solid;
  margin-bottom: 100px;
}
.main-shop-name {
  flex: 1;
  position: relative;

  border-right: 1px solid #888;
}
.main-shop-name > div {
  font-size: 28px;
  font-weight: 700;
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 80px;
  text-align: center;
}
.main-shop-evaluate {
  flex: 1;
  position: relative;
}
.main-shop-chat {
  flex: 1;
  position: relative;
}
.main-shop-chat > div {
  border-radius: 15px;
  width: 25%;
  height: 40%;
  text-align: center;
  line-height: 30px;
  border: 1px solid #999;
  cursor: pointer;
}
.mid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.main-shop-evaluate-block {
  width: 100%;
  height: fit-content;
  display: flex;
}
.main-shop-evaluate-block-item {
  flex: 1;
}
.main-shop-evaluate-block-item > div {
  text-align: center;
}
.main-detail {
  /* margin-top: 100px; */
  height: 800px;
  width: 1300px;
  margin: 0 auto;
  border-radius: 80px;
  display: flex;
  margin-bottom: 100px;
  border: 1px solid;
}
.main-detail-img {
  flex: 1;
  position: relative;
}

.main-detail-cont {
  flex: 1;
  padding: 10% 0;
  padding-right: 7.5%;
}
.main-detail-cont-title {
  font-size: 24px;
}
.main-detail-cont-sell {
  margin: 3% 0;
}
.main-detail-cont-price {
  font-size: 24px;
  color: #ce0000;
  margin-top: 50px;
}
.main-detail-cont-opration {
  margin-top: 15%;
  font-size: 24px;
  width: fit-content;
}
.main-detail-cont-opration-buy {
  display: inline-block;
  padding: 2% 0;
  width: 250px;
  text-align: center;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  background-color: #faa670;
  color: white;
  cursor: pointer;
}
.main-detail-cont-opration-add {
  display: inline-block;
  padding: 2% 0;
  width: 250px;
  text-align: center;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  color: white;
  background-color: #f95570;
  cursor: pointer;
}

.main-detail-cont-num {
  margin-top: 50px;
}
.main-detail-cont-num > div {
  display: inline-block;
  width: 50px;
  text-align: center;
  height: 50px;
  vertical-align: top;
  background-color: #ddd;
  line-height: 50px;
  cursor: pointer;
}
.main-detail-cont-num > input {
  height: 50px;
  vertical-align: top;
  border: none;
  width: 100px;
  padding-left: 10px;
  margin: 0 5px;
  background-color: #ddd;
}
.comment-item {
  margin: 10px 0;
}
</style>