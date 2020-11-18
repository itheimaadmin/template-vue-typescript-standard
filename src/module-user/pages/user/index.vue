<template>
  <div class="container">
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
      <el-table-column label="操作">
        <template>
          <el-button type="text" size="mini" @click="handleUserEdit"
            >编辑</el-button
          >
          <el-button type="text" size="mini">删除</el-button>
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

    <!-- 用户编辑 -->
    <user-edit :dialogVisible.sync="dialogVisible" @refreshList="getList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import UserEdit from './components/user-edit.vue'
import { list } from '@/api/users'
import { Page } from '@/entity/page'
import User from '@/module-user'

@Component({
  name: 'UserList',
  components: {
    Pagination,
    UserEdit
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
    pagesize: 10,
    keyword: ''
  }
  private dialogVisible = false

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

  private handleUserEdit() {
    this.dialogVisible = true
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
