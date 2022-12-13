<template>
  <div class="detailPage">
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
      <div class="header-login" v-else>{{ user.username }}的订单</div>
      <div
        class="header-register"
        @click="goPage('RegisterPage')"
        v-if="user == null"
      >
        注册
      </div>
    </div>
    <div style="width: 100%">
      <img src="../assets/background.jpg" style="width: 100%" />
    </div>

    <div class="nav">
      <div class="nav-item">
        <img src="../assets/ger.jpg" style="width: 100%" />
      </div>
      <div class="nav-item">
        <img src="../assets/jpn.jpg" style="width: 100%" />
      </div>
      <div class="nav-item">
        <img src="../assets/eng.jpg" style="width: 100%" />
      </div>
      <div class="nav-item">
        <img src="../assets/usa.jpg" style="width: 100%" />
      </div>
    </div>

    <div class="goods">
      <template v-for="item in list" :key="item">
        <div class="goods-item" @click="gotoDetail(item)">
          <div class="goods-item-image">
            <img :src="item.logo" class="mid" />
          </div>
          <div class="goods-item-desc">{{ item.name }}</div>
          <div class="goods-item-price">￥{{ item.price }}</div>
        </div>
      </template>
    </div>

    <div class="page">
      <span class="page-num" @click="subPage()">&lt;</span>
      <template v-for="item in maxPage" :key="item">
        <span
          class="page-num"
          v-if="item != Number(pageNo + 1)"
          @click="changePage(item)"
          >{{ item }}</span
        >
        <span class="page-num page-choosenum" v-else>{{ item }}</span>
      </template>
      <span class="page-num" @click="addPage()">></span>

      <!-- <span>
        <span>跳至</span>
        <input type="number" class="page-input" />
        <span>页</span>
      </span> -->
    </div>

    <div class="footer">
      <div class="footer-main">
        <div class="footer-main-item">帮助</div>
        <div class="footer-main-item">隐私</div>
        <div class="footer-main-item">条款</div>
      </div>
      <div class="footer-copyright">copyright@2017蚂蚁金服体验技术部出品</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
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
      user: null,
      pageNo: 0,
      maxPage: 9,
    };
  },
  beforeMount() {
    this.store = useStore();
    this.user = this.store.state.userInfo;
    this.getList();
  },
  mounted() {},
  methods: {
    goPage(pageName) {
      this.router.push({ name: pageName });
    },
    gotoDetail(item) {
      // console.log(JSON.stringify(item));
      this.router.push({
        name: "GoodDetail",
        params: { good: JSON.stringify(item) },
      });
    },
    getList() {
      let url = "api/index/queryGoods?pageNo=0";
      axios.get(url).then((data) => {
        if (data.data.code == 200) {
          this.list = data.data.result;
        }
        console.log(this.list);
        // let url=`/shoppingcart/addGoodsItem?goods=${this.list}`
        // console.log(url);
      });
    },
    gotoSearch() {
      this.router.push({ name: "GoodList", params: { keyword: this.keyword } });
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


    changePage(item){
      this.pageNo=item-1
      this.changeNo()
      this.getList()
    },
    subPage(){
      this.pageNo=this.pageNo-1
      this.changeNo()
      this.getList()
    },
    addPage(){
      this.pageNo=this.pageNo+1
      this.changeNo()
      this.getList()
    },
  },
};
</script>

<style scoped>
.mid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.detailPage {
  margin: 0 auto;
  width: 1440px;
}
.header {
  padding-bottom: 30px;
  width: 100%;
  display: inline-block;
  border-bottom: 1px solid #999;
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
.nav {
  display: flex;
  height: 300px;
  width: 100%;

  border-bottom: 1px solid #999;
}
.nav-item {
  padding: 1%;
  flex: 1;

  box-sizing: border-box;
}
.goods {
  width: 100%;
  margin-top: 30px;
}
.goods-item {
  height: 270px;
  padding: 10px;
  width: 18%;
  display: inline-block;
  box-sizing: border-box;
  margin: 1%;
  border-radius: 10px;
  box-shadow: 0;
  cursor: pointer;
  border: none;

  border: 1px solid #ddd;
  box-shadow: 4px 4px 20px -8px rgba(0, 0, 0, 0.25);
  vertical-align: top;
}
.goods-item-image {
  height: 60%;
  position: relative;
  margin: 10px;
  box-sizing: border-box;
}

.goods-item .goods-item-image img {
  height: 100%;
}
.goods-item-desc {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 20px 0 10px;
}
.goods-item-price {
  color: #ce0000;
  font-size: 18px;
}
.footer {
  margin-top: 200px;
  width: 100%;
  margin-bottom: 20px;
}
.footer-main {
  display: flex;

  align-content: center;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
.footer-main-item {
  margin-right: 3%;
  display: inline-block;
}
.footer-main-item:last-of-type {
  margin-right: 0;
}
.footer-copyright {
  width: 100%;
  text-align: center;
}
.page {
  padding: 50px 0;
  display: block;
  margin: 0 auto;
  width: fit-content;
}
.page-num {
  width: 40px;
  height: 40px;
  background-color: white;
  display: inline-block;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #888;
  border-radius: 10px;
  margin: 0 6px;
  color: #444;
  cursor: pointer;
}
.page .page-choosenum {
  background-color: #349efa;
  color: white;
  border: none;
}
.page span {
  font-size: 16px;
}
.page-input {
  width: 50px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #888;
  margin: 0 4px;
}
</style>