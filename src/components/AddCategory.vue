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
        <span>添加分类板块</span>
        <div style="margin: 20px">填写分类信息</div>
      </div>
    </div>

    <div class="inputBlock">
      <div style="display: inline-block">
        <table>
          <tr>
            <td style="padding: 10px"><h1>分类名称:</h1></td>
            <td>
              <input
                type="text"
                style="padding: 0 10px"
                v-model="category.name"
              />
            </td>
            <!--              <td><p class="input_success">昵称</p></td>-->
          </tr>

          <tr>
            <td style="padding: 10px"><h1>图片地址:</h1></td>
            <td>
              <input
                type="text"
                style="padding: 0 10px"
                v-model="category.icon"
              />
            </td>
          </tr>
        </table>
      </div>

      <div v-if="category.icon">
        <img :src="category.icon" />
      </div>
    </div>
    <div class="button" @click="handlePostCategory()">确定上传</div>
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
      user: {},
      store: {},
      category: {
        icon: "",
        name: "",
      },
    };
  },
  beforeMount() {
    this.store = useStore();
    this.user = this.store.state.userInfo;
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
    handlePostCategory() {
      if (this.category.name == "" || this.category.icon == "") {
        this.$message({
          type: "error",
          message: "部分信息未填写",
        });
        return;
      }
      let url = `api/admin/addCategory`;
      axios({
        url: url,
        data: this.category,
        method: "post",
        contentType: "application/json;charset=utf-8",
      }) //传参
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.category = {
              name: "",
              icon: "",
            };
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
  border-radius: 0;
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
  overflow: hidden;
}
.header {
  padding-bottom: 30px;
  width: 1440px;
  display: inline-block;
  border-bottom: 1px solid #999;
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
.header-order-type > a {
  color: steelblue;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.header-order-type > span:last-of-type {
  color: #222222;
  margin-right: 0px;
}
.header-shopping-car > span:first-of-type {
  font-size: 30px;
  text-align: left;
  font-weight: bolder;
}
.header-shopping-car > span:last-of-type {
  display: flex;
  margin: 20px;
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
.inputBlock {
  width: auto;
  height: auto;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 50px;
}
.inputBlock > table {
  margin: 50px;
}
.inputBlock tr {
}
.inputBlock h1 {
  margin-right: 10px;

  line-height: 35px;
  color: #333;
  font-size: 20px;

  float: right;
}
.inputBlock p {
  display: inline-block;

  line-height: 35px;

  color: #b1191a;
  font-size: 10px;

  margin-left: 10px;
}
input {
  display: block;
  height: 50px;
  width: 700px;
  border-radius: 20px;
  border: 1px solid #999;

  margin: 0 auto;
}
.inputBlock .input_success {
  color: green;
}
.inputBlock .input_error {
  color: #b1191a;
}
.button {
  background-color: #b1191a;
  color: white;
  /* display: inline-block; */
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 30px;
  margin: 50px;
  cursor: pointer;
  float: right;
}
</style>