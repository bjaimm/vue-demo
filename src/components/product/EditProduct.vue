<template>
  <el-dialog title="待办事项-编辑产品" :visible.sync="dialogVisible">
    <el-form>
        <el-form-item label="产品名称">
            <el-input v-model="selectedItem.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品价格">
            <el-input v-model="selectedItem.productPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品数量">
            <el-input v-model="selectedItem.productAmount" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'EidtProduct',
  props: {
    selectedItem: Object,
    dialogVisible: Boolean
  },
  methods: {
    save(){
        this.$emit("save",this.selectedItem);
    },
    cancel(){
        this.$emit("cancel");
    }
  }  
}
</script>

