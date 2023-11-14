<!-- 个人资料 -->
<template>
    <div class="user-setting">
        <el-card class="!border-none" shadow="never">
            <el-form
                ref="formRef"
                class="ls-form"
                :model="formData"
                :rules="rules"
                label-width="100px"
            >
                <el-form-item label="头像：" prop="avatar">
                    <material-picker v-model="formData.avatar" :limit="1" />
                </el-form-item>

                <el-form-item label="账号：" prop="username">
                    <div class="w-80">
                        <el-input v-model="formData.username" disabled />
                    </div>
                </el-form-item>
              <el-form-item label="邀请码：" prop="inviteCode">
                <div class="w-80">
                  <el-input v-model="formData.inviteCode" placeholder="无邀请码" disabled />
                </div>
              </el-form-item>
                <el-form-item label="名称：" prop="nickname">
                    <div class="w-80">
                        <el-input v-model="formData.nickname" placeholder="请输入名称" />
                    </div>
                </el-form-item>

                <el-form-item label="当前密码：" prop="currPassword">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.currPassword"
                            placeholder="修改密码时必填, 不修改密码时留空"
                            type="password"
                            show-password
                        />
                    </div>
                </el-form-item>

                <el-form-item label="新的密码：" prop="password">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.password"
                            placeholder="修改密码时必填, 不修改密码时留空"
                            type="password"
                            show-password
                        />
                    </div>
                </el-form-item>

                <el-form-item label="确定密码：" prop="passwordConfirm">
                    <div class="w-80">
                        <el-input
                            v-model.trim="formData.passwordConfirm"
                            placeholder="修改密码时必填, 不修改密码时留空"
                            type="password"
                            show-password
                        />
                    </div>
                </el-form-item>
              <el-form-item label="谷歌验证码密钥：" label-width="120">
                <div class="w-80" style="margin-right: 10px;">
                  <el-input
                      v-model="formDataGoogle.googleCode"
                      placeholder="无谷歌验证码密钥"
                      disabled
                  />
                </div>
                <el-button type="primary" @click="handleResetGoogle">重置谷歌验证码密钥</el-button>
              </el-form-item>
              <el-form-item label="开启/关闭谷歌验证码：" label-width="120">
                <div style="margin-right: 10px;">
                  <el-switch
                      v-model="formDataGoogle.googleEnable"
                      active-value="1"
                      inactive-value="0"
                  />
                </div>
                <el-button type="primary" @click="changeGoogleStatus">{{formDataGoogle.googleEnable === '0' ? '开启' : '关闭'}}谷歌验证码</el-button>
              </el-form-item>
            </el-form>
        </el-card>
        <footer-btns>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
      <div>
        <el-dialog
            v-model="dialogGoogleVisible"
            title="开启谷歌验证码"
            width="50%"
        >
          <div style="display: flex;justify-content: center;">
            <img :src="qrcode" alt="" class="codeImg">
          </div>
          <el-form ref="formRefGoogle"
                   class="ls-form"
                   :model="formDataGoogle"
                   label-width="85px"
                   :rules="rulesGoogleCode"
          >
            <el-form-item label="谷歌验证码" prop="checkGoogleCode" label-width="120">
              <el-input
                  v-model="formDataGoogle.checkGoogleCode"
                  placeholder="请输入谷歌验证码"
                  clearable
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleGoogleClose">取消</el-button>
              <el-button type="primary" @click="handleGoogleSubmit">确认开启</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
</template>

<script setup lang="ts" name="userSetting">
import { setUserInfo } from '@/api/user'
import useUserStore from '@/stores/modules/user'
import feedback from '@/utils/feedback'
import type { FormInstance } from 'element-plus'
import {googleReset, proxyEdit, googleQrCode} from "@/api/member";
const formRef = ref<FormInstance>()
const userStore = useUserStore()
// 表单数据
const formData = reactive({
    avatar: '', // 头像
    username: '', // 账号
    nickname: '', // 名称
    currPassword: '', // 当前密码
    password: '', // 新的密码
    passwordConfirm: '', // 确定密码
    inviteCode: '',
    googleCode: '',
    googleStatus: ''
})

