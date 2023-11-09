<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="用户名称">
          <el-input
              class="w-[280px]"
              v-model="queryParams.userName"
              placeholder="请输入用户名称"
              clearable
          />
        </el-form-item>
<!--        <el-form-item label="注册时间">-->
<!--          <daterange-picker-->
<!--              v-model:startTime="queryParams.startTime"-->
<!--              v-model:endTime="queryParams.endTime"-->
<!--          />-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button v-perms="['service:add']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增客服
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="用户名" prop="userName" min-width="100" />
        <el-table-column label="代理" prop="agentName" min-width="100" />
        <el-table-column label="链接" prop="linkUrl" min-width="100" />
        <el-table-column label="上班时间" prop="workStartTime" min-width="100" />
        <el-table-column label="下班时间" prop="workEndTime" min-width="100" />
        <el-table-column label="添加时间" prop="addTime" min-width="160" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['service:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['service:del']" type="primary" @click="handleDelete(row.id)">禁用</el-button>
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
          <el-form-item label="代理" prop="agentId">
            <el-select class="w-[280px]" v-model="formData.agentId" placeholder="请选择代理">
              <el-option
                  v-for="(item, key) in memberProxyAll"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input
                v-model="formData.userName"
                placeholder="请输入用户名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="链接" prop="linkUrl">
            <el-input
                v-model="formData.linkUrl"
                placeholder="请输入链接"
                clearable
            />
          </el-form-item>
          <el-form-item label="上班时间" prop="workStartTime">
            <el-input
                v-model="formData.workStartTime"
                placeholder="请输入上班时间"
                clearable
            />
          </el-form-item>
          <el-form-item label="下班时间" prop="workEndTime">
            <el-input
                v-model="formData.workEndTime"
                placeholder="请输入下班时间"
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
<script lang="ts" setup name="serviceLists">
import type { FormInstance } from 'element-plus'
import { usePaging } from '@/hooks/usePaging'
import {getServiceList, addService, delService, editService} from '@/api/service'
import { getProxyList } from '@/api/member'
import feedback from "@/utils/feedback";
const queryParams = reactive({
  userName: '',
  // startTime: '',
  // endTime: ''
})
let formData = reactive({
  id: '',
  userName: '',
  linkUrl: '',
  agentId: '',
  workStartTime: '',
  workEndTime: ''
})
const rules = reactive({
  agentId: [{ required: true, message: '代理必选', trigger: 'blur' }],
  userName: [{ required: true, message: '用户名称必填', trigger: 'blur' }],
  linkUrl: [{ required: true, message: '链接必填', trigger: 'blur' }],
  workStartTime: [{ required: true, message: '上班时间必填', trigger: 'blur' }],
  workEndTime: [{ required: true, message: '下班时间必填', trigger: 'blur' }]
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: getServiceList,
  params: queryParams
})
onActivated(() => {
  getLists()
})
getLists()
// 获取所有代理
const memberProxyAll = ref([])
const getMemberProxyAll = async () => {
  memberProxyAll.value = await getProxyList()
}
getMemberProxyAll()
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
// 新增产品分类
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增客服'
}
// 删除
const handleDelete = async (id: number) => {
  await feedback.confirm('确定要禁用这条数据？')
  await delService({ id })
  feedback.msgSuccess('禁用成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改客服'
  // formData = row
  formData.id = row.id
  formData.userName = row.userName
  formData.linkUrl = row.linkUrl
  formData.workStartTime = row.workStartTime
  formData.workEndTime = row.workEndTime
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await editService(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await addService(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.userName = ''
  formData.linkUrl = ''
  formData.workStartTime = ''
  formData.workEndTime = ''
}

</script>
<style scoped lang="scss">
:deep(.el-select){
  width: 100%;
}
</style>
