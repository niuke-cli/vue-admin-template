<template>
  <n-spin :show="loading">
    <div class="frame">
      <iframe :src="frameSrc" class="frame-iframe" ref="frameRef"></iframe>
    </div>
  </n-spin>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
const currentRoute = useRoute()
const loading = ref(false)
const frameRef = ref<HTMLFrameElement | null>(null)
const frameSrc = ref<string>('')

if (unref(currentRoute.meta)?.menuType === '0') {
  frameSrc.value = unref(currentRoute.meta)?.url as string
}

function hideLoading() {
  loading.value = false
}

function init() {
  nextTick(() => {
    const iframe = unref(frameRef)
    if (!iframe) return
    const _frame = iframe as any
    if (_frame.attachEvent) {
      _frame.attachEvent('onload', () => {
        hideLoading()
      })
    } else {
      iframe.onload = () => {
        hideLoading()
      }
    }
  })
}

onMounted(() => {
  loading.value = true
  init()
})
</script>

<style scoped>
.frame {
  width: 100%;
  height: calc(100vh - 108px);
}
.frame-iframe {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 0;
  box-sizing: border-box;
}
</style>
