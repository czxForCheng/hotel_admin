<template>
    <div>
        <el-card class="!border-none mt-4" shadow="never">
          <div>
            <el-button type="primary" class="mb-4" @click="handleAdd">
              <template #icon>
                <icon name="el-icon-Plus" />
              </template>
              新增会员
            </el-button>
          </div>
            <el-table max-height="650px" size="large" v-loading="pager.loading" :data="pager.lists">
                <el-table-column label="UID" prop="id" min-width="60" />
                <el-table-column label="注册时间" prop="createTime" min-width="180" />
                <el-table-column label="一级代理" prop="parentAgentName" min-width="100" />
                <el-table-column label="二级代理" prop="secondAgentName" min-width="120" />
                <el-table-column label="账号" prop="username" min-width="120" />
                <el-table-column label="用户昵称" prop="nickname" min-width="100" />
                <el-table-column label="手机号码" prop="mobile" min-width="100" />
                <el-table-column label="会员等级" prop="userLevelName" min-width="100" />
                <el-table-column label="信誉分" prop="creditScore" min-width="100" />
                <el-table-column label="已完成订单总数" prop="mobile" min-width="100" />
                <el-table-column label="全部订单总数" prop="username" min-width="120" />
                <el-table-column label="已完成订单组数" prop="mobile" min-width="100" />
                <el-table-column label="账户余额" prop="balanceMoney" min-width="100" />
                <el-table-column label="冻结余额" prop="frozenAmount" min-width="120" />
                <el-table-column label="上级用户" prop="parentName" min-width="100" />
                <el-table-column label="彩金" prop="colorMoney" min-width="100" />
                <el-table-column label="佣金" prop="commissionMoney" min-width="120" />
                <el-table-column label="邀请码" prop="inviteCode" min-width="100" />
                <el-table-column label="最后登录ip" prop="lastLoginIp" min-width="100" />
                <el-table-column label="交易状态" prop="isDisable" min-width="100" >
                  <template #default="{ row }">
                    {{row.isDisable ? '禁用' : '正常'}}
                  </template>
                </el-table-column>
                <el-table-column label="状态" prop="isDummy" min-width="100" >
                  <template #default="{ row }">
                    {{row.isDummy ? '假人' : '真人'}}
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="350" fixed="right">
                    <template #default="{ row }">
                        <el-button @click="ticketForm(row)" v-perms="['productCate:edit']" type="primary" size="small">连单</el-button>
                        <el-button v-perms="['productCate:edit']" type="primary" size="small" >重置抢单数量</el-button>
                        <el-button v-perms="['productCate:edit']" type="primary" size="small" @click="handleOpenMoney(row.id, 0)" >余额</el-button>
                      <el-dropdown>
                        <span class="el-dropdown-link" style="margin-left: 10px;">
                          更多操作
                          <el-icon class="el-icon--right">
