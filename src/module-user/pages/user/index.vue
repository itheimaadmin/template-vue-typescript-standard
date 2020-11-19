<template>
  <div class="container">
    <div class="button-area">
      <el-button type="primary" size="small" @click="handleOpenAddDialog"
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-btn_add" /></svg
        >新增</el-button
      >
    </div>

    <el-table
      class="data-list"
      v-loading="listLoading"
      :data="listData.items"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="fullName" label="姓名"></el-table-column>
      <el-table-column prop="mobile" label="联系电话"></el-table-column>
      <el-table-column prop="email" label="邮件"></el-table-column>
      <el-table-column prop="create_date" label="注册时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleOpenEditDialog"
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-btn_edit" /></svg
            >编辑</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="handleOpenRemoveConfirm(scope.row.id)"
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-btn_del" /></svg
            >删除</el-button
          >
          <el-button type="text" size="mini" @click="handleOpenDetailDialog"
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-btn_chakan" /></svg
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <common-pagination
      v-show="listData.counts > 0"
      :total="listData.counts"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />

    <!-- 用户添加对话框 -->
    <user-add-dialog
      :dialogVisible.sync="addDialogVisible"
      @refreshList="getList"
    />

    <!-- 用户编辑对话框 -->
    <user-edit-dialog
      :dialogVisible.sync="editDialogVisible"
      :id="id"
      @refreshList="getList"
    />

    <!-- 用户查看对话框 -->
    <user-detail-dialog :dialogVisible.sync="detailDialogVisible" :id="id" />
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import MixinTools from '@/utils/mixins.vue'
import CommonPagination from '@/components/common-pagination/index.vue'
import UserAddDialog from './components/user-add-dialog.vue'
import UserEditDialog from './components/user-edit-dialog.vue'
import UserDetailDialog from './components/user-detail-dialog.vue'
import { list, remove } from '@/api/users'
import { Page } from '@/entity/page'
import { User } from '@/entity/user'
import { mixins } from 'vue-class-component'

@Component({
  name: 'UserList',
  components: {
    CommonPagination,
    UserAddDialog,
    UserEditDialog,
    UserDetailDialog
  }
})
export default class extends mixins(MixinTools) {
  private listData: Page<User> = {
    counts: 0,
    page: 0,
    items: [],
    pages: 0,
    pagesize: 0
  }
  private listLoading = false
  private listQuery = {
    page: 1,
    pagesize: 10
  }
  private addDialogVisible = false
  private editDialogVisible = false
  private detailDialogVisible = false
  private id = 0

  @Watch('listQueryData', { deep: true, immediate: true })
  private watchListQueryData(newVal: string) {
    if (newVal == '') {
      return
    }
    this.getList()
  }

  @Watch('listQuery.pagesize', { immediate: true })
  private watchListQuerypagesize() {
    this.listQuery.page = 1
  }

  private async getList() {
    this.listLoading = true
    const { data } = await list(this.listQuery)
    this.listData = data
    this.listLoading = false
  }

  private handleOpenAddDialog() {
    this.addDialogVisible = true
  }

  private handleOpenEditDialog() {
    this.editDialogVisible = true
  }

  private async handleOpenRemoveConfirm(id: number) {
    try {
      await this.showDeleteConfirm()

      await remove(id)
      this.showMessage('操作成功')
    } catch (err) {
      console.log('err: ' + err)
    }
  }

  private handleOpenDetailDialog() {
    this.detailDialogVisible = true
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1366px;
  margin: 0 auto;

  .button-area {
    text-align: right;
  }

  .data-list {
    margin-top: 20px;
  }
}
</style>
