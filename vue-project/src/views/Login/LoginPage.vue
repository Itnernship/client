<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { userLoginService } from '@/api/user'
import { useCounterStore } from '@/stores'
import { useUserStore } from '@/stores'
import { use } from 'echarts'
//用户管理
const userStore = useUserStore()
//状态管理
const counterStore = useCounterStore()
const router = useRouter()
//绑定表单数据的元素
const formModel = ref({
  username: '',
  password: ''
})
const rules = ref({
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
    // //正则校验 pattern表示正则表达式 message表示提示信息 trigger表示触发方式
    // {
    //   pattern: /^\S{6,15}$/,
    //   message: '以非空字符串开头长度为6-15位',
    //   trigger: 'blur'
    // }
  ]
})
const onRegister = () => {
  console.log('注册')
  router.push('/register')
}
const onLogin = async () => {
  const res = await userLoginService(formModel.value)
  counterStore.setToken(res.data.data.token)
  userStore.setId(res.data.data.id)
  userStore.setUsername(res.data.data.username)
  router.push('/')
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录页面 -->
      <el-form
        :model="formModel"
        :rules="rules"
        size="large"
        autocomplete="off"
      >
        <el-form-item>
          <h1>登录</h1>
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
            name="password"
            :prefix-icon="Lock"
            v-model="formModel.password"
            type="password"
            placeholder="请输入密码"
            :show-password="true"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="onLogin"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link @click="onRegister" type="info" :underline="false">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
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
</style>
