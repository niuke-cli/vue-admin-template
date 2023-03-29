<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <router-view></router-view>
    <n-message-provider>
      <MessageApi></MessageApi>
    </n-message-provider>
    <n-notification-provider>
      <NotificationApi></NotificationApi>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, GlobalTheme } from 'naive-ui'
import MessageApi from '@/components/message/message-api.vue'
import NotificationApi from '@/components/message/notification-api.vue'
import themeOverrides from '@/utils/themeOverrides'
const theme = ref<GlobalTheme | null>(null)
</script>
<style>
body {
  margin: 0px !important;
  --n-item-height: 50px !important;

}
:root {
}
</style>