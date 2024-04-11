<!-- 网站信息 -->
<template>
  <div class="website-information">
    <el-card shadow="never" class="!border-none">
      <div style="display: flex;align-items: center;">
        <p style="margin-right: 10px;">系统参数(包括客服链接地址配置)</p>
        <el-button v-perms="['config:update:system']" type="primary" @click="handleUpdateSys">修改系统配置</el-button>
      </div>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <p>数据清理</p>
      <el-form ref="formRefZoom" :rules="rulesZoom" :model="formDataZoom" label-width="120px">
        <el-form-item label="显示选项" prop="timeZone">
          <div class="w-80">
            <el-checkbox-group v-model="clearList">
              <el-checkbox label="用户" true-label="user" />
              <el-checkbox label="交易" true-label="user1" />
              <el-checkbox label="财务记录" true-label="user2" />
              <el-checkbox label="充值" true-label="user3" />
              <el-checkbox label="提现" true-label="user4" />
              <el-checkbox label="银行卡" true-label="user5" />
              <el-checkbox label="地址" true-label="user6" />
              <el-checkbox label="利息宝" true-label="user7" />
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
<!--      <el-button type="primary" @click="handleUpdateTime">确定清理</el-button>-->
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <p>语言选择：</p>
      <el-form ref="formRefZoom" :rules="rulesZoom" :model="formDataZoom" label-width="120px">
        <el-form-item label="显示选项" prop="timeZone">
          <div class="w-80">
            <el-radio-group v-model="language">
              <el-radio label="0">中文</el-radio>
              <el-radio label="1">英文</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="handleUpdateLange">保存语言</el-button>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <p>注册是否开启邮箱：</p>
      <el-form ref="formRefEmail" :rules="rulesEmail" :model="formDataEmail" label-width="120px">
        <el-form-item label="是否开启邮箱">
          <div class="w-80">
            <el-switch
                v-model="isEmail"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus"
            />
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <p>注册是否开启验证码：</p>
      <el-form ref="formRefCode" :model="formDataCode" label-width="120px">
        <el-form-item label="是否开启验证码">
          <div class="w-80">
            <el-switch
                v-model="formDataCode.switch"
                :active-value="1"
                :inactive-value="0"
                @change="changeCodeStatus"
            />
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <p>是否开启提前订单数：</p>
      <el-form :model="formDataTask" label-width="140px">
        <el-form-item label="是否开启提前订单数">
          <div class="w-80">
            <el-switch
                v-model="formDataTask.switch"
                :active-value="1"
                :inactive-value="0"
                @change="changeTaskStatus"
            />
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <p>设置黑名单：</p>
      <el-form ref="formRefDomain" :model="formDataBlack" label-width="120px">
        <el-form-item label="黑名单" prop="domainLimit">
          <div class="w-80">
            <el-input
                v-model="formDataBlack.blackList"
                placeholder="请输入黑名单"
                type="textarea"
            />
          </div>
          <p style="font-size: 12px;color: #999;margin-left: 10px;">多个域名请用“,”隔开</p>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="changeBlackStatus">保存</el-button>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <p>设置域名授权：</p>
      <el-form ref="formRefDomain" :model="formDataDomain" label-width="120px">
        <el-form-item label="授权域名" prop="domainLimit">
          <div class="w-80">
            <el-input
                v-model="formDataDomain.domainLimit"
                placeholder="请输入域名"
                type="textarea"
            />
          </div>
          <p style="font-size: 12px;color: #999;margin-left: 10px;">多个域名请用“,”隔开</p>
        </el-form-item>
      </el-form>
      <el-button v-perms="['update:domainLimit']" type="primary" @click="changeDomainStatus">保存</el-button>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <el-form ref="formRefZoom" :rules="rulesZoom" :model="formDataZoom" label-width="120px">
        <el-form-item label="系统时区配置" prop="timeZone">
          <div class="w-80">
            <el-select class="w-[280px]" v-model="formDataZoom.timeZone" placeholder="请选择系统时区配置">
              <el-option
                  v-for="(item, key) in timeZoneAll"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </div>
        </el-form-item>
      </el-form>
      <el-button v-perms="['config:update:time']" type="primary" @click="handleUpdateTime">修改时区配置</el-button>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <div class="info-item">
        <p class="title">网站名称 Website</p>
        <div class="value">{{formData.websiteName}}</div>
        <p class="tip">网站名称及网站图标，将显示在浏览器的标签上</p>
      </div>
      <div class="info-item">
        <p class="title">金额单位</p>
        <div class="value">{{formData.supervisorName}}</div>
