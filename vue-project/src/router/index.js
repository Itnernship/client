import { createRouter, createWebHistory } from 'vue-router'
// import { useCounterStore } from '@/stores'
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
          component: () => import('@/views/Home/HomeManage.vue')
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
          component: () => import('@/views/SystemManage/system.vue')
        }
      ]
    }
  ]
})

export default router
//如果undefinde / true直接放行
router.beforeEach((to) => {
  //to: 访问的路径
  //from: 从哪个路径跳转过来
  //next: 放行
  //next()
  //next('/login')
  //next(false)
  //next(path)
  //next({ path: '/login' })
  //next({ name: 'login' })
  //next({ name: 'login', query: { from: to.path } })
  // const userStore = useCounterStore()
  // if (!userStore.token && to.path !== '/login' && to.path !== '/register') {
  //   return '/login'
  // }
})
