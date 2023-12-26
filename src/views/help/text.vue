<template>
  <div>
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button v-perms="['help:home:create']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增文本
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="标题" prop="title" min-width="100" />
        <el-table-column label="类型" prop="type" min-width="100" >
          <template #default="{ row }">
            {{row.type === 0 ? '公告' : '首页文本'}}
          </template>
        </el-table-column>
        <el-table-column label="语言" prop="languageType" min-width="120" >
          <template #default="{ row }">
            {{getLanguageText(row.languageType)}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" min-width="120" >
          <template #default="{ row }">
            {{row.status === 0 ? '开启' : (row.status === 1 ? '关闭' : '')}}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime" min-width="150" />
        <el-table-column label="最后编辑" prop="updateName" min-width="100" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['help:home:update']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['help:home:del']" type="primary" @click="handleDelete(row.id)">删除</el-button>
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
          <el-form-item label="语言类型" prop="languageType" v-if="formData.type === null">
            <el-select v-model="formData.languageType">
              <el-option
                  v-for="item in languageDict"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="文本标题" prop="title">
            <el-input
                v-model="formData.title"
                placeholder="请输入文本标题"
                clearable
            />
          </el-form-item>
          <el-form-item label="公告状态" prop="status" v-if="formData.type === 0">
            <el-switch
                v-model="formData.status"
                :active-value="0"
                :inactive-value="1"
            />
          </el-form-item>
          <el-form-item label="文本内容" prop="content">
            <editor class="mb-10" v-model="formData.content" height="500"></editor>
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
<script lang="ts" setup name="textLists">
import type { FormInstance } from 'element-plus'
import {getHomePage, homeUpdate, homeAdd, homeDelete} from '@/api/help'
import { useDictOptions } from '@/hooks/useDictOptions'
import feedback from "@/utils/feedback";
import {dictDataAll} from "@/api/setting/dict";
import {usePaging} from "@/hooks/usePaging";
import {countAgent} from "@/api/app";
import {withdrawalDelete} from "@/api/finance/withdraw";
const queryParams = reactive({})
let formData = reactive({
  id: '',
  languageType: null,
  title: '',
  type: null,
  status: null,
  content: ''
})
const rules = reactive({
  languageType: [{ required: true, message: '语言类型必选', trigger: 'blur' }],
  title: [{ required: true, message: '文本标题必填', trigger: 'blur' }],
  content: [{ required: true, message: '文本内容必填', trigger: 'blur' }]
})
const isLoading = ref(true)
const homePage = ref([])
// const getHomeData = async () => {
//   const res = await getHomePage()
//   homePage.value = res.list
//   isLoading.value = false
// }
// getHomeData()
const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: getHomePage,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()
const languageDict = ref([])
const getLanguageDict = async () => {
  languageDict.value = await dictDataAll({ dictType: 'yuyan' })
  console.log(languageDict)
}
getLanguageDict()
const getLanguageText = computed(() => {
  return (type: any) => {
    const itemInfo = languageDict.value.find(item => {
      // @ts-ignore
      return item.value === type
    })
    // @ts-ignore
    return itemInfo && itemInfo.name
  }
})
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增首页文本'
}
/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改首页文本'
  // formData = row
  formData.id = row.id
  formData.languageType = row.languageType
  formData.title = row.title
  formData.content = row.content
  formData.type = row.type
  formData.status = row.status
  dialogVisible.value = true
}
const handleDelete = async (id:number) => {
  await feedback.confirm('确定要删除这条数据？')
  await homeDelete(id)
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await homeUpdate(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await homeAdd(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.title = ''
  formData.languageType = null
  formData.content = ''
  formData.status = null
  formData.type = null
}
</script>
<style scoped>
:deep(.el-select){
  width: 100%;
}
</style>
