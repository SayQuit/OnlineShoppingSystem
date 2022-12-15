<template>
    <div>
      <div class="center search"></div>
  
      <div class="center">
        <div class="redline"></div>
  
        <div class="registerBlock">
          <div class="registerTitle">
            <h1>登录</h1>
          </div>
  
          <div class="inputBlock">
            <table>
              <tr>
                <td><h1>昵称:</h1></td>
                <td><input type="text" v-model="name" /></td>
              </tr>
  
              <tr>
                <td><h1>登陆密码:</h1></td>
                <td><input type="password" v-model="psw" /></td>
              </tr>
  
   
            </table>
          </div>
  
          <div class="finishi" @click="handleLogin">登录</div>
        </div>
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
        name: "",
        psw: "",
        store: "",
      };
    },
    beforeMount() {
      this.store = useStore();
    },
    mounted() {},
    methods: {
      goPage(pageName) {
        this.router.push({ name: pageName });
      },
  
      // 登录请求函数
      handleLogin() {
        // 条件判断
        if (this.name === "") {
          this.$message({
            type: "error",
            message: "账号不能为空",
          });
          return;
        }
        if (this.psw === "") {
          this.$message({
            type: "error",
            message: "密码不能为空",
          });
          return;
        }
        let url = "/api/login?username=" + this.name + "&password=" + this.psw;
        axios.post(url).then((data) => {
          // console.log(data);
          if (data.data.code == 1000) {
            this.store.commit("handleChangeUser", data.data.result);
            this.store.commit("handleChangeToken", data.data.msg);
            this.$message({
              type: "success",
              message: "登录成功",
            });
            this.goPage("MainPage");
          }
          else{
            this.$message({
            type: "error",
            message: "登录失败",
          });
          }
        });
      },
    },
  };
  </script>
    
    <style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  
  a {
    color: black;
    text-decoration: none;
  }
  input {
    outline: none;
  }
  li {
    list-style: none;
  }
  h1 {
    font-weight: normal;
    font-size: 16px;
  }
  table {
    border-collapse: separate;
    border-spacing: 0 1em;
  }
  .center {
    width: 1300px;
    margin: 0 auto;
  
    overflow: hidden;
  }
  
  .topnav {
    height: 30px;
    width: auto;
    background-color: #f1f1f1;
  
    font-size: 14px;
  }
  
  .topnav div {
    text-align: center;
  }
  
  .topnav > div > a:nth-of-type(1) {
    margin-right: 30px;
    float: left;
  
    color: gray;
    line-height: 30px;
  }
  
  .topnav > div > a:nth-of-type(1):hover {
    color: #c40000;
  }
  
  .topnav > div > a:nth-of-type(2) {
    float: left;
  
    color: #c40000;
    line-height: 30px;
  }
  
  .topnav > div > div {
    float: right;
  
    color: gray;
  }
  .topnav > div > div > li {
    display: inline-block;
  
    height: 20px;
  
    position: relative;
  }
  
  .topnav > div > div > li > a {
    float: right;
    padding-left: 14px;
    padding-right: 14px;
  
    color: gray;
  
    border-right: 1px solid grey;
    margin-top: 5px;
  }
  .topnav > div > div > li > a:hover {
    color: #c40000;
  }
  .topnav > div > div > li:last-of-type > a {
    border-right: hidden;
  }
  
  .search {
    height: 65px;
    margin-top: 30px;
  
    position: relative;
  }
  .pinyougouIcon {
    float: left;
  
    margin-top: 50px;
  }
  .search > img {
    float: left;
  }
  
  .search input {
    float: left;
  
    position: absolute;
    left: 50%;
    margin-left: -320px;
    padding-left: 10px;
    box-sizing: border-box;
  
    width: 590px;
    height: 40px;
  
    border: 3px solid #c40000;
  }
  .search > a:nth-of-type(2) {
    line-height: 40px;
  
    position: absolute;
    left: 50%;
    margin-left: 200px;
  
    width: 80px;
    height: 40px;
  
    text-align: center;
    color: white;
  
    background-color: #c40000;
  }
  
  .search > a:last-of-type {
    float: right;
    display: block;
    margin-right: 40px;
    padding-right: 3px;
    box-sizing: border-box;
  
    height: 40px;
    width: 150px;
  
    border: 1px solid #ededed;
  
    text-align: right;
    line-height: 40px;
    font-size: 8px;
    color: #6c6c6c;
  
    background-color: #f7f7f7;
  }
  
  .smallshoppingcart {
    float: left;
    margin-left: 6px;
  
    width: 33px;
    height: 20px;
  
    background-position: -408px -86px;
  
    position: absolute;
    top: 50%;
    margin-top: -20px;
  }
  .search > a:last-of-type:hover {
    color: #c40000;
  }
  .search > div {
    position: absolute;
  
    width: 700px;
    height: 20px;
  
    left: 50%;
    margin-left: -320px;
    top: 100%;
    margin-top: -18px;
  }
  .search > div > li {
    display: inline-block;
    margin: 0 10px;
  }
  .search > div > li:first-of-type > a {
    color: #c40000;
  }
  .search > div > li > a {
    font-size: 14px;
    color: grey;
  
    line-height: 20px;
  }
  .search > div > li > a:hover {
    color: #c40000;
  }
  
  .redline {
    background-color: #349efa;
    height: 3px;
  }
  
  .link {
    text-align: center;
  
    margin-top: 40px;
  }
  .link > li {
    display: inline-block;
  }
  .link > li > a {
    font-size: 12px;
    color: #6c6c6c;
  
    padding-left: 9px;
    padding-right: 10px;
  
    border-right: 1px solid #6c6c6c;
  }
  .link > li:last-of-type > a {
    border-right: hidden;
  }
  .link > li > a:hover {
    color: #b1191a;
  }
  
  .copyright {
    text-align: center;
    margin-top: 40px;
    padding-bottom: 60px;
  }
  
  .copyright > p {
    color: #666666;
    font-size: 10px;
  }
  
  .guild {
    border-bottom: 1px solid #cccccc;
  
    margin-top: 18px;
  }
  
  .guild > div {
    height: 170px;
    width: 210px;
  
    display: inline-block;
  
    text-align: center;
    vertical-align: top;
  }
  .guild > div > div {
    display: inline-block;
  
    text-align: left;
  }
  .guild > div:last-of-type > div {
    text-align: center;
  }
  .guild > div > div > li > a {
    display: block;
    color: #666666;
    font-size: 12px;
  
    margin-bottom: 3px;
  }
  .guild > div > div > p {
    display: block;
    color: #666666;
    font-size: 10px;
  }
  .guild > div > div > li > a:hover {
    color: #b1191a;
  }
  .guild > div > div > h1 {
    display: block;
  
    color: #666666;
  
    margin-bottom: 15px;
  }
  .guild > div:last-of-type > div > h1 {
    margin-bottom: 5px;
  }

  input{
  border: 1px solid #999;
  outline: none;
  padding:0 10px;
}
  .registerBlock {
    width: auto;
    height: 520px;
  
    border: solid 1px #cccccc;
  
    margin-top: 50px;
    margin-bottom: 20px;
  }
  
  .registerTitle {
    width: auto;
    height: 43px;
  
    border-bottom: solid 1px #cccccc;
  
    background-color: #ececec;
  }
  .registerTitle > h1 {
    float: left;
    margin-left: 15px;
  
    line-height: 43px;
    font-size: 20px;
    color: #666666;
  }
  .registerTitle > div {
    float: right;
  
    margin-right: 15px;
  
    line-height: 43px;
    color: #666666;
    font-size: 14px;
  }
  .registerTitle > div > p {
    display: inline-block;
  }
  .registerTitle > div > a {
    display: inline-block;
    color: #349efa;
    font-size: 14px;
  }
  
  .inputBlock {
    width: auto;
    height: auto;
  
    margin: 0 auto;
  }
  .inputBlock > table {
    margin: 50px auto 30px auto;
  }
  
  .inputBlock h1 {
    margin-right: 10px;
  
    line-height: 35px;
    color: #666666;
    font-size: 10px;
  
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
    height: 35px;
    width: 240px;
  
    margin: 0 auto;
  }
  .inputBlock .input_success {
    color: green;
  }
  .inputBlock .input_error {
    color: #b1191a;
  }
  
  .protocal {
    margin: 0 auto;
  }
  .protocal > input {
    display: inline-block;
  
    width: 15px;
    height: 15px;
  
    vertical-align: middle;
  }
  .protocal > p {
    display: inline-block;
  
    color: #666666;
    font-size: 10px;
  }
  .protocal > a {
    display: inline-block;
  
    color: steelblue;
    font-size: 10px;
  }
  
  .finishi {
    width: 200px;
    height: 35px;
  
    background-color: #349efa;
  
    text-align: center;
    line-height: 35px;
    color: white;
  
    cursor: pointer;
    margin: 0 auto;
  }
  .finishi a {
    color: white;
  }
  
  .safe {
    float: right;
  
    height: 20px;
  }
  .safe p {
    color: #666666;
    font-size: 10px;
    line-height: 20px;
  }
  .safe .safeBlock {
    color: white;
  
    width: 30px;
    text-align: center;
    line-height: 20px;
    margin-right: 1px;
  }
  .safe .red {
    background-color: #dc1414;
  }
  .safe .green {
    background-color: #44bc3c;
  }
  .safe .yellow {
    background-color: #f39404;
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
  </style>
    