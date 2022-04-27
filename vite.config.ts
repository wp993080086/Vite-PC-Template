import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    base: loadEnv(mode, process.cwd()).VITE_BASE,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      proxy: {
        '/api': {
          target: 'http://www.wangpeng.club',
          changeOrigin: true,
          rewrite: paths => paths.replace(/^\/api/, '')
        }
      }
    },
    build: {
      assetsDir: 'static',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',
          manualChunks(id) {
            // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
            if (id.includes(path.resolve(__dirname, '/src/store/index.ts'))) {
              return 'vendor'
            }
          }
        }
      }
    }
  }
})
