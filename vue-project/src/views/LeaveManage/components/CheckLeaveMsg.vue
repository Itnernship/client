<template>
  <el-dialog v-model="dialogFormVisible" title="请假条" width="50%">
    <el-form :model="leaveForm" label-width="120px">
      <el-form-item label="申请人: ">
        {{ leaveForm.applicantName }}
      </el-form-item>
      <el-form-item label="请假类别: ">
        {{ result(leaveForm.leaveSort) }}
      </el-form-item>
      <el-form-item label="请假时间: ">
        {{ leaveForm.startTime }} 到 {{ leaveForm.endTime }}
      </el-form-item>
      <el-form-item label="请假理由: ">
        {{ leaveForm.reason }}
      </el-form-item>
      <el-form-item label="意见:" class="opinions">
        <span class="form-item-label">授课老师意见：</span>
        <span>{{ leaveForm.teacherName }}</span>
        <span class="form-item-label">系主任意见：</span>
        <span>{{ leaveForm.directorName }}</span>
        <span class="form-item-label">院长意见：</span>
        <span>{{ leaveForm.deanName }}</span>
      </el-form-item>
      <el-form-item style="margin-left: 300px">
        <el-button type="primary" @click="onApprove" v-if="editShow"
          >批准</el-button
        >
        <el-button type="danger" @click="onDeny" v-if="editShow"
          >驳回</el-button
        >
        <el-button @click="dialogFormVisible = false">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { approveLeaveService, rejectLeaveService } from '@/api/leave'
import { useUserStore } from '@/stores/user.js'
const userStore = useUserStore()
const dialogFormVisible = ref(false)
const emit = defineEmits(['success'])
const open = (value) => {
  leaveForm.value = { ...value }
  editShow.value = onshow(value.leaveStatus)
  dialogFormVisible.value = true
}
const leaveForm = ref({
  applicantName: '',
  leaveSort: '',
  leaveTime: '',
  reason: '',
  teacherName: '',
  directorName: '',
  deanName: '',
  leaveStatus: 0
})
//请假的类别
const result = (id) => {
  if (id === 1) {
    return '病假'
  }
  if (id === 2) {
    return '事假'
  }
  return '其他理由'
}
const editShow = ref(false)
const onshow = (value) => {
  //   console.log(userStore.roleId)
  //   console.log(leaveForm.value)
  if (userStore.roleId === 4 && value === 0) return true
  if (userStore.roleId === 3 && value === 1) return true
  if (userStore.roleId === 2 && value === 2) return true
  return false
}
//批准请假
const onApprove = async () => {
  const data = {
    ...leaveForm.value,
    checkUserid: userStore.id
  }
  console.log(data)
  await approveLeaveService(data)
  ElMessage.success('批准成功')
  emit('success')
  dialogFormVisible.value = false
}
//驳回请假
const onDeny = async () => {
  const data = {
    ...leaveForm.value,
    checkUserid: userStore.id
  }
  await rejectLeaveService(data)
  ElMessage.success('驳回成功')
  await emit('success')
  dialogFormVisible.value = false
}
defineExpose({ open })
</script>
<style scoped>
.opinions {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
}

.opinions .form-item-label {
  width: 120px; /* 设置提示语的宽度 */
  text-align: right; /* 提示语右对齐 */
  margin-right: 10px; /* 提示语和数据之间的间距 */
  white-space: nowrap; /* 不换行 */
}

.opinions span {
  flex: 1; /* 自动填充剩余空间 */
}
</style>
