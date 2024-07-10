import axios from 'axios'
import { useCounterStore } from '@/stores/index.js'
const baseURL = 'https://113.56.219.99:50000'
// import router from '@/router'
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const countStore = useCounterStore()
    if (countStore.token) {
      config.headers.Authorization = countStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据

    if (res.data.code === '0') {
      return res
    }
    ElMessage.error(res.data.msg || '服务异常1')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    // if (err.response.status === 401) {
    //   router.push('/login')
    // }
    ElMessage.error(err.response.data.msg || '服务异常2')
    return Promise.reject(err)
  }
)

export default instance
