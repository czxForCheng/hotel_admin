<template>
  <div class="homemenu-lists">
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button type="primary" class="mb-4" v-perms="['banner:add']" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增菜单
        </el-button>
      </div>
      <el-table size="large" v-loading="isLoading" :data="lists">
        <el-table-column label="ID" prop="id" min-width="80" />
        <el-table-column label="图标" min-width="100">
          <template #default="{ row }">
            <image-contain
                v-if="row.bannerUrl"
                :src="row.bannerUrl"
                :width="60"
                :height="45"
                :preview-src-list="[row.bannerUrl]"
                preview-teleported
                fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort" min-width="100" />
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['banner:edit']" type="primary" @click="handleEdit(row)">
              <template #icon>
                <icon name="el-icon-edit" />
              </template>
              编辑
            </el-button>
            <el-button
                v-perms="['banner:remove']"
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
          <el-form-item label="图标" prop="bannerUrl">
            <div>
              <material-picker v-model="formData.bannerUrl" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <div>
              <el-input-number v-model="formData.sort" :max="9999" />
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
<script lang="ts" setup name="banenrLists">
import type { FormInstance } from 'element-plus'
import {bannerListApi, bannerAddApi, bannerRemoveApi, bannerEditApi} from '@/api/banner'
import feedback from '@/utils/feedback'
let formData = reactive({
  id: '',
  bannerUrl: '',
  sort: 0
})

const rules = reactive({
  bannerUrl: [{ required: true, message: '图标必传', trigger: 'blur' }]
})
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isLoading = ref(false)
const lists = ref([])
const getLists = () => {
  isLoading.value = true
  bannerListApi().then(res => {
    lists.value = res
    lists.value.forEach(item => {
      // @ts-ignore
      item.bannerUrl = item.bannerUrl === null ? '' : item.bannerUrl
    })
    isLoading.value = false
  }).catch(err => {
    isLoading.value = false
  })
}
const formRef = shallowRef<FormInstance>()

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.bannerUrl = ''
  formData.sort = 0
}

/* 新增菜单 */
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增轮播'
}

/* 删除菜单 */
const handleDelete = async (id: number) => {
  await feedback.confirm('确定要删除？')
  await bannerRemoveApi({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改轮播'
  formData.id = row.id
  formData.bannerUrl = row.bannerUrl
  formData.sort = row.sort
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await bannerEditApi(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await bannerAddApi(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  dialogVisible.value = false
  handleClose()
}
getLists()
</script>
