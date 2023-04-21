<template>
    <div>
        <el-form :rules="rules" :model="loginForm" class="loginContainer" ref="loginForm">
            <h3 class="loginTitle">系统登录</h3>
            <li v-show="showTips">
                {{ tips }}
            </li>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox class="loginRemember" v-model="checked">记住密码</el-checkbox>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
        </el-form>
    </div>

</template>

<script>
  import qs from 'qs'
  import axios from 'axios'

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: '1',
                password: '123456'
            },
            checked: true,
            rules: {
                username: [{required:true,message:"请输入用户名",trigger:"blur"}],
                password: [{required:true,message:"请输入密码",trigger:"blur"}]
            },
            tips: '',
            showTips: false
        };
    },
    methods:{
        login(){

            axios({
                url: '/api/security/oauth/token',
                method: 'POST',
                    data: qs.stringify({
                            'username': this.loginForm.username,
                            'password': this.loginForm.password,
                'client_id': 'clientId',
                'client_secret': '123',
                            'grant_type': 'password'
                        }),
                    headers: { 
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded'
                },
                timeout: 6000
            })
            .then((response) => {
                //校验response中的响应结果

                if(1===1){
                    //获取到Token数据，登录成功，跳转至首页
                    localStorage.setItem("microserviceDemoLoginToken",response.data.data.access_token);

                    this.showTips=false
                    this.tips=""
                    this.$router.push({
                        path: '/home'
                    })
                }
                else{
                    this.showTips=true
                    this.tips="用户名密码不匹配，登录失败"
                }
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });

            //利用拦截器把请求数据输出到控制台
            axios.interceptors.request.use((request) => {
                if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                    //request.data = qs.stringify(request.data);
                    console.log(request.data);
                }

                return request;
            });
        }
    }
}
</script>

<style scoped>
.loginContainer{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
  margin: 0px auto 40px auto;
  text-align: center;
}
.loginRemember{
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>