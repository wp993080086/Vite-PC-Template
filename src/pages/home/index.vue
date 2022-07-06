<script setup lang="ts">
import HelloWorld from '@/components/helloWorld.vue'
import { storeToRefs } from 'pinia'
import appStore from '@/store'
const { userInfo } = storeToRefs(appStore.userModule)
</script>

<template>
  <div>
    <HelloWorld msg="Hello Vite" />
    <p>{{ userInfo.userName }}</p>
  </div>
</template>

<style></style>
