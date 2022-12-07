<template>
  <div>
    <div class="center search"></div>

    <div class="center">
      <div class="redline"></div>

      <div class="registerBlock">
        <div class="registerTitle">
          <h1>注册新用户</h1>
          <div>
            <p>已有帐号,去</p>
            <a href="#">登录</a>
          </div>
        </div>

        <div class="inputBlock">
          <table>
            <tr>
              <td><h1>昵称:</h1></td>
              <td><input type="text"  v-model="name"/></td>
              <!-- <td><p class="input_success">昵称</p></td> -->
            </tr>


            <tr>
              <td><h1>登陆密码:</h1></td>
              <td><input type="password"  v-model="psw"/></td>
              <!-- <td><p class="input_error">登陆密码格式不正确，请重新输入</p></td> -->
            </tr>

            <!-- <tr>
              <td></td>
              <td class="safe">
                <p>安全程度</p>
                <p class="red safeBlock">弱</p>
                <p class="green safeBlock">中</p>
                <p class="yellow safeBlock">强</p>
              </td>
            </tr> -->

            <tr>
              <td><h1>确认密码:</h1></td>
              <td><input type="password"  v-model="makesurePsw"/></td>
              <!-- <td><p class="input_error">确认密码格式不正确，请重新输入</p></td> -->
            </tr>

            <tr>
              <td></td>
              <td>
                <div class="protocal">
                  <input type="checkbox" />
                  <p>同意协议并注册</p>
                  <a href="https://cdn.awsbj0.fds.api.mi-img.com/huami-amazfit-production/0_agreements/zh-CNAgreement-20170809.html">《知晓用户协议》</a>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <div class="finishi" @click="handleRegister">
          完成注册
        </div>
      </div>
    </div>



    <!-- <div class="footer">
      <div class="footer-main">
        <div class="footer-main-item">帮助</div>
        <div class="footer-main-item">隐私</div>
        <div class="footer-main-item">条款</div>
      </div>
      <div class="footer-copyright">copyright@2017蚂蚁金服体验技术部出品</div>
    </div> -->
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
// axios.defaults.baseURL="/api"
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
      makesurePsw: "",
    };
  },
  mounted() {
    this.store = useStore();
  },
  methods: {
    
    goPage(pageName) {
      this.router.push({ name: pageName });
    },




    // 注册请求
    handleRegister() {
      if (!this.name) {
        // 条件判断
        this.$message({
          type: "error",
          message: "昵称不能为空",
        });
        return;
      } else if (!this.psw) {
        this.$message({
          type: "error",
          message: "密码不能为空",
        });
        return;
      } else if (this.psw !== this.makesurePsw) {
        this.$message({
          type: "error",
          message: "两次输入的密码不一致",
        });
        return;
      } else if (this.name.length > 20) {
        this.$message({
          type: "error",
          message: "昵称长度太长",
        });
        return;
      }
      var reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,16}$/;
      if (!reg.test(this.psw)) {
        this.$message({
          type: "error",
          message:
            "密码不符合要求,密码长度应为8到16位包含字母与数字,不能包含特殊字符",
        });
        return;
      }

      // 请求后端
      let url =
        "/api/register?username=" +
        this.name +
        "&password=" +
        this.psw;
        console.log(url);
      axios.get(url).then((data) => {
        console.log(data);
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
  background-color: #349EFA;
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
  color: #349EFA;
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

  background-color: #349EFA;

  text-align: center;
  line-height: 35px;
  color: white;

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