<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import appStore from '@/store'
import { useRouter } from 'vue-router'
import MenuItem from './menu.vue'

const Router = useRouter()
const data = reactive({
  menuList: appStore.menuModule.menu,
  openeds: ['1'],
  activeMenu: '/install-manage'
})

watch(
  () => Router.currentRoute.value,
  newValue => {
    data.activeMenu = newValue.meta.activeMenu as string
  },
  { immediate: true, deep: true }
)
// 获取是否收缩
const isCollapse = computed(() => {
  return appStore.menuModule.isCollapse
})

// 收缩菜单
const handleShrink = () => {
  appStore.menuModule.changeIsCollapse()
}
</script>

<template>
  <div id="left_menu" :style="{ width: isCollapse ? '64px' : '210px' }">
    <el-scrollbar>
      <el-menu
        active-text-color="#456FE7"
        background-color="#ffffff"
        text-color="#606266"
        :collapse="isCollapse"
        :collapse-transition="true"
        :router="true"
        :default-active="data.activeMenu"
        :default-openeds="data.openeds"
      >
        <div class="logo flex_c">
          <template v-if="isCollapse">
            <i class="iconfont icon-zk h_hand" @click="handleShrink"></i>
          </template>
          <template v-else>
            <div class="logo_title">
              <span>PC系统</span>
              <div class="flex_c">
                <i class="iconfont icon-sq h_hand" @click="handleShrink"></i>
              </div>
            </div>
          </template>
        </div>
        <template v-for="menu in data.menuList" :key="menu.index">
          <template v-if="menu.children && menu.children.length > 0">
            <el-sub-menu :index="menu.index">
              <template #title>
                <i :class="['iconfont', menu.icon, 'h_hand']"></i>
                <span>{{ menu.title }}</span>
              </template>
              <template v-for="child in menu.children" :key="child.index">
                <MenuItem :menu="child" />
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="menu.index">
              <i :class="['iconfont', menu.icon, 'h_hand']"></i>
              <template #title>
                <span>{{ menu.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
#left_menu {
  // width: 210px;
  height: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  transition: 0.3s ease;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  &:deep(.el-menu) {
    border-right: none;
    .el-sub-menu__title {
      span {
        margin-left: 5px;
      }
    }
  }
  &:deep(.el-sub-menu) {
    width: 100%;
  }
  &:deep(.el-menu-item) {
    div {
      display: flex !important;
      align-content: center !important;
      height: auto !important;
      top: auto !important;
    }
    span {
      margin-left: 5px;
    }
    &:hover {
      background-color: #f6f8f9 !important;
    }
  }
  .logo {
    width: 100%;
    height: 56px;
    color: #303133;
    line-height: 56px;
    font-weight: 600;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    .logo_title {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
  }
}
#left_menu:not(.el-menu--collapse) {
  width: 64px;
  height: 100%;
}
</style>
