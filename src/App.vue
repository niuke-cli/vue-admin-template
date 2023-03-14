<template>
  <n-config-provider :theme="theme">
    <router-view></router-view>
	<n-message-provider>
		<MessageApi></MessageApi>
	</n-message-provider>
	<!-- <MessageApi></MessageApi> -->
    <!-- <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">深色</n-button>
        <n-button @click="theme = null">浅色</n-button>
      </n-space>
    </n-card> -->
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, GlobalTheme } from 'naive-ui'
import MessageApi  from '@/components/message/message-api.vue'
const theme = ref<GlobalTheme | null>(null)
</script>
<style>
	body{
		margin: 0px!important;
	}
</style>