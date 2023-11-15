<template>
    <div>
      <el-card class="!border-none" shadow="never">
        <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
          <el-form-item label="会员等级">
            <el-select class="w-[280px]" v-model="queryParams.userLevelId" placeholder="请选择会员等级">
              <el-option
                  v-for="(item, key) in memberRankAll"
                  :key="item.id"
                  :label="item.lvName"
                  :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select class="w-[280px]" v-model="queryParams.isDummy" placeholder="请选择状态">
              <el-option
                  label="真人"
                  :value="0"
              />
              <el-option
                  label="假人"
                  :value="1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input
                class="w-[280px]"
                v-model.trim="queryParams.username"
                placeholder="请输入用户名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="邀请码">
            <el-input
                class="w-[280px]"
                v-model.trim="queryParams.inviteCode"
                placeholder="请输入邀请码"
                clearable
            />
          </el-form-item>
          <el-form-item label="ip">
            <el-input
                class="w-[280px]"
                v-model.trim="queryParams.lastLoginIp"
                placeholder="请输入最后登录ip"
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
<!--          <el-form-item label="注册时间">-->
<!--            <daterange-picker-->
<!--                v-model:startTime="queryParams.startTime"-->
<!--                v-model:endTime="queryParams.endTime"-->
<!--            />-->
<!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="resetPage">查询</el-button>
            <el-button @click="resetParams">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
        <el-card class="!border-none mt-4" shadow="never">
          <div>
            <el-button v-perms="['userManage:add']" type="primary" class="mb-4" @click="handleOpenAdd">
              <template #icon>
                <icon name="el-icon-Plus" />
              </template>
              新增会员
            </el-button>
          </div>
            <el-table max-height="550px" size="large" v-loading="pager.loading" :data="pager.lists">
                <el-table-column label="UID" prop="id" min-width="60" />
                <el-table-column label="一级代理/二级代理" min-width="180" >
                  <template #default="{ row }">
                    <p>{{row.firstAgentName}}</p>
                    <p>{{row.parentAgentName}}</p>
                  </template>
                </el-table-column>
                <el-table-column label="账号" prop="username" min-width="120" />
                <el-table-column label="手机号码" prop="mobile" min-width="150" />
                <el-table-column :show-overflow-tooltip="true" label="会员等级" prop="userLevel" min-width="120" />
                <el-table-column label="信誉分" prop="creditScore" min-width="100" />
                <el-table-column label="已完成订单总数" prop="nowOrderNum" min-width="100" />
                <el-table-column label="全部订单总数" prop="robOrderNum" min-width="120" />
                <el-table-column label="是否连单" min-width="120">
                    <template #default="{row}">
                      <el-tag v-if="row.isLink===1" type="success">已连单</el-tag>
                      <el-tag v-else type="warning">未连单</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="已完成订单组数" prop="taskNum" min-width="100" />
                <el-table-column label="账户余额" prop="balanceMoney" min-width="100" />
                <el-table-column label="冻结余额" prop="frozenAmount" min-width="120" />
                <el-table-column label="上级用户" prop="parentName" min-width="100" />
                <el-table-column label="彩金" prop="colorMoney" min-width="100" />
                <el-table-column label="佣金" prop="commissionMoney" min-width="120" />
                <el-table-column label="总存款" prop="sumMoney" min-width="120" />
                <el-table-column label="邀请码" prop="inviteCode" min-width="100" />
                <el-table-column label="最后登录ip" prop="lastLoginIp" min-width="100" />
              <el-table-column label="注册时间" prop="addTime" min-width="180" />
                <el-table-column label="交易状态" prop="tradingStatus" min-width="100" >

                  <template #default="{ row }">
                    {{row.tradingStatus ? '正常' : '封禁'}}
                  </template>
                </el-table-column>
                <el-table-column label="状态" prop="isDummy" min-width="100" >
                  <template #default="{ row }">
                    {{row.isDummy ? '假人' : '真人'}}
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="350" fixed="right">
                    <template #default="{ row }">
                      <el-button v-perms="['userManage:linkOrder']" type="primary" size="small" @click="ticketForm(row)">连单</el-button>
                      <el-button v-perms="['userManage:reset']" type="primary" size="small"  @click="handleOpenNum(row.id)">重置抢单数量</el-button>
                        <el-button v-perms="['userManage:addAmount']" type="primary" size="small" @click="handleOpenMoney(row.id, 0)" >余额</el-button>
                        <el-dropdown>
                          <span class="el-dropdown-link" style="margin-left: 10px;">
                            更多操作
                           <icon name="el-icon-arrow-down" :size="18"/>
                          </span>
                          <template #dropdown>
                            <div style="padding: 5px 20px;">
                              <el-dropdown-menu>
                                <el-button v-perms="['userManage:addAmount']" @click="handleOpenMoney(row.id, 1)">赠送彩金</el-button>
                                <el-button v-perms="['userManage:sendDeposit']" @click="handleOpenMoney(row.id, 2)">赠送存款</el-button>
                                <el-button v-perms="['userManage:frozenAmount']" @click="handleOpenMoney(row.id, 3)">冻结余额</el-button>
                                <el-button v-perms="['userManage:edit']" @click="handleEdit(row)">编辑</el-button>
                                <el-button v-perms="['userManage:OSDT']" @click="handleOpenUsdt(row)">USDT信息</el-button>
                                <el-button v-perms="['userManage:teamList']">
                                  <router-link
                                      :to="{
                                      path: getRoutePath('userManage:teamList'),
                                      query: {
                                          id: row.id,
                                          isDisable: row.isDisable
                                      }
                                  }"
                                  >
                                    查看团队
                                  </router-link>
                                </el-button>
                                <el-button v-perms="['userManage:billList']">
                                  <router-link
                                      :to="{
                                      path: getRoutePath('userManage:billList'),
                                      query: {
                                          id: row.id
                                      }
                                  }"
                                  >
                                    账变
                                  </router-link>
                                </el-button>
                                <el-button v-perms="['userManage:disable']" @click="handleDisable(row)">{{ row.isDisable ? '启用' : '禁用' }}</el-button>
                                <el-button v-perms="['userManage:del']" @click="handleDelete(row.id)">删除</el-button>
                                <el-button v-perms="['userManage:beDummy']" @click="handleBeDummy(row)">设为{{row.isDummy?'真人':'假人'}}</el-button>
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
            v-model="dialogAddVisible"
            title="新增会员"
            width="50%"
            :before-close="handleAddClose"
        >
          <el-form ref="formRefAdd"
                   class="ls-form"
                   :model="formDataAdd"
                   label-width="85px"
                   :rules="rulesAdd">
            <el-form-item label="代理" prop="parentName">
              <el-select class="w-[280px]" @change="handleProxyChange" v-model="formDataAdd.parentName" placeholder="请选择代理">
                <el-option
                    v-for="(item, key) in memberProxyAll"
                    :key="item.id"
                    :label="item.username"
                    :value="item.username"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="用户名称" prop="username">
              <el-input
                  v-model="formDataAdd.username"
                  placeholder="请输入用户名称"
                  clearable
              />
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input
                  v-model="formDataAdd.mobile"
                  placeholder="请输入手机号码"
                  clearable
              />
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
              <el-input
                  v-model="formDataAdd.password"
                  placeholder="请输入登录密码"
                  clearable
              />
            </el-form-item>
            <el-form-item label="交易密码" prop="tradingPwd">
              <el-input
                  v-model="formDataAdd.tradingPwd"
                  placeholder="请输入交易密码"
                  clearable
              />
            </el-form-item>
            <el-form-item label="邀请码" prop="inviteCode">
              <el-input
                  v-model="formDataAdd.inviteCode"
                  placeholder="邀请码"
                  clearable
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
                    <el-button @click="handleAddClose">取消</el-button>
                    <el-button type="primary" @click="handleAddSubmit">确认</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
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
<!--                    <el-form-item label="冻结金额" prop="frozenAmount">-->
<!--                        <el-input-->
<!--                                v-model="formData.frozenAmount"-->
<!--                                placeholder="请输入冻结金额"-->
<!--                                clearable-->
<!--                        />-->
<!--                    </el-form-item>-->
                    <el-form-item label="会员等级" prop="userLevelId">
                      <el-select class="w-[280px]" v-model="formData.userLevelId" placeholder="请选择会员等级">
                        <el-option
                            v-for="(item, key) in memberRankAll"
                            :key="item.id"
                            :label="item.lvName"
                            :value="item.id"
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
                    <el-form-item label="级别任务数" label-width="120" prop="taskNum">
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
                      <el-select class="w-[280px]" v-model="formData.parentId" placeholder="请选择一级代理">
                        <el-option
                            v-for="(item, key) in memberProxyAll"
                            :key="item.id"
                            :label="item.username"
                            :value="item.id"
                        />
                      </el-select>
                        <p style="margin-right: 10px;">无特殊情况，不需要修改</p>
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
            <el-form-item :label="moneyLabel" prop="amount">
              <el-input
                  v-model="formDataYue.amount"
                  :placeholder="moneyPlaceholder"
                  clearable
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
                    <el-button @click="handleYueClose">取消</el-button>
                    <el-button type="primary" :loading="isYueLoading" @click="handleYueSubmit">确认</el-button>
            </span>
          </template>
        </el-dialog>
        <div>
          <el-dialog
              v-model="dialogUsdtVisible"
              title="USDT信息"
              width="50%"
          >
            <el-form ref="formRefUsdt"
                     class="ls-form"
                     :model="formDataUsdt"
                     label-width="85px"
                     :rules="rulesUsdt">
              <el-form-item label="usdt信息" prop="walletAddress">
                <el-input
                    v-model="formDataUsdt.walletAddress"
                    placeholder="请输入usdt"
                    clearable
                />
              </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
               <el-button @click="handleUsdtClose">取消</el-button>
               <el-button type="primary" @click="handleUstdEdit">确认</el-button>
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
  userManageDisable, userReset, usdtUpdate,
  frozenAmount
} from '@/api/member'
import type { FormInstance } from 'element-plus'
import Popup from './dislodge.vue'
import feedback from "@/utils/feedback";


