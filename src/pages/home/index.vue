<template>
  <h1>{{ msg }}</h1>
  <a-button type="primary">Primary Button</a-button>
  <a-button>Default Button</a-button>
  <a-button type="dashed">Dashed Button</a-button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const msg = ref('home')
</script>

<style lang="less" scoped>
  h1{
    font-weight: 600;
  }
</style>
