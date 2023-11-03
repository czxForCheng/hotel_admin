<!-- 网站信息 -->
<template>
  <div class="transaction">
    <el-tabs type="border-card">
      <el-tab-pane label="基础配置">
        <el-form ref="formRefBase" :rules="rulesBase" :model="formDataBase" label-width="120px">
          <el-card shadow="never" class="!border-none">
            <el-form-item label="收款银行卡号" prop="collectionCard">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.collectionCard"
                    placeholder="请输入收款银行卡号"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="收款人" prop="payee">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.payee"
                    placeholder="请输入收款人"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="所属银行" prop="affiliatedBank">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.affiliatedBank"
                    placeholder="请输入所属银行"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="银行地址" prop="bankAddress">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.bankAddress"
                    placeholder="请输入银行地址"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="货币" prop="currency">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.currency"
                    placeholder="请输入货币符号"
                ></el-input>
              </div>
              <p class="tip">货币符号</p>
            </el-form-item>
            <el-form-item label="手机区号" prop="phoneAreaCode">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.phoneAreaCode"
                    placeholder="请输入手机区号"
                ></el-input>
              </div>
              <p class="tip">区号，如巴西：+55</p>
            </el-form-item>
            <el-form-item label="快捷金额" prop="quickAmount">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.quickAmount"
                    placeholder="请输入快捷金额"
                ></el-input>
              </div>
              <p class="tip">充值页面 快捷金额</p>
            </el-form-item>
            <el-form-item label="交易所需余额" prop="transactionAmount">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.transactionAmount"
                    placeholder="请输入交易所需金额"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="自动过期充值订单" label-width="100" prop="overdueOrder">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.overdueOrder"
                    placeholder="请输入自动过期充值订单"
                ></el-input>
              </div>
              <p class="tip">未支付的充值订单x小时后自动过期，必须为整数，如24小时</p>
            </el-form-item>
            <el-form-item label="未订单的支付等待时长（秒）" label-width="150"  prop="paymentWaitingTime">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.paymentWaitingTime"
                    placeholder="请输入未订单的支付等待时长"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">订单支付等待时长，新下订单未再次时间内容完成支付将会被自动取消</p>
            </el-form-item>
            <el-form-item label="重复做单" prop="repeatOrder">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.repeatOrder"
                    placeholder="请输入是否允许重复做单"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">0=不允许，1=允许，如果昨天用户做了vip1级别的单，那么他今天就做不了vip1了，必须升级才能继续做单</p>
            </el-form-item>
            <el-form-item label="匹配范围" prop="rangeMatching">
              <div class="w-80">
                <el-slider v-model="formDataBase.rangeMatching" range />
              </div>
              <p class="tip">系统自动给用户派单的金额范围，计算公式：用户余额x（最小～最大随机值），如果用户加入了叠加组或有打针的订单情况，则不受这个控制</p>
            </el-form-item>
            <el-form-item label="当日交易次数限制" label-width="120" prop="transactionLimit">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.transactionLimit"
                    placeholder="请输入当日交易次数限制"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="奖励交易次数" prop="bonusTradesNum">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.bonusTradesNum"
                    placeholder="请输入奖励交易次数"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="直推会员推广佣金" label-width="120" prop="promotionCommission">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.promotionCommission"
                    placeholder="请输入直推会员推广佣金"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="上两级会员推广佣金" label-width="120" prop="twoPromotionCommission">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.twoPromotionCommission"
                    placeholder="请输入上两级会员推广佣金"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="上三级会员推广佣金" label-width="120" prop="threePromotionCommission">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.threePromotionCommission"
                    placeholder="请输入上三级会员推广佣金"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="普通会员交易佣金" label-width="120" prop="tradingCommission">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.tradingCommission"
                    placeholder="请输入普通会员交易佣金"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="上一级会员交易佣金" label-width="120" prop="oneTradingCommission">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.oneTradingCommission"
                    placeholder="请输入上一级会员交易佣金"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="上二级会员交易佣金" label-width="120" prop="twoTradingCommission">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.twoTradingCommission"
                    placeholder="请输入上二级会员交易佣金"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="上三级会员交易佣金" label-width="120" prop="threeTradingCommission">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.threeTradingCommission"
                    placeholder="请输入上三级会员交易佣金"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="订单冻结时间" prop="freezingTime">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.freezingTime"
                    placeholder="请输入订单冻结时间"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">订单冻结时间，单位秒，如一个小时：3600</p>
            </el-form-item>
            <el-form-item label="允许违规次数" prop="numberOfViolations">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.numberOfViolations"
                    placeholder="请输入允许违规次数"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            提交订单延时时间(单位/秒)
            <el-form-item label="远程主机分配时间" label-width="120">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.allocateTime"
                    placeholder="请输入远程主机分配时间"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">时间由两部分组成，默认都是5秒，总共10秒</p>
            </el-form-item>
            提交订单延时时间(单位/秒)
            <el-form-item label="等待商家响应时间" label-width="120">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.respondTime"
                    placeholder="请输入等待商家响应时间"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">时间由两部分组成，默认都是5秒，总共10秒</p>
            </el-form-item>
            <el-form-item label="开始提现时间" prop="withdrawTimeStart">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.withdrawTimeStart"
                    placeholder="请输入开始提现时间"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">只支持整点，如8:00，请直接输入8</p>
            </el-form-item>
            <el-form-item label="结束提现时间" prop="withdrawTimeEnd">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.withdrawTimeEnd"
                    placeholder="请输入结束提现时间"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">只支持整点，如8:00，请直接输入8</p>
            </el-form-item>
            <el-form-item label="开始充值时间" prop="topTimeStart">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.topTimeStart"
                    placeholder="请输入开始充值时间"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">只支持整点，如8:00-20:00，请直接输入8-20</p>
            </el-form-item>
            <el-form-item label="结束充值时间" prop="topTimeEnd">
              <div class="w-80">
                <el-input
                  v-model="formDataBase.topTimeEnd"
                  placeholder="请输入结束充值时间"
                  show-word-limit
              ></el-input>
              </div>
              <p class="tip">只支持整点，如8:00-20:00，请直接输入8-20</p>
            </el-form-item>
            <el-form-item label="抢单开始时间" prop="orderTimeStart">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.orderTimeStart"
                    placeholder="请输入抢单开始时间"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">只支持整点，如8:00-20:00，请直接输入8-20</p>
            </el-form-item>
            <el-form-item label="抢单结束时间" prop="orderTimeEnd">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.orderTimeEnd"
                    placeholder="请输入抢单结束时间"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">只支持整点，如8:00-20:00，请直接输入8-20</p>
            </el-form-item>
            <el-form-item label="商城状态" prop="mallStatus">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.mallStatus"
                    placeholder="请输入商城状态"
                    show-word-limit
                ></el-input>
              </div>
              <p class="tip">商城状态：1开启 0关闭</p>
            </el-form-item>
            <el-form-item label="app下载地址" prop="appDownloadAddress">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.appDownloadAddress"
                    placeholder="请输入app下载地址"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="版本号" prop="versionNumber">
              <div class="w-80">
                <el-input
                    v-model="formDataBase.versionNumber"
                    placeholder="请输入版本号"
                    show-word-limit
                ></el-input>
              </div>
            </el-form-item>
          </el-card>
        </el-form>
        <footer-btns v-perms="['setting:website:save']">
          <el-button type="primary" @click="handleSubmitBase">保存</el-button>
        </footer-btns>
      </el-tab-pane>
      <el-tab-pane label="其它配置">
        <el-form ref="formRefOther" :rules="rulesOther" :model="formDataOther" label-width="120px">
          <el-card shadow="never" class="!border-none mt-4">
            <div class="text-xl font-medium mb-[20px]">银行设置</div>
            <el-form-item label="银行设置" prop="bankConfig">
              <div class="w-80">
                <el-input
                    v-model="formDataOther.bankConfig"
                    placeholder="请输入银行代码｜银行名称"
                ></el-input>
              </div>
              <p class="tip">一行一个，银行代码｜银行名称</p>
            </el-form-item>
          </el-card>
          <el-card shadow="never" class="!border-none mt-4">
            <div class="text-xl font-medium mb-[20px]">体验金设置</div>
            <el-form-item label="新用户体验金" prop="newUserTrialFee">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.newUserTrialFee"
                    placeholder="请输入新用户体验金"
                />
              </div>
            </el-form-item>
            <el-form-item label="体验金有效期" prop="premiumValidity">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.premiumValidity"
                    placeholder="请输入体验金有效期"
                />
              </div>
              <p class="tip">单位小时，设置为0永不过期</p>
            </el-form-item>
          </el-card>
          <el-card shadow="never" class="!border-none mt-4">
            <div class="text-xl font-medium mb-[20px]">提现设置</div>
            <el-form-item label="提现到钱包" prop="wallet">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.wallet"
                    placeholder="请输入是否提现到钱包"
                />
              </div>
              <p class="tip">提现到钱包：1开启 0关闭</p>
            </el-form-item>
            <el-form-item label="提现到银行卡" prop="bankCard">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.bankCard"
                    placeholder="请输入P是否提现到银行卡"
                />
              </div>
              <p class="tip">提现到银行卡：1开启 0关闭</p>
            </el-form-item>
            <el-form-item label="提现到usdt" prop="usdt">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.usdt"
                    placeholder="请输入是否提现到usdt"
                />
              </div>
              <p class="tip">提现到usdt：1开启 0关闭</p>
            </el-form-item>
            <el-form-item label="首次提现手升级到级别" prop="upgradeLevel">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.upgradeLevel"
                    placeholder="请输入首次提现手升级到级别"
                />
              </div>
              <p class="tip">用户首次提现后，升级到指定级别，如：1，那么就是升到vip1，0为不升级</p>
            </el-form-item>
          </el-card>
          <el-card shadow="never" class="!border-none mt-4">
            <div class="text-xl font-medium mb-[20px]">邀请/注册设置</div>
            <el-form-item label="邀请新用户获得" prop="newUserGain" label-width="100">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.newUserGain"
                    placeholder="请输入邀请新用户获得金额"
                />
              </div>
              <p class="tip">每邀请一位新用户获得多少钱</p>
            </el-form-item>
            <el-form-item label="推荐人获利" prop="earnProfit">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.earnProfit"
                    placeholder="请输入推荐人获利"
                />
              </div>
              <p class="tip">新用户首次充值，邀请人获得金额比例，如获得10% 设置未0.1</p>
            </el-form-item>
            <el-form-item label="注册限制" prop="registration">
              <div class="w-80">
                <el-input
                    v-model.trim="formDataOther.registration"
                    placeholder="请输入注册限制"
                />
              </div>
              <p class="tip">单个IP最多注册多少个账号，0=不限制</p>
            </el-form-item>
          </el-card>
        </el-form>
        <footer-btns v-perms="['setting:website:save']">
          <el-button type="primary" @click="handleSubmitOther">保存</el-button>
        </footer-btns>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup name="transaction">
