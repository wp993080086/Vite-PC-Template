<template>
  <h1>{{ msg }}</h1>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const msg = ref('login')
</script>

<style lang="scss" scoped>
  h1{
    font-weight: 600;
  }
</style>
