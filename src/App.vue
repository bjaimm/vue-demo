<template>
  	
  <div id="app" style="text-align: left">
    <HelloWorld v-bind:msg="msg" style="text-align: center;"/>
    <el-button type="text" @click="getToken">获取Token</el-button>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>产品模块</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">产品清单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>订单模块</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">订单列表</el-menu-item>
              <el-menu-item index="2-2">订单支付</el-menu-item>
              <el-menu-item index="2-3">订单取消</el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
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
          <el-button type="text" @click="showAddProduct">新增</el-button>
          <el-table :data="ProductInfo" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="productName" label="产品名称"></el-table-column>
            <el-table-column prop="productPrice" label="产品价格"></el-table-column>
            <el-table-column prop="productAmount" label="产品数量"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="showEditProduct(scope.$index)">编辑</el-button>
                <el-button type="text" @click="deleteProduct(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <AddProduct :dialogVisible="addProductDialogVisible" :selectedItem="selectedItem" @save="addProduct" @cancel="cancel"></AddProduct>
    <EditProduct :dialogVisible="editProductDialogVisible" :selectedItem="selectedItem" @save="editProduct" @cancel="cancel"></EditProduct>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AddProduct from './components/AddProduct.vue'
import EditProduct from './components/EditProduct.vue'
import qs from 'qs'
import axios from 'axios'

var loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")

export default {
  data() {
    return { 
      msg : "Microservice Demo App",
      selectedIndex: -1,
      selectedItem: {},
      addProductDialogVisible: false,
      editProductDialogVisible: false,
      ProductInfo: []
    }
  },
  name: 'App',
  components: {
    HelloWorld,
    AddProduct,
    EditProduct
  },
  created: function(){
    this.setProductInfo();
  },
  watch: {
    msg: function(newValue,oldValue){
      if(newValue != oldValue && localStorage.getItem("microserviceDemoLoginToken")!=null){
        loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken");
        this.setProductInfo();
      }
    }
  },
  mounted () {

  },
  methods: {
    deleteProduct(index){
      const url = `/api/products/${this.ProductInfo[index].productId}`;
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
        this.setProductInfo();
      })
			.catch(function (error) { // 请求失败处理
				console.log(error);
			});
      this.selectedIndex = -1;
      this.selectedItem={};
    },
    showAddProduct(){
      this.addProductDialogVisible = true;
    },
    showEditProduct(index){
      this.selectedIndex = index;
      this.selectedItem = JSON.parse(JSON.stringify(this.ProductInfo[index]));
      this.editProductDialogVisible = true;
    },
    addProduct(product){
      axios({
        url: '/api/products',
        method: 'POST',
			  data: product,
				headers: { 
          'Authorization': loginToken
        },
        timeout: 6000
			})
			.then((response) => {
        console.log(response.data);
        this.setProductInfo();
      })
			.catch(function (error) { // 请求失败处理
				console.log(error);
			});
      this.addProductDialogVisible=false;
      this.selectedItem={};
    },
    editProduct(product){
      axios({
        url: '/api/products',
        method: 'PUT',
			  data: product,
				headers: { 
          'Authorization': loginToken
        },
        timeout: 6000
			})
			.then((response) => {
        console.log(response.data);
        this.setProductInfo();
      })
			.catch(function (error) { // 请求失败处理
				console.log(error);
			});
      this.editProductDialogVisible=false;
      this.selectedItem={};
      this.selectedIndex = -1;
    },
    setProductInfo(){
      if(localStorage.getItem("microserviceDemoLoginToken")===null){
        this.getToken();
      }
      axios
          .get('/api/products',{
        headers: {
          'Authorization': loginToken
        }
        })
          .then(response => (this.ProductInfo = response.data.data)
        
        )
          .catch(function (error) { // 请求失败处理
            console.log(error);
        });
    },
	  getToken() {

			axios({
        url: '/api/security/oauth/token',
        method: 'POST',
			  data: qs.stringify({
						'username': '1',
						'password': '123456',
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
        localStorage.setItem("microserviceDemoLoginToken",response.data.data.access_token);
        this.msg = response.data.data.access_token;

      })
			.catch(function (error) { // 请求失败处理
				console.log(error);
			});
      axios.interceptors.request.use((request) => {
        if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            //request.data = qs.stringify(request.data);
            console.log(request.data);
        }

        return request;
      });


	  },
    cancel(){
      this.addProductDialogVisible = false;
      this.editProductDialogVisible = false;
      this.selectedItem={};
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
