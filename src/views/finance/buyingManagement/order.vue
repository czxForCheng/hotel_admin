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
              v-model="queryParams.userName"
              placeholder="请输入用户名"
              clearable
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="w-[280px]" v-model="queryParams.auditStatus" placeholder="请选择状态">
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
          <el-date-picker
              v-model="queryParams.createTime"
              type="date"
              range-separator="-"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              placeholder="请选择下单时间"
              clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <el-table v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="订单号" prop="orderNum" min-width="180" />
        <el-table-column label="用户名" min-width="100" >
          <template #default="{ row }">
            <p>{{row.username}}</p>
            <p>{{row.mobile}}</p>
          </template>
        </el-table-column>
        <el-table-column label="用户余额" prop="userAmount" min-width="100" />
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
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <template v-if="row.orderStatus">
              <el-button v-perms="['productCate:edit']" type="primary" @click="handleView(row.id)">资金流水</el-button>
            </template>
            <template v-else>
              <el-button v-perms="['productCate:delete']" type="primary" @click="handlePay(row.id)">强制付款</el-button>
              <el-button v-perms="['productCate:delete']" type="primary" @click="handleEdit(row.id)">取消订单</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup name="productCateLists">
import { usePaging } from '@/hooks/usePaging'
import { orderList } from '@/api/finance/order'
const queryParams = reactive({
  orderNum: '',
  userName: '',
  auditStatus: null,
  mobile: '',
  createTime: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: orderList,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

const handleView = (id: number) => {

}

/* 强制付款 */
const handlePay = (id: number) => {

}

/* 取消订单 */
const handleEdit = (id: number) => {

}
</script>
