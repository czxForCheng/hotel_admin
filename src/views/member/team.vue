<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="用户名称">
          <el-input
              class="w-[280px]"
              v-model.trim="queryParams.username"
              placeholder="请输入用户名称"
              clearable
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
              class="w-[280px]"
              v-model.trim="queryParams.mobile"
              placeholder="请输入手机号码"
              clearable
          />
        </el-form-item>
        <el-form-item label="发生时间">
          <daterange-picker
              v-model:startTime="queryParams.startTime"
              v-model:endTime="queryParams.endTime"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
          <el-button @click="resetParams">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button type="primary" class="mb-4" @click="banDisable" v-if="isDisable == 0">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          封禁团队
        </el-button>
        <el-button type="primary" class="mb-4" @click="banUndisable" v-if="isDisable == 1">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          启用团队
        </el-button>
      </div>
      <el-table v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="账号" prop="username" min-width="100" />
        <el-table-column label="手机号" prop="mobile" min-width="120" />
        <el-table-column label="余额" prop="balanceMoney" min-width="100" />
        <el-table-column label="金额" prop="commissionMoney" min-width="160" />
        <el-table-column label="推荐佣金" prop="referralCommission" min-width="160" />
        <el-table-column label="充值" prop="topUp" min-width="160" />
        <el-table-column label="提现" prop="withdraw" min-width="160" />
        <el-table-column label="级别" prop="userLevelName" min-width="160" />
        <el-table-column label="上级用户" prop="parentName" min-width="180" />
        <el-table-column label="注册时间" prop="createTime" min-width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary">
              <router-link
                  :to="{
                      path: getRoutePath('member:account'),
                      query: {
                          id
                      }
                  }"
              >
                账变
              </router-link>
            </el-button>
            <el-button type="primary" @click="banOne(row)">{{row.isDisable ? '启用' : '封禁'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup name="teamLists">
import type { FormInstance } from 'element-plus'
import { usePaging } from '@/hooks/usePaging'
import { proxyDel, proxyEditPwd, userManageTeamList, disableTeam, unDisableTeam, disable} from '@/api/member'
import feedback from "@/utils/feedback";
import {getRoutePath} from "@/router";
const route = useRoute()
const queryParams = reactive({
  id: '',
  username: '',
  mobile: '',
  startTime: '',
  endTime: ''
})
let formData = reactive({
  username: '',
  mobile: '',
  inviteCode: '',
  customerServiceLink: '',
  email: '',
  password: ''
})
const id = route.query.id
const isDisable: any = ref('')
isDisable.value = route.query.isDisable
const rules = reactive({
  username: [{ required: true, message: '用户名称必填', trigger: 'blur' }],
  mobile: [{ required: true, message: '手机号必填', trigger: 'blur' }],
  customerServiceLink: [{ required: true, message: '客服链接必填', trigger: 'blur' }],
  email: [{ required: true, message: '邮箱必填', trigger: 'blur' }],
  password: [{ required: true, message: '密码必填', trigger: 'blur' }]
})
const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: userManageTeamList,
  params: Object.assign(queryParams, {id: id})
})
onActivated(() => {
  getLists()
})

getLists()

/* 封禁团队 */
const banDisable = async () => {
  await feedback.confirm(`确定要封禁团队？`)
  await disableTeam({ id })
  feedback.msgSuccess( `封禁成功成功`)
  isDisable.value = 1
  getLists()
}
/* 启用团队 */
const banUndisable = async () => {
  await feedback.confirm(`确定要启用团队？`)
  await unDisableTeam({ id })
  feedback.msgSuccess( `启用成功`)
  isDisable.value = 0
  getLists()
}


/* 启用/封禁 */
const banOne = async (row: any) => {
  const tipText = row.isDisable ? '启用' : '封禁'
  await feedback.confirm(`确定要${tipText}这条数据？`)
  await disable({ id })
  feedback.msgSuccess( `${tipText}成功`)
  getLists()
}

const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
// 新增产品分类
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增代理'
}
// 删除
const handleDelete = async (id: number) => {
  await feedback.confirm('确定要删除这条数据？')
  await proxyDel({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}
const formRefPassword = shallowRef<FormInstance>()
const dialogPasswordVisible = ref(false)
let formDataPassword = reactive({
  id: '',
  password: ''
})
const rulesPassword = reactive({
  password: [{ required: true, message: '新密码必填', trigger: 'blur' }]
})
const handlePassword = (id: any) => {
  dialogPasswordVisible.value = true
  formDataPassword.id = id
}
const handlePasswordClose = () => {
  dialogPasswordVisible.value = false
  formDataPassword.password = ''
}
const handlePasswordSubmit = async () => {
  await formRefPassword.value?.validate()
  await proxyEditPwd(formDataPassword)
  feedback.msgSuccess('修改密码成功')
  getLists()
  handlePasswordClose()
}
/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改代理信息'
  console.log('row', row)
  // formData = row
  formData.username = row.username
  formData.mobile = row.mobile
  formData.inviteCode = row.inviteCode
  formData.customerServiceLink = row.customerServiceLink
  formData.email = row.email
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()

  getLists()
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  formData.username = ''
  formData.mobile = ''
  formData.inviteCode = ''
  formData.customerServiceLink = ''
  formData.email = ''
}


</script>
