<template>
  <PageContainer title="用户管理">
    <template #extra>
      <el-button @click="onAddUser" type="primary">添加用户</el-button>
    </template>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180" />
      <el-table-column prop="password" label="密码" width="180" />
      <el-table-column prop="roleName" label="角色" />
      <el-table-column prop="createTime" label="创建时间">
        <template #default="scope">{{
          dayjs(scope.createTime).format('YYYY-MM-DD')
        }}</template>
      </el-table-column>
      <el-table-column prop="Updateime" label="更新时间">
        <template #default="scope">{{
          dayjs(scope.updateTime).format('YYYY-MM-DD')
        }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-popconfirm
            title="你确定要删除吗"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="onDeleteArticle(row)"
          >
            ><template #reference>
              <el-button circle plain type="danger" :icon="Delete" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <DialogManage ref="dialogRef" @success="onSuccess"></DialogManage>
  </PageContainer>
</template>

<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import DialogManage from './components/DialogManage.vue'
import { userGetInfoService, userDeleteService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { dayjs } from 'element-plus'
const loading = ref(false)

const dialogRef = ref(null)
const tableData = ref([])
const total = ref(0)
const getList = async () => {
  loading.value = true
  console.log(params.value)
  const res = await userGetInfoService(params.value)

  console.log(res.data)
  total.value = res.data.total
  tableData.value = res.data.records
  loading.value = false
}
const onSuccess = async () => {
  getList()
}
onMounted(() => {
  getList()
})
const onEditArticle = (row) => {
  console.log(row)
  dialogRef.value.openDialog(row)
}
//删除用户
const onDeleteArticle = async (row) => {
  // console.log('删除的对象')
  // console.log(row)

  await userDeleteService(row)
  ElMessage.success('删除成功')
  getList()
}
const onAddUser = () => {
  console.log('添加用户')
  dialogRef.value.openDialog({})
}
const params = ref({
  pagenum: 1,
  pagesize: 5
})
//处理页面的变化
const handleCurrentChange = (val) => {
  params.value.pagenum = val
  console.log(
    'pagenum',
    params.value.pagenum,
    '---agesize',
    params.value.pagesize
  )
  getList()
}
const handleSizeChange = (val) => {
  params.value.pagesize = val
  params.value.pagenum = 1
  console.log(
    'pagenum',
    params.value.pagenum,
    '---agesize',
    params.value.pagesize
  )
  getList()
}
</script>
