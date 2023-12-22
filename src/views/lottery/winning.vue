<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="抽奖活动">
          <el-select class="w-[280px]" v-model="queryParams.drawId" placeholder="请选择抽奖活动">
            <el-option
                v-for="(item, index) in lotteryDrawList" :key="index"
                :label="item.drawName"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="用户名称" prop="userName" min-width="120" />
        <el-table-column label="活动名称" prop="drawName" min-width="100" />
        <el-table-column label="奖品名称" prop="prizeName" min-width="100" />
        <el-table-column label="奖金金额" prop="prizeAmount" min-width="100" />
        <el-table-column label="中奖时间" prop="createTimeStr" min-width="100" />
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup name="lotteryLists">
import { usePaging } from '@/hooks/usePaging'
import {
  lotteryLogList,
  lotteryDrawPageAll
} from '@/api/lottery'
import feedback from "@/utils/feedback";
import {getRoutePath} from "@/router";
const queryParams = reactive({
  drawId: ''
})
let formData = reactive({
  id: '',
  drawId: '',
  prizeName: '',
  prizeAmount: '',
  winningRatio: '',
  minAmount: null,
  maxAmount: null
})
const rules = reactive({
  drawId: [{ required: true, message: '活动名称必选', trigger: 'blur' }],
  prizeName: [{ required: true, message: '奖品名称必填', trigger: 'blur' }],
  prizeAmount: [{ required: true, message: '中奖金额必填', trigger: 'blur' }],
  winningRatio: [{ required: true, message: '中奖比例必填', trigger: 'blur' }],
  minAmount: [{ required: true, message: '最小余额限制必填', trigger: 'blur' }],
  maxAmount: [{ required: true, message: '最大余额限制必填', trigger: 'blur' }]
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: lotteryLogList,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

const lotteryDrawList = ref([])
const getLotteryDrawList = async () => {
  lotteryDrawList.value = await lotteryDrawPageAll({})
}
getLotteryDrawList()
</script>
<style scoped>
:deep(.el-select){
  width: 100%;
}
</style>