<!--        <p class="tip">管理程序名称，将显示在后台左上角</p>-->
      </div>
      <div class="info-item">
        <p class="title">管理程序版本 Version</p>
        <div class="value">{{formData.supervisorVersion}}</div>
        <p class="tip">管理程序版本，将显示在后台左上角标题</p>
      </div>
      <div class="info-item">
        <p class="title">网站版权信息 Copyright</p>
        <div class="value">{{formData.copyrightInformation}}</div>
        <p class="tip">网站版权信息，在后台登录页面显示版权信息并链接到备案到信息备案管理系统</p>
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
          <el-form-item label="网站名称" prop="websiteName">
            <el-input
                v-model="formData.websiteName"
                placeholder="请输入网站名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="首页轮播文字" label-width="120" prop="homeRotationWord">
            <el-input
                v-model="formData.homeRotationWord"
                placeholder="请输入首页轮播文字"
                clearable
            />
          </el-form-item>
          <el-form-item label="首页轮播文字开关" label-width="120" prop="isOrNot">
            <el-select class="w-[280px]" v-model="formData.isOrNot">
              <el-option
                  label="关"
                  value="0"
              />
              <el-option
                  label="开"
                  value="1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="金额单位" label-width="120" prop="supervisorName">
            <el-input v-model="formData.supervisorName" placeholder="请输入金额单位" clearable/>
          </el-form-item>
          <el-form-item label="管理程序版本 Version" label-width="120"  prop="supervisorVersion">
            <el-input v-model="formData.supervisorVersion" placeholder="请输入管理程序版本" clearable/>
          </el-form-item>
          <el-form-item label="用户注册IP是否唯一" label-width="120"  prop="ipIsOrNot">
            <el-select class="w-[280px]" v-model="formData.ipIsOrNot">
              <el-option
                  label="关"
                  value="0"
              />
              <el-option
                  label="开"
                  value="1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="浏览器图标 Browser" label-width="120" prop="iconAddress">
            <div>
              <material-picker v-model="formData.iconAddress" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="网站大图标" label-width="120" prop="websiteBigLogo">
            <div>
              <material-picker v-model="formData.websiteBigLogo" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="网站小图标" label-width="120" prop="websiteSmallLogo">
            <div>
              <material-picker v-model="formData.websiteSmallLogo" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="登录背景图" label-width="120" prop="loginBackground">
            <div>
              <material-picker v-model="formData.loginBackground" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="登录logo" label-width="120" prop="loginLogo">
            <div>
              <material-picker v-model="formData.loginLogo" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="注册背景图" label-width="120" prop="registrationBackground">
            <div>
              <material-picker v-model="formData.registrationBackground" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="注册logo" label-width="120" prop="registrationLogo">
            <div>
              <material-picker v-model="formData.registrationLogo" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="首页头部背景图" label-width="120" prop="homeHeaderBackground">
            <div>
              <material-picker v-model="formData.homeHeaderBackground" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="交易页面背景图" label-width="120" prop="transactionBg">
            <div>
              <material-picker v-model="formData.transactionBg" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="客服链接地址" label-width="120" prop="linkAddress">
            <el-input v-model="formData.linkAddress" placeholder="请输入客服链接地址" clearable/>
          </el-form-item>
          <el-form-item label="网站版权信息 Copyright" label-width="120" prop="copyrightInformation">
            <el-input v-model="formData.copyrightInformation" placeholder="请输入网站版权信息" clearable/>
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

