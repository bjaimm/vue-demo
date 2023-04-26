<template>
  	
    <div id="home" style="text-align: left">
      <el-container style="height: 100%; width: 100%;">

        <el-header class="header" >
            <TopBar   v-bind:msg="msg" v-bind:loginUserName="loginUserName" />
        </el-header>
        <el-container>
          <el-aside width="200px" style="background-color: #545c64">
            <LeftMenu></LeftMenu>
          </el-aside>
    
          <el-container style="">
            
            <el-main>
              <router-view></router-view>
            </el-main>
            
          </el-container>
        </el-container>
      </el-container>

    </div>
  </template>
  
  <script>

import TopBar from "../../components/TopBar.vue"
import LeftMenu from "../../components/LeftMenu.vue"

var loginUserName = localStorage.getItem("microserviceDemoLoginUserName")

  export default {
    data() {
      return { 
        msg : "微服务Demo后台管理程序",
        loginUserName: loginUserName
      }
    },
    name: 'Home',
    components: {
      TopBar,
      LeftMenu
    },
    created: function(){
          this.loginUserName = localStorage.getItem("microserviceDemoLoginUserName");
        }
    
  }
  </script>
  
  <style>
  .header {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: right;
    color: #e7e7e4e5;
    background: linear-gradient(to right, #1c1c1dd7, #a6c1ee)
    
  }
  *{
    margin: 0;
    padding: 0;
    border: 0;
  }
  </style>
  