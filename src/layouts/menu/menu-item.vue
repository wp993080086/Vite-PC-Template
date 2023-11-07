<template>
	<template v-if="menuList.children && menuList.children.length > 0">
		<el-sub-menu :path="menuList.path">
			<template #title>
				<span>{{ menuList.title }}</span>
			</template>
			<template v-for="item in menuList.children" :key="item.path">
				<MenuItem :menu="item"></MenuItem>
			</template>
		</el-sub-menu>
	</template>
	<template v-else>
		<el-menu-item :index="menuList.path">{{ menuList.title }}</el-menu-item>
	</template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IMenuItem } from '@/types/store/menu'

// #region 组件逻辑
interface IProps {
	menuItem: IMenuItem
}
const props = withDefaults(defineProps<IProps>(), {
	menuItem: () => ({}) as IMenuItem
})

const menuList = computed(() => {
	return props.menuItem
})
// #endregion
</script>

<script lang="ts">
export default {
	name: 'MenuItem'
}
</script>

<style lang="scss" scoped>
.el-menu-item,
.is-active {
	&:hover {
		background-color: #f6f8f9 !important;
	}
}
</style>
