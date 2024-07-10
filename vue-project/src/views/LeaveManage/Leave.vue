<script setup>
import { CirclePlus, Delete } from '@element-plus/icons-vue'

import { ref } from 'vue'
const onCheck = (scope) => {
  console.log(scope)
}
const tableData = ref([])
</script>
<template>
  <PageContainer>
    <template #extra>
      <el-button type="primary" :icon="CirclePlus">请假</el-button>
      <el-button type="danger" :icon="Delete">删除</el-button>
    </template>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="编号" width="120"> </el-table-column>

      <el-table-column label="申请人" width="120" />
      <el-table-column label="请假类别"></el-table-column>
      <el-table-column label="开始时间" />
      <el-table-column label="结束时间" />
      <el-table-column label="请假理由" />
      <el-table-column label="审核状态"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="text" size="small" @click="onCheck(scope)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </PageContainer>
</template>
