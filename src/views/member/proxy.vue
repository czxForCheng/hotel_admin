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
        <el-form-item label="手机号">
          <el-input
              class="w-[280px]"
              v-model.trim="queryParams.mobile"
              placeholder="请输入手机号"
              clearable
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
        <el-button v-perms="['agentManage:add']" type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增代理
        </el-button>
      </div>
      <el-table v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
<!--        <el-table-column label="绑定用户ID" prop="parentId" min-width="100" />-->
        <el-table-column label="级别" prop="agentLevel" min-width="100" >
          <template #default="{ row }">
            {{row.agentLevel === 1 ? '一级代理' : '二级代理'}}
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" min-width="100" />
        <el-table-column label="手机号" prop="mobile" min-width="160" />
        <el-table-column label="邀请码" prop="inviteCode" min-width="100" />
<!--        <el-table-column label="登录次数" prop="" min-width="100" />-->
        <el-table-column label="使用状态" prop="isDisable" min-width="100" >
          <template #default="{ row }">
            {{row.isDisable ? '禁用' : '正常'}}
          </template>
        </el-table-column>
        <el-table-column label="客服链接" prop="customerServiceLink" min-width="160" />
<!--        <el-table-column label="上级代理" prop="parentAgent" min-width="160" />-->
        <el-table-column label="添加时间" prop="createTimeStr" min-width="180" />
        <el-table-column label="操作" width="320" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['agentManage:editPwd']" type="primary" @click="handlePassword(row.id)">密码</el-button>
            <el-button v-perms="['agentManage:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['agentManage:disable']" type="primary" @click="handleBan(row)">{{row.isDisable ? '启用' : '禁用'}}</el-button>
            <el-dropdown>
              <span class="el-dropdown-link" style="margin-left: 10px;">
                更多操作
               <icon name="el-icon-arrow-down" :size="18"/>
              </span>
              <template #dropdown>
                <div style="padding: 5px 20px;">
                  <el-dropdown-menu>
                    <el-button type="text" @click="handleWhite(row)">ip白名单设置</el-button>
                    <el-button v-perms="['agentManage:transferMember']" v-if="row.agentLevel === 2" type="text" @click="moveMembership(row)">转移会员</el-button>
                    <el-button type="text" @click="handleGlooge(row)" v-if="row.googleEnable === '1'">关闭谷歌验证码</el-button>
<!--                    <el-button type="primary" @click="handleGlooge(row)">{{row.googleEnable === '0' ? '开启' : '关闭'}}谷歌验证码</el-button>-->
                  </el-dropdown-menu>
                </div>
              </template>
            </el-dropdown>
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
          <el-form-item label="代理" prop="parentId">
            <el-select class="w-[280px]" @change="handleProxyChange" v-model="formData.parentId" placeholder="请选择代理">
              <el-option
                  v-for="(item, key) in memberProxyAll"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input
                v-model="formData.username"
                placeholder="请输入用户名"
                clearable
            />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机号" clearable/>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="dialogTitle === '新增代理'">
            <el-input v-model="formData.password" placeholder="请输入密码" clearable/>
          </el-form-item>
          <el-form-item label="客服链接" prop="customerServiceLink">
            <el-input v-model="formData.customerServiceLink" placeholder="请输入客服链接" clearable/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" clearable/>
          </el-form-item>
          <el-form-item label="邀请码" prop="inviteCode" v-if="formData.id">
            <el-input v-model="formData.inviteCode" placeholder="请输入邀请码" clearable/>
          </el-form-item>
          <el-form-item label="多处登录">
            <div>
              <el-switch
                  v-model="formData.isMultipoint"
                  :active-value="1"
                  :inactive-value="0"
              />
              <div class="form-tips">允许多人同时在线登录</div>
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
    <div>
      <el-dialog
          v-model="dialogPasswordVisible"
          title="修改密码"
          width="50%"
          :before-close="handlePasswordClose"
      >
        <el-form ref="formRefPassword"
                 class="ls-form"
                 :model="formDataPassword"
                 label-width="85px"
                 :rules="rulesPassword">
          <el-form-item label="新密码" prop="password">
            <el-input
                v-model="formDataPassword.password"
                placeholder="请输入新密码"
                clearable
            />
          </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="handlePasswordClose">取消</el-button>
              <el-button type="primary" @click="handlePasswordSubmit">确认</el-button>
      </span>
        </template>
        </el-dialog>
      <el-dialog
          v-model="transferMembership"
          title="会员转移"
          width="600px"
          :before-close="MembershipClose"
      >
        <div v-loading="loadingMember"  element-loading-text="数据转换中...">
          <div class="title">
            <!--          <el-descriptions >-->
            <!--            <el-descriptions-item label="当前会员为">{{ formMembership.username }} </el-descriptions-item>-->
            <!--            <el-descriptions-item label="转移到">{{moveShip.username}}</el-descriptions-item>-->
            <!--          </el-descriptions>-->
            请选择需要转移到的代理
          </div>
          <el-select

              v-model="moveShip.newAgentId"
              placeholder="请选择需要转移到的代理"
              size="large"
              style="width: 360px"
          >
            <el-option
                v-for="item in memberList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
            />
          </el-select>
        </div>

        <template #footer>
            <span class="dialog-footer">
              <el-button @click="MembershipClose">取消</el-button>
              <el-button type="primary" @click="MembershipSubmit">确认</el-button>
      </span>
        </template>
      </el-dialog>
  </div>
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
          <el-form-item label="ip白名单开关" label-width="120">
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
<script lang="ts" setup name="proxyLists">
import type { FormInstance } from 'element-plus'
import { usePaging } from '@/hooks/usePaging'
import {
  agentManage,
  proxyAdd,
  getProxyList,
  proxyEdit,
  proxyEditPwd,
  proxyDisable,
  googleReset,
  allSecondAgentList, transferMember
} from '@/api/member'
import feedback from "@/utils/feedback";
import {getRoutePath} from "@/router";
const queryParams = reactive({
  username: '',
  mobile: ''
})
let formData = reactive({
  id: '',
  username: '',
  mobile: '',
  inviteCode: '',
  customerServiceLink: '',
  email: '',
  password: '',
  whiteIp: '',
  isWhite: '',
  googleEnable: '',
  parentId: '',
  parentName: '',
  isMultipoint: 1
})

