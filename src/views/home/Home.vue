<template>
  	
    <div id="home" style="text-align: left">
      <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <LeftMenu></LeftMenu>
        </el-aside>
  
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <HelloWorld v-bind:msg="msg" style="text-align: center;"/>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
          </el-header>
          
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>

    </div>
  </template>
  
  <script>

import HelloWorld from "../../components/HelloWorld.vue"
import LeftMenu from "../../components/LeftMenu.vue"
 
  export default {
    data() {
      return { 
        msg : "微服务Demo后台管理程序"
      }
    },
    name: 'Home',
    components: {
      HelloWorld,
      LeftMenu
    }
    
  }
  </script>
  
  <style>
  #home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #e7e7e4e5;
    margin-top: 0px;
    background-image: linear-gradient(to right, #1c1c1dd7, #a6c1ee);
  }
  </style>
  