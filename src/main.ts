import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { registerStore } from '@/store'

const app = createApp(App)
app.use(router)
app.use(createPinia())
// 注册pinia状态管理库
registerStore()
app.use(ElementPlus)
app.mount('#app')
