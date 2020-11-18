<template>
  <el-dialog
    title="用户编辑"
    width="570px"
    :visible.sync="syncDialogVisible"
    @closed="syncDialogVisible = false"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="form"
      label-width="100px"
    >
      <el-form-item label="账号：" prop="account">
        <el-input v-model="form.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入姓名"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-right">
      <el-button @click="syncDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator'

@Component({
  name: 'UserEdit'
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean

  private form: any = {}

  private rules: object = {}

  private handleSave() {
    console.log('handleSave')
    this.syncDialogVisible = false
    this.$emit('refreshList')
  }
}
</script>

<style lang="scss" scoped></style>
