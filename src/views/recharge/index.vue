<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="任务名称">
          <el-input
              class="w-[280px]"
              v-model="queryParams.taskName"
              placeholder="请输入任务名称"
              clearable
          />
        </el-form-item>
        <el-form-item label="分类">
          <el-select class="w-[280px]" v-model="queryParams.typeId" placeholder="请选择任务分类">
            <el-option
                v-for="(item, key) in productCateAll"
                :key="item.id"
                :label="item.name"
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
        <el-button type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增任务
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="任务名称" prop="taskName" min-width="100" />
        <el-table-column label="店铺名称" prop="shopName" min-width="100" />
        <el-table-column label="价格" prop="productPrice" min-width="100" />
        <el-table-column label="分类id" prop="typeId" min-width="100" />
        <el-table-column label="任务详情" prop="productContent" min-width="100" />
        <el-table-column label="商品图片" min-width="100" >
          <template #default="{ row }">
            <div class="flex items-center">
              <image-contain
                  class="flex-none mr-2"
                  :src="row.productImage"
                  :width="40"
                  :height="40"
                  preview-teleported
                  fit="contain"
              />
              {{ row.nickname }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="添加时间" prop="createTime" min-width="160" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['productCate:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['productCate:delete']" type="primary" @click="handleDelete(row.id)">删除</el-button>
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
          <el-form-item label="任务名称" prop="taskName">
            <el-input
                v-model="formData.taskName"
                placeholder="请输入任务名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="店铺名称" prop="shopName">
            <el-input
                v-model="formData.shopName"
                placeholder="请输入店铺名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="价格" prop="productPrice">
            <el-input v-model="formData.productPrice" placeholder="请输入价格" clearable/>
          </el-form-item>
          <el-form-item label="分类id" prop="typeId">
            <el-select class="w-[280px]" v-model="formData.typeId">
              <el-option
                  v-for="(item, key) in productCateAll"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="任务详情" prop="productContent">
            <el-input type="textarea" v-model="formData.productContent" placeholder="请输入任务详情" clearable/>
          </el-form-item>
          <el-form-item label="商品图片" prop="productImage">
            <div>
              <material-picker v-model="formData.productImage" :limit="1" />
            </div>
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
<script lang="ts" setup name="productLists">
import type { FormInstance } from 'element-plus'
import { usePaging } from '@/hooks/usePaging'
import {getProductList, addProduct, delProduct, editProduct, getProducCateAll} from '@/api/product'
import feedback from "@/utils/feedback";
const queryParams = reactive({
  taskName: '',
  typeId: ''
})
let formData = reactive({
  id: '',
  taskName: '',
  shopName: '',
  productPrice: null,
  typeId: '',
  productContent: '',
  productImage: ''
})
const rules = reactive({
  taskName: [{ required: true, message: '任务名称必填', trigger: 'blur' }],
  shopName: [{ required: true, message: '店铺名称必填', trigger: 'blur' }],
  productPrice: [{ required: true, message: '商品价格必填', trigger: 'blur' }],
  typeId: [{ required: true, message: '分类id必选', trigger: 'blur' }],
  productContent: [{ required: true, message: '商品详情必填', trigger: 'blur' }],
  productImage: [{ required: true, message: '商品图片必传', trigger: 'blur' }]
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: getProductList,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

const productCateAll = ref([])
const getAllProductcate = async () => {
  productCateAll.value = await getProducCateAll()
  console.log('productCateAll.value', productCateAll.value)
}
getAllProductcate()

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
  await delProduct({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改产品分类'
  // formData = row
  formData.id = row.id
  formData.taskName = row.taskName
  formData.shopName = row.shopName
  formData.productPrice = row.productPrice
  formData.typeId = row.typeId
  formData.productContent = row.productContent
  formData.productImage = row.productImage
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await editProduct(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await addProduct(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  dialogVisible.value = false
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.taskName = ''
  formData.shopName = ''
  formData.productPrice = null
  formData.typeId = ''
  formData.productContent = ''
  formData.productImage = ''
}

</script>