<!--                            <arrow-down />-->
                          </el-icon>
                        </span>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item @click="handleOpenMoney(row.id, 1)">赠送彩金</el-dropdown-item>
                            <el-dropdown-item @click="handleEdit(row)">编辑</el-dropdown-item>
                            <el-dropdown-item @click="handleOpenUsdt(row.walletAddress)">USDT信息</el-dropdown-item>
                            <el-dropdown-item>
                              <router-link
                                  :to="{
                                    path: getRoutePath('member:team'),
                                    query: {
                                        id: row.id,
                                        isDisable: row.isDisable
                                    }
                                }"
                              >
                                查看团队
                              </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <router-link
                                  :to="{
                                    path: getRoutePath('member:account'),
                                    query: {
                                        id: row.id
                                    }
                                }"
                              >
                                账变
                              </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item @click="handleDisable(row)">{{ row.isDisable ? '启用' : '禁用' }}</el-dropdown-item>
                            <el-dropdown-item @click="handleDelete(row.id)">删除</el-dropdown-item>
                            <el-dropdown-item @click="handleBeDummy(row)">设为{{row.isDummy?'真人':'假人'}}</el-dropdown-item>
                          </el-dropdown-menu>
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
<!--                    <el-form-item label="一级代理" prop="parentAgentName">-->
<!--                      <el-select class="w-[280px]" v-model="formData.parentAgentName" placeholder="请选择一级代理">-->
<!--                        <el-option-->
<!--                            v-for="(item, key) in memberProxyAll"-->
<!--                            :key="item.id"-->
<!--                            :label="item.username"-->
<!--                            :value="item.username"-->
<!--                        />-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="二级代理" prop="secondAgentName">-->
<!--                        <el-input-->
<!--                                v-model="formData.secondAgentName"-->
<!--                                placeholder="请输入二级代理"-->
<!--                                clearable-->
<!--                        />-->
<!--                    </el-form-item> <el-form-item label="一级代理" prop="parentAgentName">-->
<!--                      <el-select class="w-[280px]" v-model="formData.parentAgentName" placeholder="请选择一级代理">-->
<!--                        <el-option-->
<!--                            v-for="(item, key) in memberProxyAll"-->
<!--                            :key="item.id"-->
<!--                            :label="item.username"-->
<!--                            :value="item.username"-->
<!--                        />-->
<!--                      </el-select>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item label="二级代理" prop="secondAgentName">-->
<!--                        <el-input-->
<!--                                v-model="formData.secondAgentName"-->
<!--                                placeholder="请输入二级代理"-->
<!--                                clearable-->
<!--                        />-->
<!--                    </el-form-item>-->
                    <el-form-item label="用户名称" prop="username">
                        <el-input
                                v-model="formData.username"
                                placeholder="请输入用户名称"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input
                                v-model="formData.mobile"
                                placeholder="请输入手机号码"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="账号余额" prop="balanceMoney">
                        <el-input
                                v-model="formData.balanceMoney"
                                placeholder="请输入账户余额"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="冻结金额" prop="frozenAmount">
                        <el-input
                                v-model="formData.frozenAmount"
                                placeholder="请输入冻结金额"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="会员等级" prop="userLevelId">
                      <el-select class="w-[280px]" v-model="formData.userLevelId" placeholder="请选择会员等级">
                        <el-option
                            v-for="(item, key) in memberRankAll"
                            :key="item.id"
                            :label="item.lvName"
                            :value="item.lvValue"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="交易状态" prop="tradingStatus">
                      <el-select class="w-[280px]" v-model="formData.tradingStatus" placeholder="请选择交易状态">
                        <el-option
                            label="禁用"
                            :value="0"
                        />
                        <el-option
                            label="正常"
                            :value="1"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="password">
                        <el-input
                                v-model="formData.password"
                                placeholder="留空不修改密码"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="交易密码" prop="tradingPwd">
                        <el-input
                                v-model="formData.tradingPwd"
                                placeholder="留空不修改交易密码"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="级别任务数" prop="taskNum">
                        <el-input
                                v-model="formData.taskNum"
                                placeholder="请输入任务级别数"
                                clearable
                        />
                        <p>当前任务做到第几轮</p>
                    </el-form-item>
                    <el-form-item label="信用分" prop="creditScore">
                        <el-input
                                v-model="formData.creditScore"
                                placeholder="请输入文本标题"
                                clearable
                        />
                    </el-form-item>
                    <el-form-item label="上级ID" prop="parentId">
                        <el-input
                                v-model="formData.parentId"
                                placeholder="请输入上级ID"
                                clearable
                        />
                        <p>无特殊情况，不需要修改</p>
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
            v-model="dialogYueVisible"
            :title="dialogYueTitle"
            width="50%"
            :before-close="handleYueClose"
        >
          <el-form ref="formRefYue"
                   class="ls-form"
                   :model="formDataYue"
                   label-width="85px"
                   :rules="rulesYue">
            <el-form-item :label="formDataYue.action ? '彩金金额' : '余额金额'" prop="amount">
              <el-input
                  v-model="formDataYue.amount"
                  :placeholder="formDataYue.action ? '请输入彩金金额' : '请输入余额金额'"
                  clearable
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
                    <el-button @click="handleYueClose">取消</el-button>
                    <el-button type="primary" @click="handleYueSubmit">确认</el-button>
            </span>
          </template>
        </el-dialog>
        <div>
          <el-dialog
              v-model="dialogUsdtVisible"
              title="USDT信息"
              width="50%"
          >
            <el-input
                v-model="USDTmsg"
                placeholder="暂无usdt"
                disabled
            />
            <template #footer>
            <span class="dialog-footer">
                    <el-button @click="handleUsdtClose">确认</el-button>
            </span>
            </template>
          </el-dialog>
        </div>
      </div>

      <Popup @close-ticket="closeTicket" v-if="isTicket" :is-ticket="isTicket" title="连单" :ticket-value="ticketValue"></Popup>
    </div>
</template>
<script lang="ts" setup name="consumerLists">
import { usePaging } from '@/hooks/usePaging'
import { getRoutePath } from '@/router'
import {
  getUserList,
  userAdd,
  userEdit,
  adjustWallet,
  getUserLevelAllList,
  getProxyList,
  userManageBeDummy,
  userManageDel,
  userManageDisable, userReset
} from '@/api/member'
import { ClientMap } from '@/enums/appEnums'
import type { FormInstance } from 'element-plus'
import Popup from './dislodge.vue'
import feedback from "@/utils/feedback";

const isTicket = ref(false)
const ticketValue = ref('')

import {delProductCate} from "@/api/product";
const queryParams = reactive({
    keyword: '',
    channel: '',
    startTime: '',
    endTime: ''
})


const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: getUserList,
    params: queryParams
})
onActivated(() => {
    getLists()
})

getLists()


// 获取会员等级
const memberRankAll = ref([])
const getMemberRankAll = async () => {
  memberRankAll.value = await getUserLevelAllList()
}
getMemberRankAll()
// 获取所有代理
const memberProxyAll = ref([])
const getMemberProxyAll = async () => {
  memberProxyAll.value = await getProxyList()
}
getMemberProxyAll()

const handleOpenNum = async (id: number) => {
  console.log('id', id)
  await feedback.confirm(`确定要重置抢单数量？`)
  await userReset({ id })
  feedback.msgSuccess(`重置抢单数量成功`)
  getLists()
}

