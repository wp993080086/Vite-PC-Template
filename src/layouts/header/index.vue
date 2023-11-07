<template>
	<div id="layout_header">
		<div class="header_left">
			<img :src="logo" alt="logo" />
		</div>
		<div class="header_right"></div>
	</div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png'
</script>

<style lang="scss" scoped>
#header_box {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	height: 60px;
	padding: 0px 30px;
	background-color: #0e173d;
	color: #ffffff;
	.logo {
		width: 50px;
		height: 50px;
	}
}
</style>
