<template>
  <div style="display: flex;">
    <div class="recharge-number" @click="toRecharge">
      <el-badge :value="0" class="item">
        充值
      </el-badge>
    </div>
    <div class="withdraw-number" @click="toWithdraw">
      <el-badge :value="withdrawNumber" class="item">
        提现
      </el-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { processWithdrawal } from '@/api/finance/withdraw'
import { rechargeRecord } from '@/api/finance/recharge'
const router = useRouter()
  const rechargeNumber = ref(0)
  const withdrawNumber = ref(0)
const getProcessWithdrawal = async () => {
  const res = await processWithdrawal({})
  withdrawNumber.value = res.msgNum
}
getProcessWithdrawal()
const toWithdraw = () => {
  router.push('/finance/withdraw')
}
const toRecharge = () => {
  router.push('/finance/recharge')
}
</script>
<style scoped>
  .withdraw-number, .recharge-number{
    margin: 0 30px 0 20px;
    cursor: pointer;
  }
  :deep(.el-badge__content.is-fixed){
    top: 0 !important;
    right: 0 !important;
  }
</style>