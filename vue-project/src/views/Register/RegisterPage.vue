<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Lock, Plus } from '@element-plus/icons-vue'
import { userRegisterService } from '@/api/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
//表单元素
const formModel = ref({
  username: '',
  password: '',
  repassword: '',
  avatar: ''
})
//返回登录界面
const onReturnLogin = () => {
  router.push('/login')
}
//表单校验逻辑
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请确认密码',
      trigger: 'blur'
    },
    {
      validator(rule, value, callback) {
        if (value !== formModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
    }
  ]
}
//处理注册信息
const onRegister = async () => {
  console.log(formModel.value)
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  router.push('/login')
}
// const st = ref(false)
// const imageUrl = ref('https://113.56.219.99:50000/files/${userStore.avatar}')
const imageUrl = ref('')
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // console.log(response)
  formModel.value.avatar = response.data
  // st.value = true
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册页面 -->
      <el-form
        :model="formModel"
        :rules="rules"
        size="large"
        autocomplete="off"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.password"
            placeholder="请输入密码"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            v-model="formModel.repassword"
            placeholder="请输入再次密码"
            :show-password="true"
          ></el-input>
        </el-form-item>

        <el-upload
          class="avatar-uploader"
          action="https://113.56.219.99:50000/files/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>

        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            style="margin-top: 20px"
            @click="onRegister"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="onReturnLogin">
            ← 返回登录
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;

  display: block;
}
.el-icon {
  border: 1px dashed var(--el-border-color);
  width: 178px;
  height: 178px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
