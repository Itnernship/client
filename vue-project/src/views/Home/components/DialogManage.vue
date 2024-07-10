<script setup>
import { ref } from 'vue'
import {
  userGetAllRoleService,
  userEditService,
  userAddService
} from '@/api/user'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const emit = defineEmits(['success'])
const formModel = ref({ id: '', username: '', password: '', roleName: '' })
const role = ref([])
const openDialog = (value) => {
  formModel.value = { ...value }
  dialogVisible.value = true
  getAllRole()
}

const submit = async () => {
  console.log(formModel.value)
  // formModel.value = { ...defaultModel }
  if (formModel.value.id) {
    await userEditService(formModel.value)
    ElMessage.success('修改成功')
  } else {
    await userAddService(formModel.value)
    ElMessage.success('添加成功')
  }

  dialogVisible.value = false
  emit('success')
}
const getAllRole = async () => {
  const res = await userGetAllRoleService()
  role.value = res.data.data
}

defineExpose({ openDialog })
</script>

<template>
  <!-- 弹窗区域 -->
  <el-dialog v-model="dialogVisible" title="用户操作" width="500" draggable>
    <el-form :model="formModel" label-width="100px" style="padding-right: 30px">
      <el-form-item label="用户名">
        <el-input
          v-model="formModel.username"
          minlength="1"
          maxlength="10"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="formModel.password"
          minlength="1"
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="formModel.roleName" placeholder="请选择权限">
          <!-- 下拉框选项 -->
          <el-option
            v-for="item in role"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleName"
          >
          </el-option
          >"

          <!-- 可以根据具体情况添加更多选项 -->
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
