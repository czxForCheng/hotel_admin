<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="">
          <el-input
              class="w-[280px]"
              v-model="queryParams.orderNo"
              placeholder="请输入订单号"
              clearable
          />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
              class="w-[280px]"
              v-model="queryParams.userName"
              placeholder="请输入用户名"
              clearable
          />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select class="w-[280px]" v-model="queryParams.auditStatus" placeholder="请选择审核状态">
            <el-option
                label="未审核"
                :value="0"
            />
            <el-option
                label="审核通过"
                :value="1"
            />
            <el-option
                label="审核不通过"
                :value="2"
            />
          </el-select>
        </el-form-item>
<!--        <el-form-item label="发起时间">-->
<!--          <el-date-picker-->
<!--              v-model="queryParams.addTime"-->
<!--              type="date"-->
<!--              placeholder="请选择发起时间"-->
<!--          />-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <el-table v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="订单号/提现方式/代理" prop="orderNo" min-width="180" />
        <el-table-column label="用户信息" prop="userId" min-width="100" />
        <el-table-column label="提现金额" prop="money" min-width="100" />
        <el-table-column label="银行信息/usdt" prop="usdt" min-width="150" />
        <el-table-column label="发起/处理/回调" prop="" min-width="150" >
          <template #default="{ row }">
            <p>{{row.addTime}}</p>
            <p>{{row.auditTime}}</p>
            <p>-</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="auditStatus" min-width="100">
          <template #default="{ row }">
            {{row.auditStatus === 2 ? (row.auditStatus === 1 ? '未审核' : '审核通过') : '审核不通过'}}
          </template>
        </el-table-column>
        <el-table-column label="驳回理由" prop="reject" min-width="200" />
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup name="productCateLists">
import { usePaging } from '@/hooks/usePaging'
import { withdrawalRecord } from '@/api/finance/withdraw'
const queryParams = reactive({
  orderNo: '',
  userName: '',
  auditStatus: null,
  // addTime: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: withdrawalRecord,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

</script>
