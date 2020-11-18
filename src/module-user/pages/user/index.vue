<template>
  <div class="container">
    <el-button type="text" size="mini" @click="openUserAddDialog"
      >新增</el-button
    >
    <el-table
      class="dataList"
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
        <template>
          <el-button type="text" size="mini" @click="openUserEditDialog"
            >编辑</el-button
          >
          <el-button type="text" size="mini">删除</el-button>
          <el-button type="text" size="mini" @click="openUserDetailDialog"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="listData.counts > 0"
      :total="listData.counts"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pagesize"
      @pagination="getList"
    />

    <!-- 用户添加 -->
    <user-add-dialog
      :dialogVisible.sync="addDialogVisible"
      @refreshList="getList"
    />

    <!-- 用户编辑 -->
    <user-edit-dialog
      :dialogVisible.sync="editDialogVisible"
      :id="id"
      @refreshList="getList"
    />

    <!-- 用户查看 -->
    <user-detail-dialog :dialogVisible.sync="detailDialogVisible" :id="id" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import UserAddDialog from './components/user-add-dialog.vue'
import UserEditDialog from './components/user-edit-dialog.vue'
import UserDetailDialog from './components/user-detail-dialog.vue'
import { list } from '@/api/users'
import { Page } from '@/entity/page'
import { User } from '@/entity/user'

@Component({
  name: 'UserList',
  components: {
    Pagination,
    UserAddDialog,
    UserEditDialog,
    UserDetailDialog
  }
})
export default class extends Vue {
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

  private openUserAddDialog() {
    this.addDialogVisible = true
  }

  private openUserEditDialog() {
    this.editDialogVisible = true
  }

  private openUserDetailDialog() {
    this.detailDialogVisible = true
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1366px;
  margin: 0 auto;

  .dataList {
    margin-top: 50px;
  }
}
</style>
