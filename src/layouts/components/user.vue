<template>
  <div class="user">
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <n-avatar  round>Niuke</n-avatar>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const options = [
  {
    label: '退出登录',
    key: 'loginout',
  },
]
const handleSelect = (key: string | number) => {
  switch (key) {
    case 'loginout':
      router.replace('/login')
      break
  }
  console.log('key', key)
}
</script>

<style lang="scss" scoped>
.user {
  padding: 0 20px;
  cursor: pointer;
  user-select: none;
}
</style>