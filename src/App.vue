<template>
  <n-config-provider :theme="theme" :theme-overrides="theme ? '' : themeOverrides">
    <router-view></router-view>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, GlobalTheme } from 'naive-ui'
import themeOverrides from '@/utils/themeOverrides'
const theme = ref<GlobalTheme | null>(null)
</script>