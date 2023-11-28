<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="订单号">
          <el-input
              class="w-[280px]"
              v-model="queryParams.orderNum"
              placeholder="请输入订单号"
              clearable
          />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
              class="w-[280px]"
              v-model="queryParams.username"
              placeholder="请输入用户名"
              clearable
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="w-[280px]" v-model="queryParams.orderStatus" placeholder="请选择状态">
            <el-option
                label="未付款"
                :value="0"
            />
            <el-option
                label="已付款"
                :value="1"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
              class="w-[280px]"
              v-model="queryParams.mobile"
              placeholder="请输入手机号"
              clearable
          />
        </el-form-item>
        <el-form-item label="下单时间">
          <daterange-picker
              v-model:startTime="queryParams.startTime"
              v-model:endTime="queryParams.endTime"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <el-table v-loading="pager.loading" :data="pager.lists" max-height="600">
        <el-table-column label="订单号" prop="orderNum" min-width="180" />
        <el-table-column label="用户余额" prop="userAmount" min-width="100" />
        <el-table-column label="用户名" prop="username" min-width="100" />
        <el-table-column label="手机号" prop="mobile" min-width="120" />
        <el-table-column label="用户冻结金额" prop="frozenAmount" min-width="120" />
        <el-table-column label="交易数额" prop="transactionAmount" min-width="100" />
        <el-table-column label="佣金" prop="commission" min-width="100" />
        <el-table-column label="做单级别" prop="userLevel" min-width="150" />
        <el-table-column label="下单时间/付款时间" min-width="180" >
          <template #default="{ row }">
            <p>{{row.createTime}}</p>
            <p>{{row.updateTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="最后付款时间" prop="updateTime" min-width="180" />
        <el-table-column label="状态" min-width="100">
          <template #default="{ row }">
                <el-button type="success" v-if="row.orderStatus">已付款</el-button>
                <el-button type="warning" v-else>未付款</el-button>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="auditStatus" min-width="100">
          <template #default="{ row }">
            {{row.orderStatus ? '已付款' : '未付款'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <template v-if="row.orderStatus">
              <el-button v-perms="['log:flow']" type="primary" @click="handleView(row)">资金流水</el-button>
            </template>
            <template v-else>
              <el-button v-perms="['order:force']" type="primary" @click="handlePay(row.id)">强制付款</el-button>
              <el-button v-perms="['order:del']" type="primary" @click="handleEdit(row)">取消订单</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
    <div>
      <el-dialog
          v-model="dialogVisible"
          title="资金流水"
          width="80%"
          :before-close="handleClose"
      >
        <el-table :data="pagerView">
          <el-table-column label="订单号" prop="orderNo" min-width="180" />
          <el-table-column label="用户名" prop="username" min-width="100" />
          <el-table-column label="交易数额" prop="changeAmount" min-width="100" />
          <el-table-column label="交易类型" min-width="100" >
            <template #default="{ row }">
              {{ fundType(row.fundType) }}
            </template>
          </el-table-column>
          <el-table-column label="收入/支出" min-width="100" >
            <template #default="{ row }">
              {{row.status === 1 ? '收入' : '支出'}}
            </template>
          </el-table-column>
          <el-table-column label="交易时间" prop="addTime" min-width="100" />
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts" setup name="orderLists">
import { usePaging } from '@/hooks/usePaging'
import {orderList, orderPay, orderFlow, orderDel} from '@/api/finance/order'
import feedback from "@/utils/feedback";
const queryParams = reactive({
  orderNum: '',
  username: '',
  orderStatus: null,
  mobile: '',
  startTime: '',
  endTime: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: orderList,
  params: queryParams
})
onActivated(() => {
  getLists()
})
getLists()

const fundType = computed(() => {
  return (arg: any) => {
    let type = ''
    switch(arg) {
      case 0:
        type = '余额充值'
        break
      case 1:
        type = '彩金'
        break
      case 2:
        type = '提现'
        break
      case 3:
        type = '用户注册'
        break
      case 4:
        type = '支付'
        break
      case 5:
        type = '返还'
        break
      case 6:
        type = '佣金'
        break
      case 7:
        type = '首充获利'
        break
      case 8:
        type = '赠送存款'
        break
      case 9:
        type = '冻结余额'
        break
      case 10:
        type = '冻结返还'
        break
      case 11:
        type = '下级佣金'
        break
    }
    return type
  }
})

const dialogVisible = ref(false)
const queryParamsView = reactive({
  id: '',
  orderNo: ''
})
const handleView = async (row: any) => {
  queryParamsView.id = row.id
  queryParamsView.orderNo = row.orderNum
  getListsView()

}
const pagerView = ref([])
const getListsView = async () => {
  pagerView.value = await orderFlow(queryParamsView)
  dialogVisible.value = true
}
const handleClose = () => {
  dialogVisible.value = false
  queryParamsView.id = ''
  queryParamsView.orderNo = ''
}

/* 强制付款 */
const handlePay = async (id: number) => {
  await feedback.confirm('确定要强制付款？')
  await orderPay({ id})
  feedback.msgSuccess('强制付款成功')
  getLists()
}

/* 取消订单 -- 调用编辑接口传入取消状态即可 */
const handleEdit = async (row: any) => {
  await feedback.confirm('确定要取消此条订单？')
  await orderDel({ id: row.id, isDelete: 1 })
  feedback.msgSuccess('取消订单成功')
  getLists()
}
</script>
