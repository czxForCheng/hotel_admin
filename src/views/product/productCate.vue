<template>
  <div>
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button v-perms="['productType:add']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增分类
        </el-button>
      </div>
      <el-table v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="分类ID" prop="id" min-width="60" />
        <el-table-column label="分类名称" prop="name" min-width="100" />
        <el-table-column label="比例" prop="proportion" min-width="100" />
        <el-table-column label="简介" prop="introduction" min-width="100" />
        <el-table-column label="添加时间" prop="addTime" min-width="160" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['productType:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['productType:del']" type="primary" @click="handleDelete(row.id)">删除</el-button>
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
          <el-form-item label="分类名称" prop="name">
            <el-input
                v-model="formData.name"
                placeholder="请输入分类名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="比例" prop="proportion">
            <el-input
                v-model="formData.proportion"
                placeholder="请输入比例"
                clearable
            />
          </el-form-item>
          <el-form-item label="简介" prop="introduction">
            <el-input v-model="formData.introduction" placeholder="请输入简介" clearable/>
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
<script lang="ts" setup name="productCateLists">
import type { FormInstance } from 'element-plus'
import { usePaging } from '@/hooks/usePaging'
import {getProducCateList, addProductCate, delProductCate, editProductCate} from '@/api/product'
import feedback from "@/utils/feedback";
const queryParams = reactive({})
let formData = reactive({
  id: '',
  name: '',
  proportion: '',
  introduction: ''
})
const rules = reactive({
  name: [{ required: true, message: '产品名称必填', trigger: 'blur' }],
  proportion: [{ required: true, message: '比例必填', trigger: 'blur' }],
  introduction: [{ required: true, message: '简介必填', trigger: 'blur' }]
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: getProducCateList,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
// 新增产品分类
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增产品分类'
}
// 删除
const handleDelete = async (id: number) => {
  await feedback.confirm('确定要删除这条数据？')
  await delProductCate({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改菜单'
  // formData = row
  formData.id = row.id
  formData.name = row.name
  formData.proportion = row.proportion
  formData.introduction = row.introduction
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await editProductCate(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await addProductCate(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.name = ''
  formData.proportion = ''
  formData.introduction = ''
}

</script>
