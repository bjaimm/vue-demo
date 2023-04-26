<template>
  <el-dialog title="待办事项-显示订单明细" :visible="dialogVisible" :before-close="dialogClose">
    <el-table :data="selectedItem.orderDetailList" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="productQty" label="订购数量"></el-table-column>
        <el-table-column prop="productPrice" label="单价"></el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ShowOrderDetail',
  props: {
    selectedItem: Object,
    dialogVisible: Boolean
  },
  methods: {

    cancel(){
        this.$emit("cancel");
    },
    dialogClose(){
      //this.$emit("update:orderDetailDialogVisible",false)
      this.cancel();
    }
  }  
}
</script>

