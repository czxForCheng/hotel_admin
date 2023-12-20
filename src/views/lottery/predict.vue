<template>
  <div>
<!--    <el-card class="!border-none" shadow="never">-->
<!--      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">-->
<!--        <el-form-item label="活动名称">-->
<!--          <el-select class="w-[280px]" v-model="queryParams.drawId" placeholder="请选择活动名称">-->
<!--            <el-option-->
<!--                v-for="(item, index) in lotteryAll" :key="index"-->
<!--                :label="item.drawName"-->
<!--                :value="item.id"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="resetPage">查询</el-button>-->
<!--          <el-button @click="resetParams">重置</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </el-card>-->
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button v-perms="['lotteryPredict:add']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增预中奖
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="用户名" prop="userName" min-width="100" />
        <el-table-column label="抽奖活动ID" prop="drawId" min-width="100" />
        <el-table-column label="中奖金额" prop="prizeAmount" min-width="100" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['lotteryPredict:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['lotteryPredict:del']" type="primary" @click="handleDelete(row.id)">删除</el-button>
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
                 label-width="85px"
                 :rules="rules">
          <el-form-item label="用户名" prop="userName">
            <el-input
                v-model="formData.userName"
                placeholder="请输入用户名"
                clearable
            />
          </el-form-item>
<!--          <el-form-item label="活动名称" prop="drawName">-->
<!--            <el-select class="w-[280px]" v-model="formData.drawId" placeholder="请选择活动名称">-->
<!--              <el-option-->
<!--                  v-for="(item, index) in lotteryAll" :key="index"-->
<!--                  :label="item.drawName"-->
<!--                  :value="item.id"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="中奖金额" prop="prizeAmount">
            <el-input
                v-model="formData.prizeAmount"
                placeholder="请输入中奖金额"
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
  lotteryPredictAdd,
  lotteryPredictPage,
  lotteryDrawPageAll, lotteryPredictDel, lotteryPredictEdit
} from '@/api/lottery'
import feedback from "@/utils/feedback";
const queryParams = reactive({
  drawId: null
})
let formData = reactive({
  id: '',
  userName: '',
  drawId: '',
  prizeAmount: ''
})
const rules = reactive({
  userName: [{ required: true, message: '用户名必填', trigger: 'blur' }],
  drawId: [{ required: true, message: '活动必选', trigger: 'blur' }],
  prizeAmount: [{ required: true, message: '中奖金额必填', trigger: 'blur' }]
})
const route = useRoute()
const id = route.query.id
const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: lotteryPredictPage,
  params: Object.assign(queryParams, {drawId: id})
})
onActivated(() => {
  getLists()
})

getLists()

const lotteryAll = ref([])
const getLotteryAll = async () => {
  lotteryAll.value = await lotteryDrawPageAll({})
}
getLotteryAll()
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
// 新增产品分类
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增预中奖'
}
// 删除
const handleDelete = async (id: any) => {
  await feedback.confirm('确定要删除这条数据？')
  await lotteryPredictDel({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改预中奖信息'
  // formData = row
  formData.id = row.id
  formData.userName = row.userName
  formData.drawId = row.drawId
  formData.prizeAmount = row.prizeAmount
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  //@ts-ignore
  formData.drawId = id
  if (formData.id) {
    await lotteryPredictEdit(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await lotteryPredictAdd(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.userName = ''
  formData.drawId = ''
  formData.prizeAmount = ''
}

</script>
<style scoped>
:deep(.el-select){
  width: 100%;
}
:deep(.el-button:nth-child(2n+1)){
  margin-left: 0 !important;
}
:deep(.el-button:nth-child(3)){
  margin-top: 10px !important;
}
:deep(.el-button:nth-child(4)){
  margin-top: 10px !important;
}
</style>
