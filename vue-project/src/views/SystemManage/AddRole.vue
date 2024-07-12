<template>
  <el-dialog title="添加角色" v-model="dialogVisible" width="30%">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="角色名字">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRole">添加</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { addRoleService } from '@/api/role'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['success'])
const form = ref({ roleName: '' })
const dialogVisible = ref(false)
const open = () => {
  dialogVisible.value = true
}
const addRole = async () => {
  await addRoleService(form.value)
  ElMessage.success('添加成功')
  console.log(form.value)
  //清空form
  form.value = { roleName: '' }
  dialogVisible.value = false
  emit('success')
}
defineExpose({ open })
</script>
