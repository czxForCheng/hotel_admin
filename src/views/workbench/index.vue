<template>
  <div class="home">
    <div style="margin-bottom: 20px;">
      <el-card>
        <div class="title">商城统计</div>
        <div class="dataList" v-loading="isLoading">
          <div class="data-item">
            <p class="dataTitle">首充人数</p>
            <p class="allNum">{{showData['people']?.initialCharge || 0}}</p>
            <p class="todayNum" >今日首充人数 <span class="todaySpan">{{showData['people']?.todayInitialCharge || 0}}</span></p>
            <p class="yesterdayNum">昨日首充人数 {{showData['people']?.yesterdayInitialCharge || 0}}</p>
          </div>
          <div class="data-item">
            <p class="dataTitle">用户总人数</p>
            <p class="allNum">{{showData['userTotal']?.userTotal || 0}}</p>
            <p class="todayNum" >今日新增用户 <span class="todaySpan">{{showData['userTotal']?.todayUserTotal || 0}}</span></p>
            <p class="yesterdayNum">昨日新增用户 {{showData['userTotal']?.yesterdayUserTotal || 0}}</p>
          </div>
          <div class="data-item">
            <p class="dataTitle">订单总量</p>
            <p class="allNum">{{showData['order']?.orderCount || 0}}</p>
            <p class="todayNum" >今日新增订单 <span class="todaySpan">{{showData['order']?.todayOrderCount || 0}}</span></p>
            <p class="yesterdayNum">昨日新增订单 {{showData['order']?.yesterdayOrderCount || 0}}</p>
          </div>
          <div class="data-item">
            <p class="dataTitle">订单总金额</p>
            <p class="allNum">{{showData['orderMoney']?.orderMoneyCount || 0}}</p>
            <p class="todayNum" >今日新增订单总金额 <span class="todaySpan">{{showData['orderMoney']?.todayOrderMoneyCount || 0}}</span></p>
            <p class="yesterdayNum">昨日新增订单总金额 {{showData['orderMoney']?.yesterdayOrderMoneyCount || 0}}</p>
          </div>
          <div class="data-item">
            <p class="dataTitle">用户充值</p>
            <p class="allNum">{{showData['amount']?.rechargeAmountCount || 0}}</p>
            <p class="todayNum" >今日新增充值 <span class="todaySpan">{{showData['amount']?.todayRechargeAmountCount || 0}}</span></p>
            <p class="yesterdayNum">昨日新增充值 {{showData['amount']?.yesterdayRechargeAmountCount || 0}}</p>
          </div>
          <div class="data-item">
            <p class="dataTitle">充值人数</p>
            <p class="allNum">{{showData['userCount']?.rechargeUserCount || 0}}</p>
            <p class="todayNum" >今日充值人数 <span class="todaySpan">{{showData['userCount']?.todayRechargeUserCount || 0}}</span></p>
            <p class="yesterdayNum">昨日充值人数 {{showData['userCount']?.yesterdayRechargeUserCount || 0}}</p>
          </div>
          <div class="data-item">
            <p class="dataTitle">用户提现</p>
            <p class="allNum">{{showData['amountCount']?.withdrawalAmountCount || 0}}</p>
            <p class="todayNum" >今日新增提现 <span class="todaySpan">{{showData['amountCount']?.todayWithdrawalAmountCount || 0}}</span></p>
            <p class="yesterdayNum">昨日新增提现 {{showData['amountCount']?.yesterdayWithdrawalAmountCount || 0}}</p>
          </div>
          <div class="data-item">
            <p class="dataTitle">提现人数</p>
            <p class="allNum">{{showData['withdrawalUserCount']?.withdrawalUserCount || 0}}</p>
            <p class="todayNum" >今日提现人数 <span class="todaySpan">{{showData['withdrawalUserCount']?.todayWithdrawalUserCount || 0}}</span></p>
            <p class="yesterdayNum">昨日提现人数 {{showData['withdrawalUserCount']?.yesterdayWithdrawalUserCount || 0}}</p>
          </div>
          <div class="data-item">
            <p class="dataTitle">抢单佣金</p>
            <p class="allNum">{{showData['commissionCount']?.rushCommissionCount || 0}}</p>
            <p class="todayNum" >今日新增佣金 <span class="todaySpan">{{showData['commissionCount']?.todayRushCommissionCount || 0}}</span></p>
            <p class="yesterdayNum">昨日新增佣金 {{showData['commissionCount']?.yesterdayRushCommissionCount || 0}}</p>
          </div>
        </div>
      </el-card>
    </div>
    <el-card>
      <div style="margin-bottom: 15px;">
        <p class="title">代理统计</p>
        <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
          <el-form-item label="统计时间">
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
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="姓名" prop="agentName" min-width="120" />
        <el-table-column label="客服数量" prop="customerNum" min-width="100" />
        <el-table-column label="累计用户" prop="cumulativeUser" min-width="100" />
        <el-table-column label="团队余额" prop="teamBalance" min-width="120" />
        <el-table-column label="今日充值" prop="topUpToday" min-width="100" />
        <el-table-column label="累计充值" prop="cumulativeRecharge" min-width="100" />
        <el-table-column label="手动扣款" prop="manualDebit" min-width="120" />
        <el-table-column label="今日提现" prop="withdrawalToday" min-width="100" />
        <el-table-column label="累计提现" prop="cumulativeWithdrawal" min-width="120" />
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup name="home">
import { ref, reactive } from 'vue'
import { usePaging } from '@/hooks/usePaging'
import { statisticsData , countAgent} from '@/api/app'
import type { FormInstance } from 'element-plus'
const formRef = shallowRef<FormInstance>()
let showData:any = ref({})
const isLoading = ref(false)
const getShowData = async () => {
  isLoading.value = true
  const res = await statisticsData()
  showData.value = res
  isLoading.value = false
}
getShowData()
const queryParams = reactive({
  pageNo: 1,
  pageSize: 15,
  startTime: '',
  endTime: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: countAgent,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()
</script>

<style lang="scss" scoped>
.title{
  padding-bottom: 20px;
  font-size: 18px;
}
.dataList{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .data-item{
    padding: 20px;
    width: calc(25% - 10px);
    margin-right: 10px;
    margin-bottom: 13px;
    background-color: #4073fa;
    font-size: 16px;
    color: #fff;
    &:nth-child(4n) {
      margin-right: 0px;
    }
    p.allNum, span.todaySpan{
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
