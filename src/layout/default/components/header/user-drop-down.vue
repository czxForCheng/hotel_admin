<template>
    <el-dropdown class="px-2" @command="handleCommand">
        <div class="flex items-center">
<!--            <el-avatar :size="34" :src="userInfo.avatar" />-->
          <el-avatar v-if="userInfo.avatar" :size="34" :src="userInfo.avatar" />
          <img v-else style="height: 34px;border-radius: 50%" src="../../../../assets/images/backend_avatar.png" alt="">
            <div class="ml-3 mr-1">{{ userInfo.username }}</div>
            <icon name="el-icon-ArrowDown" />
        </div>

        <template #dropdown>
            <el-dropdown-menu>
                <router-link to="/user/setting">
                    <el-dropdown-item>个人设置</el-dropdown-item>
                </router-link>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/modules/user'
import feedback from '@/utils/feedback'
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const handleCommand = async (command: string) => {
    switch (command) {
        case 'logout':
            await feedback.confirm('确定退出登录吗？')
            userStore.logout()
    }
}
</script>
