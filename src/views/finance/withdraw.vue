<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="订单号">
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
              v-model="queryParams.username"
              placeholder="请输入用户名"
              clearable
          />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select class="w-[280px]" v-model="queryParams.auditStatus" placeholder="请选择审核状态">
            <el-option
                label="待审核"
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
        <el-form-item label="发起时间">
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
      <el-table v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="订单号" prop="orderNo" min-width="180" />
        <el-table-column label="用户信息" min-width="180" >
          <template #default="{ row }">
            <p>用户id：{{row.userId}}</p>
            <p>用户名：{{row.username}}</p>
            <p>手机号：{{row.mobile}}</p>
          </template>
        </el-table-column>
        <el-table-column label="一级代理/二级代理" min-width="180" >
          <template #default="{ row }">
            <p>{{row.firstAgentName}}</p>
            <p>{{row.secondaryAgentName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="提现金额" prop="money" min-width="100" />
        <el-table-column label="银行信息/usdt" prop="usdt" min-width="150" />
        <el-table-column label="发起/处理/回调" prop="" min-width="240" >
          <template #default="{ row }">
            <p>发起时间 {{row.addTime}}</p>
            <p>处理时间 {{row.auditTime}}</p>
<!--            <p>发起时间 {{formatterTime(row.addTime)}}</p>-->
<!--            <p>处理时间 {{formatterTime(row.auditTime)}}</p>-->
            <p>回调时间 -</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="auditStatus" min-width="100">
          <template #default="{ row }">
            {{row.auditStatus ? (row.auditStatus === 1 ? '审核通过' : '审核不通过') : '待审核'}}
          </template>
        </el-table-column>
        <el-table-column label="驳回理由" prop="reject" min-width="200" />
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
              <el-button v-if="!row.auditStatus" v-perms="['withdrawalRecord:withdrawal:audit']" type="primary" @click="handleAgree(row)">同意</el-button>
              <el-button v-if="!row.auditStatus" v-perms="['withdrawalRecord:withdrawal:audit']" type="primary" @click="handleReject(row)">拒绝</el-button>
              <el-button v-perms="['withdrawalRecord:del']" type="primary" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
    <div>
      <el-dialog
          v-model="dialogReasonVisible"
          title="驳回理由"
          width="50%"
          :before-close="handleClose"
      >
        <el-form ref="formRef"
                 class="ls-form"
                 :model="formData"
                 label-width="85px"
                 :rules="rules">
          <el-form-item label="驳回理由" prop="reject">
            <el-input
                v-model="formData.reject"
                placeholder="请输入驳回理由"
                clearable
            />
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="handleSubmit">确认</el-button>
            </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts" setup name="withdrawLists">
import { usePaging } from '@/hooks/usePaging'
import {withdrawalRecord, withdrawalAudit, withdrawalDelete} from '@/api/finance/withdraw'
import useWithdrawStore from '@/stores/modules/withdraw'
import feedback from "@/utils/feedback";
import type { FormInstance } from 'element-plus'
import {rechargeDelete} from "@/api/finance/recharge";
const withdrawStore = useWithdrawStore()
const queryParams = reactive({
  orderNo: null,
  username: null,
  auditStatus: null,
  startTime: '',
  endTime: ''
})

const formatterTime = computed(() => {
  return (time: string) => {
    return time && time.slice(0, time.length)
  }
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: withdrawalRecord,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

const handleAgree = async (row: any) => {
  await feedback.confirm('确定要同意这条提现？')
  await withdrawalAudit({
    id: row.id,
    userId: row.userId,
    money: row.money,
    auditStatus: 1
  })
  feedback.msgSuccess('操作成功')
  getLists()
  await withdrawStore.getWithdraeNumber()
}

const formRef = shallowRef<FormInstance>()
const dialogReasonVisible = ref(false)
const formData = reactive({
  id: '',
  userId: '',
  reject: '',
  auditStatus: 2,
  money: 0
})
const rules = reactive({
  reject: [{ required: true, message: '驳回理由必填', trigger: 'blur' }]
})
const handleReject = async (row: any) => {
  dialogReasonVisible.value = true
  formData.id = row.id
  formData.userId = row.userId
  formData.money = row.money
}

const handleSubmit = async () => {
  await formRef.value?.validate()
  await withdrawalAudit(formData)
  feedback.msgSuccess('操作成功')
  getLists()
  handleClose()
  await withdrawStore.getWithdraeNumber()
}

const handleClose = () => {
  dialogReasonVisible.value = false
  formData.id = ''
  formData.userId = ''
  formData.reject = ''
  formData.money = 0
}
const handleDelete = async (id: number) => {
  await feedback.confirm('确定要删除这条数据？')
  await withdrawalDelete({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}
</script>
