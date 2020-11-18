<template>
  <el-dialog
    title="用户编辑"
    width="570px"
    :visible.sync="syncDialogVisible"
    @open="getUser"
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
import { Component, Prop, PropSync } from 'vue-property-decorator'
import MixinTools from '@/utils/mixins.vue'
import { detail, edit } from '@/api/users'
import { mixins } from 'vue-class-component'

@Component({
  name: 'UserEditDialog'
})
export default class extends mixins(MixinTools) {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  private syncDialogVisible!: boolean

  @Prop({ type: Number, required: true }) private readonly id!: number

  private user = {
    account: '',
    fullName: '',
    mobile: '',
    email: ''
  }

  private async getUser() {
    const { data } = await detail(this.id)
    this.user = data
  }

  private async handleSave() {
    await edit(this.id, this.user)

    this.syncDialogVisible = false
    this.$emit('refreshList')
  }
}
</script>
