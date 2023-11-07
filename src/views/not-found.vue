<template>
	<div id="not_found_page">
		<div class="main"></div>
		<div class="hint">抱歉，您访问的页面走丢了 ~</div>
		<div class="btn_box">
			<el-button type="primary" @click="toHome">返回首页</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
// 去主页
const toHome = () => {
	router.push({ name: 'Home' })
}
</script>

<style lang="scss" scoped>
#not_found_page {
	width: 100%;
	height: 100%;
	overflow: hidden;
	text-align: center;
	background-color: var(--peng-bg-primary);
	position: relative;
	.main {
		width: 536px;
		height: 261px;
		background: url('../assets/images/404.png') 50% no-repeat;
		background-size: 100% 100%;
		margin: 18vh auto 0;
	}
	.hint {
		text-align: center;
		font-size: 20px;
		font-weight: 700;
		color: var(--peng-text-primary);
		font-style: italic;
		margin-top: 50px;
	}
	.btn_box {
		text-align: center;
		margin-top: 30px;
	}
}
</style>
