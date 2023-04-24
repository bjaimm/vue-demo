<template>
  	
    <div id="leftMenu" style="text-align: left">

        <el-menu router :default-active="$router.path" :default-openeds="['1', '3']">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>产品管理</template>
            <el-menu-item-group>
                <el-menu-item index="/home/product/productList">产品列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
            <el-menu-item-group>
                <el-menu-item index="/home/order/orderList">订单列表</el-menu-item>
            </el-menu-item-group>

        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
            <el-menu-item-group>
            <el-menu-item index="3-1">用户列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        </el-menu>
 

    </div>
</template>

<script>
export default{
    name: "LeftAside"
}
</script>

<style scoped>
#leftMenu {
    background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
</style>