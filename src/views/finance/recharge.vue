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
              v-model="queryParams.userName"
              placeholder="请输入用户名"
              clearable
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-select class="w-[280px]" v-model="queryParams.type" placeholder="请选择类型">
            <el-option
                label="会员充值"
                :value="0"
            />
            <el-option
                label="彩金"
                :value="1"
            />
            <el-option
                label="存款"
                :value="2"
            />
          </el-select>
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
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <el-table v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="订单号" prop="orderNo" min-width="180" />
        <el-table-column label="用户id" prop="userId" min-width="100" />
        <el-table-column label="用户名称" prop="userName" min-width="100" />
        <el-table-column label="充值金额" prop="money" min-width="100" />
        <el-table-column label="手续费" prop="handlingFee" min-width="100" />
        <el-table-column label="付款地址" prop="payUrl" min-width="160" />
        <el-table-column label="付款方式" prop="paymentMethod" min-width="160" />
        <el-table-column label="打款凭证" min-width="160" >
          <template #default="{ row }">
            <div class="flex items-center">
              <image-contain
                  class="flex-none mr-2"
                  :src="row.voucher"
                  :width="40"
                  :height="40"
                  preview-teleported
                  fit="contain"
              />
              {{ row.nickname }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type" min-width="160">
          <template #default="{ row }">
            {{row.type === 0 ? '会员充值' : (row.type === 1 ? '彩金' : '赠送存款')}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="auditStatus" min-width="160">
          <template #default="{ row }">
            {{!row.auditStatus ? '未审核' : (row.auditStatus === 1 ? '审核通过' : '审核不通过')}}
          </template>
        </el-table-column>
        <el-table-column label="申请时间" prop="createTime" min-width="200" />
        <el-table-column label="处理时间" prop="createTime" min-width="200" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['rechargeRecord:del']" type="primary" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup name="rechargeLists">
import { usePaging } from '@/hooks/usePaging'
import { rechargeRecord, rechargeDelete } from '@/api/finance/recharge'
import feedback from "@/utils/feedback";
import {userManageDel} from "@/api/member";
const queryParams = reactive({
  orderNo: '',
  userName: '',
  type: '',
  auditStatus: null
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: rechargeRecord,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

const handleDelete = async (id: number) => {
  await feedback.confirm('确定要删除这条数据？')
  await rechargeDelete({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}
</script>
