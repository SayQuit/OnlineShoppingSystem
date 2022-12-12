<template>
  <div class="mainPage">
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

    <div class="nav">
      <div class="nav-item">探索发现</div>
      <div class="nav-item">精选男装</div>
      <div class="nav-item">品质女装</div>
      <div class="nav-item">家居生活</div>
      <div class="nav-item">数码电器</div>
      <div class="nav-item">母婴生活</div>
      <div class="nav-item">奢华品质</div>
      <div class="nav-item">学生优惠</div>
    </div>

    <div class="swiper">
      <div class="block">
      <el-carousel autoplay>
        <el-carousel-item v-for="item in swiper" :key="item">
          <img :src="item.img" style="width:100%;height:100%">
        </el-carousel-item>
      </el-carousel>
    </div>

    </div>



    <div class="main">
      <div class="main-nav">
        <div class="main-nav-title">分类</div>
        <template v-for="item in category" :key="item">
          <div class="main-nav-item-item" @click="gotoCategory(item.name)">
            {{ item.name }}
          </div>
        </template>
      </div>
      <div class="main-user">
        <div class="main-user-profile">
          <div class="main-user-profile-item">
            <div class="main-user-profile-item-image mid">
              <img
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
            </div>
            <div class="main-user-profile-desc" v-if="user == null">
              你好呀!SCUTer~
            </div>
            <div class="main-user-profile-desc" v-else>
              你好呀!{{ user.username }}
            </div>
          </div>
          <div></div>
        </div>
        <div class="main-user-operation">
          <div class="main-user-operation-login">
            <div
              class="main-user-operation-login-button mid"
              @click="goPage('LoginPage')"
            >
              <div style="width: fit-content; height: fit-content" class="mid">
                登录
              </div>
            </div>
          </div>
          <div class="main-user-operation-register">
            <div
              class="main-user-operation-register-button mid"
              @click="goPage('RegisterPage')"
            >
              <div style="width: fit-content; height: fit-content" class="mid">
                注册
              </div>
            </div>
          </div>
        </div>
        <div class="main-user-nav">
          <div class="main-user-nav-item">
            <div class="main-user-nav-item-image">
              <img src="../assets/eat.png" class="mid" />
            </div>
            <div class="main-user-nav-item-desc">购物车</div>
          </div>

          <div class="main-user-nav-item">
            <div class="main-user-nav-item-image">
              <img src="../assets/eat.png" class="mid" />
            </div>
            <div class="main-user-nav-item-desc">购物车</div>
          </div>

          <div class="main-user-nav-item">
            <div class="main-user-nav-item-image">
              <img src="../assets/eat.png" class="mid" />
            </div>
            <div class="main-user-nav-item-desc">购物车</div>
          </div>

          <div class="main-user-nav-item">
            <div class="main-user-nav-item-image">
              <img src="../assets/eat.png" class="mid" />
            </div>
            <div class="main-user-nav-item-desc">购物车</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomNav">
      <div class="bottomNav-item" @click="goPage('FourCountry')">
        <div class="bottomNav-item-item1">
          <img src="../assets/bnav1.jpg" />
          <div>四国直邮纵享世界</div>
        </div>
      </div>

      <div class="bottomNav-item" @click="goPage('FourCountry')">
        <div class="bottomNav-item-item2">
          <div class="bottomNav-item-item2-title">奥莱折扣低至一折</div>
          <div class="bottomNav-item-item2-item">
            <img src="../assets/item2-1.jpg" />
            <div>当月福利</div>
          </div>
          <div class="bottomNav-item-item2-item">
            <img src="../assets/item2-2.jpg" />
            <div>年度低价爆款</div>
          </div>
          <div class="bottomNav-item-item2-item">
            <img src="../assets/item2-3.jpg" />
            <div>3~5折区</div>
          </div>
          <div class="bottomNav-item-item2-item">
            <img src="../assets/item2-4.jpg" />
            <div>5~7折区</div>
          </div>
          <div class="bottomNav-item-item2-item"></div>
          <div class="bottomNav-item-item2-item"></div>
          <div class="bottomNav-item-item2-item"></div>
        </div>
      </div>

      <div class="bottomNav-item" @click="goPage('FourCountry')">
        <div class="bottomNav-item-item1">
          <img src="../assets/bnav3.jpg" />
          <div>潮流新品研究会</div>
        </div>
      </div>
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
import { useStore } from "vuex";
import axios from "axios";
export default {
  setup() {
    const router = useRouter();
    let keyword = "";
    return {
      router,
      keyword,
    };
  },
  data() {
    return {
      user: null,
      category: null,
      swiper:[
        {
          img:require('../assets/swiper1.jpg')
        },
        {
          img:require('../assets/swiper2.jpg')
        },
        {
          img:require('../assets/swiper3.jpg')
        }
      ]
    };
  },

  beforeMount() {
    this.getIndex();
  },

  mounted() {
    this.store = useStore();
    // console.log(this.store.state);
    this.user = this.store.state.userInfo;
    // console.log(this.store.state);
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
    getIndex() {
      let url = "api/index/indexView";
      axios.get(url).then((data) => {
        console.log(data);
        this.category = data.data.result.categories;
      });
    },
    gotoCategory(name) {
      this.router.push({
        name: "GoodList",
        params: { keyword: "", category: name },
      });
    },
  },
};
</script>
  
  <style scoped>
