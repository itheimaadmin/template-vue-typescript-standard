<template>
  <el-dialog
    title="用户查看"
    width="570px"
    :visible.sync="syncDialogVisible"
    @open="getUser"
    @closed="syncDialogVisible = false"
  >
    <el-form ref="form" :model="user" class="form" label-width="100px">
      <el-form-item label="账号：">
        {{ user.account }}
      </el-form-item>
      <el-form-item label="姓名：">
        {{ user.fullName }}
      </el-form-item>
      <el-form-item label="联系电话：">
        {{ user.mobile }}
      </el-form-item>
      <el-form-item label="邮件：">
        {{ user.email }}
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { detail } from '@/api/users'

@Component({
  name: 'UserDetailDialog'
})
export default class extends Vue {
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
}
</script>
