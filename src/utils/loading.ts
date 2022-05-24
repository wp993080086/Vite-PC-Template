import { ElLoading } from 'element-plus'

const LOADING_TIMEOUT = 0

let loading: ReturnType<typeof ElLoading.service>
let timeout: ReturnType<typeof setTimeout>

export default {
  show(options = {}) {
    timeout = setTimeout(() => {
      loading = ElLoading.service({ fullscreen: true, body: true, lock: true, ...options })
    }, LOADING_TIMEOUT)
    return loading
  },

  hide() {
    if (loading) {
      loading.close()
    }
    clearTimeout(timeout)
    return loading
  }
}
