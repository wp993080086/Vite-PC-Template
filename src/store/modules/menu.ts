import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

interface IMenuList {
  title: string
  index: string
  icon?: string
  children?: Array<IMenuList>
}

interface IMenu {
  isCollapse: boolean
  menu: Array<IMenuList>
}

// 使用setup模式定义
export const menuModule = defineStore('menu', () => {
  const data = reactive<IMenu>({
    isCollapse: false,
    menu: [
      {
        title: '设备监控',
        index: '/device-monitor',
        icon: 'icon-jk'
      },
      {
        title: '任务管理',
        index: '1',
        icon: 'icon-rw',
        children: [
          {
            title: '安装管理',
            index: '/install-manage'
          },
          {
            title: '维修管理',
            index: '/repair-manage'
          }
        ]
      },
      {
        title: '基础设置',
        index: '2',
        icon: 'icon-sz',
        children: [
          {
            title: '厂商管理',
            index: '/firm-manage'
          }
        ]
      }
    ]
  })

  const getIsCollapse = () => {
    return data.isCollapse
  }

  return { ...toRefs(data), getIsCollapse }
})