.mainPage {
  margin: 0 auto;
  width: 1440px;
}
.header {
  padding-bottom: 30px;
  width: 1440px;
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
  width: 1440px;
  display: flex;
  height: fit-content;
}
.nav div {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
}
.nav div:hover {
  border-bottom: 2px solid #349efa;
  cursor: pointer;
  box-sizing: border-box;

  color: #349efa;
}

.swiper {
  width: 100%;
}
.swiper img {
  width: 100%;
}

.main {
  width: 100%;
  padding: 30px;
}
.main-nav {
  width: 30%;
  display: inline-block;
  vertical-align: top;
  padding-bottom: 10px;
  margin-right: 5%;

  border-radius: 10px;
  padding: 0 30px 10px;
  box-sizing: border-box;
  border: 1px solid #999;
}
.main-nav-title {
  height: 20%;
  width: 100%;
  border-bottom: 1px solid #999;

  line-height: 80px;

  box-sizing: border-box;

  font-size: 26px;
  color: #333;
}
.main-nav-item {
  height: 15%;
  width: 100%;
  box-sizing: border-box;

  padding: 0 30px;
  line-height: 64px;
  vertical-align: top;

  display: inline-block;
}
.main-nav-item-item {
  display: inline-block;

  width: 33%;
  text-align: center;

  line-height: 64px;
  vertical-align: top;

  font-size: 18px;

  cursor: pointer;
}
.main-nav-item-item:hover {
  color: skyblue;
}
.main-nav-item-image {
  height: 100%;
  width: 64px;

  display: inline-block;
}
.main-nav-item-image img {
  height: 100%;
  width: 100%;

  display: inline-block;
}
.main-user {
  width: 60%;
  display: inline-block;
  height: 450px;
  border: 1px solid #999;
  border-radius: 10px;
  vertical-align: top;

  flex-direction: column;
  padding: 0 5%;
  box-sizing: border-box;
  background-color: #f0f8fa;
}
.main-user-profile {
  height: 40%;
  position: relative;
}
.main-user-profile-item {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 20px;
}
.mid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.main-user-profile-desc {
  text-align: center;
  width: 100%;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
}
.main-user-profile-item-image {
  width: 100px;
  height: 100px;
}
.main-user-profile-item-image img {
  width: 100px;
  height: 100px;
  border-radius: 80px;
  border: 1px solid #999;
}
.main-user-operation {
  height: 25%;
  width: 100%;
  /* display: flex; */
  font-size: 20px;
}
.main-user-operation-login {
  position: relative;
  width: 40%;
  height: 100%;
  display: inline-block;
  margin-left: 10%;
}
.main-user-operation-login-button {
  background-color: #349efa;
  border-radius: 10px;
  line-height: 42px;
  text-align: center;
  display: inline-block;
  width: 40%;
  height: 40%;
  color: white;
  cursor: pointer;
}
.main-user-operation-register {
  position: relative;
  width: 40%;
  height: 100%;
  display: inline-block;
  margin-right: 10%;
}
.main-user-operation-register-button {
  border-radius: 10px;
  line-height: 42px;
  text-align: center;
  display: inline-block;
  width: 40%;
  height: 40%;
  cursor: pointer;

  color: #349efa;
  border: 3px solid #349efa;
}
.main-user-nav {
  height: 35%;
  /* padding: 0 10%; */
  display: flex;
}
.main-user-nav-item {
  flex: 1;
  cursor: pointer;
}
.main-user-nav-item-image {
  position: relative;
  width: 100%;
  height: 60%;
}
.main-user-nav-item-image img {
  width: 36%;
  height: 60%;
}
.main-user-nav-item-desc {
  text-align: center;
  font-size: 16px;
}
.bottomNav {
  display: flex;

  width: 100%;
  height: 500px;
}
.bottomNav-item {
  flex: 1;
  padding: 30px;
  cursor: pointer;
}
.bottomNav-item-item1 {
  width: 100%;
  height: 100%;

  border-radius: 10px;
  border: 1px solid #999;
}
.bottomNav-item-item1 img {
  width: 100%;
  border-radius: 10px;
}
.bottomNav-item-item1 div {
  line-height: 90px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}
.bottomNav-item-item2 {
  width: 100%;
  height: 100%;

  border-radius: 10px;
  border: 1px solid #999;
  padding: 0 10px;
}

.bottomNav-item-item2 .bottomNav-item-item2-title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;

  height: 16%;
  box-sizing: border-box;

  line-height: 60px;
}
.bottomNav-item-item2 .bottomNav-item-item2-item {
  width: 50%;
  height: 42%;
  display: inline-block;
  position: relative;
}
.bottomNav-item-item2 .bottomNav-item-item2-item img {
  padding: 5%;
  width: 100%;

  box-sizing: border-box;
  border-radius: 30px;
}
.bottomNav-item-item2 .bottomNav-item-item2-item div {
  text-align: center;
  width: 100%;
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

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>