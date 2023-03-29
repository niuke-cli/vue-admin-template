<template>
  <div class="tags">
    <n-tag
      class="tag"
      v-for="item in useMenu.tagList"
      :key="item.name"
      @click="toTag(item)"
      @close="tagClose(item)"
      :bordered="false"
      :closable="item.name !== 'console'"
      :type="useMenu.nowTag === item.name ? 'success': ''"
    >{{item.title}}</n-tag>
  </div>
</template>

<script lang="ts" setup>
import { menuInfo } from '@/stores/menu'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { TagsType } from '@/type/tags'

const useMenu = menuInfo()
const toTag = (item: TagsType) => {
  router.push({ name: item.name })
}
const tagClose = (item: TagsType) => {
  useMenu.delTag(item)
  router.push({ name: useMenu.tagList[useMenu.tagList.length - 1].name })
}
</script>

<style lang="scss" scoped>
.tags {
  width: 100%;
  padding: 4px;
  overflow-x: auto;
  display: flex;
  border-bottom: solid 1px rgb(239, 239, 245);
}

.tag {
  margin-right: 4px;
  cursor: pointer;
  user-select: none;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>