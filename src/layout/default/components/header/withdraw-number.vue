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
import useWithdrawStore from '@/stores/modules/withdraw'
const withdrawStore = useWithdrawStore()
const withdrawNumber = computed(() => withdrawStore.withdrawNumber)
const router = useRouter()
const rechargeNumber = ref(0)
const getWithdrawNumber = async () => {
  await withdrawStore.getWithdraeNumber()
}
getWithdrawNumber()
let timer:any = null
timer = setInterval(() => {
  getWithdrawNumber()
}, 60000)
const toWithdraw = () => {
  router.push('/finance/withdraw')
}
const toRecharge = () => {
  router.push('/finance/recharge')
}
onUnmounted(async () => {
  clearInterval(timer)
})
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