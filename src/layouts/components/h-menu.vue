<template>
  <div>
    <n-menu mode="horizontal" :options="showMenu" @update:value="clickMenuItem" />
    <n-dropdown
      :options="hiddenMenu"
      placement="bottom-start"
      trigger="click"
      @select="clickMenuItem"
    >
      <JIcon v-show="hiddenMenu.length > 0" icon-name="UngroupOutlined" size="20" />
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { JIcon } from '@/utils/icon'
import { useWindowSize, useEventListener } from '@vueuse/core'
import { menuInfo } from '@/stores/menu'
import { useRouter } from 'vue-router'
const router = useRouter()
const useMenu = menuInfo()
// 点击菜单
function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key)) {
    window.open(key)
  } else {
    useMenu.nowMenu = key
    router.push({ path: key })
  }
}

const menuWidth = 150
let windowWidth = ref(useWindowSize().width)
const splitNumber = ref((windowWidth.value - 400) / menuWidth)

useEventListener('resize', () => {
  windowWidth = useWindowSize().width
  splitNumber.value = (windowWidth.value - 400) / menuWidth
})
const showMenu = computed(() => {
  return useMenu.menuList.slice(0, splitNumber.value)
})

const hiddenMenu = computed(() => {
  return useMenu.menuList.slice(splitNumber.value, useMenu.menuList.length)
})
</script>