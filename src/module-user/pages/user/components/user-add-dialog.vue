<template>
  <el-dialog
    title="用户新增"
    width="570px"
    :visible.sync="syncDialogVisible"
    @closed="syncDialogVisible = false"
  >
    <el-form ref="form" :model="user" class="form" label-width="100px">
      <el-form-item label="账号：">
        <el-input v-model="user.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="user.fullName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="user.mobile" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="邮件：">
        <el-input v-model="user.email" placeholder="请输入邮件"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="syncDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, PropSync } from 'vue-property-decorator'
import MixinTools from '@/utils/mixins.vue'
import { add } from '@/api/users'
import { mixins } from 'vue-class-component'

@Component({
  name: 'UserAddDialog'
})
export default class extends mixins(MixinTools) {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  private user = {
    account: '',
    fullName: '',
    mobile: '',
    email: ''
  }

  private async handleSave() {
    await add(this.user)

    this.syncDialogVisible = false
    this.showMessage('操作成功')
    this.$emit('refreshList')
  }
}
</script>
