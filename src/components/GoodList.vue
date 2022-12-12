<template>
  <div class="goodList">
    <div class="header">
      <div class="header-scut" @click="goPage('MainPage')">
        <div class="header-scut-name">华工在线购物</div>
        <div class="header-scut-url">WWW.SCUT.SHOPPING.COM</div>
      </div>
      <div class="header-search">
        <input type="text" class="header-search-input" placeholder="请输入"  v-model="keyword"/>
        <div class="header-search-click" @click="gotoSearch('GoodList')">搜索</div>
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

    <div class="bgrcolor" style="height: 1460px">
      <div>
        <div class="condition bgrwhite">
          <div class="condition-block">
            <div class="condition-block-title">分类:</div>
            <div class="condition-block-item" ref="condition1">
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>

              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
            </div>
            <div class="condition-block-pull">
              <div
                class="condition-block-pull-button"
                @click="handlePullDown(1)"
              >
                下拉/隐藏
              </div>
            </div>
          </div>

          <div class="condition-block">
            <div class="condition-block-title">分类:</div>
            <div class="condition-block-item" ref="condition2">
              <div class="isCondition">大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
            </div>
            <div class="condition-block-pull">
              <div
                class="condition-block-pull-button"
                @click="handlePullDown(2)"
              >
              下拉/隐藏
              </div>
            </div>
          </div>

          <div class="condition-block">
            <div class="condition-block-title">分类:</div>
            <div class="condition-block-item" ref="condition3">
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
              <div>手机相机</div>
              <div>大家电</div>
              <div>海外购</div>
            </div>
            <div class="condition-block-pull">
              <div
                class="condition-block-pull-button"
                @click="handlePullDown(3)"
              >
              下拉/隐藏
              </div>
            </div>
          </div>
        </div>
        <div class="rank bgrwhite">
          <p class="rank-title">SCUTer TOP 8</p>
          <div class="rank-sort">
            <li>
              <span class="rank-sort-num">1</span
              ><span class="rank-sort-link"
                >优奕酷 沙发
                北欧布艺客厅沙发小户型三人位乳胶沙发简约现代科技布实木沙发
                乳胶款（可定制科技布默认棉麻） 三人</span
              >
            </li>
            <li>
              <span class="rank-sort-num">2</span
              ><span class="rank-sort-link"
                >优奕酷 沙发
                北欧布艺客厅沙发小户型三人位乳胶沙发简约现代科技布实木沙发
                乳胶款（可定制科技布默认棉麻） 三人</span
              >
            </li>
            <li>
              <span class="rank-sort-num">3</span
              ><span class="rank-sort-link"
                >优奕酷 沙发
                北欧布艺客厅沙发小户型三人位乳胶沙发简约现代科技布实木沙发
                乳胶款（可定制科技布默认棉麻） 三人</span
              >
            </li>
            <li>
              <span class="rank-sort-num">4</span
              ><span class="rank-sort-link"
                >优奕酷 沙发
                北欧布艺客厅沙发小户型三人位乳胶沙发简约现代科技布实木沙发
                乳胶款（可定制科技布默认棉麻） 三人</span
              >
            </li>
            <li>
              <span class="rank-sort-num">5</span
              ><span class="rank-sort-link"
                >优奕酷 沙发
                北欧布艺客厅沙发小户型三人位乳胶沙发简约现代科技布实木沙发
                乳胶款（可定制科技布默认棉麻） 三人</span
              >
            </li>
            <li>
              <span class="rank-sort-num">6</span
              ><span class="rank-sort-link"
                >优奕酷 沙发
                北欧布艺客厅沙发小户型三人位乳胶沙发简约现代科技布实木沙发
                乳胶款（可定制科技布默认棉麻） 三人</span
              >
            </li>

            <li>
              <span class="rank-sort-num">7</span
              ><span class="rank-sort-link"
                >优奕酷 沙发
                北欧布艺客厅沙发小户型三人位乳胶沙发简约现代科技布实木沙发
                乳胶款（可定制科技布默认棉麻） 三人</span
              >
            </li>
            <li>
              <span class="rank-sort-num">8</span
              ><span class="rank-sort-link"
                >优奕酷 沙发
                北欧布艺客厅沙发小户型三人位乳胶沙发简约现代科技布实木沙发
                乳胶款（可定制科技布默认棉麻） 三人</span
              >
            </li>
          </div>
        </div>
      </div>

      <div class="goods bgrwhite">
        <template v-for="item in list" :key="item">
        <div class="goods-item" @click="gotoDetail(item)">
          <div class="goods-item-image">
            <img :src="item.logo" class="mid" />
          </div>
          <div class="goods-item-desc">{{item.name}}</div>
          <div class="goods-item-price">￥{{item.price}}</div>
        </div>
      </template>

        <!-- <div class="page">
          <span class="page-num">&lt;</span>
          <span class="page-num page-choosenum">1</span>
          <span class="page-num">2</span>
          <span class="page-num">3</span>
          <span class="page-num">4</span>
          <span class="page-num">5</span>
          <span class="page-num">6</span>
          <span class="page-num">7</span>
          <span class="page-num">8</span>
          <span class="page-num">></span>
          <span>
            <span>跳至</span>
            <input type="number" class="page-input" />
            <span>页</span>
          </span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
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
      list:[],
      keyword:"",
      categoryName:"",
      user: null,
    };
  },
  mounted(){
    this.$refs.condition1.style.overflow = "hidden"
    this.$refs.condition2.style.overflow = "hidden"
    this.$refs.condition3.style.overflow = "hidden"




  },
  beforeMount() {
    this.store = useStore();
    this.user = this.store.state.userInfo;
    this.keyword = this.$route.params.keyword;
    this.categoryName = this.$route.params.category;

    this.getList()
  },
  
  methods: {
    goPage(pageName) {
      this.router.push({ name: pageName });
    },
    gotoCar(){
      if (this.user == null) {
        this.$message({
          type: "error",
          message: "用户未登录",
        });
        return;
      }

      this.goPage("CarPage")

    },
    gotoDetail(item){
      // console.log(JSON.stringify(item));
      this.router.push({ name: "GoodDetail" , params: {good:JSON.stringify(item) }});
    },
    getList(){


      // console.log(`api/index/queryGoods?pageNo=1&goodsName=${this.keyword}`);
      // let url1 =
      //   `api/index/queryGoodsByName?pageNo=0&goodsName=${this.keyword}`;
      // axios.get(url1).then((data) => {
      //   console.log(data);
      //   if (data.data.code == 200) {
      //     this.list = data.data.result;
      //   }
      //   // console.log(this.list);
      // });

      console.log(this.keyword);
      let url=""
      if(this.keyword!=""&&this.categoryName==""){
        url = `api/index/queryGoodsByName?pageNo=0&goodsName=${this.keyword}`;
      }
      else if(this.keyword==""&&this.categoryName!=""){
        url = `api/index/queryGoodsByCat?pageNo=0&name=${this.categoryName}`;
      }
      else if(this.keyword!=""&&this.categoryName!=""){
        url = `api/index/queryGoodsByCatAndName?pageNo=0&name=${this.categoryName}&goodsName=${this.keyword}`;
      }
      else{
        url = `api/index/queryGoodsByName?pageNo=0&goodsName=${this.keyword}`;
      }

      console.log(url)
      console.log(this.keyword);
      axios.get(url).then((data) => {
        if (data.data.code == 200) {
          this.list = data.data.result;
        }
        console.log(data);
      });


    },
    handlePullDown(index) {
      if (index == 1) {
        if (this.$refs.condition1.style.overflow == "hidden") {
          this.$refs.condition1.style.overflow = "visible";
          this.$refs.condition1.style.zIndex = 100;
          this.$refs.condition1.style.height = "fit-content";
          this.$refs.condition1.style.border = "1px solid #888";
        }
        else{
          this.$refs.condition1.style.overflow = "hidden";
          this.$refs.condition1.style.zIndex = "";
          this.$refs.condition1.style.height = "100%";
          this.$refs.condition1.style.border = "none";
        }
      }
      if (index == 2) {
        if (this.$refs.condition2.style.overflow == "hidden") {
          this.$refs.condition2.style.overflow = "visible";
          this.$refs.condition2.style.zIndex = 100;
          this.$refs.condition2.style.height = "fit-content";
          this.$refs.condition2.style.border = "1px solid #888";
        }
        else{
          this.$refs.condition2.style.overflow = "hidden";
          this.$refs.condition2.style.zIndex = "";
          this.$refs.condition2.style.height = "100%";
          this.$refs.condition2.style.border = "none";
        }
      }
      if (index == 3) {
        if (this.$refs.condition3.style.overflow == "hidden") {
          this.$refs.condition3.style.overflow = "visible";
          this.$refs.condition3.style.zIndex = 100;
          this.$refs.condition3.style.height = "fit-content";
          this.$refs.condition3.style.border = "1px solid #888";
        }
        else{
          this.$refs.condition3.style.overflow = "hidden";
          this.$refs.condition3.style.zIndex = "";
          this.$refs.condition3.style.height = "100%";
          this.$refs.condition3.style.border = "none";
        }
      }
    },
    gotoSearch(){
      this.router.push({ name: "GoodList", params: {keyword: this.keyword } });
    }
  },
};
</script>

