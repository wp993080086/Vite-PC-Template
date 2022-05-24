import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import externalGlobals from 'rollup-plugin-external-globals'
import viteCompression from 'vite-plugin-compression'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      // 生成gzip压缩包
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    base: loadEnv(mode, process.cwd()).VITE_BASE,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: 'localhost',
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
      // 取消计算文件大小，加快打包速度
      reportCompressedSize: false,
      sourcemap: false,
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
        },
        // CDN
        external: ['vue', 'element-plus', 'vue-router', 'axios'],
        plugins: [
          externalGlobals({
            vue: 'Vue',
            'element-plus': 'ElementPlus',
            'vue-router': 'VueRouter',
            axios: 'axios'
          })
        ]
      },
      minify: 'terser',
      terserOptions: {
        // 打包后移除console和注释
        compress: {
          // eslint-disable-next-line
          drop_console: true,
          // eslint-disable-next-line
          drop_debugger: true
        }
      }
    },
    // 引入全局scss文件
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/styles/globalColor.scss";'
        }
      }
    }
  }
})