import { getBasic, setBasic, getResidual, setResidual } from '@/api/setting/transaction'
import useAppStore from '@/stores/modules/app'
import feedback from '@/utils/feedback'
import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance>()
const formRefBase = ref<FormInstance>()
const formRefOther = ref<FormInstance>()
const { getConfig } = useAppStore()

// 基础配置 表单数据
const formDataBase = reactive({
  collectionCard: '',
  payee: '',
  affiliatedBank: '',
  bankAddress: '',
  currency: '',
  phoneAreaCode: '',
  quickAmount: '',
  transactionAmount: '',
  overdueOrder: '',
  paymentWaitingTime: '',
  repeatOrder: '',
  rangeMatching: [0, 0],
  rangeMatchingMin: '',
  rangeMatchingMax: '',
  transactionLimit: '',
  bonusTradesNum: '',
  promotionCommission: '',
  twoPromotionCommission: '',
  threePromotionCommission: '',
  tradingCommission: '',
  oneTradingCommission: '',
  twoTradingCommission: '',
  threeTradingCommission: '',
  freezingTime: '',
  numberOfViolations: '',
  allocateTime: '',
  respondTime: '',
  withdrawTimeStart: '',
  withdrawTimeEnd: '',
  topTimeStart: '',
  topTimeEnd: '',
  orderTimeStart: '',
  orderTimeEnd: '',
  mallStatus: '',
  appDownloadAddress: '',
  versionNumber: ''
})

