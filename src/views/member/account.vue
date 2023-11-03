<template>
  <div>
    <el-card class="!border-none" shadow="never">
      <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
        <el-form-item label="账号">
          <el-input
              class="w-[280px]"
              v-model="queryParams.username"
              placeholder="请输入账号"
              clearable
          />
        </el-form-item>
        <el-form-item label="交易类型">
          <el-select class="w-[280px]" v-model="queryParams.fundType" placeholder="请选择交易类型">
            <el-option
                label="余额充值"
                :value="0"
            />
            <el-option
                label="彩金"
                :value="1"
            />
            <el-option
                label="提现"
                :value="2"
            />
            <el-option
                label="用户注册"
                :value="3"
            />
            <el-option
                label="支付"
                :value="4"
            />
            <el-option
                label="返还"
                :value="5"
            />
            <el-option
                label="佣金"
                :value="6"
            />
          </el-select>
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
      <el-table v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="账号" prop="username" min-width="100" />
        <el-table-column label="订单编号" prop="orderNo" min-width="100" />
        <el-table-column label="金额" prop="changeAmount" min-width="160" />
        <el-table-column label="交易类型" min-width="100" >
          <template #default="{ row }">
            {{ fundType(row.fundType) }}
          </template>
        </el-table-column>
<!--        0 -- 收入 1 -- 支出-->
        <el-table-column label="状态" min-width="100" >
          <template #default="{ row }">
            {{row.status ? '支出' : '收入'}}
          </template>
        </el-table-column>
        <el-table-column label="发生时间" prop="createTime" min-width="180" />
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup name="accountLists">
import type { FormInstance } from 'element-plus'
import { usePaging } from '@/hooks/usePaging'
import {agentManage, proxyAdd, proxyDel, proxyEdit, proxyEditPwd, proxyDisable, userManageBillList} from '@/api/member'
import feedback from "@/utils/feedback";
const route = useRoute()
const queryParams = reactive({
  id: '',
  username: '',
  fundType: '',
  startTime: '',
  endTime: ''
})
let formData = reactive({
  id: '',
  username: '',
  mobile: '',
  inviteCode: '',
  customerServiceLink: '',
  email: '',
  password: ''
})
const id = route.query.id
// queryParams.id = '11'
const rules = reactive({
  username: [{ required: true, message: '用户名称必填', trigger: 'blur' }],
  mobile: [{ required: true, message: '手机号必填', trigger: 'blur' }],
  customerServiceLink: [{ required: true, message: '客服链接必填', trigger: 'blur' }],
  email: [{ required: true, message: '邮箱必填', trigger: 'blur' }],
  password: [{ required: true, message: '密码必填', trigger: 'blur' }]
})
const fundType = computed(() => {
  return (arg: any) => {
    let type = ''
    switch(arg) {
      case 0:
        type = '余额充值'
        break
      case 1:
        type = '彩金'
        break
      case 2:
        type = '提现'
        break
      case 3:
        type = '用户注册'
        break
      case 4:
        type = '支付'
        break
      case 5:
        type = '返还'
        break
      case 6:
        type = '佣金'
        break
    }
    return type
  }
})
const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: userManageBillList,
  params: Object.assign(queryParams, {id: id})
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
  formData.id = row.id
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
  if (formData.id) {
    await proxyEdit(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await proxyAdd(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  handleClose()
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.username = ''
  formData.mobile = ''
  formData.inviteCode = ''
  formData.customerServiceLink = ''
  formData.email = ''
}

const handleBan = async (id: any) => {
  await feedback.confirm('确定要禁用这条数据？')
  await proxyDisable({ id })
  feedback.msgSuccess('禁用成功')
  getLists()
}

</script>
