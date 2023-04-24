<template>
    <div id="OrderList" style="text-align: left">

        <el-breadcrumb style="margin-top: 15px;" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item >订单模块</el-breadcrumb-item>
            <el-breadcrumb-item >订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="订单状态">
                <el-input v-model="orderStatus" placeholder="订单状态"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="setOrderInfo">查询</el-button>
                <el-button type="primary" @click="showAddOrder">新增</el-button>
            </el-form-item>
        </el-form>
        
        <el-table :data="OrderInfo" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="orderUserName" label="订购人"></el-table-column>
            <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
            <el-table-column prop="orderStatusMessage" label="订单状态"></el-table-column>
            <el-table-column prop="createDateTime" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateUserName" label="最后更新人"></el-table-column>
            <el-table-column prop="updateDateTime" label="更新时间" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="380">
            <template slot-scope="scope">
                <el-button round @click="showEditOrder(scope.$index)">明细</el-button>
                <el-button round @click="showEditOrder(scope.$index)">取消</el-button>
                <el-button round @click="showEditOrder(scope.$index)">支付</el-button>
                <el-button round @click="deleteOrder(scope.$index)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,40]" :page-size="rows" layout="total,sizes,prev,next,jumper" :total="total">

            </el-pagination>
        </div>
        <AddOrder :dialogVisible="addOrderDialogVisible" :selectedItem="selectedItem" @save="addOrder" @cancel="cancel"></AddOrder>
        <EditOrder :dialogVisible="editOrderDialogVisible" :selectedItem="selectedItem" @save="editOrder" @cancel="cancel"></EditOrder>
    </div>
    </template>
    
    <script>
      import AddOrder from '../../components/order/AddOrder.vue'
      import EditOrder from '../../components/order/EditOrder.vue'
      import qs from 'qs'
      import axios from 'axios'
    
      var loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")
    
    export default{
        name: "OrderList",
        data() {
            return {
                selectedIndex: -1,
                selectedItem: {},
                addOrderDialogVisible: false,
                editOrderDialogVisible: false,
                OrderInfo: [],
                orderStatus: 1,
                total: 0,
                rows: 10,
                page: 1
            }
        },
        components: {
          AddOrder,
          EditOrder
        },
        created: function(){
          this.setOrderInfo();
        },
        watch: {
          
        },
        mounted () {
      
        },
        methods: {
          deleteOrder(index){
            const url = `/api/Orders/${this.OrderInfo[index].OrderId}`;
            axios({
              url: url,
              method: 'DELETE',
                      headers: { 
                'Authorization': loginToken
              },
              timeout: 6000
                  })
                  .then((response) => {
              console.log(response.data);
              this.setOrderInfo();
            })
                  .catch(function (error) { // 请求失败处理
                      console.log(error);
                  });
            this.selectedIndex = -1;
            this.selectedItem={};
          },
          showAddOrder(){
            this.addOrderDialogVisible = true;
          },
          showEditOrder(index){
            this.selectedIndex = index;
            this.selectedItem = JSON.parse(JSON.stringify(this.OrderInfo[index]));
            this.editOrderDialogVisible = true;
          },
          addOrder(Order){
            axios({
              url: '/api/Orders',
              method: 'POST',
                    data: Order,
                      headers: { 
                'Authorization': loginToken
              },
              timeout: 6000
                  })
                  .then((response) => {
              console.log(response.data);
              this.setOrderInfo();
            })
                  .catch(function (error) { // 请求失败处理
                      console.log(error);
                  });
            this.addOrderDialogVisible=false;
            this.selectedItem={};
          },
          editOrder(Order){
            axios({
              url: '/api/Orders',
              method: 'PUT',
                    data: Order,
                      headers: { 
                'Authorization': loginToken
              },
              timeout: 6000
                  })
                  .then((response) => {
              console.log(response.data);
              this.setOrderInfo();
            })
                  .catch(function (error) { // 请求失败处理
                      console.log(error);
                  });
            this.editOrderDialogVisible=false;
            this.selectedItem={};
            this.selectedIndex = -1;
          },
          setOrderInfo(){
            if(localStorage.getItem("microserviceDemoLoginToken")===null){
    
              this.$router.push({
                path: '/login'
              })
            }
            else{
              loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")
              var queryUrl="/api/orders/listOrderInfoPage2/"+this.page+"/"+this.rows
              axios
                  .get(queryUrl,{
                headers: {
                  'Authorization': loginToken
                }
                })
                  .then(response => {
                    this.OrderInfo = response.data.data.records
                    this.total = response.data.data.total
                  }
                
                )
                  .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            }
          },
          //每页显示记录数发生变化时，设置当前页码为1，执行查询
          handleSizeChange: function(sizes){
            this.rows =sizes;
            this.page=1;
            this.setOrderInfo();
          },
          //当前页码发生变化，执行查询
          handleCurrentChange: function(page){
            this.page = page;
            this.setOrderInfo();
          },
          cancel(){
            this.addOrderDialogVisible = false;
            this.editOrderDialogVisible = false;
            this.selectedItem={};
          }
        }
    }
    </script>
    
    <style>
    
    </style>