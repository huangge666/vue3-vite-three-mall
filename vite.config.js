import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 按需引入UI组件库
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置别名
    alias: {
      '@': '/src/',
    },
    extensions: [".vue",".js"]
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/global.scss";',
      }
    }
  },
})
