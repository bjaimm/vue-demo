<template>
    <el-dialog style="text-align: left" title="查看用户信息" :visible.sync="dialogVisible">
      Token:{{ token }}<br>
      用户Id:{{ loginUserId }}<br>
      用户名:{{ loginUserName }}
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ok">确定</el-button>
      </div>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: 'CheckLoginUserInfo',
    props: {
      token: String,
      loginUserId: String,
      loginUserName: String,
      dialogVisible: Boolean
    },
    methods: {

      ok(){
          this.$emit("ok");
      }
    }  
  }
  </script>
  
  