<template>
  <PageContainer :title="'数据列表'">
    <template #extra>
      <el-button type="primary">新增用户</el-button>
    </template>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="selection" width="55" />
      <el-table-column label="id" width="180" />
      <el-table-column label="姓名" width="180" />
      <el-table-column label="联系方式" width="180" />
      <el-table-column label="日期" width="180">
        <template #default="scope">
          {{ dayjs(scope.row.date).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </PageContainer>
</template>
<script setup>
import { dayjs } from 'element-plus'
const tableData = []
</script>
