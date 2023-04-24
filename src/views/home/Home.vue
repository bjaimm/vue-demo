<template>
  	
    <div id="home" style="text-align: left">
      <el-container style="height: 100%; border: 1px solid #eee">

        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <LeftMenu></LeftMenu>
        </el-aside>
  
        <el-container>

          <el-header class="header">
            <TopBar   v-bind:msg="msg" class="header"/>
          </el-header>
          
          <el-main>
            <router-view></router-view>
          </el-main>
          
        </el-container>
      </el-container>

    </div>
  </template>
  
  <script>

import TopBar from "../../components/TopBar.vue"
import LeftMenu from "../../components/LeftMenu.vue"
 
  export default {
    data() {
      return { 
        msg : "微服务Demo后台管理程序"
      }
    },
    name: 'Home',
    components: {
      TopBar,
      LeftMenu
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
    
  }
  *{
    margin: 0;
    padding: 0;
    border: 0;
  }
  </style>
  