// 基础设置 表单验证
const rulesBase = {
  collectionCard: [
    {
      required: true,
      message: '请输入收款银行卡',
      trigger: ['blur']
    }
  ],
  payee: [
    {
      required: true,
      message: '请输入收款人',
      trigger: ['blur']
    }
  ],
  affiliatedBank: [
    {
      required: true,
      message: '请输入所属银行',
      trigger: ['blur']
    }
  ],
  bankAddress: [
    {
      required: true,
      message: '请输入银行地址',
      trigger: ['blur']
    }
  ],
  currency: [
    {
      required: true,
      message: '请输入货币符号',
      trigger: ['blur']
    }
  ],
  phoneAreaCode: [
    {
      required: true,
      message: '请输入手机区号',
      trigger: ['blur']
    }
  ],
  quickAmount: [
    {
      required: true,
      message: '请输入快捷金额',
      trigger: ['blur']
    }
  ],
  transactionAmount: [
    {
      required: true,
      message: '请输入交易所需余额',
      trigger: ['blur']
    }
  ],
  overdueOrder: [
    {
      required: true,
      message: '请输入自动过期充值订单',
      trigger: ['blur']
    }
  ],
  paymentWaitingTime: [
    {
      required: true,
      message: '请输入是否允许重复做单',
      trigger: ['blur']
    }
  ],
  repeatOrder: [
    {
      required: true,
      message: '请输入是否允许重复做单',
      trigger: ['blur']
    }
  ],
  rangeMatching: [
    {
      required: true,
      message: '请输入匹配范围',
      trigger: ['blur']
    }
  ],
  rangeMatchingMin: [
    {
      required: true,
      message: '请输入匹配范围最小值',
      trigger: ['blur']
    }
  ],
  rangeMatchingMax: [
    {
      required: true,
      message: '请输入匹配范围最大值',
      trigger: ['blur']
    }
  ],
  transactionLimit: [
    {
      required: true,
      message: '请输入当日交易次数限制',
      trigger: ['blur']
    }
  ],
  bonusTradesNum: [
    {
      required: true,
      message: '请输入奖励交易次数',
      trigger: ['blur']
    }
  ],
  promotionCommission: [
    {
      required: true,
      message: '请输入直推会员推广佣金',
      trigger: ['blur']
    }
  ],
  twoPromotionCommission: [
    {
      required: true,
      message: '请输入上两级会员推广佣金',
      trigger: ['blur']
    }
  ],
  threePromotionCommission: [
    {
      required: true,
      message: '请输入上三级会员推广佣金',
      trigger: ['blur']
    }
  ],
  tradingCommission: [
    {
      required: true,
      message: '请输入普通会员交易佣金',
      trigger: ['blur']
    }
  ],
  oneTradingCommission: [
    {
      required: true,
      message: '请输入上一级会员交易佣金',
      trigger: ['blur']
    }
  ],
  twoTradingCommission: [
    {
      required: true,
      message: '请输入上二级会员交易佣金',
      trigger: ['blur']
    }
  ],
  threeTradingCommission: [
    {
      required: true,
      message: '请输入上三级会员交易佣金',
      trigger: ['blur']
    }
  ],
  freezingTime: [
    {
      required: true,
      message: '请输入订单冻结时间',
      trigger: ['blur']
    }
  ],
  numberOfViolations: [
    {
      required: true,
      message: '请输入允许违规次数',
      trigger: ['blur']
    }
  ],
  withdrawTimeStart: [
    {
      required: true,
      message: '请输入开始提现时间',
      trigger: ['blur']
    }
  ],
  withdrawTimeEnd: [
    {
      required: true,
      message: '请输入结束提现时间',
      trigger: ['blur']
    }
  ],
  topTime: [
    {
      required: true,
      message: '请输入充值时间',
      trigger: ['blur']
    }
  ],
  topTimeStart: [
    {
      required: true,
      message: '请输入结束充值时间',
      trigger: ['blur']
    }
  ],
  topTimeEnd: [
    {
      required: true,
      message: '请输入自动过期充值订单',
      trigger: ['blur']
    }
  ],
  orderTimeStart: [
    {
      required: true,
      message: '请输入抢单开始时间',
      trigger: ['blur']
    }
  ],
  orderTimeEnd: [
    {
      required: true,
      message: '请输入抢单结束时间',
      trigger: ['blur']
    }
  ],
  mallStatus: [
    {
      required: true,
      message: '请输入商城状态',
      trigger: ['blur']
    }
  ],
  appDownloadAddress: [
    {
      required: true,
      message: '请输入app下载地址',
      trigger: ['blur']
    }
  ],
  versionNumber: [
    {
      required: true,
      message: '请输入版本号',
      trigger: ['blur']
    }
  ]
}
// 其它配置 表单数据
const formDataOther = reactive({
  bankConfig: '', // 网站名称
  newUserTrialFee: '', // 网站图标
  premiumValidity: '', // 网站logo
  wallet: '', // 登录页广告图
  bankCard: '',
  usdt: '',
  upgradeLevel: '',
  newUserGain: '',
  earnProfit: '',
  registration: ''
})


