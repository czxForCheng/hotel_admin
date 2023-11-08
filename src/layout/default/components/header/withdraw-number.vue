<template>
  <div class="withdraw-number" @click="toWithdraw">
    <el-badge :value="number" class="item">
      提现
    </el-badge>
  </div>
</template>

<script setup lang="ts">
import { processWithdrawal } from '@/api/finance/withdraw'
const router = useRouter()
  const number = ref(0)
const getProcessWithdrawal = async () => {
  const res = await processWithdrawal({})
  number.value = res.msgNum
}
getProcessWithdrawal()
const toWithdraw = () => {
  router.push('/finance/withdraw')
}
</script>
<style scoped>
  .withdraw-number{
    margin: 0 30px 0 20px;
  }
  :deep(.el-badge__content.is-fixed){
    top: 0 !important;
    right: 0 !important;
  }
</style>