<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="活动类型">
          <el-select class="w-[280px]" v-model="queryParams.drawType" placeholder="请选择活动类型">
            <el-option
                label="转盘活动"
                :value="0"
            />
            <el-option
                label="其它活动"
                :value="1"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="活动状态">
          <el-select class="w-[280px]" v-model="queryParams.drawStatus" placeholder="请选择活动状态">
            <el-option
                label=" 关闭"
                :value="0"
            />
            <el-option
                label="开启"
                :value="1"
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
        <el-button v-perms="['lotteryDraw:add']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增活动
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="活动名称" prop="drawName" min-width="100" />
        <el-table-column label="活动内容" prop="drawContent" min-width="180" show-overflow-tooltip />
        <el-table-column label="活动类型" prop="drawType" min-width="100" >
          <template #default="{ row }">
            {{row.drawType == 0 ? '转盘活动' : '其它活动'}}
          </template>
        </el-table-column>
        <el-table-column label="完成任务组数限制" prop="taskNumLimit" min-width="120" />
        <el-table-column label="每天抽奖次数限制" prop="lottoNumLimit" min-width="120" />
        <el-table-column label="用户余额限制" prop="userMoneyLimit" min-width="100" />
        <el-table-column label="开始时间" prop="startTimeStr" min-width="120" />
        <el-table-column label="结束时间" prop="endTimeStr" min-width="100" />
        <el-table-column label="活动状态" prop="drawStatus" min-width="100" >
          <template #default="{ row }">
            <el-tag :type="row.drawStatus == 0 ? 'danger' : 'success'" >{{row.drawStatus == 0 ? '关闭' : '开启'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['lotteryDraw:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['lotteryDraw:del']" type="primary" @click="handleDelete(row.id)">删除</el-button>
            <el-dropdown>
                          <span class="el-dropdown-link" style="margin-left: 10px;">
                            更多操作
                           <icon name="el-icon-arrow-down" :size="18"/>
                          </span>
              <template #dropdown>
                <div style="padding: 5px 20px;">
                  <el-dropdown-menu>
                    <el-button v-perms="['lotteryDraw:disable']" @click="handleDrawStatus(row)">{{row.drawStatus == 0 ? '开启' : '关闭'}}</el-button>
                    <el-button v-perms="['lotteryPredict:list']">
                      <router-link
                          :to="{
                            path: '/lottery/predict',
                            query: {
                                id: row.id
                           }
                          }"
                      >
                        预中奖设置
                      </router-link>
                    </el-button>
                  </el-dropdown-menu>
                </div>
              </template>
            </el-dropdown>
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
                 label-width="150px"
                 :rules="rules">
          <el-form-item label="活动名称" prop="drawName">
            <el-input
                v-model="formData.drawName"
                placeholder="请输入活动名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="活动内容" prop="drawContent">
            <editor v-model="formData.drawContent" :height="500" />
          </el-form-item>
          <el-form-item label="活动类型" prop="drawType">
            <el-select class="w-[280px]" v-model="formData.drawType" placeholder="请选择活动类型">
              <el-option
                  label="转盘活动"
                  :value="0"
              />
              <el-option
                  label="其它活动"
                  :value="1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="完成任务组数限制" prop="taskNumLimit">
            <el-input
                v-model="formData.taskNumLimit"
                placeholder="请输入完成任务组数限制"
                clearable
            />
          </el-form-item>
          <el-form-item label="每天抽奖次数限制" prop="lottoNumLimit">
            <el-input
                v-model="formData.lottoNumLimit"
                placeholder="请输入每天抽奖次数限制"
                clearable
            />
          </el-form-item>
          <el-form-item label="用户余额限制" prop="userMoneyLimit">
            <el-input
                v-model="formData.userMoneyLimit"
                placeholder="请输入用户余额限制"
                clearable
            />
          </el-form-item>
          <el-form-item label="开始时间" prop="startTimeStr">
            <el-date-picker
                v-model="formData.startTimeStr"
                type="date"
                placeholder="请选择开始时间"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endTimeStr">
            <el-date-picker
                v-model="formData.endTimeStr"
                type="date"
                placeholder="请选择结束时间"
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
  lotteryDrawPage,
  lotteryDrawAdd,
  lotteryDrawEdit,
  lotteryDrawDel,
  lotteryDrawDisable,
  lotteryPredictPage
} from '@/api/lottery'
import feedback from "@/utils/feedback";
import { getRoutePath } from "@/router";
const queryParams = reactive({
  drawStatus: '',
  drawType: ''
})
let formData = reactive({
  id: '',
  drawName: '',
  drawContent: '',
  drawType: '',
  taskNumLimit: 1,
  lottoNumLimit: 1,
  userMoneyLimit: 100,
  startTimeStr: '',
  endTimeStr: ''
})
const rules = reactive({
  drawName: [{ required: true, message: '活动名称必填', trigger: 'blur' }],
  drawContent: [{ required: true, message: '活动内容必填', trigger: 'blur' }],
  drawType: [{ required: true, message: '活动类型必选', trigger: 'blur' }],
  taskNumLimit: [{ required: true, message: '完成任务组数限制必填', trigger: 'blur' }],
  lottoNumLimit: [{ required: true, message: '每天抽奖次数限制必填', trigger: 'blur' }],
  userMoneyLimit: [{ required: true, message: '用户余额限制必填', trigger: 'blur' }],
  startTimeStr: [{ required: true, message: '开始时间必填', trigger: 'blur' }],
  endTimeStr: [{ required: true, message: '结束时间必填', trigger: 'blur' }]
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: lotteryDrawPage,
  params: queryParams
})
// onActivated(() => {
//   getLists()
// })

getLists()
const formatterTime = (date: any) => {
  const time = new Date(date)
  let year:any = time.getFullYear()
  let month:any = time.getMonth() + 1
  month = month < 10 ? '0' + month : '' +month
  let day:any = time.getDate()
  day = day < 10 ? '0' + day : '' +day
  return year + '-' + month + '-' + day
}
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
// 新增产品分类
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增活动'
}
const handleDrawStatus = async (row: any) => {
  await feedback.confirm(`确定要${row.drawStatus == 0 ? '开启' : '关闭'}这条数据？`)
  await lotteryDrawDisable({
    id: row.id
  })
  feedback.msgSuccess(`${row.drawStatus == 0 ? '开启' : '关闭'}成功`)
  getLists()
}

// 删除
const handleDelete = async (id: any) => {
  await feedback.confirm('确定要删除这条数据？')
  await lotteryDrawDel({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改活动信息'
  // formData = row
  formData.id = row.id
  formData.drawName = row.drawName
  formData.drawContent = row.drawContent
  formData.drawType = row.drawType
  formData.taskNumLimit = row.taskNumLimit
  formData.lottoNumLimit = row.lottoNumLimit
  formData.userMoneyLimit = row.userMoneyLimit
  formData.startTimeStr = row.startTimeStr
  formData.endTimeStr = row.endTimeStr
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  formData.startTimeStr = formatterTime(formData.startTimeStr)
  formData.endTimeStr = formatterTime(formData.endTimeStr)
  if (formData.id) {
    await lotteryDrawEdit(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await lotteryDrawAdd(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.drawName = ''
  formData.drawContent = ''
  formData.drawType = ''
  formData.lottoNumLimit = 1
  formData.taskNumLimit = 1
  formData.userMoneyLimit = 100
  formData.startTimeStr = ''
  formData.endTimeStr = ''
}

</script>
<style scoped>
:deep(.el-select){
  width: 100%;
}
:deep(.el-dropdown-link .el-icon){
  top: 3px;
}
</style>
