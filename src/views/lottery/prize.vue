<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="抽奖活动">
          <el-select class="w-[280px]" v-model="queryParams.drawId" placeholder="请选择抽奖活动">
            <el-option
                v-for="(item, index) in lotteryDrawList" :key="index"
                :label="item.drawName"
                :value="item.id"
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
      <div>
        <el-button v-perms="['lotteryPrize:add']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增奖品
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="抽奖活动ID" prop="drawId" min-width="120" />
        <el-table-column label="奖品名称" prop="prizeName" min-width="100" />
        <el-table-column label="奖金金额" prop="prizeAmount" min-width="100" />
        <el-table-column label="中奖百分比" prop="winningRatio" min-width="120" />
        <el-table-column label="余额最小限制" prop="minAmount" min-width="120" />
        <el-table-column label="余额最大限制" prop="maxAmount" min-width="120" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['lotteryPrize:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['lotteryPrize:del']" type="primary" @click="handleDelete(row.id)">删除</el-button>
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
          :title="dialogTitle"
          width="50%"
          :before-close="handleClose"
      >
        <el-form ref="formRef"
                 class="ls-form"
                 :model="formData"
                 label-width="120px"
                 :rules="rules">
          <el-form-item label="活动名称" prop="drawName">
            <el-select class="w-[280px]" v-model="formData.drawId" placeholder="请选择活动名称">
              <el-option
                  v-for="(item, index) in lotteryDrawList" :key="index"
                  :label="item.drawName"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="奖品名称" prop="prizeName">
            <el-input
                v-model="formData.prizeName"
                placeholder="请输入奖品名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="奖金金额" prop="prizeAmount">
            <el-input
                v-model="formData.prizeAmount"
                placeholder="请输入奖金金额"
                clearable
            />
          </el-form-item>
          <el-form-item label="中奖百分比" prop="winningRatio">
            <el-input
                v-model="formData.winningRatio"
                placeholder="请输入中奖百分比"
                clearable
            />
            <p style="line-height: 1;font-size: 12px;color: #999;margin-top: 8px;">中奖百分比为0～100之间的数值</p>
          </el-form-item>
          <el-form-item label="余额最小限制" prop="minAmount">
            <el-input
                v-model="formData.minAmount"
                placeholder="请输入余额最小限制"
                clearable
            />
          </el-form-item>
          <el-form-item label="余额最大限制" prop="maxAmount">
            <el-input
                v-model="formData.maxAmount"
                placeholder="请输入余额最大限制"
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
<script lang="ts" setup name="lotteryLists">
import type { FormInstance } from 'element-plus'
import { usePaging } from '@/hooks/usePaging'
import {
  lotteryPrizePage,
  lotteryPrizeAdd,
  lotteryPrizeEdit,
  lotteryPrizeDel,
  lotteryDrawPageAll
} from '@/api/lottery'
import feedback from "@/utils/feedback";
import {getRoutePath} from "@/router";
const queryParams = reactive({
  drawId: ''
})
let formData = reactive({
  id: '',
  drawId: '',
  prizeName: '',
  prizeAmount: '',
  winningRatio: '',
  minAmount: null,
  maxAmount: null
})
const validate0to100 = (rule: any, value: any, callback: any) => {
  if (value <= 0 || value >= 100) {
    callback(new Error('请输入0～100之间(不包含0和100)的数'))
  }else{
    callback()
  }
}
const rules = reactive({
  drawId: [{ required: true, message: '活动名称必选', trigger: 'blur' }],
  prizeName: [{ required: true, message: '奖品名称必填', trigger: 'blur' }],
  prizeAmount: [{ required: true, message: '中奖金额必填', trigger: 'blur' }],
  winningRatio: [
      { required: true, message: '中奖百分比必填', trigger: 'blur' },
      { validator: validate0to100, trigger: 'blur' }
  ],
  minAmount: [{ required: true, message: '最小余额限制必填', trigger: 'blur' }],
  maxAmount: [{ required: true, message: '最大余额限制必填', trigger: 'blur' }]
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: lotteryPrizePage,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

const lotteryDrawList = ref([])
const getLotteryDrawList = async () => {
  lotteryDrawList.value = await lotteryDrawPageAll({})
}
getLotteryDrawList()

const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
// 新增产品分类
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增奖品'
}
// 删除
const handleDelete = async (id: any) => {
  await feedback.confirm('确定要删除这条数据？')
  await lotteryPrizeDel({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改奖品信息'
  // formData = row
  formData.id = row.id
  formData.drawId = row.drawId
  formData.prizeName = row.prizeName
  formData.prizeAmount = row.prizeAmount
  formData.winningRatio = row.winningRatio
  formData.minAmount = row.minAmount
  formData.maxAmount = row.maxAmount
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await lotteryPrizeEdit(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await lotteryPrizeAdd(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.drawId = ''
  formData.prizeName = ''
  formData.prizeAmount = ''
  formData.winningRatio = ''
  formData.minAmount = null
  formData.maxAmount = null
}

</script>
<style scoped>
:deep(.el-select){
  width: 100%;
}
</style>
