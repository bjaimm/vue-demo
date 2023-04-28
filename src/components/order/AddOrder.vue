<template>
  <el-dialog title="待办事项-下单(购物车)" :visible="dialogVisible" :before-close="dialogClose">
    <el-button  size="small" type="primary" icon="el-icon-search" @click="showProductSelect">选择产品</el-button>
    总价：{{ totalAmount }}
    <el-table :data="pickedProducts" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column label="订购数量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.productQty" :min="1" :max="10" size="small" controls-position="right"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="productPrice" label="单价"></el-table-column>
        <el-table-column  label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-remove" @click="removeProductFromChart(scope.row)" title="删除"></i>
          </template>
        </el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
        <el-button  size="small" @click="cancel">取消</el-button>
        <el-button  size="small" type="primary" @click="save">确认下单</el-button>
    </div>
    <ProductSelect :dialogVisible.sync="productSelectDialogVisible"  @save="selectProduct" @cancel="cancelProductSelect"></ProductSelect>
  </el-dialog>
</template>

<script>
import ProductSelect from "./ProductSelect.vue"
export default {
  name: 'AddOrder',
  data(){
    return {
      productSelectDialogVisible: false,
      pickedProducts: this.$store.state.orderChart
    }
  },
  watch:{
    "$store.state.orderChart"(){
      alert("购物车更新")
    }
  },
  components:{
    ProductSelect
  },
  computed: {
    totalAmount: function(){
      var sum = 0;
      if(this.pickedProducts ===null){
        return sum;
      }
      for(var i=0;i<this.pickedProducts.length;i++){
        sum += this.pickedProducts[i].productPrice * this.pickedProducts[i].productQty;
      }
      return sum;
    }
  },
  props: {
    dialogVisible: Boolean
  },
  
  methods: {
    save(){
        this.$emit("save",this.pickedProducts,this.totalAmount);
    },
    cancel(){
        this.$emit("cancel");
    },
    dialogClose(){
      //this.$emit("update:orderDetailDialogVisible",false)
      this.cancel();
    },
    removeProductFromChart(row){
      this.$store.commit("popupOrderChart",row);
    },
    selectProduct(selectedProductListChild){
      
      for(let i=0;i<selectedProductListChild.length;i++){
        var existing = false;
        if(this.$store.state.orderChart===null){
          this.$store.commit("pushOrderChart",selectedProductListChild[i])
          continue;
        }
        for(let j=0; j<this.$store.state.orderChart.length;j++){
          if(selectedProductListChild[i].productId === this.$store.state.orderChart[j].productId){
              existing = true;
          }
        }
        if (!existing){
           this.$store.commit("pushOrderChart",selectedProductListChild[i])
        }
      }
      this.productSelectDialogVisible = false
    },
    cancelProductSelect(){
      this.productSelectDialogVisible = false
    },
    showProductSelect(){
      this.productSelectDialogVisible = true
    }
  }  
}
</script>

