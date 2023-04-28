<template>
    <el-dialog title="可选产品列表" @opened="opened" :visible="dialogVisible" :before-close="dialogClose" append-to-body>
      <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="产品名称">
              <el-input v-model="queryProductName" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button  size="small" type="primary" @click="searchProductSelectList">查询</el-button>
          </el-form-item>
      </el-form>
      <el-table :data="productSelectList" style="width: 100%">
          <el-table-column type="index" :index="indexByPages" width="50"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productAmount" label="库存数量"></el-table-column>
          <el-table-column prop="productPrice" label="单价"></el-table-column>
          <el-table-column  label="操作" width="100">
            <template slot-scope="scope">
                <el-checkbox :checked="selectedOrNot(scope.row)"  @change="checked => selectChanged(checked,scope.row)"></el-checkbox>
            </template>
          </el-table-column>
      </el-table>
      <div class="block">
          <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page" :page-sizes="[1,2,3,4]" :page-size="rows" layout="total,sizes,prev,next,jumper" :total="total">

          </el-pagination>
      </div>
  
      <div slot="footer" class="dialog-footer">
          <el-button  size="small" @click="cancel">取消</el-button>
          <el-button  size="small" type="primary" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </template>

<script>

import axios from 'axios'

export default {
  name: 'ProductSelect',
  data(){
    return {
        queryProductName: "",
        productSelectList: [],
        selected: false,
        selectedProductList: [],
        total: 0,
        rows: 2,
        page: 1
    }
  },
  props: {
    dialogVisible: Boolean
  },
  created: function(){
      this.searchProductSelectList();
    },
  computed:{
        indexByPages: function(){
            return (this.page - 1)*(this.rows) + 1
        }
      },
  watch: {
    "dialogVisible": function(newValue,oldValue){
      if(newValue){
        this.selectedProductList=[];
        this.searchProductSelectList();
      }
    }
  },
  methods: {
    opened(){

        console.log("opened is triggered")
    },
    searchProductSelectList(){
        if(localStorage.getItem("microserviceDemoLoginToken")===null){

            this.$router.push({
            path: '/login'
            })
        }
        else{
            var loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")
            var queryUrl="/api/products/listpage/"+this.page+"/"+this.rows

            axios
                .get(queryUrl,{
            headers: {
                'Authorization': loginToken
            },
            params: {
              productName: this.queryProductName
            }
            })
                .then(response => {
                  if(response.data.data!=null){
                      this.productSelectList = response.data.data.records
                      this.total = response.data.data.total
                    }
                    else{
                      this.productSelectList=[]
                      this.total = 0
                    }
                }
            
            )
                .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        }
    },
    save(){
        this.$emit("save",this.selectedProductList);
    },
    cancel(){
        this.$emit("cancel");
    },
    dialogClose(){
      //this.$emit("update:orderDetailDialogVisible",false)
      this.cancel();
    },
    selectedOrNot(row){
      for(let i=0;i<this.selectedProductList.length;i++){
        if(row.productId === this.selectedProductList[i].productId){
          return true;
        }
      }
      return false;
    },
    selectChanged(checked,params){
        if(checked){
            this.selectedProductList.push({
                productId: params.productId,
                productName: params.productName,
                productPrice: params.productPrice,
                productQty: 1
            });
        }
        else{
            for(let i=0;i<this.selectedProductList.length;i++){
                if(params.productId === this.selectedProductList[i].productId){
                    this.$delete(this.selectedProductList,i)
                }
            }

        }
    },
    //每页显示记录数发生变化时，设置当前页码为1，执行查询
    handleSizeChange: function(sizes){
            this.rows =sizes;
            this.page=1;
            this.searchProductSelectList();
          },
    //当前页码发生变化，执行查询
    handleCurrentChange: function(page){
      this.page = page;
      this.searchProductSelectList();
    }

  }  
}
</script>

