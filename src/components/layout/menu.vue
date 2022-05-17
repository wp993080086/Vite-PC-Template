<script setup lang="ts">
import { computed } from 'vue'
import { IMenuList } from '@/store/modules/menu/menu.d'

const props = defineProps({
  menu: {
    type: Object || Array,
    default: () => ({} as IMenuList)
  }
})

const menuList = computed(() => {
  return props.menu
})
</script>

<template>
  <template v-if="menuList.children && menuList.children.length > 0">
    <el-sub-menu :index="menuList.index">
      <template #title>
        <span>{{ menuList.title }}</span>
      </template>
      <template v-for="item in menuList.children" :key="item.index">
        <Menu :menu="item"></Menu>
      </template>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="menuList.index">{{ menuList.title }}</el-menu-item>
  </template>
</template>

<style lang="scss" scoped>
.el-menu-item,
.is-active {
  &:hover {
    background-color: #f6f8f9 !important;
  }
}
</style>
