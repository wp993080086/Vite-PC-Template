import { useCounterStoreForSetup } from '@/store/counterForSetup'
import { useCounterStoreForOption } from '@/store/counterForOptions'

export interface IAppStore {
  useCounterStoreForSetup: ReturnType<typeof useCounterStoreForSetup>
  useCounterStoreForOption: ReturnType<typeof useCounterStoreForOption>
}

const appStore: IAppStore = {} as IAppStore

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.useCounterStoreForSetup = useCounterStoreForSetup()
  appStore.useCounterStoreForOption = useCounterStoreForOption()
}

export default appStore
