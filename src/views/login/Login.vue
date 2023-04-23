<template>
    <div class="container">
        <el-form :rules="rules" :model="loginForm" class="loginContainer" ref="loginForm">
            <h3 class="loginTitle">系统登录</h3>
            <li v-show="showTips">
                {{ tips }}
            </li>
            <el-form-item prop="username">
用户名：<el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                密码：<el-input type="text" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
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
    watch: {
        "loginForm.username": function(newValue,oldValue){
                if(newValue!=oldValue || newValue!=oldValue){
                    this.tips = ""
                    this.showTips=false
                }
            } ,
        "loginForm.password": function(newValue,oldValue){
                if(newValue!=oldValue || newValue!=oldValue){
                    this.tips = ""
                    this.showTips=false
                }
            }       
    },
    methods:{
        login(){
            //这里设置that是因为在axios的catch中访问不到this
            let that = this;
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

                if(response.data.code===200 && response.data.success===true){
                    //获取到Token数据，登录成功，跳转至首页
                    localStorage.setItem("microserviceDemoLoginToken",response.data.data.access_token);

                    this.showTips=false
                    this.tips=""
                    this.$router.push({
                        path: '/home/product/productList'
                    })
                }
                else{
                    this.showTips=true
                    this.tips="登录失败，原因："+response.data.message+"("+response.data.data+")"
                }
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
                that.showTips=true;
                that.tips="登录失败，原因："+error.response.data.data.error+"("+error.response.data.data.error_description+")"
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

<style scoped >

.loginContainer{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
    /*背景颜色，线性渐变*/
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.loginTitle{
  margin: 0px auto 40px auto;
  text-align: center;
}
.loginRemember{
  text-align: left;
  margin: 0px 0px 15px 0px;
}


/*容器样式*/
.container {
  /* 自动计算为当前可视屏幕的百分之百*/
  height: calc(100vh);


}

/*表单样式*/
.login-wrapper {
  background-color: #fff;
  width: 250px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  border-radius: 15px;
  top: 50%;
  transform: translate(-50%, -50%);
}

/*标题样式*/
.login-wrapper .header {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}

/*输入框样式*/
.login-wrapper .form-wrapper .input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: none;
  padding: 10px;
  border-bottom: 2px solid rgb(247, 230, 4);
  font-size: 15px;
  outline: none;
}

.login-wrapper .form-wrapper .input-item::placeholder {
  text-transform: uppercase;
}

/*登录按钮的样式*/
.login-wrapper .form-wrapper .btn {
  display: inline-block;
  text-align: center;
  width: 100%;
  border: none;
  padding: 5px;
  margin: 40px auto 0;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  color: #fff;
  border-radius: 5px;
}

/*鼠标悬停样式*/
.login-wrapper .form-wrapper .btn:hover {
  cursor: pointer;
  color: rgba(13, 36, 36, 0.76);
}

/*底部提示文字颜色*/
.login-wrapper .msg {
  text-align: center;
  line-height: 80px;
}

.login-wrapper .msg a {
  text-decoration: none;
  color: #a6c1ee;
}
body{margin: 0;
  padding: 0;
  border: 0;
}
</style>