<template>
  <n-config-provider :theme="theme">
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
const theme = ref<GlobalTheme | null>(null)
</script>
<style>
	body{
		margin: 0px!important;
	}
</style>