<style>
li {
  list-style-type: none;
}
.goodList {
  margin: 0 auto;
  width: 1440px;
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

.condition {
  padding: 5%;
  margin-top: 50px;
  margin-left: 3%;
  margin-right: 3%;
  width: 55%;
  height: 500px;
  display: inline-block;
  border-radius: 20px;
  vertical-align: top;
  box-sizing: border-box;
  color: #444;
}
.condition-block {
  display: flex;
  height: 33%;
  border-bottom: 1px solid #888;
  padding: 2% 0 0;
  box-sizing: border-box;
}
.condition-block-title {
  flex: 2;
}
.condition-block-item {
  flex: 10;
  overflow: hidden;
  background-color: white;

  /* height: fit-content; */
}
.condition-block-pull {
  flex: 1;
  position: relative;
}
.condition-block-pull-button {
  position: absolute;
  top: 72.5%;
  left: 20%;
  background-color: #349efa;
  color: white;
  width: 60px;
  height: 20px;
  line-height: 20px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
.condition-block-item > div {
  text-align: center;
  height: 33%;
  width: 14%;
  display: inline-block;
  line-height: 32px;
  border-radius: 10px;
  cursor: pointer;
}
.isCondition {
  background-color: #349efa;
  color: white;
}
.rank {
  margin-top: 50px;
  margin-left: 3%;
  margin-right: 3%;
  width: 32%;
  height: 500px;
  display: inline-block;
  border-radius: 20px;
  vertical-align: top;
  padding: 0 2%;
  box-sizing: border-box;
}

.rank-title {
  text-align: center;
  font-size: 24px;
  color: #ffa63d;
  height: 4%;
}
.rank-sort {
  height: 96%;
}
.rank-sort > li {
  height: 10%;
}
.rank-sort > li > span {
  height: 100%;
  display: inline-block;
}
.rank-sort-num {
  width: 5%;
  font-size: 2.125rem;
  margin-right: 5%;
  color: #ffa63d;
  vertical-align: top;
}
.rank-sort-link {
  width: 90%;
  font-size: 1.4rem;
  vertical-align: top;
  overflow: hidden;
}
.bgrcolor {
  background-color: white;
}
.bgrwhite {
  background-color: white;
}
.goods {
  width: 95%;
  margin: 0 auto;
  margin-top: 30px;
  padding: 40px 3%;
  box-sizing: border-box;
  border-radius: 10px;
  margin-bottom: 30px;
}
.goods-item {
  height: 270px;
  padding: 1%;
  width: 18%;
  display: inline-block;
  box-sizing: border-box;
  margin: 1%;
  border-radius: 10px;
  border: 1px solid #DDD;
  box-shadow: 4px 4px 20px -8px rgba(0, 0, 0, 0.25);
  background-color: white;
  cursor: pointer;

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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  margin: 20px 0 10px;
}
.goods-item-price {
  color: #ce0000;
  font-size: 18px;
}
.mid {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
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