<script setup lang="ts">
import HelloWorld from '@/components/helloWorld.vue'
import { storeToRefs } from 'pinia'
import appStore from '@/store'
const { count } = storeToRefs(appStore.useCounterStoreForSetup)
const { increment, doubleCount } = appStore.useCounterStoreForSetup
</script>

<template>
  <HelloWorld msg="Hello Vite" />
  <div class="box-styl">
    <h1>Setup模式</h1>
    <p class="section-box">
      Pinia的state: count = <b>{{ count }}</b>
    </p>
    <p class="section-box">
      Pinia的getters: doubleCount() = <b>{{ doubleCount() }}</b>
    </p>
    <div class="section-box">
      <p>Pinia的action: increment()</p>
      <button @click="increment">点我</button>
    </div>
  </div>
</template>

<style></style>
