<template>
  <div class="home">
    <div style="margin-bottom: 20px;">
      <el-card>
        <div class="title" style="display: flex;align-items: center;">
          <div class="lef" style="display: flex;align-items: center;cursor: pointer;" @click="handleRefresh">
            <span style="margin-right: 6px;">商城统计</span>
            <icon name="el-icon-Refresh" :size="18" />
          </div>
          <span style="font-size: 14px;margin-left: 12px;">上次刷新时间：{{showData['refreshTime'] || getNowTime()}}</span>
        </div>
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
        <div style="display: flex;">
          <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
            <el-form-item label="统计时间">
              <daterange-picker
                  v-model:startTime="queryParams.startTime"
                  v-model:endTime="queryParams.endTime"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleAgentRefresh">查询</el-button>
              <el-button @click="resetParams">重置</el-button>
            </el-form-item>
          </el-form>
          <span style="font-size: 14px;line-height: 32px;">上次刷新时间: {{refreshTime}}</span>
        </div>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="姓名" prop="agentName" min-width="120" />
        <el-table-column label="代理等级" prop="agentName" min-width="120" >
          <template #default="{ row }">
            {{row.agentLevel === 1 ? '一级' : '二级'}}
          </template>
        </el-table-column>
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
import {ref, reactive, computed} from 'vue'
import { usePaging } from '@/hooks/usePaging'
import { statisticsData , countAgent, mallRefresh, agentRefresh} from '@/api/app'
import type { FormInstance } from 'element-plus'
const formRef = shallowRef<FormInstance>()
let showData:any = ref({})
const isLoading = ref(false)
const getNowTime = (type = 0) => {
  const nowTime = new Date()
  let year:any = nowTime.getFullYear()
  let month:any = nowTime.getMonth() + 1
  month = month < 10 ? '0' + month : '' +month
  let day:any = nowTime.getDate()
  day = day < 10 ? '0' + day : '' +day
  let hour:any = nowTime.getHours()
  hour = hour < 10 ? '0' + hour : '' +hour
  let minute:any = nowTime.getMinutes()
  minute = minute < 10 ? '0' + minute : '' +minute
  let second:any = nowTime.getSeconds()
  second = second < 10 ? '0' + second : '' +second
  if(type === 0) {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' +second
  }else{
    return year + '-' + month + '-' + day
  }

}
const getShowData = async () => {
  isLoading.value = true
  showData.value = await statisticsData()
  isLoading.value = false
}
getShowData()
const queryParams = reactive({
  startTime: '',
  endTime: ''
})
queryParams.startTime = getNowTime(1)
queryParams.endTime = getNowTime(1)
const refreshTime = ref('')
const { pager, getLists, resetPage } = usePaging({
  fetchFun: countAgent,
  params: queryParams,
  afterRequest: (res) => {
    queryParams.startTime = res.list[0] && res.list[0].startTime || getNowTime(1)
    queryParams.endTime = res.list[0] && res.list[0].endTime || getNowTime(1)
    refreshTime.value = res.list[0] && res.list[0].refreshTime || getNowTime()
  }
})

getLists()

const resetParams = async () => {
  queryParams.startTime = getNowTime(1)
  queryParams.endTime = getNowTime(1)
  await agentRefresh(queryParams)
  getLists()
}

const handleRefresh = async () => {
  await mallRefresh({})
  await getShowData()
}
const handleAgentRefresh = async () => {
  await agentRefresh(queryParams)
  await resetPage()
}

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
