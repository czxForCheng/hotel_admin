<template>
  <div>
    <el-card class="!border-none mt-4" shadow="never">
      <el-table size="large" v-loading="isLoading" :data="homePage">
        <el-table-column label="ID" prop="id" min-width="120" />
        <el-table-column label="标题" prop="title" min-width="100" />
        <el-table-column label="更新时间" prop="updateTime" min-width="120" />
        <el-table-column label="最后编辑" prop="updateName" min-width="100" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['text:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
          <el-form-item label="文本标题" prop="title">
            <el-input
                v-model="formData.title"
                placeholder="请输入文本标题"
                clearable
            />
          </el-form-item>
          <el-form-item label="文本内容" prop="content">
            <el-input
                type="textarea"
                v-model="formData.content"
                placeholder="请输入文本内容"
                :rows="10"
                clearable
            />
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts" setup name="textLists">
import type { FormInstance } from 'element-plus'
import {getHomePage, homeUpdate} from '@/api/help'
import feedback from "@/utils/feedback";
const queryParams = reactive({})
let formData = reactive({
  id: '',
  title: '',
  content: ''
})
const rules = reactive({
  title: [{ required: true, message: '文本标题必填', trigger: 'blur' }],
  content: [{ required: true, message: '文本内容必填', trigger: 'blur' }]
})
const isLoading = ref(true)
const homePage = ref([])
const getHomeData = async () => {
  const res = await getHomePage()
  homePage.value = res.list
  isLoading.value = false
}
getHomeData()

const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改首页文本'
  // formData = row
  formData.id = row.id
  formData.title = row.title
  formData.content = row.content
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  await homeUpdate(formData)
  feedback.msgSuccess('修改成功')
  getHomeData()
  dialogVisible.value = false
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.title = ''
  formData.content = ''
}
</script>