// 其它设置 表单验证
const rulesOther = {
  bankConfig: [
    {
      required: true,
      message: '请输入银行名称｜银行代码',
      trigger: ['blur']
    }
  ],
  newUserTrialFee: [
    {
      required: true,
      message: '请输入新用户体验金',
      trigger: ['blur']
    }
  ],
  premiumValidity: [
    {
      required: true,
      message: '请输入体验金有效期',
      trigger: ['blur']
    }
  ],
  wallet: [
    {
      required: true,
      message: '请输入是否提现到钱包',
      trigger: ['blur']
    }
  ],
  bankCard: [
    {
      required: true,
      message: '请输入是否提现到银行卡',
      trigger: ['blur']
    }
  ],
  usdt: [
    {
      required: true,
      message: '请输入是否提现到usdt',
      trigger: ['blur']
    }
  ],
  upgradeLevel: [
    {
      required: true,
      message: '请输入首次提现后升级到的指定级别',
      trigger: ['blur']
    }
  ],
  newUserGain: [
    {
      required: true,
      message: '请输入邀请新用户获得多少钱',
      trigger: ['blur']
    }
  ],
  earnProfit: [
    {
      required: true,
      message: '请输入推荐人获利',
      trigger: ['blur']
    }
  ],
  registration: [
    {
      required: true,
      message: '请输入注册限制',
      trigger: ['blur']
    }
  ]
}

