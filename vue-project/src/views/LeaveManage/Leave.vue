<script setup>
import { CirclePlus, Delete, View } from '@element-plus/icons-vue'
import { dayjs } from 'element-plus'
import { ref, onMounted } from 'vue'
import { getLeaveService, deleteLeaveService } from '@/api/leave'
import { useUserStore } from '@/stores'
//导入添加请假信息
import AddLeaveData from './components/AddLeaveData.vue'
//查看请假信息
import CheckLeaveMsg from './components/CheckLeaveMsg.vue'
const userStore = useUserStore()
const onCheck = (scope) => {
  console.log(scope)
  checkLeaveMsgRef.value.open(scope)
}
//绑定添加表单
const addLeaveRef = ref(null)
//查看请假条
const checkLeaveMsgRef = ref(null)
//表单数据
const tableData = ref([])

const getLeaveList = async () => {
  const res = await getLeaveService()
  // console.log(res)
  const dataList = res.data.data
  // if (dataList.length === 0) return
  tableData.value = dataList.filter((item) => {
    if (item.applicantId === userStore.id) return true
    if (userStore.roleId === 1 || userStore.roleId === 4) return true
    if (userStore.roleId === 3 && item.leaveStatus > 0) return true
    if (userStore.roleId === 2 && item.leaveStatus > 1) return true
    return false
  })
  if (tableData.value.length === 0) tableData.value = []
  // console.log(tableData.value)
}
//删除请假信息
const onDeleteArticle = async (id) => {
  await deleteLeaveService(id)
  ElMessage.success('删除成功')
  getLeaveList()
}
onMounted(() => {
  getLeaveList()
})
const result = (id) => {
  console.log(id)
  if (id === 1) {
    return '病假'
  }
  if (id === 2) {
    return '事假'
  }
  return '其他理由'
}

//审核状态
const checkStatus = (status) => {
  if (status === 1) {
    return '通过'
  }
  if (status === 2) {
    return '驳回'
  }
  return '待审核'
}
const onSuccess = () => {
  getLeaveList()
}
const leave = () => {
  addLeaveRef.value.openAddLeaveMsg()
}
</script>
<template>
  <PageContainer>
    <template #extra>
      <el-button type="primary" :icon="CirclePlus" @click="leave"
        >请假</el-button
      >
    </template>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="120"> </el-table-column>

      <el-table-column prop="applicantName" label="申请人" width="120" />
      <el-table-column label="请假类别">
        <template #default="scope">
          {{ result(scope.row.leaveSort) }}
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间">
        <template #default="scope">
          {{ dayjs(scope.row.startTime).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template #default="scope">
          {{ dayjs(scope.row.endTime).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="请假理由" />
      <el-table-column label="审核状态">
        <template #default="scope">
          {{ checkStatus(scope.row.checkStatus) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="View"
            @click="onCheck(row)"
          ></el-button>
          <el-popconfirm
            title="你确定要删除吗"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="onDeleteArticle(row.id)"
          >
            ><template #reference>
              <el-button
                v-if="
                  userStore.roleId === 1 || userStore.id === row.applicantId
                "
                circle
                plain
                type="danger"
                :icon="Delete"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <AddLeaveData ref="addLeaveRef" @success="onSuccess"></AddLeaveData>
    <CheckLeaveMsg ref="checkLeaveMsgRef" @success="onSuccess"></CheckLeaveMsg>
  </PageContainer>
</template>
