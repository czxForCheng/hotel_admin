<template>
    <footer class="layout-footer">
        <div class="text-center p-2 text-xs text-tx-secondary max-w-[900px] mx-auto">
          后台版本号：v{{config.version}},
          服务版本号：{{version}}
        </div>
    </footer>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import configs from '@/config'
const config = configs
const appStore = useAppStore()
const version = computed(() => appStore.config.version || [])
</script>
