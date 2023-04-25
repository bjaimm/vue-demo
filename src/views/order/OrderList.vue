<template>
    <div id="OrderList" style="text-align: left">

        <el-breadcrumb style="margin-top: 15px;" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item >订单模块</el-breadcrumb-item>
            <el-breadcrumb-item >订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="订单状态">
                
                <el-select v-model="orderStatus" clearable placeholder="请选择">
                  <el-option
                    v-for="item in orderStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="setOrderInfo">查询</el-button>
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
            <el-table-column fixed="right" label="操作" width="280">
            <template slot-scope="scope">
                <el-button size ="small" type="info"  icon="el-icon-message" round @click="showOrderDetail(scope.$index)">明细</el-button>
                <el-button size ="small" type="danger" :disabled="OrderInfo[scope.$index].orderStatus == 2 || OrderInfo[scope.$index].orderStatus == 3" icon="el-icon-delete" round @click="showCancelOrder(scope.$index)">取消</el-button>
                <el-button size ="small" type="success" :disabled="OrderInfo[scope.$index].orderStatus != 1" icon="el-icon-check" round @click="showPayOrder(scope.$index)">支付</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[10,20,30,40]" :page-size="rows" layout="total,sizes,prev,next,jumper" :total="total">

            </el-pagination>
        </div>
        <AddOrder :dialogVisible="addOrderDialogVisible" :selectedItem="selectedItem" @save="addOrder" @cancel="cancel"></AddOrder>
        <ShowOrderDetail :dialogVisible="orderDetailDialogVisible" :selectedItem="selectedItem" @cancel="cancel"></ShowOrderDetail>
        <CancelOrder :dialogVisible="cancelOrderDialogVisible" :selectedItem="selectedItem" @save="cancelOrder" @cancel="cancel"></CancelOrder>
        <PayOrder :dialogVisible="payOrderDialogVisible" :selectedItem="selectedItem" @save="payOrder" @cancel="cancel"></PayOrder>
    </div>
    </template>
    
    <script>
      import AddOrder from '../../components/order/AddOrder.vue'
      import ShowOrderDetail from '../../components/order/ShowOrderDetail.vue'
      import CancelOrder from '../../components/order/CancelOrder.vue'
      import PayOrder from '../../components/order/PayOrder.vue'
      import qs from 'qs'
      import axios from 'axios'
    
      var loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")
      var loginUserId = localStorage.getItem("microserviceDemoLoginUserId")
    
    export default{
        name: "OrderList",
        data() {
            return {
                selectedIndex: -1,
                selectedItem: {},
                addOrderDialogVisible: false,
                orderDetailDialogVisible: false,
                cancelOrderDialogVisible: false,
                payOrderDialogVisible: false,
                OrderInfo: [],
                orderStatusOptions: [{
                    value: 0,
                    label: '已建单'
                  }, {
                    value: 1,
                    label: '库存已扣减'
                  }, {
                    value: 2,
                    label: '已支付'
                  }, {
                    value: 3,
                    label: '已取消'
                  }],
                orderStatus: 0,
                total: 0,
                rows: 10,
                page: 1
            }
        },
        components: {
          AddOrder,
          ShowOrderDetail,
          CancelOrder,
          PayOrder
        },
        created: function(){
          this.setOrderInfo();
        },
        watch: {
          
        },
        mounted () {
      
        },
        methods: {
          showAddOrder(){
            this.addOrderDialogVisible = true;
            this.cancelOrderDialogVisible =false;
            this.orderDetailDialogVisible = false;
            this.payOrderDialogVisible = false;
          },
          showOrderDetail(index){
            this.selectedIndex = index;
            this.selectedItem = JSON.parse(JSON.stringify(this.OrderInfo[index]));
            this.orderDetailDialogVisible = true;
            this.addOrderDialogVisible = false;
            this.cancelOrderDialogVisible =false;
            this.payOrderDialogVisible = false;
          },
          showCancelOrder(index){
            this.selectedIndex = index;
            this.selectedItem = JSON.parse(JSON.stringify(this.OrderInfo[index]));
            this.cancelOrderDialogVisible = true;
            this.addOrderDialogVisible = false;
            this.orderDetailDialogVisible = false;
            this.payOrderDialogVisible = false;
          },
          showPayOrder(index){
            this.selectedIndex = index;
            this.selectedItem = JSON.parse(JSON.stringify(this.OrderInfo[index]));
            this.cancelOrderDialogVisible = false;
            this.addOrderDialogVisible = false;
            this.orderDetailDialogVisible = false;
            this.payOrderDialogVisible = true;
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
            this.cancelOrderDialogVisible =false;
            this.orderDetailDialogVisible = false;
            this.payOrderDialogVisible = false;
            this.selectedItem={};
          },
          cancelOrder(Order){
            if(localStorage.getItem("microserviceDemoLoginToken")===null){
    
              this.$router.push({
                path: '/login'
              })
            }
            else{
              loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")
              loginUserId = localStorage.getItem("microserviceDemoLoginUserId")
              
              var cancelOrderUrl="/api/orders/cancel/"+loginUserId+"/"+this.selectedItem.orderHeaderId
              axios({
                url: cancelOrderUrl,
                method: 'PUT',
                //data: Order,
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
              this.cancelOrderDialogVisible=false;
              this.addOrderDialogVisible = false;
              this.orderDetailDialogVisible = false;
              this.payOrderDialogVisible = false;
              this.selectedItem={};
              this.selectedIndex = -1;
            }
          },
          payOrder(Order){
            if(localStorage.getItem("microserviceDemoLoginToken")===null){
    
              this.$router.push({
                path: '/login'
              })
            }
            else{
              loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")
              loginUserId = localStorage.getItem("microserviceDemoLoginUserId")
              
              var payOrderUrl="/api/orders/pay/"+loginUserId+"/"+this.selectedItem.orderHeaderId
              axios({
                url: payOrderUrl,
                method: 'GET',
                //data: Order,
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
              this.cancelOrderDialogVisible=false;
              this.addOrderDialogVisible = false;
              this.orderDetailDialogVisible = false;
              this.payOrderDialogVisible = false;
              this.selectedItem={};
              this.selectedIndex = -1;
            }
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
                },
                params: {
                  orderStatus: this.orderStatus
                }
                })
                  .then(response => {
                    if(response.data.data!=null){
                      this.OrderInfo = response.data.data.records
                      this.total = response.data.data.total
                    }
                    else{
                      this.OrderInfo=[]
                      this.total = 0
                    }
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
            this.orderDetailDialogVisible = false;
            this.cancelOrderDialogVisible =false;
            this.payOrderDialogVisible = false;
            this.selectedItem={};
          }
        }
    }
    </script>
    
    <style>
    
    </style>