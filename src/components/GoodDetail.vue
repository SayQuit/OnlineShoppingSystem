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
      <div class="header-login" v-else>{{ user.username }}的订单</div>
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
          <div class="main-detail-cont-num">
            <div @click="handleChangeNum(-1)" style="border: none">-</div>
            <div style="background: #ddd; border: none">{{ number }}</div>
            <div @click="handleChangeNum(1)" style="border: none">+</div>
          </div>
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

      <!-- <div class="comment bgrwhite">
        <h1 class="registerTitle">评论</h1>
        <div class="comment-item">
          <div>用户13148739454</div>
          <div>
            外形外观：窄边框，43寸，看起来很精致的感觉。小米的产品做得越来越好，值得期待。
            运行速度：各个软件之间切换，很顺畅，可以自己下载安装不同的影视软件，方便追剧。
            屏幕音效：高清，就是不同，特别是播放一些4k片源，或高清的纪录片，感觉特别好看。
            功能效果：音量够大，开大了也不会破音。 送装一体：自己安装，很方便。
          </div>
          <div>2017-10-18</div>
        </div>

        <div class="comment-item">
          <div>用户13148739454</div>
          <div>
            2022新款，卧室的电视柜小，43寸尺寸刚刚好！
            没有挂墙，直接自己动手把两个脚装好了，方便的很！电视保护膜很好，撕掉很顺畅，也不留痕迹！
            色彩鲜艳，画质清晰，声音够响，到底是4k的，装好电视家后看电视很舒服！
            小米的桌面系统很不错，用着很顺手，各类软件安装也很方便，该款电视内置了小爱同学，再配合遥控器语音，操作太方便了！
            开机有广告，还能接受，看各类视频电影需要开通小米会员，可以理解！需要提醒的是该款电视是带杜比dts音效的，但只有开通会员才能享受！
          </div>
          <div>2017-10-18</div>
        </div>

        <div class="comment-item">
          <div>用户13148739454</div>
          <div>
            小米电视 X50 50英寸 金属全面屏 4KHDR超高清 运动补偿 远场语音
            智能教育电视L50M5-RK红米 Redmi
            电视，金属边框全面屏耀眼登场，让画面突破边界约束，带来更沉浸的视觉体验。质感，耐用，好看，真正的艺术在细节里。画面流畅，重低音音响系统，大存储，丰富接口。小米品质保证，京东服务一流！
          </div>
          <div>2017-10-18</div>
        </div>
      </div> -->
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
    };
  },
  mounted() {
    console.log(this.$route.params);
    this.detail = JSON.parse(this.$route.params.good);
    this.store = useStore();
    this.user = this.store.state.userInfo;

    // console.log(this.detail);
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
    handlePostCar() {
      if (this.user == null) {
        this.$message({
          type: "error",
          message: "用户未登录",
        });
        return;
      }
      // console.log(this.detail);
      let goods = {
        Amount: this.detail.price * this.number,
        itemCount: this.number,
        goodsName: this.detail.name,
        goodsId: this.detail.id,
      };

      let url = `api/shoppingcart/addGoodsItem`;

      axios({
        url: url,
        data: goods,
        method: "post",
        contentType: "application/json;charset=utf-8"
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
      this.router.push({ name: "GoodList", params: { keyword: this.keyword } });
    },
    handleBuy() {
      if (this.user == null) {
        this.$message({
          type: "error",
          message: "用户未登录",
        });
        return;
      }
      let good =[
        {
          Amount: this.detail.price * this.number,
          itemCount: this.number,
          goodsName: this.detail.name,
          goodsId: this.detail.id
        },
          ]
      ;

      let data = {
        buyerId: this.user.id,
        sellerId: 1,
        totalAmount: this.detail.price * this.number,
        realAmount: this.detail.price * this.number,
        itemList: good
      };
      // let testStr = encodeURIComponent(JSON.stringify(footerData));

      let url = `api/orderBase/createOrderBase`;

      axios({
        url: url,
        data: data,
        method: "post",
        contentType: "application/json;charset=utf-8"
      }) //传参
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            console.log("success");
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