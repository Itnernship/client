import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores/index.js'
import { useUserStore } from './stores/index.js'
import { userDestroyService } from './api/user'
import './assets/main.scss'
const app = createApp(App)

app.use(pinia)
app.use(router)
const userStore = useUserStore()
window.addEventListener('beforeunload', async function () {
  // 执行你希望在页面关闭前执行的操作
  console.log('页面即将关闭')
  // 可以调用需要执行的函数
  await userDestroyService(userStore.id)
})

app.mount('#app')
