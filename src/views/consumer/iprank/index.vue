<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="IP搜索">
          <el-input
              class="w-[280px]"
              v-model="queryParams.lastLoginIp"
              placeholder="IP搜索"
              clearable
              @keyup.enter="resetPage"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="!border-none mt-4" shadow="never">
      <el-table size="large" v-loading="pager.loading" :data="pager.lists" max-height="550">
        <el-table-column label="排行" prop="ranking" align="center" min-width="120" />
        <el-table-column label="IP" min-width="100" align="center" prop="lastLoginIp"></el-table-column>
        <el-table-column label="用户登录数量" align="center" prop="loginNum" min-width="100" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['iprank:detail']" @click.stop="rankSocket(row)" type="primary" link>
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
    <ipRank :dialog-reason-visible="isRankShow" @close-rank="closeRank" :rank-value="ipTips"></ipRank>
  </div>
</template>
<script lang="ts" setup name="consumerLists">
import ipRank from '../components/ipRank-pop.vue'

import { usePaging } from '@/hooks/usePaging'

import {ipRanking} from "@/api/member";
const isRankShow=ref(false)
const ipTips=ref('')
const queryParams = reactive({
  lastLoginIp: '',
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: ipRanking,
  params: queryParams
})
onActivated(() => {
  getLists()
})

const rankSocket=(row:any)=>{
  isRankShow.value=true
  ipTips.value=row
}

const closeRank=()=>{
  isRankShow.value=false
}

getLists()
</script>
