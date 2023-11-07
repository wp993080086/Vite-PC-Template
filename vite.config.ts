import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
		base: '/',
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		},
		server: {
			host: 'localhost',
			port: 9527,
			open: false,
			proxy: {
				'/api': {
					target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
					changeOrigin: true,
					rewrite: (paths) => paths.replace(/^\/api/, '')
				}
			}
		},
		build: {
			outDir: 'dist',
			// 取消计算文件大小，加快打包速度
			reportCompressedSize: false,
			sourcemap: false,
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia']
					}
				}
			},
			chunkSizeWarningLimit: 1024 * 1024,
			minify: 'terser',
			terserOptions: {
				// 打包后移除console和注释
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			}
		}
	}
})
