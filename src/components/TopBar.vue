<template>
  <div style="background-image: linear-gradient(to right, #1c1c1dd7, #a6c1ee)">
    <h3>{{ msg }}</h3>
    <el-dropdown >
      <i class="el-icon-setting" ></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="checkLoginUserInfo">用户信息</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span style="color: rgb(231, 161, 9)">{{ loginUserName }}</span>
    <CheckLoginUserInfo :dialogVisible="checkLoginUserInfoDialogVisible" :token="token" :loginUserId="loginUserId" :loginUserName="loginUserName" @ok="ok"></CheckLoginUserInfo>
  </div>
</template>

<script>
import CheckLoginUserInfo from "./CheckLoginUserInfo.vue"

export default {
  name: 'HelloWorld',
  data(){
      return {
        checkLoginUserInfoDialogVisible: false,
        token: "",
        loginUserId: null,
        loginUserName: ""
      }
  },
  props: {
    msg: String,
    loginUserName: String
  },
  components:{
    CheckLoginUserInfo
  },
  methods:{
    checkLoginUserInfo(){
      console.log("checkLoginUserInfo...")
      this.checkLoginUserInfoDialogVisible=true;
      this.token = this.$store.state.token
      this.loginUserId = this.$store.state.loginUserId
      this.loginUserName = this.$store.state.loginUserName
    },
    ok(){
      this.checkLoginUserInfoDialogVisible=false;
    },
    logout(){
      this.checkLoginUserInfoDialogVisible=false;
      localStorage.setItem("microserviceDemoLoginToken",null)
      localStorage.setItem("microserviceDemoLoginUserId",null)
      localStorage.setItem("microserviceDemoLoginUserName",null)
      this.$router.push({
        path: "/login"
      })
      window.location.reload();
    }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-size: 30px;
  font-weight: bold;
  text-align: center;

}
</style>