const isTicket = ref(false)
const ticketValue = ref('')

const queryParams = reactive({
  userLevelId: '',
  isDummy: '',
  username: '',
  mobile: '',
  inviteCode: '',
  lastLoginIp: '',
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

const validateUsername = (rule: any, value: any, callback: any) => {
  if(value.length < 5) {
    callback(new Error('用户名至少5位'))
  }else{
    callback()
  }
}
const validatePhone = (rule: any, value: any, callback: any) => {
  const reg = /^1[3,4,5,6,7,8,9][0-9]{9}$/
  const result = reg.test(value)
  if(!result) {
    callback(new Error('手机号码格式不正确'))
  }else{
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  if (!reg.test(value)) {
    callback(new Error('登录密码至少6位以上，包含数字和字母'))
  }else{
    callback()
  }
}
const validateTrading = (rule: any, value: any, callback: any) => {
  if(value.length < 6) {
    callback(new Error('交易密码至少6位'))
  }else{
    callback()
  }
}
// 新增
const formRefAdd = shallowRef<FormInstance>()
let formDataAdd  = reactive({
  agentId: '',
  parentName: '',
  username: '',
  mobile: '',
  password: '',
  tradingPwd: '',
  inviteCode: ''
})
const rulesAdd  = reactive({
  username: [
      { required: true, message: '用户名称必填', trigger: 'blur' },
      { validator: validateUsername, trigger: 'blur' }
  ],
  mobile: [
      { required: true, message: '手机号码必填', trigger: 'blur' },
      // { validator: validatePhone, trigger: 'blur' }
  ],
  password: [
      { required: true, message: '登录密码必填', trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' }
  ],
  tradingPwd: [
      { required: true, message: '交易密码必填', trigger: 'blur' },
      { validator: validateTrading, trigger: 'blur' }
  ],
  inviteCode: [{ required: true, message: '邀请码必填', trigger: 'blur' }]
})
const dialogAddVisible = ref(false)
const handleOpenAdd = () => {
  dialogAddVisible.value = true
}
const handleAddSubmit = async () => {
  await formRefAdd.value?.validate()
  await userAdd(formDataAdd)
  feedback.msgSuccess('新增成功')
  getLists()
  handleAddClose()
}
const handleAddClose = () => {
  dialogAddVisible.value = false
  formDataAdd.parentName = ''
  formDataAdd.username = ''
  formDataAdd.mobile = ''
  formDataAdd.password = ''
  formDataAdd.tradingPwd = ''
  formDataAdd.inviteCode = ''
}




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


const handleProxyChange = (e: any) => {
  const info:any = memberProxyAll.value.find(item => {
    return item['username'] === e
  })
  formDataAdd.agentId = info.id
  formDataAdd.inviteCode = info.inviteCode
}
const handleOpenNum = async (id: number) => {
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
  amount: [{ required: true, message: `金额必填`, trigger: 'blur' }]
})
const dialogYueVisible = ref(false)
const dialogYueTitle = ref('')
const isYueLoading = ref(false)
const moneyLabel = computed(() => {
  let label = ''
  switch(formDataYue.action) {
    case 0:
      label = '调整余额'
      break
    case 1:
      label = '赠送彩金'
      break
    case 2:
      label = '赠送存款'
      break
    case 3:
      label = '冻结余额'
      break
  }
  return label
})
const moneyPlaceholder = computed(() => {
  let label = ''
  switch(formDataYue.action) {
    case 0:
      label = '请输入余额金额'
      break
    case 1:
      label = '请输入彩金金额'
      break
    case 2:
      label = '请输入存款金额'
      break
    case 3:
      label = '请输入冻结金额'
      break
  }
  return label
})
const handleOpenMoney = (id: any, action: number) => {
  dialogYueVisible.value = true
  // dialogYueTitle.value = !action ? '调整余额' : (action === 1 ? '赠送彩金' : '赠送存款')
  switch(action) {
    case 0:
      dialogYueTitle.value = '调整余额'
      break
    case 1:
      dialogYueTitle.value = '赠送彩金'
      break
    case 2:
      dialogYueTitle.value = '赠送存款'
      break
    case 3:
      dialogYueTitle.value = '冻结余额'
      break
  }
  formDataYue.userId = id
  formDataYue.action = action
  console.log(formDataYue.action)
}
const handleYueSubmit = async () => {
  await formRefYue.value?.validate()
  isYueLoading.value = true
  if(formDataYue.action === 3) {
    await frozenAmount({
      id: formDataYue.userId,
      frozenAmount: formDataYue.amount
    })
  }else{
    await adjustWallet(formDataYue)
  }
  // const tipText = !formDataYue.action ? '赠送余额成功' : (formDataYue.action === 1 ? '调整彩金成功' : '调整存款成功')
  let tipText = ''
  switch(formDataYue.action ) {
    case 0:
      tipText = '赠送余额成功'
      break
    case 1:
      tipText = '赠送彩金成功'
      break
    case 2:
      tipText = '赠送存款成功'
      break
    case 3:
      tipText = '冻结余额成功'
      break
  }
  feedback.msgSuccess(tipText)
  getLists()
  handleYueClose()
}
const handleYueClose = () => {
  dialogYueVisible.value = false
  formDataYue.userId = ''
  formDataYue.amount = ''
  formDataYue.action = 0
  isYueLoading.value = false
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
  username: [{ required: true, message: '用户名称必填', trigger: 'blur' }],
  mobile: [{ required: true, message: '手机号码必填', trigger: 'blur' }],
  balanceMoney: [{ required: true, message: '账号余额必填', trigger: 'blur' }],
  frozenAmount: [{ required: true, message: '冻结金额必填', trigger: 'blur' }],
  userLevelId: [{ required: true, message: '会员等级必选', trigger: 'blur' }],
  tradingStatus: [{ required: true, message: '交易状态必选', trigger: 'blur' }],
  taskNum: [{ required: true, message: '级别任务数必填', trigger: 'blur' }],
  creditScore: [{ required: true, message: '信用分必填', trigger: 'blur' }],
  parentId: [{ required: true, message: '上级id必选', trigger: 'blur' }],
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

const formRefUsdt = shallowRef<FormInstance>()
const dialogUsdtVisible = ref(false)
const formDataUsdt = reactive({
  id: '',
  walletAddress: ''
})
const rulesUsdt = reactive({
  walletAddress: [{ required: true, message: 'usdt必填', trigger: 'blur' }]
})
const handleOpenUsdt = (row: any) => {
  dialogUsdtVisible.value = true
  formDataUsdt.id = row.id
  formDataUsdt.walletAddress = row.walletAddress
}
const handleUstdEdit = async () => {
  await formRefUsdt.value?.validate()
  await usdtUpdate(formDataUsdt)
  feedback.msgSuccess('修改usdt成功')
  getLists()
  handleUsdtClose()
}
const handleUsdtClose = () => {
  dialogUsdtVisible.value = false
}

// 连单
const ticketForm= async (data:any)=>{
    sessionStorage.removeItem('goods')
    isTicket.value = true
   ticketValue.value = data


}

const closeTicket = (data:any)=>{
    sessionStorage.removeItem('goods')
    isTicket.value = false
    getLists()
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

// 会员详情


</script>
<style scoped lang="scss">
  :deep(.el-select){
    width: 100%;
  }
  :deep(.el-dropdown-link .el-icon){
    top: 3px;
  }
  :deep(.el-button > span){
    display: block;
    width: 100%;
    height: 100%;
  }
  :deep(.el-button a, .el-button span){
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
