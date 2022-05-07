import { menuModule } from '@/store/modules/menu'
import { userModule } from '@/store/modules/user'

export interface IAppStore {
  userModule: ReturnType<typeof userModule>
  menuModule: ReturnType<typeof menuModule>
}

const appStore: IAppStore = {} as IAppStore

/**
 * 注册store状态库
 */
export const registerStore = () => {
  appStore.userModule = userModule()
  appStore.menuModule = menuModule()
}

export default appStore
