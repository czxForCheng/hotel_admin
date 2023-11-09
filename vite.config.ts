import { fileURLToPath, URL } from 'url'
// @ts-ignore
// import Base from './public/js/config'
import Base from './public/js/config'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
    // base: '/admin/',
    server: {
        host: '0.0.0.0',
        cors: true,
        open: true,
        proxy: {
            '/api': {
                target: Base.URL,   //代理接口
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            resolvers: [ElementPlusResolver()],
            eslintrc: {
                enabled: true
            }
        }),
        Components({
            directoryAsNamespace: true,
            resolvers: [ElementPlusResolver()]
        }),
        createStyleImportPlugin({
            resolves: [ElementPlusResolve()]
        }),
        createSvgIconsPlugin({
            // 配置路劲在你的src里的svg存放文件
            iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
            symbolId: 'local-icon-[dir]-[name]'
        }),
        vueSetupExtend()
    ],
    //静态资源服务的文件夹
    publicDir: "public",
    // 项目部署在主域名的子文件使用,例如http://localhost:3000/myvite/。 不填默认就是 ./
    // base: VITE_APP_CONTEXT_NAME==='字段名' ? './' : VITE_APP_CONTEXT_NAME, // 例子:env.VITE_APP_BASE_URL || '/'
    // base: '/admin',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString()
                }
            }
        }
    }
})