<script lang="ts" setup name="webInformation">
import type { FormInstance } from 'element-plus'
import {
  getTime,
  nowLanguage,
  selectEmail, setEmail,
  setLanguage,
  updateTime,
  websiteInfoApi,
  websiteInfoEdit,
  setDomain, getDomain,
  setBlack, getBlack,
  selectCode,
  setCode,
  selectTask,
  setTask
} from '@/api/setting/config'
import feedback from "@/utils/feedback";
import useAppStore from '@/stores/modules/app'
import useTimeStore from '@/stores/modules/timeZoom'
import {computed} from "vue";
import {orderPay} from "@/api/finance/order";
const appStore = useAppStore()
const timeStore = useTimeStore()
const config = computed(() => appStore.config)
const timeZoom = computed(() => timeStore.timeZoom)

/* 修改系统配置 */
const formData = reactive({
  copyrightInformation: '',
  homeRotationWord: '',
  iconAddress: '',
  websiteBigLogo: '',
  websiteSmallLogo: '',
  ipIsOrNot:'',
  isOrNot: '',
  linkAddress: '',
  supervisorName: '',
  supervisorVersion: '',
  websiteName: '',
  loginBackground: '',
  loginLogo: '',
  registrationBackground: '',
  registrationLogo: '',
  transactionBg: '',
  homeHeaderBackground: ''
})

// 表单验证
const rules = {
  websiteName: [
    {
      required: true,
      message: '请输入网站名称',
      trigger: ['blur']
    }
  ],
  homeRotationWord: [
    {
      required: true,
      message: '请输入首页轮播文字',
      trigger: ['blur']
    }
  ],
  isOrNot: [
    {
      required: true,
      message: '请选择首页轮播文字开关',
      trigger: ['change']
    }
  ],
  supervisorName: [
    {
      required: true,
      message: '请输入管理程序名称',
      trigger: ['blur']
    }
  ],
  supervisorVersion: [
    {
      required: true,
      message: '请输入管理程序版本',
      trigger: ['blur']
    }
  ],
  ipIsOrNot: [
    {
      required: true,
      message: '请选择用户注册IP是否唯一',
      trigger: ['change']
    }
  ],
  iconAddress: [
    {
      required: true,
      message: '请选择浏览器图标',
      trigger: ['change']
    }
  ],
  websiteBigLogo: [
    {
      required: true,
      message: '请选择网站大图标',
      trigger: ['change']
    }
  ],
  websiteSmallLogo: [
    {
      required: true,
      message: '请选择网站小图标',
      trigger: ['change']
    }
  ],
  loginBackground: [
    {
      required: true,
      message: '请选择登录背景图',
      trigger: ['change']
    }
  ],
  loginLogo: [
    {
      required: true,
      message: '请选择登录logo',
      trigger: ['change']
    }
  ],
  registrationBackground: [
    {
      required: true,
      message: '请选择注册背景图',
      trigger: ['change']
    }
  ],
  registrationLogo: [
    {
      required: true,
      message: '请选择注册logo',
      trigger: ['change']
    }
  ],
  homeHeaderBackground: [
    {
      required: true,
      message: '首页头部背景图',
      trigger: ['change']
    }
  ],
  linkAddress: [
    {
      required: true,
      message: '请输入客服链接地址',
      trigger: ['blur']
    }
  ],
  copyrightInformation: [
    {
      required: true,
      message: '请输入网站版权信息',
      trigger: ['blur']
    }
  ]
}
const getWebsiteInfo = async () => {
  // const res = await websiteInfoApi()
  // for(const key in res){
  //   //@ts-ignore
  //   formData[key] = res[key] || ''
  // }
  for(const key in formData){
    //@ts-ignore
    formData[key] = config.value[key] || ''
  }
}
getWebsiteInfo()
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEmail=ref(0)
const handleUpdateSys = () => {
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  await websiteInfoEdit(formData)
  feedback.msgSuccess('修改成功')
  appStore.getConfig()
  dialogVisible.value = false
}
watch(config, () => {
  getWebsiteInfo()
})

