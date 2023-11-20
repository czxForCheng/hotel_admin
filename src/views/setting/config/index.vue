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
        <p class="title">管理程序名称 Name</p>
        <div class="value">{{formData.supervisorName}}</div>
        <p class="tip">管理程序名称，将显示在后台左上角</p>
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
          <el-form-item label="管理程序名称 Name" label-width="120" prop="supervisorName">
            <el-input v-model="formData.supervisorName" placeholder="请输入管理程序名称" clearable/>
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
import {getTime, nowLanguage, setLanguage, updateTime, websiteInfoApi, websiteInfoEdit} from '@/api/setting/config'
import feedback from "@/utils/feedback";
import useTimeStore from '@/stores/modules/timeZoom'
const timeStore = useTimeStore()
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
  websiteName: ''
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
  const res = await websiteInfoApi()
  for(const key in res){
    //@ts-ignore
    formData[key] = res[key] || ''
  }
}
getWebsiteInfo()
const formRef = shallowRef<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
const handleUpdateSys = () => {
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  const reg = /^\/api/
  if(!reg.test(formData.iconAddress)){
    const arr = formData.iconAddress.split('/api')
    formData.iconAddress = '/api' + arr[1]
  }
  if(!reg.test(formData.websiteBigLogo)){
    const arr = formData.websiteBigLogo.split('/api')
    formData.websiteBigLogo = '/api' + arr[1]
  }
  if(!reg.test(formData.websiteSmallLogo)){
    const arr = formData.websiteSmallLogo.split('/api')
    formData.websiteSmallLogo = '/api' + arr[1]
  }
  await websiteInfoEdit(formData)
  feedback.msgSuccess('修改成功')
  getWebsiteInfo()
  dialogVisible.value = false
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
  { id: 2, label: '美国东部', value: 'America/Detroit', zoomi: -5 },
  { id: 3, label: '英国', value: 'Europe/London', zoomi: 0},
  { id: 4, label: '巴西', value: 'America/Sao_Paulo', zoomi: -3 },
  { id: 5, label: '墨西哥', value: 'America/Mexico_City', zoomi: -6 },
  { id: 6, label: '印度尼西亚', value: 'Asia/Jakarta', zoomi: 7 },
  { id: 7, label: '越南', value: 'Asia/Ho_Chi_Minh', zoomi: 7 },
  { id: 8, label: '土耳其', value: 'Europe/Istanbul', zoomi: 3 },
  { id: 9, label: '澳大利亚', value: 'Australia/Sydney', zoomi: 9 },
  { id: 10, label: '泰国', value: 'Asia/Bangkok', zoomi: 7 },
  { id: 11, label: '俄罗斯', value: 'Europe/Moscow', zoomi: 3 },
  { id: 12, label: '波兰', value: 'Europe/Warsaw', zoomi: 1 },
  { id: 13, label: '日本', value: 'Asia/Tokyo', zoomi: 9 },
  { id: 14, label: '西班牙', value: 'Europe/Madrid', zoomi: 1 },
  { id: 15, label: '加拿大', value: 'America/Toronto', zoomi: -5 }
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
  console.log(newvalue, oldvalue)
  //@ts-ignore
  formDataZoom.timeZone = timeZoom.value
})

/*修改系统时区配置*/
const handleUpdateTime = async () => {
  await formRefZoom.value?.validate()
  timeStore.setTimeZoom(formDataZoom.timeZone)
  // await updateTime({
  //     setTimeZone: formDataZoom.timeZone
  // })
  feedback.msgSuccess('操作成功')
}


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
