<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header bordered style="height: 50px">
        <div style="display: flex">
          <div style="width: 220px">
            <a href="/">
              <img src="@/assets/vue.svg" alt />
            </a>
          </div>
          <!-- <n-menu mode="horizontal" :options="menuOptions" /> -->
        </div>
      </n-layout-header>
      <n-layout has-sider style="height: calc(100vh - 50px)">
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="220"
          :native-scrollbar="false"
        >
          <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
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
import { NIcon } from 'naive-ui'
import { BookOutline as BookIcon, PersonOutline as PersonIcon, WineOutline as WineIcon } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/console',
          },
        },
        { default: () => '回家' }
      ),
    key: 'console',
    icon: renderIcon(BookIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/demo',
          },
        },
        { default: () => 'Demo' }
      ),
    key: 'demo',
    icon: renderIcon(BookIcon),
  },
]
</script>