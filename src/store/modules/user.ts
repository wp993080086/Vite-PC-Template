import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

interface IuserInfo {
  userName: string
  userId: string
}

// 使用setup模式定义
export const userModule = defineStore('user', () => {
  const data = reactive({
    name: 'user',
    userInfo: {
      userName: '卡卡罗特',
      userId: '100'
    }
  })

  const getUserInfo = () => {
    return data.userInfo
  }

  const setUserInfo = (obj: IuserInfo) => {
    data.userInfo = obj
  }

  return {
    ...toRefs(data),
    getUserInfo,
    setUserInfo
  }
})
