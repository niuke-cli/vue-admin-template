<template>
  <n-config-provider :theme="theme">
    <router-view></router-view>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, GlobalTheme } from 'naive-ui'
const theme = ref<GlobalTheme | null>(null)
</script>