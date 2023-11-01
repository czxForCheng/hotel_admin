<template>
  <div>
    <el-card class="!border-none mt-4" shadow="never">
      <div>
        <el-button type="primary" class="mb-4" @click="handleAdd">
          <template #icon>
            <icon name="el-icon-Plus" />
          </template>
          新增等级
        </el-button>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="ID" prop="id" min-width="60" />
        <el-table-column label="等级名称" prop="lvName" min-width="100" />
        <el-table-column label="会员等级" prop="lvValue" min-width="100" />
        <el-table-column label="等级图标" min-width="120" >
          <template #default="{ row }">
            <div class="flex items-center">
              <image-contain
                  class="flex-none mr-2"
                  :src="row.lvImage"
                  :width="40"
                  :height="40"
                  preview-teleported
                  fit="contain"
              />
              {{ row.nickname }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="升级价格" prop="upPrice" min-width="100" />
        <el-table-column label="自动升级需邀请人数" prop="upNumber" min-width="100" />
        <el-table-column label="佣金比例" prop="commiRatio" min-width="100" />
        <el-table-column label="连单佣金比例" prop="linkCommiRatio" min-width="120" />
        <el-table-column label="下级佣金比例" prop="nextCommiRatio" min-width="120" />
        <el-table-column label="用户余额限制" prop="balanceLimit" min-width="100" />
        <el-table-column label="接单限制" prop="orderConfine" min-width="100" />
        <el-table-column label="提现次数" prop="withdrawNum" min-width="120" />
        <el-table-column label="提现最小金额" prop="withdrawMin" min-width="120" />
        <el-table-column label="提现最大金额" prop="withdrawMax" min-width="100" />
        <el-table-column label="提现手续费" prop="withdrwaMoney" min-width="100" />
        <el-table-column label="提现需要完成的订单数/天" prop="withdrawOrderNum" min-width="100" />
        <el-table-column label="邀请权限" min-width="100" >
          <template #default="{ row }">
            {{row.invitationPermiissions == 1 ? '允许' : '不允许'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-perms="['member:edit']" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button v-perms="['member:delete']" type="primary" @click="handleDelete(row.id)">删除</el-button>
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
          <el-form-item label="等级名称" prop="lvName">
            <el-input
                v-model="formData.lvName"
                placeholder="请输入等级名称"
                clearable
            />
          </el-form-item>
          <el-form-item label="会员等级" prop="lvValue">
            <el-input
                v-model="formData.lvValue"
                placeholder="请输入会员等级"
                clearable
            />
          </el-form-item>
          <el-form-item label="等级图标" prop="lvImage">
            <div>
              <material-picker v-model="formData.lvImage" :limit="1" />
            </div>
          </el-form-item>
          <el-form-item label="升级价格" prop="upPrice">
            <el-input
                v-model="formData.upPrice"
                placeholder="请输入升级价格"
                clearable
            />
          </el-form-item>
          <el-form-item label="自动升级需邀请人数" prop="upNumber">
            <el-input
                v-model="formData.upNumber"
                placeholder="请输入自动升级需邀请人数"
                clearable
            />
          </el-form-item>
          <el-form-item label="佣金比例" prop="commiRatio">
            <el-input
                v-model="formData.commiRatio"
                placeholder="请输入佣金比例"
                clearable
            />
          </el-form-item>
          <el-form-item label="连单佣金比例" prop="linkCommiRatio">
            <el-input
                v-model="formData.linkCommiRatio"
                placeholder="请输入连单佣金比例"
                clearable
            />
          </el-form-item>
          <el-form-item label="下级佣金比例" prop="nextCommiRatio">
            <el-input
                v-model="formData.nextCommiRatio"
                placeholder="请输入下级佣金比例"
                clearable
            />
          </el-form-item>
          <el-form-item label="用户余额限制" prop="balanceLimit">
            <el-input
                v-model="formData.balanceLimit"
                placeholder="请输入用户余额限制"
                clearable
            />
          </el-form-item>
          <el-form-item label="接单限制" prop="orderConfine">
            <el-input
                v-model="formData.orderConfine"
                placeholder="请输入接单限制"
                clearable
            />
          </el-form-item>
          <el-form-item label="提现次数" prop="withdrawNum">
            <el-input
                v-model="formData.withdrawNum"
                placeholder="请输入提现次数"
                clearable
            />
          </el-form-item>
          <el-form-item label="提现最小金额" prop="withdrawMin">
            <el-input
                v-model="formData.withdrawMin"
                placeholder="请输入提现最小金额"
                clearable
            />
          </el-form-item>
          <el-form-item label="提现最大金额" prop="withdrawMax">
            <el-input
                v-model="formData.withdrawMax"
                placeholder="请输入提现最大金额"
                clearable
            />
          </el-form-item>
          <el-form-item label="提现手续费" prop="withdrwaMoney">
            <el-input
                v-model="formData.withdrwaMoney"
                placeholder="请输入提现手续费"
                clearable
            />
          </el-form-item>
          <el-form-item label="提现需要完成的订单数/天" prop="withdrwaMoney">
            <el-input
                v-model="formData.withdrawOrderNum"
                placeholder="请输入提现需要完成的订单数/天"
                clearable
            />
          </el-form-item>
          <el-form-item label="邀请权限" prop="invitationPermiissions">
            <el-select class="w-[280px]" v-model="formData.invitationPermiissions" placeholder="请选择任务分类">
              <el-option
                  label="不允许"
                  :value="0"
              />
              <el-option
                  label="允许"
                  :value="1"
              />
            </el-select>
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
<script lang="ts" setup name="productLists">
import type { FormInstance } from 'element-plus'
import { usePaging } from '@/hooks/usePaging'
import { getUserLevelList, userLevelAdd, userLevelEdit, userLevelDel } from '@/api/member'
import feedback from "@/utils/feedback";
const queryParams = reactive({})
let formData = reactive({
  id: '',
  lvName: '',
  lvValue: '',
  lvImage: '',
  upPrice: '',
  upNumber: '',
  commiRatio: '',
  linkCommiRatio: '',
  nextCommiRatio: '',
  balanceLimit: '',
  orderConfine: '',
  withdrawNum: '',
  withdrawMin: '',
  withdrawMax: '',
  withdrwaMoney: '',
  withdrawOrderNum: '',
  invitationPermiissions: ''
})
const rules = reactive({
  lvName: [{ required: true, message: '等级必填', trigger: 'blur' }],
  lvValue: [{ required: true, message: '会员等级必填', trigger: 'blur' }],
  lvImage: [{ required: true, message: '等级图标必上传', trigger: 'blur' }],
  upPrice: [{ required: true, message: '升级价格必填', trigger: 'blur' }],
  upNumber: [{ required: true, message: '自动升级需邀请人数必填', trigger: 'blur' }],
  commiRatio: [{ required: true, message: '佣金比例必填', trigger: 'blur' }],
  linkCommiRatio: [{ required: true, message: '连单佣金比例必填', trigger: 'blur' }],
  nextCommiRatio: [{ required: true, message: '下级佣金比例必填', trigger: 'blur' }],
  balanceLimit: [{ required: true, message: '用户余额限制必填', trigger: 'blur' }],
  orderConfine: [{ required: true, message: '接单限制必填', trigger: 'blur' }],
  withdrawNum: [{ required: true, message: '提现次数必填', trigger: 'blur' }],
  withdrawMin: [{ required: true, message: '提现最小金额必填', trigger: 'blur' }],
  withdrawMax: [{ required: true, message: '提现最大金额必填', trigger: 'blur' }],
  withdrwaMoney: [{ required: true, message: '提现手续费必填', trigger: 'blur' }],
  withdrawOrderNum: [{ required: true, message: '请输入提现需要完成的订单数/天必填', trigger: 'blur' }],
  invitationPermiissions: [{ required: true, message: '邀请权限必选', trigger: 'blur' }]
})

const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: getUserLevelList,
  params: queryParams
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
  dialogTitle.value = '新增产品分类'
}
// 删除
const handleDelete = async (id: any) => {
  await feedback.confirm('确定要删除这条数据？')
  await userLevelDel({ id })
  feedback.msgSuccess('删除成功')
  getLists()
}

/* 修改菜单 */
const handleEdit = async (row: any) => {
  dialogTitle.value = '修改会员等级'
  // formData = row
  formData.id = row.id
  formData.lvName = row.lvName
  formData.lvValue = row.lvValue
  formData.lvImage = row.lvImage
  formData.upPrice = row.upPrice
  formData.upNumber = row.upNumber
  formData.commiRatio = row.commiRatio
  formData.linkCommiRatio = row.linkCommiRatio
  formData.nextCommiRatio = row.nextCommiRatio
  formData.balanceLimit = row.balanceLimit
  formData.orderConfine = row.orderConfine
  formData.withdrawNum = row.withdrawNum
  formData.withdrawMin = row.withdrawMin
  formData.withdrawMax = row.withdrawMax
  formData.withdrwaMoney = row.withdrwaMoney
  formData.withdrawOrderNum = row.withdrawOrderNum
  formData.invitationPermiissions = row.invitationPermiissions
  dialogVisible.value = true
}

/* 提交菜单 */
const handleSubmit = async () => {
  await formRef.value?.validate()
  if (formData.id) {
    await userLevelEdit(formData)
    feedback.msgSuccess('修改成功')
  } else {
    await userLevelAdd(formData)
    feedback.msgSuccess('新增成功')
  }
  getLists()
  dialogVisible.value = false
}

const handleClose = () => {
  dialogVisible.value = false
  formData.id = ''
  formData.lvName = ''
  formData.lvValue = ''
  formData.lvImage = ''
  formData.upPrice = ''
  formData.upNumber = ''
  formData.commiRatio = ''
  formData.linkCommiRatio = ''
  formData.nextCommiRatio = ''
  formData.balanceLimit = ''
  formData.orderConfine = ''
  formData.withdrawNum = ''
  formData.withdrawMin = ''
  formData.withdrawMax = ''
  formData.withdrwaMoney = ''
  formData.withdrawOrderNum = ''
  formData.invitationPermiissions = ''
}

</script>
