<template>
  <div style="background-image: linear-gradient(to right, #1c1c1dd7, #a6c1ee)">
    <h3>{{ msg }}</h3>
    <el-dropdown >
      <i class="el-icon-setting" ></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span style="color: rgb(247, 230, 4)">王小虎</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
