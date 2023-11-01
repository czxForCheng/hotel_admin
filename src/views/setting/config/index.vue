<!-- 网站信息 -->
<template>
  <div class="website-information">
    <el-card shadow="never" class="!border-none">
      <div style="display: flex;align-items: center;">
        <p>系统参数(包括客服链接地址配置)</p>
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
      <div>
        <p>网站名称 Website</p>
        <div class="value">KAYAK</div>
        <p>网站名称及网站图标，将显示在浏览器的标签上</p>
      </div>
      <div>
        <p>管理程序名称 Name</p>
        <div class="value">后台管理系统</div>
        <p>管理程序名称，将显示在后台左上角</p>
      </div>
      <div>
        <p>网站名称 Website</p>
        <div class="value">KAYAK</div>
        <p>网站名称及网站图标，将显示在浏览器的标签上</p>
      </div>
      <div>
        <p>网站名称 Website</p>
        <div class="value">KAYAK</div>
        <p>网站名称及网站图标，将显示在浏览器的标签上</p>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup name="webInformation">
import {getTime, updateTime} from '@/api/setting/config'
import { getWebsite, setWebsite } from '@/api/setting/website'
import useAppStore from '@/stores/modules/app'
import feedback from '@/utils/feedback'
import type { FormInstance } from 'element-plus'

/* 修改系统配置 */
const handleUpdateSys = () => {

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


const formRef = ref<FormInstance>()

const { getConfig } = useAppStore()
// 表单数据
const formData = reactive({
  name: '', // 网站名称
  favicon: '', // 网站图标
  logo: '', // 网站logo
  backdrop: '', // 登录页广告图
  shopName: '',
  shopLogo: '',
  pcDesc: '',
  pcIco: '',
  pcKeywords: '',
  pcLogo: '',
  pcTitle: ''
})

// 表单验证
const rules = {
  name: [
    {
      required: true,
      message: '请输入网站名称',
      trigger: ['blur']
    }
  ],
  favicon: [
    {
      required: true,
      message: '请选择网站图标',
      trigger: ['change']
    }
  ],
  logo: [
    {
      required: true,
      message: '请选择网站logo',
      trigger: ['change']
    }
  ],
  backdrop: [
    {
      required: true,
      message: '请选择登录页广告图',
      trigger: ['change']
    }
  ],
  shopName: [
    {
      required: true,
      message: '请输入店铺/商城名称',
      trigger: ['blur']
    }
  ],
  shopLogo: [
    {
      required: true,
      message: '请选择商城LOGO',
      trigger: ['change']
    }
  ],
  pcLogo: [
    {
      required: true,
      message: '请选择PC端LOGO',
      trigger: ['change']
    }
  ],
  pcTitle: [
    {
      required: true,
      message: '请输入PC端网站标题',
      trigger: ['blur']
    }
  ],
  pcIco: [
    {
      required: true,
      message: '请选择PC端网站图标',
      trigger: ['change']
    }
  ]
}



// 获取备案信息
const getData = async () => {
  const data = await getWebsite()
  for (const key in formData) {
    //@ts-ignore
    formData[key] = data[key]
  }
}

// 设置备案信息
const handleSubmit = async () => {
  await formRef.value?.validate()
  await setWebsite(formData)
  feedback.msgSuccess('操作成功')
  getConfig()
  getData()
}

getData()
</script>

<style lang="scss" scoped>
  :deep(.el-checkbox-group) {
    width: 100%;
  }
</style>
