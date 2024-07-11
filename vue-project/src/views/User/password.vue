<script setup>
import { ref } from 'vue'
import { Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userChangePasswordService } from '@/api/user'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const formModel = ref({
  password: '',
  newpassword: '',
  confirmpassword: '',
  id: userStore.id
})
const form = ref()
const onModify = async () => {
  if (formModel.value.newpassword !== formModel.value.confirmpassword) {
    ElMessage.error('两次密码不一致')
    return
  }
  const data = {
    password: formModel.value.password,
    newpassword: formModel.value.newpassword,
    id: formModel.value.id
  }

  await userChangePasswordService(data)
  ElMessage.success('修改成功')
  formModel.value.password = ''
  formModel.value.newpassword = ''
  formModel.value.confirmpassword = ''

  console.log(formModel.value)
}

//表单校验逻辑
const rules = {
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  newpassword: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'blur'
    }
  ],

  confirmpassword: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    },
    {
      validator(rule, value, callback) {
        if (value !== formModel.value.newpassword) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
    }
  ]
}
</script>
<template>
  <div style="width: 50%">
    <el-form ref="form" :model="formModel" :rules="rules" size="large">
      <el-form-item>
        <h1>修改密码</h1>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :prefix-icon="Lock"
          type="password"
          v-model="formModel.password"
          placeholder="请输入密码"
          :show-password="true"
          width="50%"
        ></el-input>
      </el-form-item>
      <el-form-item prop="newpassword">
        <el-input
          :prefix-icon="Lock"
          type="password"
          v-model="formModel.newpassword"
          placeholder="请输入新密码"
          :show-password="true"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirmpassword">
        <el-input
          :prefix-icon="Lock"
          type="password"
          v-model="formModel.confirmpassword"
          placeholder="请确认新密码"
          :show-password="true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" auto-insert-space @click="onModify">
          修改密码
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
