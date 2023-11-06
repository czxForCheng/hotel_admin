<template>
    <div class="admin">
        <el-card class="!border-none" shadow="never">
            <el-form class="mb-[-16px]" :model="formData" inline>
                <el-form-item label="管理员账号">
                    <el-input
                        v-model="formData.username"
                        class="w-[280px]"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="管理员名称">
                    <el-input
                        v-model="formData.nickname"
                        class="w-[280px]"
                        clearable
                        @keyup.enter="resetPage"
                    />
                </el-form-item>
                <el-form-item label="管理员角色">
                    <el-select class="w-[280px]" v-model="formData.role">
                        <el-option label="全部" value="" />
                        <el-option
                            v-for="(item, index) in optionsData.role"
                            :key="index"
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
        <el-card v-loading="pager.loading" class="mt-4 !border-none" shadow="never">
            <el-button v-perms="['system:admin:add']" type="primary" @click="handleAdd">
                <template #icon>
                    <icon name="el-icon-Plus" />
                </template>
                新增
            </el-button>
            <div class="mt-4">
                <el-table :data="pager.lists" size="large">
                    <el-table-column label="ID" prop="id" min-width="60" />
                    <el-table-column label="头像" min-width="100">
                        <template #default="{ row }">
                            <el-avatar :size="50" :src="row.avatar"></el-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column label="账号" prop="username" min-width="100" />
                    <el-table-column label="名称" prop="nickname" min-width="100" />
                    <el-table-column
                        label="角色"
                        prop="role"
                        show-tooltip-when-overflow
                        min-width="100"
                    />
                    <el-table-column
                        label="部门"
                        prop="dept"
                        show-tooltip-when-overflow
                        min-width="100"
                    />
                    <el-table-column label="创建时间" prop="createTime" min-width="180" />
                    <el-table-column label="最近登录时间" prop="lastLoginTime" min-width="180" />
                    <el-table-column label="最近登录IP" prop="lastLoginIp" min-width="120" />
                    <el-table-column label="状态" min-width="100">
                        <template #default="{ row }">
                            <el-switch
                                v-perms="['system:admin:disable']"
                                v-if="row.id != 1"
                                :model-value="row.isDisable"
                                :active-value="0"
                                :inactive-value="1"
                                @change="changeStatus($event, row.id)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="240" fixed="right">
                        <template #default="{ row }">
                            <el-button
                                v-perms="['system:admin:edit']"
                                type="primary"
                                link
                                @click="handleEdit(row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                v-if="row.id != 1"
                                v-perms="['system:admin:del']"
                                type="danger"
                                link
                                @click="handleDelete(row.id)"
                            >
                                删除
                            </el-button>
                          <el-dropdown>
              <span class="el-dropdown-link" style="margin-left: 10px;">
                更多操作
               <icon name="el-icon-arrow-down" :size="18"/>
              </span>
                            <template #dropdown>
                              <div style="padding: 5px 20px;">
                                <el-dropdown-menu>
                                  <el-button type="primary" @click="handleWhite(row)">ip白名单设置</el-button>
                                  <el-button type="primary" @click="handleGlooge(row)">{{row.googleEnable === '0' ? '开启' : '关闭'}}谷歌验证码</el-button>
                                </el-dropdown-menu>
                              </div>
                            </template>
                          </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex mt-4 justify-end">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
        <edit-popup v-if="showEdit" ref="editRef" @success="getLists" @close="showEdit = false" />
      <div>
        <el-dialog
            v-model="dialogWhiteVisible"
            title="修改ip白名单"
            width="50%"
        >
          <el-form ref="formRefWhite"
                   class="ls-form"
                   :model="formData"
                   label-width="85px">
            <el-form-item label="ip白名单" prop="whiteIp">
              <el-input
                  type="textarea"
                  :rows="5"
                  v-model="formData.whiteIp"
                  placeholder="请输入登录白名单(不填默认全部ip,以英文逗号隔开，例：127.0.0.1,192.168.2.*,)"
                  clearable
              />
            </el-form-item>
            <el-form-item label="白名单开关" label-width="120">
              <el-switch
                  v-model="formData.isWhite"
                  active-color="#409EFF"
                  active-value="1"
                  inactive-color="#DCDFE6"
                  inactive-value="0"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleWhiteClose">取消</el-button>
              <el-button type="primary" @click="handleWhiteSubmit">确认</el-button>
      </span>
          </template>
        </el-dialog>
      </div>
      <div>
        <el-dialog
            v-model="dialogGoogleVisible"
            title="谷歌验证码信息"
            width="50%"
        >
          <el-form ref="formRefGoogle"
                   class="ls-form"
                   :model="formDataGoogle"
                   label-width="85px">
            <el-form-item label="谷歌验证码" prop="password">
              <el-input
                  v-model="formDataGoogle.googleCode"
                  placeholder="请输入谷歌验证码"
                  clearable
                  disabled
              />
              <el-button type="primary" @click="handleResetGoogle">重置谷歌验证码</el-button>
            </el-form-item>
            <el-form-item label="谷歌验证码开关" label-width="120">
              <el-switch
                  v-model="formDataGoogle.googleEnable"
                  active-color="#409EFF"
                  active-value="1"
                  inactive-color="#DCDFE6"
                  inactive-value="0"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleGoogleClose">取消</el-button>
              <el-button type="primary" @click="handleGoogleSubmit">确认</el-button>
      </span>
          </template>
        </el-dialog>
      </div>
    </div>