const changeStatus =async (item:any) => {

  switch (item){
    case 0:{
      await feedback.confirm('是否要关闭邮箱？')
      await setEmail({ mailboxSwitch:item })
      feedback.msgSuccess('操作成功')
      getEmailStatus()
      break
    }
    case 1:{
      await feedback.confirm('是否要开启邮箱？')
      await setEmail({ mailboxSwitch:item })
      feedback.msgSuccess('操作成功')
      getEmailStatus()
      break
    }
  }

}


const handleClose = () => {
  dialogVisible.value = false
}

// 数据清理
const clearList = ref([])

/* 显示语言 */
const formRefLanguage = ref<FormInstance>()
const language = ref('')
const handleGetLanguage = async () => {
  const res = await nowLanguage()
  language.value = res.language
}
handleGetLanguage()
const handleUpdateLange = async () => {
  // await formRefLanguage.value?.validate()
  await setLanguage({
    language: language.value
  })
  feedback.msgSuccess('操作成功')
  handleGetLanguage()
}

/* 系统时区 */
const formRefZoom = ref<FormInstance>()
const timeZoneAll = [
  { id: 1, label: '中国上海', value: 'Asia/Shanghai', zoomi: 8 },
  { id: 2, label: '印度尼西亚', value: 'Asia/Jakarta', zoomi: 7 },
  { id: 3, label: '越南', value: 'Asia/Ho_Chi_Minh', zoomi: 7 },
  { id: 4, label: '泰国', value: 'Asia/Bangkok', zoomi: 7 },
  { id: 5, label: '日本', value: 'Asia/Tokyo', zoomi: 9 },
  { id: 6, label: '墨西哥', value: 'America/Mexico_City', zoomi: -6 },
  { id: 7, label: '美国东部', value: 'America/Detroit', zoomi: -5 },
  { id: 30, label: '太平洋时区', value: 'America/Pacific', zoomi: -7 },
  { id: 8, label: '哥伦比亚', value: 'America/Colombia', zoomi: -5 },
  { id: 9, label: '古巴', value: 'America/Cuba', zoomi: -5 },
  { id: 10, label: '秘鲁', value: 'America/Peru', zoomi: -5 },
  { id: 11, label: '智利', value: 'America/Detroit', zoomi: -4 },
  { id: 12, label: '委内瑞拉', value: 'America/Venezuela', zoomi: -4 },
  { id: 13, label: '巴西', value: 'America/Sao_Paulo', zoomi: -3 },
  { id: 14, label: '阿根廷', value: 'America/Argentina', zoomi: -3 },
  { id: 15, label: '乌拉圭', value: 'America/Uruguay', zoomi: -3 },
  { id: 30, label: '苏里南', value: 'America/Suriname', zoomi: -3 },
  { id: 16, label: '巴拉圭', value: 'America/Paraguay', zoomi: -4 },
  { id: 17, label: '加拿大', value: 'America/Toronto', zoomi: -4 },
  { id: 18, label: '英国', value: 'Europe/London', zoomi: 0},
  { id: 19, label: '葡萄牙', value: 'Europe/Portuguese', zoomi: 0 },
  { id: 20, label: '西班牙', value: 'Europe/Madrid', zoomi: 1 },
  { id: 21, label: '波兰', value: 'Europe/Warsaw', zoomi: 1 },
  { id: 22, label: '荷兰', value: 'Europe/Netherlands', zoomi: 1 },
  { id: 23, label: '瑞士', value: 'Europe/Zurich', zoomi: 1 },
  { id: 24, label: '意大利', value: 'Europe/Rome', zoomi: 1 },
  { id: 25, label: '德国', value: 'Europe/Berlin', zoomi: 1 },
  { id: 26, label: '法国', value: 'Europe/French', zoomi: 1 },
  { id: 27, label: '土耳其', value: 'Europe/Istanbul', zoomi: 3 },
  { id: 28, label: '俄罗斯', value: 'Europe/Moscow', zoomi: 3 },
  { id: 29, label: '澳大利亚', value: 'Australia/Sydney', zoomi: 9 }
]
// 系统时区配置 表单数据
const formDataZoom = reactive({
  timeZone: ''
})
/*系统时区配置 表单验证*/
const rulesZoom = {
  timeZone: [
    {
      required: true,
      message: '请选择系统时区',
      trigger: ['blur']
    }
  ]
}
/*获取系统时区配置*/
const handleGetTime = () => {
  if(timeZoom.value) {
    //@ts-ignore
    formDataZoom.timeZone = timeZoom.value
  }
}
handleGetTime()
watch(timeZoom,(newvalue, oldvalue) => {
  //@ts-ignore
  formDataZoom.timeZone = timeZoom.value
})

