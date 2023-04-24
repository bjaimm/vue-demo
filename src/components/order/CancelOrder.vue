<template>
  <el-dialog title="待办事项-取消订单" :visible.sync="dialogVisible">
    请确认是否取消以下订单：
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
  name: 'CancelOrder',
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
    }
  }  
}
</script>

