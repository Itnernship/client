<template>
  <el-drawer
    v-model="visibleDrawer"
    title="添加日志"
    direction="rtl"
    size="50%"
  >
    <!-- 富文本 -->
    <div class="editor">
      <QuillEditor
        theme="snow"
        v-model:content="formInline.content"
        contentType="html"
      >
      </QuillEditor>
      <div class="btn" style="margin-top: 30px">
        <el-button
          type="primary"
          style="margin-right: 300px; margin-left: 100px"
          >取消</el-button
        >
        <el-button type="primary" @click="onAdd">确定</el-button>
      </div>
    </div>
  </el-drawer>

  <el-drawer
    v-model="visibleCheckDrawer"
    title="查看日志"
    direction="rtl"
    size="50%"
  >
    <!-- 富文本 -->
    <div class="editor">
      <QuillEditor
        theme="snow"
        v-model:content="formCheckInline.content"
        contentType="html"
      >
      </QuillEditor>
      <div class="btn" style="margin-top: 30px">
        <el-button
          type="primary"
          style="margin-right: 300px; margin-left: 100px"
          >取消</el-button
        >
        <el-button type="primary" @click="onAdd">确定</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import { useUserStore } from '@/stores'

import '@vueup/vue-quill/dist/vue-quill.snow.css'
const userStore = useUserStore()
const visibleDrawer = ref(false)
const visibleCheckDrawer = ref(false)
const formInline = ref({
  content: ''
})
const formCheckInline = ref({
  content: ''
})
const onAdd = () => {
  const data = {
    username: userStore.username,
    content: formInline.value.content
  }
  console.log(data)
  visibleDrawer.value = false
}
const open = (value) => {
  if (value.id) {
    formCheckInline.value = { ...value }
    visibleCheckDrawer.value = true
  } else {
    formInline.value = { ...value }
    visibleDrawer.value = true
  }

  // console.log('添加功能')
}
defineExpose({ open })
</script>

<style scoped>
.editor {
  width: 100%;
  height: 300px;
}
</style>
