<template>
  <div id="loginPage">
    <el-container>
      <el-header>
        <div class="co-wapper">
          <div class="fl">
            <img src="../../assets/img/logo.png" alt="">
          </div>
          <div class="co-logined fr">
            <ul>
              <li>
                <div><a class="co-logined-txt" href="">English</a></div>
              </li>
              <li>
                <div><a class="co-logined-txt" href="">APP下载</a></div>
              </li>
              <li>
                <div><a class="co-logined-txt" href="">帮助中心</a></div>
              </li>
              <li>
                <div><a class="co-logined-txt" href="">公司首页</a></div>
              </li>
            </ul>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="co-wapper">
          <div class="login-wapper">
            <div class="fl"><img src="../../assets/img/world.png" height="400" alt=""></div>
            <div class="form-wapper fl">
              <div class="login-title">用户登录</div>
              <el-form :model="formData" ref="formData" label-width="100px">
                <el-form-item>
                  <el-input placeholder="用户名" value="admin"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="密码" type="password" value="admin"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="warning" @click="login">登录</el-button>
                  <el-radio label="1">记住密码</el-radio>
                </el-form-item>
                <el-form-item></el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div class="co-wapper">
          <div class="foot-list">
            <span><a href="">关于平台</a></span>
            <span><a href="">联系我们</a></span>
            <span><a href="">服务协议</a></span>
            <span><a href="">业务支持</a></span>
            <span><a href="">办公地点</a></span>
          </div>
          <div>Copyright &copy; By 北京铁矿石交易中心股份有限公司&nbsp;&nbsp;京ICP备 14044759号 &nbsp;&nbsp;京公网安备
            11010702001263
          </div>
        </div>
      </el-footer>
    </el-container>
    <!--背景图-->
    <div class="index-bg"></div>
  </div>
</template>

<script>
  // import '../../assets/icon/iconfont.css'
  export default {
    data() {
      return {
        user: ''
      }
    },
    methods: {
      login: function () {
        this.$router.push({
          name: 'siteindex',
          params: {
            user: this.user
          }
        })
      }
    }
  }
</script>
<style scoped>
  #loginPage {
    width: 100%;
    height: 100%;
  }

  .el-container {
  }

  /*header部分*/
  .el-header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .co-logined {

  }

  .co-logined ul li {
    float: right;
  }

  .co-logined-txt {
    display: inline-block;
    padding: 0 20px;
  }

  /*主体部分*/
  .el-main {
    width: 100%;
    height: 700px;
  }

  .login-wapper {
    width: 750px;
    height: 400px;
    margin: 100px auto;
    background-color: #fff;
  }

  .login-title {
    width: 100%;
    height: 100px;
    line-height: 100px;
    padding-left: 80px;
    font-size: 24px;
    font-weight: 900;
    color: #d67117;
  }

  .el-form {
    width: 100%;
    margin-left: 80px;
  }

  .el-form-item {
    margin: 30px 0;
  }

  .el-radio {
    margin-left: 20px;

  }

  /*footer部分*/
  .el-footer {
    width: 100%;
    height: 120px !important;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 0;
    color: #fff;
    text-align: center;
  }

  .foot-list {
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .foot-list span {
    padding: 0 10px;
  }

  /*背景图片*/
  .index-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -999;
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login_bg.jpg");
    background-size: cover;
  }
</style>
