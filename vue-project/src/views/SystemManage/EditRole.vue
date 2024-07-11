<template>
  <el-dialog title="编辑角色" v-model="dialogVisible" width="30%">
    <el-checkbox-group v-model="permissions">
      <el-checkbox label="成绩查询" value="1" />
      <el-checkbox label="用户管理" value="2" />
      <el-checkbox label="日志" value="3" />
      <el-checkbox label="请假" value="4" />
      <el-checkbox label="面试" value="5" />
      <el-checkbox label="系统管理" value="6" />
      <!-- <el-checkbox label="Option A" value="Value A" />
          <el-checkbox label="Option B" value="Value B" />
          <el-checkbox label="Option C" value="Value C" /> -->
    </el-checkbox-group>

    <el-button type="primary" @click="submitForm">确认</el-button>
    <el-button @click="dialogVisible = false">取消</el-button>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { getRolePermissionService, editRolePermissionService } from '@/api/role'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const permissions = ref([1, 2])

// Methods
const submitForm = async () => {
  // Output selected permissions array

  data.value.permissions = permissions.value

  const result = {
    permissions: data.value.permissions,
    role: {
      roleName: data.value.role.roleName
    }
  }
  console.log(result)
  await editRolePermissionService(result)
  ElMessage.success('修改成功')
  dialogVisible.value = false
  // Here you can perform further actions with the selected permissions
}
const data = ref({
  permissions: [],
  role: {
    roleName: ''
  }
})
const open = async (value) => {
  data.value.role.roleName = value.roleName

  const res = await getRolePermissionService(value.id)

  permissions.value = res.data.data.map((item) => item.toString())
  dialogVisible.value = true
}
defineExpose({ open })
</script>
