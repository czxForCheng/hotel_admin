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
        <el-table-column label="类型" prop="linkUrl" min-width="100" >
          <template #default="{ row }">
            {{row.type === 0 ? '文本' : '链接'}}
          </template>
        </el-table-column>
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
          <el-form-item label="类型" prop="type">
            <el-select class="w-[280px]" v-model="formData.type" placeholder="请选择类型">
              <el-option
                  label="文本"
                  :value="0"
              />
              <el-option
                  label="链接"
                  :value="1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="链接" prop="linkUrl" v-if="formData.type === 1">
            <el-input
                v-model="formData.linkUrl"
                placeholder="请输入链接"
                clearable
            />
          </el-form-item>
          <el-form-item label="语言类型" v-if="formData.type === 0">
            <el-table size="small" :data="formData.languageList" border>
              <el-table-column label="语言" prop="name" min-width="60" />
              <el-table-column label="联系电话" prop="mobile" min-width="100" >
                <template #default="{ row }">
                  <el-input type="text" placeholder="请输入联系电话" v-model="row.mobile" />
                </template>
              </el-table-column>
            </el-table>
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
import {dictDataAll} from "@/api/setting/dict";
const queryParams = reactive({
  userName: '',
  // startTime: '',
  // endTime: ''
})
let formData = reactive({
  id: '',
  userName: '',
  type: 1,
  linkUrl: '',
  agentId: '',
  workStartTime: '',
  workEndTime: '',
  languageList: []
})
const rules = reactive({
  agentId: [{ required: true, message: '代理必选', trigger: 'blur' }],
  userName: [{ required: true, message: '用户名称必填', trigger: 'blur' }],
  type: [{ required: true, message: '类型必选', trigger: 'blur' }],
  linkUrl: [{ required: true, message: '链接必填', trigger: 'blur' }],
  workStartTime: [{ required: true, message: '上班时间必填', trigger: 'blur' }],
  workEndTime: [{ required: true, message: '下班时间必填', trigger: 'blur' }]
})
const defaultProps = {
  children: 'children',
  label: 'name',
}
const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: getServiceList,
  params: queryParams,
  afterRequest(res: Record<any, any>) {
    getLanguageDict()
  }
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
const languageDict = ref([])
const getLanguageDict = async () => {
  languageDict.value = await dictDataAll({ dictType: 'yuyan' })
  languageDict.value.forEach((item, index) => {
    // @ts-ignore
    formData.languageList[index] = {}
    // @ts-ignore
    formData.languageList[index].languageType = item.value
    // @ts-ignore
    formData.languageList[index].name = item.name
    // @ts-ignore
    formData.languageList[index].mobile = item.mobile
  })
}
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
const handleTypeChange = () => {
  switch(formData.type) {
    case 0:
      formData.linkUrl = ''
        console.log('formData.languageList',formData.languageList)
      break
    case 1:
      formData.languageList.forEach(item => {
        // @ts-ignore
        item.mobile = ''
      })
  }
}
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
  formData.agentId = row.agentId
  formData.userName = row.userName
  formData.type = row.type
  formData.linkUrl = row.linkUrl
  if(row.languageList && row.languageList.length){
    formData.languageList = row.languageList
  }
  formData.workStartTime = row.workStartTime
  formData.workEndTime = row.workEndTime
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if(formData.type === 0) {
    for(let i=0; i<formData.languageList.length; i++) {
      // @ts-ignore
      if(!formData.languageList[i].mobile) {
        // @ts-ignore
        feedback.msgError(`每个语言的联系电话都要填`)
        return
      }
    }
  }
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
  formData.agentId = ''
  formData.userName = ''
  formData.type = 1
  formData.linkUrl = ''
  formData.workStartTime = ''
  formData.workEndTime = ''
  languageDict.value.forEach((item, index) => {
    // @ts-ignore
    formData.languageList[index] = {}
    // @ts-ignore
    formData.languageList[index].languageType = item.value
    // @ts-ignore
    formData.languageList[index].name = item.name
    // @ts-ignore
    formData.languageList[index].mobile = item.mobile
  })
}

</script>
<style scoped lang="scss">
:deep(.el-select){
  width: 100%;
}
</style>