// 获取 基础配置
const getDataBase = async () => {
  const data = await getBasic()
  for (const key in data) {
    //@ts-ignore
    formDataBase[key] = data[key]
  }
  formDataBase.rangeMatching = [data.rangeMatchingMin, data.rangeMatchingMax]
}

// 获取 其它配置
const getDataOther = async () => {
  const data = await getResidual()
  for (const key in formDataOther) {
    //@ts-ignore
    formDataOther[key] = data[key]
  }
}

// 提交 基础配置
const handleSubmitBase = async () => {
  formDataBase.rangeMatchingMin = formDataBase.rangeMatching[0].toString()
  formDataBase.rangeMatchingMax = formDataBase.rangeMatching[1].toString()
  await formRefBase.value?.validate()
  await setBasic(formDataBase)
  feedback.msgSuccess('操作成功')
  getConfig()
  getDataBase()
}

// 提交 其它配置
const handleSubmitOther = async () => {
  await formRefOther.value?.validate()
  await setResidual(formDataOther)
  feedback.msgSuccess('操作成功')
  getConfig()
  getDataOther()
}

getDataBase()
getDataOther()
</script>

<style lang="scss" scoped>
  :deep(.el-tabs--border-card>.el-tabs__content){
    background-color: #f2f2f2;
  }
  .tip{
    margin-left: 10px;color: #999;
  }
</style>
