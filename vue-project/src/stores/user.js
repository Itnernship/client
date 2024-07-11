import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userGetRole } from '../api/user'
// import { use } from 'echarts'
export const useUserStore = defineStore(
  'user',
  () => {
    const id = ref(0)
    const roleId = ref(0)
    const username = ref('')
    const avatar = ref('')
    const setUsername = (newUsername) => {
      username.value = newUsername
    }
    const setAvatar = (newAvatar) => {
      avatar.value = newAvatar
    }
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
    const setRoleId = (newRoleId) => {
      roleId.value = newRoleId
    }

    return {
      avatar,
      roleId,
      setRoleId,
      setAvatar,
      id,
      getId,
      setId,
      roleList,
      setUsername,
      username
    }
  },
  {
    persist: true // 持久化
  }
)
