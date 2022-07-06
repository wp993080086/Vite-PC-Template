<script setup lang="ts">
import { watch, ref } from 'vue'
import Header from '@/components/header/header'
import leftMemu from '@/components/layout/index.vue'
import { useRouter } from 'vue-router'

const Router = useRouter()
const isShowHeader = ref(false)
// 监听路由判断是否显示导航条
watch(
  () => Router.currentRoute.value,
  newValue => {
    newValue.meta.showHeader ? (isShowHeader.value = true) : (isShowHeader.value = false)
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <!-- 有导航栏 -->
  <template v-if="isShowHeader">
    <div id="main_box">
      <!-- 头部 -->
      <Header />
      <!-- 内容 -->
      <div id="container_box">
        <!-- 菜单栏 -->
        <left-memu />
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
</template>

<style lang="scss" scoped>
#main_box {
  width: 100%;
  height: 100%;
  #container_box {
    display: flex;
    width: 100%;
    height: calc(100% - 60px);
    background-color: #f4f7f9;
  }
  #content_box {
    flex: 1;
    overflow-y: auto;
  }
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
