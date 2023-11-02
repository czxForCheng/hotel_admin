<!-- 网站信息 -->
<template>
  <div class="website-information">
    <el-card shadow="never" class="!border-none">
      <div style="display: flex;align-items: center;">
        <p style="margin-right: 10px;">系统参数(包括客服链接地址配置)</p>
        <el-button type="primary" @click="handleUpdateSys">修改系统配置</el-button>
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
              <el-radio label="english">英文</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
      </el-form>
<!--      <el-button type="primary" @click="handleUpdateTime">保存语言</el-button>-->
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
      <el-button type="primary" @click="handleUpdateTime">修改时区配置</el-button>
    </el-card>
    <el-card shadow="never" class="!border-none mt-4">
      <div class="info-item">
        <p>网站名称 Website</p>
        <div class="value">{{websiteInfo.websiteName}}</div>
        <p class="tip">网站名称及网站图标，将显示在浏览器的标签上</p>
      </div>
      <div class="info-item">
        <p>管理程序名称 Name</p>
        <div class="value">{{websiteInfo.supervisorName}}</div>
        <p class="tip">管理程序名称，将显示在后台左上角</p>
      </div>
      <div class="info-item">
        <p>管理程序版本 Version</p>
        <div class="value">{{websiteInfo.supervisorVersion}}</div>
        <p class="tip">管理程序版本，将显示在后台左上角标题</p>
      </div>
      <div class="info-item">
        <p>网站版权信息 Copyright</p>
        <div class="value">{{websiteInfo.copyrightInformation}}</div>
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
                  :value="0"
              />
              <el-option
                  label="开"
                  :value="1"
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
                  :value="0"
              />
              <el-option
                  label="开"
                  :value="1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="浏览器图标 Browser" label-width="120" prop="iconAddress">
            <div>
              <material-picker v-model="formData.iconAddress" :limit="1" />
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
import {getTime, updateTime, websiteInfoApi, websiteInfoEdit} from '@/api/setting/config'
import { getWebsite, setWebsite} from '@/api/setting/website'
import useAppStore from '@/stores/modules/app'
import feedback from "@/utils/feedback";

/* 修改系统配置 */
const websiteInfo = reactive({
  copyrightInformation: '',
  homeRotationWord: '',
  iconAddress: '',
  ipIsOrNot: '',
  isOrNot: '',
  linkAddress: '',
  supervisorName: '',
  supervisorVersion: '',
  websiteName: ''
})
const formData = reactive({
  copyrightInformation: '',
  homeRotationWord: '',
  iconAddress: '',
  ipIsOrNot: '',
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
  websiteInfo.copyrightInformation = res.copyrightInformation
  websiteInfo.homeRotationWord = res.homeRotationWord
  websiteInfo.iconAddress = res.iconAddress
  websiteInfo.ipIsOrNot = res.ipIsOrNot
  websiteInfo.isOrNot = res.isOrNot
  websiteInfo.linkAddress = res.linkAddress
  websiteInfo.supervisorName = res.supervisorName
  websiteInfo.supervisorVersion = res.supervisorVersion
  websiteInfo.websiteName = res.websiteName

  formData.copyrightInformation = res.copyrightInformation
  formData.homeRotationWord = res.homeRotationWord
  formData.iconAddress = res.iconAddress
  formData.ipIsOrNot = res.ipIsOrNot
  formData.isOrNot = res.isOrNot
  formData.linkAddress = res.linkAddress
  formData.supervisorName = res.supervisorName
  formData.supervisorVersion = res.supervisorVersion
  formData.websiteName = res.websiteName
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
const language = ref('english')

/* 系统时区 */
const formRefZoom = ref<FormInstance>()
const timeZoneAll = [
  { id: 1, label: '中国上海', value: 'Asia/Shanghai' },
  { id: 2, label: '美国东部', value: 'America/Detroit' },
  { id: 3, label: '英国', value: 'Europe/London' },
  { id: 4, label: '巴西', value: 'America/Sao_Paulo' },
  { id: 5, label: '墨西哥', value: 'America/Mexico_City' },
  { id: 6, label: '印度尼西亚', value: 'Asia/Jakarta' },
  { id: 7, label: '越南', value: 'Asia/Ho_Chi_Minh' },
  { id: 8, label: '土耳其', value: 'Europe/Istanbul' },
  { id: 9, label: '澳大利亚', value: 'Australia/Sydney' },
  { id: 10, label: '泰国', value: 'Asia/Bangkok' },
  { id: 11, label: '俄罗斯', value: 'Europe/Moscow' },
  { id: 12, label: '波兰', value: 'Europe/Warsaw' },
  { id: 13, label: '日本', value: 'Asia/Tokyo' },
  { id: 14, label: '西班牙', value: 'Europe/Madrid' },
  { id: 15, label: '加拿大', value: 'America/Toronto' }
]

// 系统时区配置 表单数据
const formDataZoom = reactive({
  timeZone: ''
})
// 系统时区配置 表单验证
const rulesZoom = {
  timeZone: [
    {
      required: true,
      message: '请选择系统时区',
      trigger: ['blur']
    }
  ]
}

/* 系统信息 */


const handleGetTime = async () => {
  const res = await getTime()
  formDataZoom.timeZone = res.setTimeZone
}
handleGetTime()

const handleUpdateTime = async () => {
  await formRefZoom.value?.validate()
  await updateTime({
    setTimeZone: formDataZoom.timeZone
})
  feedback.msgSuccess('操作成功')

}

const { getConfig } = useAppStore()



// 获取备案信息
const getData = async () => {
  const data = await getWebsite()
  for (const key in formData) {
    //@ts-ignore
    formData[key] = data[key]
  }
}
</script>

<style lang="scss" scoped>
  :deep(.el-checkbox-group) {
    width: 100%;
  }
  .info-item{
    margin-bottom: 20px;
    .value{
      line-height: 30px;
      background: #f2f2f2;
      padding-left: 10px;
      margin: 5px 0;
    }
    .tip{
      font-size: 12px;
      color: #999;
    }
  }
</style>
