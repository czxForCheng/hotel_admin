<template>
  <div>
    <el-card shadow="never" class="!border-none">
      <el-table
          ref="paneTable"
          class="m-t-24"
          :data="pager.lists"
          v-loading="pager.loading"
          style="width: 100%"
      >
        <el-table-column prop="jobName" label="名称" min-width="120" />
        <el-table-column prop="status" label="状态" min-width="100">
          <template #default="{ row }">
            <el-tag v-if="row.status == 1" type="success">开启</el-tag>
            <el-tag v-if="row.status == 0" type="danger">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="执行时间" prop="executionTime" min-width="180" />
        <el-table-column label="最后执行时间" prop="overTime" min-width="180" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <div class="flex">
              <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
            </div>
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
          <el-form-item label="执行时间" prop="executionTime">
            <el-input
                v-model="formData.executionTime"
                placeholder="请输入执行时间（格式如：12:00）"
                clearable
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="0">关闭</el-radio>
            </el-radio-group>
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

<script lang="ts" setup name="scheduledTask">
import type { FormInstance } from 'element-plus'
import {crontabLists, crontabEdit} from '@/api/setting/system'
import { usePaging } from '@/hooks/usePaging'
import { getRoutePath } from '@/router'
import feedback from '@/utils/feedback'

const { pager, getLists } = usePaging({
  fetchFun: crontabLists,
  params: {}
})

getLists()
const formData = reactive({
  id: '',
  executionTime: null,
  status: null
})
const rules = reactive({
  executionTime: [{ required: true, message: '执行时间必填', trigger: 'blur' }],
  status: [{ required: true, message: '状态必选', trigger: 'blur' }]
})
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
const handleEdit = (row:any) => {
  dialogVisible.value = true
  dialogTitle.value = '编辑 ' + row.jobName
  formData.id = row.id
  formData.executionTime = row.executionTime
  formData.status = row.status
}
/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  await crontabEdit(formData)
  feedback.msgSuccess('修改成功')
  getLists()
  handleClose()
}
const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.executionTime = null
  formData.status = null
}
</script>

<style lang="scss"></style>