// 调整余额
const formRefYue = shallowRef<FormInstance>()
let formDataYue = reactive({
  userId: '',
  amount: '',
  action: 0
})
const rulesYue = reactive({
  amount: [{ required: true, message: '调整余额必填', trigger: 'blur' }]
})
const dialogYueVisible = ref(false)
const dialogYueTitle = ref('')
const handleOpenMoney = (id: any, action: number) => {
  dialogYueVisible.value = true
  dialogYueTitle.value = action ? '赠送彩金' : '调整余额'
  formDataYue.userId = id
  formDataYue.action = action
}
const handleYueSubmit = async () => {
  await formRefYue.value?.validate()
  await adjustWallet(formDataYue)
  dialogYueVisible.value = false
  const tipText = formDataYue.action ? '赠送彩金成功' : '调整余额成功'
  feedback.msgSuccess(tipText)
  formDataYue.userId = ''
  formDataYue.amount = ''
  formDataYue.action = 0
  getLists()
}
const handleYueClose = () => {
  dialogYueVisible.value = false
  formDataYue.userId = ''
  formDataYue.amount = ''
  formDataYue.action = 0
}

/* 修改用户 */
let formData = reactive({
  id: '',
  parentAgentName: '',
  secondAgentName: '',
  username: '',
  mobile: '',
  balanceMoney: 0,
  frozenAmount: '',
  userLevelId: '',
  tradingStatus: '',
  password: '',
  tradingPwd: '',
  taskNum: 0,
  creditScore: '',
  parentId: ''
})
const rules = reactive({
  nickname: [{ required: true, message: '路由地址必填', trigger: 'blur' }],
  mobile: [{ required: true, message: '图标必传', trigger: 'blur' }],
  balanceMoney: [{ required: true, message: '菜单状态必选', trigger: 'blur' }],
  frozenAmount: [{ required: true, message: '菜单名称必填', trigger: 'blur' }],
  userLevelName: [{ required: true, message: '英文菜单名称必填', trigger: 'blur' }],
  tradingStatus: [{ required: true, message: '路由地址必填', trigger: 'blur' }],
  taskNum: [{ required: true, message: '英文菜单名称必填', trigger: 'blur' }],
  creditScore: [{ required: true, message: '路由地址必填', trigger: 'blur' }],
  parentId: [{ required: true, message: '图标必传', trigger: 'blur' }],
})
const formRef = shallowRef<FormInstance>()
const dialogTitle = ref('')
const dialogVisible = ref(false)
const handleAdd = () => {
  dialogVisible.value = true
  dialogTitle.value = '新增用户'
}
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改用户信息'
  // formData = row
  formData.id = row.id
  formData.parentAgentName = row.parentAgentName
  formData.secondAgentName = row.secondAgentName
  formData.username = row.username
  formData.mobile = row.mobile
  formData.balanceMoney = row.balanceMoney
  formData.frozenAmount = row.frozenAmount
  formData.userLevelId = row.userLevelId
  formData.tradingStatus = row.tradingStatus
  formData.password = row.password
  formData.tradingPwd = row.tradingPwd
  formData.taskNum = row.taskNum
  formData.creditScore = row.creditScore
  formData.parentId = row.parentId
  dialogVisible.value = true
}
/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await userEdit(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await userAdd(formData)
    feedback.msgSuccess('新增成功')
  }
  handleClose()
  getLists()
}
const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.parentAgentName = ''
  formData.secondAgentName = ''
  formData.username = ''
  formData.mobile = ''
  formData.balanceMoney = 0
  formData.frozenAmount = ''
  formData.userLevelId = ''
  formData.tradingStatus = ''
  formData.password = ''
  formData.tradingPwd = ''
  formData.taskNum = 0
  formData.creditScore = ''
  formData.parentId = ''
}

const dialogUsdtVisible = ref(false)
const USDTmsg = ref('')
const handleOpenUsdt = (usdt: string) => {
  dialogUsdtVisible.value = true
  USDTmsg.value = usdt
}
const handleUsdtClose = () => {
  dialogUsdtVisible.value = false
}

// 连单
const ticketForm= (data:any)=>{
  sessionStorage.removeItem('goods')
    isTicket.value = true
    ticketValue.value = data
}

const closeTicket = (data:any)=>{
    console.log(data)
    sessionStorage.removeItem('goods')
    isTicket.value = false
}

/* 启用/禁用 */
const handleDisable = async (row: any) => {
  await feedback.confirm(`确定要${row.isDisable ? '启用' : '禁用'}这条数据？`)
  await userManageDisable({ id: row.id })
  feedback.msgSuccess(`${row.isDisable ? '启用' : '禁用'}成功`)
  getLists()
}

/* 删除 */
const handleDelete = async (id: number) => {
  await feedback.confirm('确定要删除这条数据？')
  await userManageDel({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 设为假人 */
const handleBeDummy = async (row: any) => {
  await feedback.confirm(`确定要将其设为${row.isDummy?'真人':'假人'}？`)
  await userManageBeDummy({ id: row.id })
  feedback.msgSuccess('操作成功')
  getLists()
}
</script>