const transferMembership=ref(false)

const rules = reactive({
  username: [{ required: true, message: '用户名称必填', trigger: 'blur' }],
  mobile: [{ required: true, message: '手机号必填', trigger: 'blur' }],
  customerServiceLink: [{ required: true, message: '客服链接必填', trigger: 'blur' }],
  email: [{ required: true, message: '邮箱必填', trigger: 'blur' }],
  password: [{ required: true, message: '密码必填', trigger: 'blur' }]
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: agentManage,
  params: queryParams
})
onActivated(() => {
  getLists()
})

getLists()

const formMembership=ref({})
const memberList=ref([])
const moveShip=ref({newAgentId:null,agentId:null})
const loadingMember=ref(false)
// 会员转移
const MembershipClose=()=>{
  transferMembership.value=false
  moveShip.value.agentId=null
  moveShip.value.newAgentId=null
  loadingMember.value=false
}

const moveMembership=(item:any)=>{
  transferMembership.value=true
  formMembership.value=item
  moveShip.value.agentId=item.id
  allSecondAgentList().then(res=>{memberList.value = res ? res :[]}).catch(err=>{
    MembershipClose()
  })
}

// 确定设置
const MembershipSubmit= async ()=>{
  loadingMember.value=true
  await transferMember(moveShip.value)
  feedback.msgSuccess('会员转移成功')
  MembershipClose()
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
// 获取所有代理
const memberProxyAll = ref([])
const getMemberProxyAll = async () => {
  memberProxyAll.value = await getProxyList()
}
getMemberProxyAll()
const handleProxyChange = () => {
  const info:any = memberProxyAll.value.filter(item => {
    return item['id'] === formData.parentId
  })
  formData.parentName = info[0].username
}
// // 删除
// const handleDelete = async (id: number) => {
//   await feedback.confirm('确定要删除这条数据？')
//   await proxyDel({ id })
//   feedback.msgSuccess('删除成功')
//   getLists()
// }
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
const handlePasswordSubmit = async () => {
  await formRefPassword.value?.validate()
  await proxyEditPwd(formDataPassword)
  feedback.msgSuccess('修改密码成功')
  getLists()
  handlePasswordClose()
}
const handlePasswordClose = () => {
  dialogPasswordVisible.value = false
  formDataPassword.password = ''
}

/* 修改 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改代理信息'
  // formData = row
  formData.id = row.id
  formData.parentId = row.parentId
  formData.username = row.username
  formData.mobile = row.mobile
  formData.inviteCode = row.inviteCode
  formData.customerServiceLink = row.customerServiceLink
  formData.email = row.email
  formData.isMultipoint = row.isMultipoint
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
  formData.parentId = ''
  formData.parentName = ''
  formData.isMultipoint = 1
}

const handleBan = async (row: any) => {
  const tipText = row.isDisable ? '启用' : '禁用'
  await feedback.confirm( `确定要${tipText}这条数据？`)
  await proxyDisable({ id: row.id })
  feedback.msgSuccess(`${tipText}成功`)
  getLists()
}

const dialogWhiteVisible = ref(false)
const handleWhite = (row: any) => {
  dialogWhiteVisible.value = true
  formData.id = row.id
  formData.whiteIp = row.whiteIp
  formData.isWhite = row.isWhite
}
const handleWhiteClose = () => {
  dialogWhiteVisible.value = false
  formData.id = ''
  formData.whiteIp = ''
  formData.isWhite = ''
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
  await feedback.confirm( `确定要关闭他的谷歌验证码？`)
  await proxyEdit({
    id: row.id,
    googleEnable: '0',
  })
  feedback.msgSuccess(`关闭成功`)
  getLists()
  // dialogGoogleVisible.value = true
  // formDataGoogle.id = row.id
  // formDataGoogle.googleCode = row.googleCode
  // formDataGoogle.googleEnable = row.googleEnable
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
<style scoped lang="scss">
.title{
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
<style scoped>
:deep(.el-select){
  width: 100%;
}
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
