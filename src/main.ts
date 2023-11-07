import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { registerStore } from '@/store'
import elementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
// 注册pinia状态管理库
registerStore()
app.use(elementPlus)
app.mount('#app')
