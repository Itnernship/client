import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userGetRole } from '../api/user'
// import { use } from 'echarts'
export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref(0)
    const roleList = ref([])
    const getId = () => {
      return id.value
    }
    const setId = async (newId) => {
      id.value = newId
      const res = await userGetRole(id.value)
      //   console.log(res)
      roleList.value = res.data.data
    }

    return { id, getId, setId, roleList }
  },
  {
    persist: true // 持久化
  }
)
