<template>
  <el-dialog title="待办事项-支付订单" :visible="dialogVisible" :before-close="dialogClose">
    请确认是否支付以下订单：
    <el-table :data="selectedItem.orderDetailList" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="productQty" label="订购数量"></el-table-column>
        <el-table-column prop="productPrice" label="单价"></el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'PayOrder',
  props: {
    selectedItem: Object,
    dialogVisible: Boolean
  },
  methods: {

    cancel(){
        this.$emit("cancel");
    },
    save(){
        this.$emit("save",this.selectedItem);
    },
    dialogClose(){
      //this.$emit("update:orderDetailDialogVisible",false)
      this.cancel();
    }
  }  
}
</script>

