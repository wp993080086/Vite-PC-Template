<template>
	<div>
		<p>{{ userInfo.userName }}</p>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import appStore from '@/store'
const { userInfo } = storeToRefs(appStore.userModule)
</script>

<style></style>
