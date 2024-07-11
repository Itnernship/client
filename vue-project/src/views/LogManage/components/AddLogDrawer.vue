<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formInline.id ? '查看日志' : '添加日志'"
    direction="rtl"
    size="50%"
  >
    <!-- 富文本 -->
    <div class="editor">
      <QuillEditor
        theme="snow"
        v-model:content="formInline.content"
        contentType="html"
        :disabled="true"
        @keydown="handleKeyDown"
        v-if="formInline.id"
      >
      </QuillEditor>
      <QuillEditor
        theme="snow"
        v-model:content="formInline.content"
        contentType="html"
        v-else
      >
      </QuillEditor>
      <div class="btn" style="margin-top: 30px">
        <el-button
          type="primary"
          style="margin-right: 300px; margin-left: 100px"
          @click="closeDrawer"
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
import { addLogService } from '@/api/log'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElMessage } from 'element-plus'
//向父组件传递信息
const emit = defineEmits(['success'])
const userStore = useUserStore()
const visibleDrawer = ref(false)
const formInline = ref({
  content: ''
})
const onAdd = async () => {
  console.log(formInline.value.content)
  const data = {
    name: userStore.username,
    content: formInline.value.content
  }
  console.log(data)

  await addLogService(data)
  await ElMessage.success('添加成功')
  emit('success')
  visibleDrawer.value = false
}
const handleKeyDown = (e) => {
  e.preventDefault()
}
const open = (value) => {
  formInline.value = { ...value }
  visibleDrawer.value = true

  console.log(formInline.value.content)
  // console.log('添加功能')
}

const closeDrawer = () => {
  visibleDrawer.value = false
  formInline.value.content = ''
}
defineExpose({ open })
</script>

<style scoped>
.editor {
  width: 100%;
  height: 300px;
}
</style>
