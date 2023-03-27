import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// 引入viteMockServe
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ],
      dts: './auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    }),
    viteMockServe({
      mockPath: "./src/mock/"
    }),
  ],
  // 配置根路径
  resolve: {
    // ↓路径别名，主要是这部分
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
