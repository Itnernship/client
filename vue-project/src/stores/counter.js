import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const token = ref('')

    const setToken = (value) => {
      token.value = value
    }
    return { token, setToken }
  },
  {
    persist: true // 持久化
  }
)
