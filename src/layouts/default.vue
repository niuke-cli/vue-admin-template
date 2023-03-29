<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header bordered>
        <div style="display:flex;height: 50px;align-items:center">
          <div style="width: 220px">
            <a href="/" style="display:flex;justify-content:center;align-items:center">
              <img style="width: 80%" src="@/assets/logo-black.svg" alt />
            </a>
          </div>
          <n-menu mode="horizontal" :options="useMenu.menuList"   @update:value="clickMenuItem" />
        </div>
      </n-layout-header>
      <n-layout has-sider class="visual-content-height">
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="220"
          :native-scrollbar="false"
        >
          <n-menu
            :value="useMenu.nowMenu"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="useMenu.menuList"
            @update:value="clickMenuItem"
          />
        </n-layout-sider>
        <n-layout>
          <router-view></router-view>
        </n-layout>
      </n-layout>
      <!-- <n-layout-footer bordered style="height: 50px">Footer Footer Footer</n-layout-footer> -->
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { menuInfo } from '@/stores/menu'
const useMenu = menuInfo()
const collapsed = ref(false)
// 点击菜单
function clickMenuItem(key: string) {
  if (/http(s)?:/.test(key)) {
    window.open(key)
  } else {
    useMenu.nowMenu = key
    router.push({ path: key })
  }
}
</script>