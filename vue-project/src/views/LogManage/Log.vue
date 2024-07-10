<template>
  <PageContainer :title="'数据列表'">
    <template #extra>
      <el-button type="primary" @click="add">新增</el-button>
    </template>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="createTime" label="日期">
        <template #default="scope">
          {{ dayjs(scope.row.date).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="primary" @click="onCheck(row)">查看</el-button>
          <el-popconfirm
            title="你确定要删除吗"
            confirm-button-text="确定"
            cancel-button-text="取消"
          >
            ><template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <AddLogDrawer ref="logDrawerRef" />
  </PageContainer>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { dayjs } from 'element-plus'
import { getLogService } from '@/api/log'
import AddLogDrawer from './components/AddLogDrawer.vue'
onMounted(async () => {
  const res = await getLogService()

  tableData.value = res.data.data
  console.log(res.data.data)
})
const tableData = ref([
  { id: 1, name: '张三', date: '2021-01-01', content: '123' }
])
const add = () => {
  logDrawerRef.value.open({})
}
const onCheck = (row) => {
  logDrawerRef.value.open(row)
}
const logDrawerRef = ref()
</script>
