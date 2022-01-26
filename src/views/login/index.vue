<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="LoginInfo"  class="login-form"  label-width="80px" auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">
                    HRM資料標記系統
                </h3>
            </div>
            <div>
              <!-- email -->
              <el-form-item  prop="email">
                  <span class="svg-container">
                      <i class="el-icon-user"></i>
                  </span>

                  <el-input v-model="LoginInfo.username" placeholder="請輸入您的帳號"></el-input>
              </el-form-item>

              <!-- password -->
              <el-form-item prop="password">
                  <span class="svg-container">
                      <i class="el-icon-lock"></i>
                  </span>
                  <el-input type="password" v-model="LoginInfo.password" placeholder="請輸入您的密碼"></el-input>
              </el-form-item>
              <el-button v-loading.fullscreen.lock="fullscreenLoading" @click="HandleLogin" style="width:100%; margin-top:20px;background-color:#337ab7;color:white;font-size:16px;">登入</el-button>
            </div>
        </el-form>
    </div>
</template>


<script>
import {UserLogin} from "@/apis/auth.js"
import {SetLoginStatus} from "@/utils/auth.js"
export default {
  data:function(){
    return {
        LoginInfo:{
            username:"",
            password:""
        },
        fullscreenLoading:false,
    }
  },
  methods:{
    HandleLogin:function(){
        this.fullscreenLoading = true
        let form_data = {
            "username": this.LoginInfo.username,
            "password": this.LoginInfo.password
        }
        UserLogin(form_data).then((res)=>{
            SetLoginStatus("login-status")
            this.$message({type:"success", message:"登入成功"})
            this.fullscreenLoading = false
            localStorage.setItem("access_token", res.data["access_token"])
            localStorage.setItem("refresh_token", res.data["refresh_token"])
            this.$router.push('/')
        }).catch((err)=>{
            console.log("login failed")
            console.log(err.response)
            this.$message({type:"error", message:"登入失敗"})
            this.fullscreenLoading = false 
        })

    }
  },
  created(){
    //一進入到login頁面，清除所有jwt token 
    localStorage.removeItem("token")
    localStorage.removeItem("refreshtoken")  
    localStorage.removeItem("login-status")
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  .el-input {
    
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    color: #454545;
  
  }
  .el-form-item__content{
    margin-left:0px !important;
    
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:white;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  font-size: 16px;
  .login-form {
    position: relative;
    width: 800px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  
  }
  .tips {
    font-size: 16px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 36px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
<style>
  .test{
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
 
    padding: 5% 5% 10%;
  }
</style>