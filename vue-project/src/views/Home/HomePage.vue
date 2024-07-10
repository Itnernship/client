<script setup>
import { useCounterStore, useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import {
  User,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/avatar.jpg'
const router = useRouter()
const userStore = useUserStore()
const counterStore = useCounterStore()
const handleCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('你确认退出系统吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    counterStore.removeToken()
    await ElMessage.success('退出成功')
    await router.push('/login')
  } else {
    router.push(`/user/${command}`)
  }
}
</script>
<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#304156"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <el-menu-item
          index="/score"
          v-if="userStore.roleList.includes('成绩查询')"
        >
          <!-- <el-icon><Management /></el-icon> -->
          <span>成绩统计</span>
        </el-menu-item>
        <el-sub-menu index="/home">
          <!-- <el-icon><Promotion /></el-icon> -->
          <template #title>
            <!-- <el-icon><UserFilled /></el-icon> -->
            <span>首页统计</span>
          </template>
          <el-menu-item
            index="/home"
            v-if="userStore.roleList.includes('用户管理')"
          >
            <span>用户管理</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/log" v-if="userStore.roleList.includes('日志')">
          <template #title>
            <span>日志管理</span>
          </template>
          <el-menu-item index="/log">
            <span>日志</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/leave" v-if="userStore.roleList.includes('请假')">
          <!-- <el-icon><Promotion /></el-icon> -->
          <template #title>
            <!-- <el-icon><UserFilled /></el-icon> -->
            <span>请假管理</span>
          </template>
          <el-menu-item index="/leave">
            <span>请假</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu
          index="/interview"
          v-if="userStore.roleList.includes('面试')"
        >
          <!-- <el-icon><Promotion /></el-icon> -->
          <template #title>
            <!-- <el-icon><UserFilled /></el-icon> -->
            <span>面试管理</span>
          </template>
          <el-menu-item index="/interview">
            <span>面试</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu
          index="/system"
          v-if="userStore.roleList.includes('系统管理')"
        >
          <!-- <el-icon><Promotion /></el-icon> -->
          <template #title>
            <!-- <el-icon><UserFilled /></el-icon> -->
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system">
            <span>系统</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="">
          <!-- <el-icon><Promotion /></el-icon> -->
          <template #title>
            <!-- <el-icon><UserFilled /></el-icon> -->
            <span>实例</span>
          </template>
          <el-menu-item index="">
            <span>比如</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <!-- 用户信息：<strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong> -->
          用户信息
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #304156;

    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
