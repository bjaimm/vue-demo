<template>
<div id="productList" style="text-align: left">
    <el-breadcrumb style="margin-top: 15px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item >产品模块</el-breadcrumb-item>
        <el-breadcrumb-item >产品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="产品名称">
            <el-input placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" >查询</el-button>
            <el-button type="primary" @click="showAddProduct">新增</el-button>
        </el-form-item>
    </el-form>
    
    <el-table :data="ProductInfo" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="productPrice" label="产品价格"></el-table-column>
        <el-table-column prop="productAmount" label="产品数量"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-button round @click="showEditProduct(scope.$index)">编辑</el-button>
            <el-button round @click="deleteProduct(scope.$index)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>

    <AddProduct :dialogVisible="addProductDialogVisible" :selectedItem="selectedItem" @save="addProduct" @cancel="cancel"></AddProduct>
    <EditProduct :dialogVisible="editProductDialogVisible" :selectedItem="selectedItem" @save="editProduct" @cancel="cancel"></EditProduct>
</div>
</template>

<script>
  import AddProduct from '../../components/product/AddProduct.vue'
  import EditProduct from '../../components/product/EditProduct.vue'
  import qs from 'qs'
  import axios from 'axios'

  var loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")

export default{
    name: "ProductList",
    data() {
        return {
            selectedIndex: -1,
            selectedItem: {},
            addProductDialogVisible: false,
            editProductDialogVisible: false,
            ProductInfo: []
        }
    },
    components: {
      AddProduct,
      EditProduct
    },
    created: function(){
      this.setProductInfo();
    },
    watch: {
      
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

          this.$router.push({
            path: '/login'
          })
        }
        else{
          loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")
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
        }
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

</style>