</template>

<script lang="ts" setup name="admin">
import { adminLists, adminDelete, adminStatus } from '@/api/perms/admin'
import { roleAll } from '@/api/perms/role'
import { useDictOptions } from '@/hooks/useDictOptions'
import { usePaging } from '@/hooks/usePaging'
import feedback from '@/utils/feedback'
import EditPopup from './edit.vue'
import {googleReset, proxyEdit} from "@/api/member";
const editRef = shallowRef<InstanceType<typeof EditPopup>>()
// 表单数据
const formData = reactive({
    username: '',
    nickname: '',
    role: '',
    id: '',
    whiteIp: '',
    isWhite: ''
})
const showEdit = ref(false)
const { pager, getLists, resetParams, resetPage } = usePaging({
    fetchFun: adminLists,
    params: formData
})

const changeStatus = async (active: any, id: number) => {
    try {
        await feedback.confirm(`确定${active ? '停用' : '开启'}当前管理员？`)
        await adminStatus({ id })
        feedback.msgSuccess('修改成功')
        getLists()
    } catch (error) {
        getLists()
    }
}
const handleAdd = async () => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('add')
}

const handleEdit = async (data: any) => {
    showEdit.value = true
    await nextTick()
    editRef.value?.open('edit')
    editRef.value?.setFormData(data)
}

const handleDelete = async (id: number) => {
    await feedback.confirm('确定要删除？')
    await adminDelete({ id })
    feedback.msgSuccess('删除成功')
    getLists()
}

const { optionsData } = useDictOptions<{
    role: any[]
}>({
    role: {
        api: roleAll
    }
})

onMounted(() => {
    getLists()
})
const dialogWhiteVisible = ref(false)
const handleWhite = (row: any) => {
  dialogWhiteVisible.value = true
  formData.id = row.id
  formData.whiteIp = row.whiteIp
}
const handleWhiteClose = () => {
  dialogWhiteVisible.value = false
  formData.id = ''
  formData.whiteIp = ''
}
const handleWhiteSubmit = async () => {
  await proxyEdit({
    id: formData.id,
    whiteIp: formData.whiteIp,
    isWhite: formData.isWhite
  })
  feedback.msgSuccess(`修改白名单成功`)
  handleWhiteClose()
  getLists()
}

const dialogGoogleVisible = ref(false)
const formDataGoogle = reactive({
  id: '',
  googleCode: '',
  googleEnable: ''
})

const handleGlooge = async (row: any) => {
  dialogGoogleVisible.value = true
  formDataGoogle.id = row.id
  formDataGoogle.googleCode = row.googleCode
  formDataGoogle.googleEnable = row.googleEnable
}
const handleGoogleClose = () => {
  dialogGoogleVisible.value = false
  formDataGoogle.id = ''
  formDataGoogle.googleCode = ''
  formDataGoogle.googleEnable = ''
}
const handleGoogleSubmit = async () => {
  const tipText = formDataGoogle.googleEnable === '0' ? '关闭' : '开启'
  await proxyEdit({
    id: formDataGoogle.id,
    googleEnable: formDataGoogle.googleEnable,
  })
  feedback.msgSuccess(`${tipText}谷歌验证码成功`)
  handleGoogleClose()
  getLists()
}
const handleResetGoogle = async () => {
  const res = await googleReset({
    id: formDataGoogle.id
  })
  console.log('res', res)
  formDataGoogle.googleCode = res
  feedback.msgSuccess(`重置谷歌验证码成功`)
  getLists()
  handleGoogleClose()
}
</script>
<style scoped>
:deep(.el-form-item__content) {
  flex-wrap: nowrap !important;
}
:deep(.el-form-item__content .el-button) {
  margin-left: 10px !important;
}
:deep(.el-dropdown-link .el-icon){
  top: 3px;
}
</style>