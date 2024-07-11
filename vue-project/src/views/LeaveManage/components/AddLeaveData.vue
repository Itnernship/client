<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { addLeaveService } from '@/api/leave'
const emit = defineEmits(['success'])
const userStore = useUserStore()
const dialogFormVisible = ref(false)
const form = ref({
  leaveSort: '',
  time: [],
  reason: ''
})
const formModel = ref(null)
const openAddLeaveMsg = () => {
  //清空表单数据
  //   formModel.value.resetFields()
  dialogFormVisible.value = true
}
const createLeave = async () => {
  console.log(form.value)

  const data = {
    applicantId: userStore.id,
    leaveSort: form.value.leaveSort,
    startTime: form.value.time[0],
    endTime: form.value.time[1],
    reason: form.value.reason
  }
  await addLeaveService(data)
  dialogFormVisible.value = false
  emit('success')
}

defineExpose({
  openAddLeaveMsg
})
</script>

<template>
  <el-dialog v-model="dialogFormVisible" title="添加请假单" width="500">
    <el-form :model="form" ref="formModel">
      <el-form-item label="请假类别">
        <el-select v-model="form.leaveSort" placeholder="Please select a zone">
          <el-option label="病假" value="1" />
          <el-option label="事假" value="2" />
          <el-option label="其他原因" value="0" />
        </el-select>
      </el-form-item>

      <el-form-item label="请假时间">
        <el-date-picker
          v-model="form.time"
          type="daterange"
          start-placeholder="Start date"
          end-placeholder="End date"
          :default-time="defaultTime"
        />
      </el-form-item>

      <el-form-item label="请假理由">
        <el-input v-model="form.reason" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createLeave"> 创建 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
