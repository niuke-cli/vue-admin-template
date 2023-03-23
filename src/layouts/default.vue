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
          <n-menu mode="horizontal" :options="arrayRecursion(useMenu.menuList)" />
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
          <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="arrayRecursion(useMenu.menuList)" />
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

import { menuInfo } from '@/stores/menu'
const useMenu = menuInfo()

// 递归处理树形结构数据函数
const arrayRecursion = (array) => {
  array.forEach((item) => {
    item.label = () => {
      return h(RouterLink,
          {
            to: {
              path: item.path,
            },
          },
          { default: () => item.menuName })
    };
    item.key = item.menuName;
    item.icon = renderIcon(BookIcon);
    if (item.children && item.children.length > 0) {
    item.label = item.menuName
      arrayRecursion(item.children)
    } else {

      delete item.children
      return
    }
  })
  return array
}

arrayRecursion(useMenu.menuList)
</script>