/*修改系统时区配置*/
const handleUpdateTime = async () => {
  await formRefZoom.value?.validate()
  timeStore.setTimeZoom(formDataZoom.timeZone)
  feedback.msgSuccess('操作成功')
}

/* 是否开启邮箱 */
const formRefEmail = ref<FormInstance>()
const formDataEmail = reactive({
  switch: ''
})
/* 是否开启验证码 */
const formRefCode = ref<FormInstance>()
const formDataCode = reactive({
  switch: 0
})
const getCodeStatus = () => {
  selectCode().then(res => {
    formDataCode.switch = (res.captcha ? parseInt(res.captcha): 0)
  }).catch(err => {})
}
getCodeStatus()
const changeCodeStatus = () => {
  setCode({captcha: formDataCode.switch}).then(res => {
    feedback.msgSuccess(`${formDataCode.switch === 1 ? '开启' : '关闭'}注册验证码成功`)
  }).catch(err => {})
}
/* 是否开启提前订单数 */
const formRefTask = ref<FormInstance>()
const formDataTask = reactive({
  switch: 0
})
const getTaskStatus = () => {
  selectTask().then(res => {
    formDataTask.switch = (res.nowRobNum ? parseInt(res.nowRobNum): 0)
  }).catch(err => {})
}
getTaskStatus()
const changeTaskStatus = () => {
  setTask({nowRobNum: formDataTask.switch}).then(res => {
    feedback.msgSuccess(`${formDataTask.switch === 1 ? '开启' : '关闭'}提前订单数成功`)
  }).catch(err => {})
}
/* 黑名单限制 */
const formRefBlack = ref<FormInstance>()
const formDataBlack  = reactive({
  blackList: ''
})
const getBlackList = async () => {
  formDataBlack.blackList = await getBlack()
}
getBlackList()
const changeBlackStatus = async () => {
  await setBlack(formDataBlack)
  feedback.msgSuccess('操作成功')
}
/* 是否开启域名限制 */
const formRefDomain = ref<FormInstance>()
const formDataDomain  = reactive({
  domainLimit: ''
})
const getDomainLimit = async () => {
  formDataDomain.domainLimit = await getDomain()
}
getDomainLimit()
const changeDomainStatus = async () => {
  await setDomain(formDataDomain)
  feedback.msgSuccess('操作成功')
}
/*系统时区配置 表单验证*/
const rulesEmail = {
  timeZone: [
    {
      required: true,
      message: '请选择系统时区',
      trigger: ['blur']
    }
  ]
}

const getEmailStatus = () => {
  selectEmail().then(res=>{
    isEmail.value = res.mailboxSwitch ? parseInt(res.mailboxSwitch):0
  }).catch(err=>{})
}

getEmailStatus()

</script>

<style lang="scss" scoped>
  :deep(.el-checkbox-group) {
    width: 100%;
  }
  .info-item{
    margin-bottom: 20px;
    .title{
      color: rgb(128, 142, 255);
    }
    .value{
      line-height: 40px;
      background: #f2f2f2;
      padding-left: 10px;
      margin: 5px 0;
      font-size: 14px;
    }
    .tip{
      font-size: 12px;
      color: #999;
    }
  }
</style>
