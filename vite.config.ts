import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import externalGlobals from 'rollup-plugin-external-globals'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'

const cdn = {
  cssCdn: [
    'https://unpkg.com/element-plus@2.2.8/dist/index.css',
    'https://unpkg.com/nprogress@0.2.0/nprogress.css'
  ],
  jsCdn: [
    'https://unpkg.com/vue@3.2.33/dist/vue.global.prod.js',
    'https://unpkg.com/vue-demi@0.13.2/lib/index.iife.js',
    'https://unpkg.com/axios@0.27.2/dist/axios.min.js',
    'https://unpkg.com/vue-router@4.0.16/dist/vue-router.global.prod.js',
    'https://unpkg.com/pinia@2.0.13/dist/pinia.iife.prod.js',
    'https://unpkg.com/element-plus@2.2.8/dist/index.full.min.js',
    'https://unpkg.com/qrcodejs2@0.0.2/qrcode.min.js',
    'https://unpkg.com/dplayer@1.26.0/dist/DPlayer.min.js',
    'https://unpkg.com/nprogress@0.2.0/nprogress.js'
  ]
}

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
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // 注入cdn
            cssCdn:
              loadEnv(mode, process.cwd()).VITE_ENV === 'development' ? cdn.cssCdn : cdn.cssCdn,
            jsCdn: loadEnv(mode, process.cwd()).VITE_ENV === 'development' ? [] : cdn.jsCdn
          }
        }
      })
    ],
    base: '/',
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
          target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
          changeOrigin: true,
          rewrite: paths => paths.replace(/^\/api/, '')
        }
      }
    },
    build: {
      assetsDir: 'assets',
      // 取消计算文件大小，加快打包速度
      reportCompressedSize: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
          manualChunks(id) {
            // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
            if (id.includes(path.resolve(__dirname, '/src/store/index.ts'))) {
              return 'vendor'
            }
          }
        },
        // 打包忽略
        external: ['vue', 'element-plus', 'vue-router', 'axios', 'Pinia', 'NProgress'],
        plugins: [
          externalGlobals({
            vue: 'Vue',
            'element-plus': 'ElementPlus',
            'vue-router': 'VueRouter',
            axios: 'axios',
            pinia: 'Pinia',
            nprogress: 'NProgress'
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
          additionalData:
            '@import "./src/static/styles/common.scss";@import "./src/static/styles/reset.scss";'
        }
      },
      requireModuleExtension: true
    }
  }
})
