<template>
  <PageContainer title="权限管理">
    <template #extra>
      <el-button type="primary" @click="add">添加角色</el-button>
    </template>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="role">
        <template #default="scope">
          <el-tag type="primary" disable-transitions>{{
            scope.row.roleName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onCheck(row)"
          ></el-button>

          <el-button
            :icon="Delete"
            type="danger"
            circle
            @click="Del(row.roleName)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <AddRole ref="addRoleRef" @success="onSuccess"></AddRole>
    <EditRole ref="editRole"></EditRole>
  </PageContainer>
</template>

<script setup>
import { getRoleService, deleteRoleService } from '@/api/role'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import AddRole from './AddRole.vue'
import EditRole from './EditRole.vue'
import { ElMessage } from 'element-plus'
const tableData = ref([{ tag: 'admin' }, { tag: 'teacher' }])
const getAllRole = async () => {
  const res = await getRoleService()
  tableData.value = res.data.data
}
const addRoleRef = ref(null)
const editRole = ref(null)
const add = () => {
  addRoleRef.value.open()
}
//删除角色
const Del = async (roleName) => {
  await ElMessageBox.confirm('是否删除该角色？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteRoleService(roleName)
  ElMessage.success('删除成功')
  setTimeout(() => {
    getAllRole()
  }, 500)
}
const onSuccess = () => {
  getAllRole()
}
const onCheck = (row) => {
  editRole.value.open(row)
}
onMounted(() => {
  getAllRole()
})
</script>
