<template>
  <div class="goodList">
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
        <div class="header-search-click"  @click="getList()">
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

    <div class="bgrcolor">
      <div>
        <div class="condition bgrwhite">
          <div class="condition-block">
            <div class="condition-block-title">分类:</div>
            <div class="condition-block-item">
              <template v-for="item in category" :key="item">
                <div @click="changeCategoryName(item.name)" :class="{'isCondition':item.name==categoryName}">{{item.name}}</div>
              </template>
            </div>

          </div>
        </div>
      </div>

      <div class="goods bgrwhite">
        <template v-for="item in list" :key="item">
          <div class="goods-item" @click="gotoDetail(item)">
            <div class="goods-item-image">
              <img :src="item.logo" class="mid" />
            </div>
            <div class="goods-item-desc">{{ item.name }}</div>
            <div class="goods-item-price">￥{{ item.price }}</div>
          </div>
        </template>

        <div class="page">
          <span class="page-num" @click="subPage()">&lt;</span>
          <template v-for="item in maxPage" :key="item">
            <span class="page-num" v-if="item!=Number(pageNo+1)" @click="changePage(item)">{{item}}</span>
            <span class="page-num page-choosenum" v-else >{{item}}</span>
          </template>

          <span class="page-num" @click="addPage()">></span>
          <!-- <span>
            <span>跳至</span>
            <input type="number" class="page-input" />
            <span>页</span>
          </span> -->
        </div>
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
      list: [],
      keyword: "",
      categoryName: "",
      user: null,
      category:[
        {
          name:'大家电',
        },
        {
          name:'数码相机',
        },
        {
          name:'海外购',
        },
        {
          name:'大家电',
        },
        {
          name:'数码相机',
        },
        {
          name:'海外购',
        },
        {
          name:'大家电',
        },
        {
          name:'数码相机',
        },
        {
          name:'海外购',
        },
        {
          name:'大家电',
        },
        {
          name:'数码相机',
        },
        {
          name:'海外购',
        },
        {
          name:'大家电',
        },
        {
          name:'数码相机',
        },
        {
          name:'海外购',
        },
        {
          name:'大家电',
        },
        {
          name:'数码相机',
        },
        {
          name:'海外购',
        },
        {
          name:'大家电',
        },
        {
          name:'数码相机',
        },
        {
          name:'海外购',
        },
      ],
      pageNo:0,
      maxPage:9,
    };
  },
  mounted() {
  },
  beforeMount() {
    this.store = useStore();
    this.user = this.store.state.userInfo;
    this.keyword = this.$route.params.keyword;
    this.categoryName = this.$route.params.category;

    this.getList();
  },

  methods: {
    goPage(pageName) {
      this.router.push({ name: pageName });
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
      this.getList()
    },
    subPage(){
      this.pageNo=this.pageNo-1
      this.getList()
    },
    addPage(){
      this.pageNo=this.pageNo+1
      this.getList()
    },
    gotoDetail(item) {
      // console.log(JSON.stringify(item));
      this.router.push({
        name: "GoodDetail",
        params: { good: JSON.stringify(item) },
      });
    },
    getList() {
      console.log(this.keyword);
      let url = "";
      if (this.keyword != "" && this.categoryName == "") {
        url = `api/index/queryGoodsByName?pageNo=${this.pageNo}&goodsName=${this.keyword}`;
      } else if (this.keyword == "" && this.categoryName != "") {
        url = `api/index/queryGoodsByCat?pageNo=${this.pageNo}&name=${this.categoryName}`;
      } else if (this.keyword != "" && this.categoryName != "") {
        url = `api/index/queryGoodsByCatAndName?pageNo=${this.pageNo}&category=${this.categoryName}&goodsName=${this.keyword}`;
      } else {
        url = `api/index/queryGoodsByName?pageNo=${this.pageNo}&goodsName=${this.keyword}`;
      }

      console.log(url);
      console.log(this.keyword);
      axios.get(url).then((data) => {
        if (data.data.code == 200) {
          this.list = data.data.result;
        }
        console.log(data);
      });
    },

    gotoSearch() {
      this.router.push({ name: "GoodList", params: { keyword: this.keyword } });
    },
    changeCategoryName(name){
      if(this.categoryName==name)this.categoryName=''
      else this.categoryName=name
      this.getList()
    }
  },
};
</script>

<style scoped>
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
  margin-top: 50px;
  width: 100%;
  display: inline-block;
  border-radius: 20px;
  vertical-align: top;
  color: #444;
}
.condition-block {
  display: flex;
  height: fit-content;
  border-bottom: 1px solid #888;
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
.condition-block-item  div {
  text-align: center;
  height: 32px;

  width: 7%;
  margin: 0 3%;
  box-sizing: border-box;
  display: inline-block;
  line-height: 32px;
  border-radius: 10px;
  cursor: pointer;
    margin-bottom: 50px;
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
  border: 1px solid #ddd;
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