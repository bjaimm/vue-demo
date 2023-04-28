<template>
    <el-dialog title="可选产品列表" @opened="opened" :visible="dialogVisible" :before-close="dialogClose" append-to-body>
      <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="产品名称">
              <el-input v-model="queryProductName" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button  size="small" type="primary" @click="setProductSelectList">查询</el-button>
          </el-form-item>
      </el-form>
      <el-table :data="productSelectList" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="productAmount" label="库存数量"></el-table-column>
          <el-table-column prop="productPrice" label="单价"></el-table-column>
          <el-table-column  label="操作" width="100">
            <template slot-scope="scope">
                <el-checkbox :checked="selectedOrNot(scope.row)"  @change="checked => selectChanged(checked,scope.row)"></el-checkbox>
            </template>
          </el-table-column>
      </el-table>
  
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
        selectedProductList: []
    }
  },
  props: {
    dialogVisible: Boolean
  },
  created: function(){
      this.setProductSelectList();
    },
  watch: {
    "dialogVisible": function(newValue,oldValue){
      if(newValue){
        this.selectedProductList=[];
        this.setProductSelectList();
      }
    }
  },
  methods: {
    opened(){

        console.log("opened is triggered")
    },
    setProductSelectList(){
        if(localStorage.getItem("microserviceDemoLoginToken")===null){

            this.$router.push({
            path: '/login'
            })
        }
        else{
            var loginToken = "Bearer "+localStorage.getItem("microserviceDemoLoginToken")
            axios
                .get('/api/products',{
            headers: {
                'Authorization': loginToken
            }
            })
                .then(response => (this.productSelectList = response.data.data)
            
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
    }

  }  
}
</script>

