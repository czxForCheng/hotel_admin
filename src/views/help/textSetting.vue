<template>
  <div>
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button v-perms="['textConfig:add']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增配置
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="类型" prop="type" min-width="100" >
          <template #default="{ row }">
            {{settingType(row.state)}}
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" min-width="100" />
        <el-table-column label="内容" prop="content" min-width="120" show-overflow-tooltip >
          <template #default="{ row }">
            <image-contain
                v-if="row.state === 2"
                :src="row.content"
                :width="60"
                :height="45"
                :preview-src-list="[row.content]"
                preview-teleported
                fit="contain"
            />
            <p v-else>{{row.content}}</p>
          </template>
        </el-table-column>
        <el-table-column label="语言" prop="languageType" min-width="120" >
          <template #default="{ row }">
            {{getLanguageText(row.languageType)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['textConfig:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['textConfig:del']" type="primary" @click="handleDelete(row.id)">删除</el-button>
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
          <el-form-item label="语言类型" prop="languageType">
            <el-select v-model="formData.languageType">
              <el-option
                  v-for="item in languageDict"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="类型" prop="state">
            <el-radio-group
                class="flex-col !items-start"
                v-model="formData.state"
                @change="formData.content = ''"
            >
              <div style="display: flex;align-items: center;">
                <el-radio :label="0">
                  首页图文
                </el-radio>
                <el-radio :label="1">
                  任务图文
                </el-radio>
                <el-radio :label="2">
                  logo图片
                </el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文本标题" prop="title">
            <el-input
                v-model="formData.title"
                placeholder="请输入文本标题"
                clearable
            />
          </el-form-item>
          <el-form-item label="logo图片" v-if="formData.state === 2">
            <div>
              <material-picker v-model="formData.content" exclude-domain />
<!--              <div class="form-tips">建议图片尺寸：200*200像素；图片格式：jpg、png、jpeg</div>-->
            </div>
          </el-form-item>

          <el-form-item label="文本内容" prop="content" v-if="formData.state !== 2">
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
import {getTextConfigPage, textConfigUpdate, textConfigAdd, textConfigDelete} from '@/api/help'
import feedback from "@/utils/feedback";
import {dictDataAll} from "@/api/setting/dict";
import {usePaging} from "@/hooks/usePaging";
const queryParams = reactive({})
let formData = reactive({
  id: '',
  languageType: null,
  title: '',
  state: 0,
  content: ''
})
const rules = reactive({
  languageType: [{ required: true, message: '语言类型必选', trigger: 'blur' }],
  state: [{ required: true, message: '配置类型必选', trigger: 'blur' }],
  title: [{ required: true, message: '文本标题必填', trigger: 'blur' }],
  content: [{ required: true, message: '文本内容必填', trigger: 'blur' }]
})
const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: getTextConfigPage,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()
const languageDict = ref([])
const getLanguageDict = async () => {
  languageDict.value = await dictDataAll({ dictType: 'yuyan' })
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
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增文本配置'
}
/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改文本配置'
  // formData = row
  formData.id = row.id
  formData.languageType = row.languageType
  formData.title = row.title
  formData.content = row.content
  formData.state = row.state
  dialogVisible.value = true
}
const handleDelete = async (id:number) => {
  await feedback.confirm('确定要删除这条数据？')
  await textConfigDelete({id})
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await textConfigUpdate(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await textConfigAdd(formData)
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
  formData.state = 0
}
const settingType = computed(() => {
  return (type: any) => {
    switch(type) {
      case 0:
        return '首页图文'
      case 1:
        return '任务图文'
      case 2:
        return 'logo图片'
    }
  }
})
</script>
<style scoped>
:deep(.el-select){
  width: 100%;
}
</style>
