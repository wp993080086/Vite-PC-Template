import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { registerStore } from '@/store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
app.use(router)
app.use(createPinia())
// 注册pinia状态管理库
registerStore()
app.use(ElementPlus, { locale: zhCn })
app.mount('#app')
