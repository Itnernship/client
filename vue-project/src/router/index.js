import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/LoginPage.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/Register/RegisterPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/Home/HomePage.vue'),
      redirect: '/score',
      children: [
        {
          path: '/user/profile',
          component: () => import('@/views/User/profile.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/User/password.vue')
        },
        {
          path: '/score',
          component: () => import('@/views/ScoreManage/score.vue')
        },
        {
          path: 'home',
          component: () => import('@/views/Home/HomeComputed.vue')
        },
        {
          path: '/log',
          component: () => import('@/views/LogManage/Log.vue')
        },
        {
          path: '/leave',
          component: () => import('@/views/LeaveManage/Leave.vue')
        },
        {
          path: '/interview',
          component: () => import('@/views/InterviewManage/Interview.vue')
        },
        {
          path: '/system',
          component: () => import('@/views/SystemManage/System.vue')
        }
      ]
    }
  ]
})

export default router