// 表单校验规则
const rules = reactive<object>({
    avatar: [
        {
            required: true,
            message: '头像不能为空',
            trigger: ['change']
        }
    ],
    nickname: [
        {
            required: true,
            message: '请输入名称',
            trigger: ['blur']
        }
    ],
    currPassword: [
        {
            validator: (rule: object, value: string, callback: any) => {
                if (formData.password) {
                    if (!value) callback(new Error('请输入当前密码'))
                }
                callback()
            },
            trigger: 'blur'
        }
    ],
    password: [
        {
            validator: (rule: object, value: string, callback: any) => {
                if (formData.currPassword) {
                    if (!value) callback(new Error('请输入新的密码'))
                }
                callback()
            },
            trigger: 'blur'
        }
    ],
    passwordConfirm: [
        {
            validator: (rule: object, value: string, callback: any) => {
                if (formData.password) {
                    if (!value) callback(new Error('请再次输入密码'))
                    if (value !== formData.password) callback(new Error('两次输入密码不一致!'))
                }
                callback()
            },
            trigger: 'blur'
        }
    ]
})
const dialogGoogleVisible = ref(false)
const formDataGoogle = reactive({
  googleCode: '',
  googleEnable: '',
  checkGoogleCode: '',
})
const rulesGoogleCode = reactive({
  checkGoogleCode: [{ required: true, message: '谷歌验证码必填', trigger: 'blur' }]
})
const userInfo = ref({})
// 获取个人设置
const getUser = async () => {
  userInfo.value = userStore.userInfo
  for (const key in formData) {
    //@ts-ignore
    formData[key] = userInfo.value[key]
  }
  formDataGoogle.googleCode = userStore.userInfo.googleCode
  formDataGoogle.googleEnable = userStore.userInfo.googleEnable
  getGoogleQrCode()
}
const qrcode = ref('')
const getGoogleQrCode = async () => {
  await googleQrCode({
    //@ts-ignore
    username: userInfo.value.username
  }).then(res => {
    qrcode.value = res
  }).catch(err => {})
}
const handleResetGoogle = async () => {
  const res = await googleReset({
    //@ts-ignore
    id: userInfo.value.id
  })
  await userStore.getUserInfo()
  getUser()
  feedback.msgSuccess(`重置谷歌验证码成功`)
}
const changeGoogleStatus = async () => {
  //@ts-ignore
  if(userInfo.value.googleEnable === '1') {
    await feedback.confirm( `确定要关闭谷歌验证码？`)
    await proxyEdit({
      //@ts-ignore
      id: userInfo.value.id,
      googleEnable: '0',
    })
    await userStore.getUserInfo()
    getUser()
    feedback.msgSuccess(`关闭谷歌验证码成功`)
    handleGoogleClose()
  }else{
    dialogGoogleVisible.value = true
  }
}
const handleGoogleClose = () => {
  dialogGoogleVisible.value = false
  formDataGoogle.checkGoogleCode = ''
}
const handleGoogleSubmit = async () => {
  await proxyEdit({
    //@ts-ignore
    id: userInfo.value.id,
    googleEnable: '1',
    checkGoogleCode: formDataGoogle.checkGoogleCode,
    googleCode: userStore.userInfo.googleCode
  })
  await userStore.getUserInfo()
  getUser()
  feedback.msgSuccess(`开启谷歌验证码成功`)
  handleGoogleClose()
}

// 设置个人设置
const setUser = async () => {
    await setUserInfo(formData)
    feedback.msgSuccess('保存成功')
    userStore.getUserInfo()
}

// 提交数据
const handleSubmit = async () => {
    await formRef.value?.validate()
    setUser()
}

getUser()
</script>

<style lang="scss" scoped>
  .codeImg{
    width: 160px;
    height: 160px;
  }
</style>
