<template>
  <div class="article-lists">
        <el-card class="!border-none" shadow="never">
          <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
            <el-form-item label="键名">
              <el-input
                  class="w-[280px]"
                  v-model="queryParams.name"
                  placeholder="请输入键名"
                  clearable
              />
            </el-form-item>
<!--            <el-form-item label="语言标识">-->
<!--              <el-select class="w-[280px]" placeholder="请选择语言标识" v-model="queryParams.status">-->
<!--                <el-option-->
<!--                    label="中文"-->
<!--                    :value="0"-->
<!--                />-->
<!--                <el-option-->
<!--                    label="英文"-->
<!--                    :value="1"-->
<!--                />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" @click="resetPage">查询</el-button>
              <el-button @click="resetParams">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button v-perms="['languageData:add']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增语言
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="键名" prop="name" min-width="150" />
        <el-table-column label="值" prop="value" min-width="150"></el-table-column>
        <el-table-column label="语言" prop="status" min-width="80">
          <template #default="{ row }">
            {{ getLanguageText(row.status) }}
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="typeId" min-width="80"></el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['languageData:edit']" type="primary" @click="handleEdit(row)">
              <template #icon>
                <icon name="el-icon-edit" />
              </template>
              编辑
            </el-button>
            <el-button
                v-perms="['languageData:del']"
                type="primary"
                @click="handleDelete(row.id)"
            >
              <template #icon>
                <icon name="el-icon-delete" />
              </template>
              删除
            </el-button>
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
          <el-form-item label="键名" prop="name">
            <el-input
                v-model="formData.name"
                placeholder="请输入键名"
                clearable
            />
          </el-form-item>
          <el-form-item label="值" prop="value">
            <el-input
                v-model="formData.value"
                placeholder="请输入值"
                clearable
            />
          </el-form-item>
          <el-form-item label="语言" prop="status">
            <el-select v-model="formData.status">
              <el-option
                  v-for="item in languageDict"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input
                v-model="formData.type"
                placeholder="请输入类型"
                clearable
            />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
                v-model="formData.remark"
                placeholder="请输入备注"
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
<script lang="ts" setup name="articleLists">
import type { FormInstance } from 'element-plus'
import { languageList, languageAdd, languageDel, languageEdit } from '@/api/setting/language'
import { useDictOptions } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'
import { getRoutePath } from '@/router'
import feedback from '@/utils/feedback'
import {MenuEnum} from "@/enums/appEnums";
import {dictDataAll} from "@/api/setting/dict";
const queryParams = reactive({
  name: '',
  status: ''
})
let formData = reactive({
  id: '',
  name: '',
  value: '',
  type: '',
  status: '',
  remark: ''
})
const rules = reactive({
  name: [{ required: true, message: '键名必填', trigger: 'blur' }],
  value: [{ required: true, message: '值必填', trigger: 'blur' }],
  status: [{ required: true, message: '语言类型必选', trigger: 'blur' }],
  type: [{ required: true, message: '类型必填', trigger: 'blur' }],
  remark: [{ required: true, message: '备注必填', trigger: 'blur' }]
})
const dialogVisible = ref(false)
const dialogTitle = ref('')
const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: languageList,
  params: queryParams
})
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
      return item.value == type
    })
    // @ts-ignore
    return itemInfo && itemInfo.name
  }
})
onActivated(() => {
  getLists()
})

getLists()
const formRef = shallowRef<FormInstance>()

/* 新增菜单 */
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增语言'
}

/* 删除菜单 */
const handleDelete = async (id: number) => {
  await feedback.confirm('确定要删除？')
  await languageDel({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改语言'
  // formData = row
  for(let key in formData) {
    //@ts-ignore
    formData[key] = row[key]
  }
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await languageEdit(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await languageAdd(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  dialogVisible.value = false

}

const handleClose = () => {
  dialogVisible.value = false
  for(let key in formData) {
    //@ts-ignore
    formData[key] = ''
  }
}
</script>
<style scoped>
:deep(.el-select){
  width: 100%;
}
</style>
