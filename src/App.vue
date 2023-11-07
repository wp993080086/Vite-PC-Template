<template>
	<el-config-provider :locale="getLanguage">
		<!-- 有导航栏 -->
		<template v-if="isShowHeader">
			<div id="main_box">
				<!-- 头部 -->
				<Headers />
				<!-- 内容 -->
				<div id="container_box">
					<!-- 菜单栏 -->
					<Menus />
					<div id="content_box">
						<router-view v-slot="{ Component }">
							<transition name="fade" mode="out-in">
								<component :is="Component" />
							</transition>
						</router-view>
					</div>
				</div>
			</div>
		</template>
		<!-- 无导航栏 -->
		<template v-else>
			<router-view />
		</template>
	</el-config-provider>
</template>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import Headers from '@/layouts/header/index.vue'
import Menus from '@/layouts/menu/index.vue'
import { useRouter } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const router = useRouter()
const isShowHeader = ref(false)
const locale = ref('zh')

const languageList: TDict = {
	zh: zhCn,
	en: en
}

const getLanguage = computed(() => {
	return languageList[locale.value]
})

// 监听路由判断是否显示导航条
watch(
	() => router.currentRoute.value,
	(newValue) => {
		isShowHeader.value = !!newValue.meta.showHeader
	},
	{ immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
#main_box {
	width: 100%;
	height: 100%;
	#container_box {
		display: flex;
		width: 100%;
		height: calc(100% - 60px);
		background-color: var(--peng-bg-secondary);
	}
	#content_box {
		flex: 1;
		overflow-y: auto;
	}
}
</style>
