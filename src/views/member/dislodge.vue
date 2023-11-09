<template>
  <div>
    <el-dialog
        v-model="isTicket"
        :title="title"
        :width="formData.isLink===0 ? '500px':'1300px'"
        :before-close="handleClose"
    >
      <el-row>
        <el-col :span="formData.isLink === 0 ? 24:10">
          <el-form ref="formRef"
                   class="ls-form"
                   :model="formData"
                   label-width="0"
                   :rules="rules">
            <el-form-item>
              <p>用户名称</p>
              <el-input
                  disabled
                  v-model="formData.username"
                  placeholder="请输入用户名称"
                  clearable
              />
            </el-form-item>
            <el-form-item>
              <p>钱包余额</p>
              <el-input
                  disabled
                  v-model="formData.balanceMoney"
                  placeholder="请输入钱包余额"
                  clearable
              />
            </el-form-item>
            <el-form-item>
              <p>今日接单量</p>
              <el-input
                  disabled
                  v-model="formData.nowOrderNum"
                  placeholder="请输入今日接单量"
                  clearable
              />
            </el-form-item>
            <el-form-item>
              <p>等级最大接单量</p>
              <el-input
                  disabled
                  v-model="formData.robOrderNum"
                  placeholder="请输入等级最大接单量"
                  clearable
              />
            </el-form-item>
            <el-form-item prop="beginOrder">
              <p>是否开始连单</p>
              <p style="width: 100%;margin-top: 10px">
                <el-radio-group v-model="formData.isLink">
                  <el-radio :label="0">关闭连单</el-radio>
                  <el-radio :label="1">开始连单</el-radio>
                </el-radio-group>
              </p>
            </el-form-item>
            <el-form-item v-if="formData.isLink===1" prop="beginOrder">
              <p>几单后开始连单</p>
              <el-input
                  v-model="formData.beginOrder"
                  placeholder="请输入几单后开始连单"
                  clearable
              />
            </el-form-item>
            <el-form-item v-if="formData.isLink===1" prop="goodsIds">
              <p>连单商品ID</p>
              <el-input
                  v-model="formData.goodsIds"
                  placeholder="请输入连单商品ID"
                  clearable
              />
            </el-form-item>
            <el-form-item v-if="formData.isLink===1">
              <p>请设置连单比例</p>
              <el-input
                  @change="changeGoods"
                  v-model="formData.writingRatio"
                  placeholder="填写连单比例（如：0.6）"
                  clearable
              />
            </el-form-item>
            <div  style="float:left ;padding: 20px 0">
              <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">确认</el-button>
              </span>
            </div>
          </el-form>
        </el-col>
        <el-col  v-if="formData.isLink===1" :span="14">
          <div style="padding: 0 0 0 3%;box-sizing: border-box">
            <el-form style="margin: 20px 0" class="mb-[-16px]" :model="queryParams" :inline="true">
              <el-form-item label="最低价格">
                <el-input
                    class="w-[160px]"
                    v-model="queryParams.minPrice"
                    placeholder="最低价格"
                    clearable
                    @keyup.enter="resetPage"
                />
              </el-form-item>
              <el-form-item label="最高价格">
                <el-input
                    class="w-[160px]"
                    v-model="queryParams.maxPrice"
                    placeholder="最高价格"
                    clearable
                    @keyup.enter="resetPage"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="resetPage">查询</el-button>
                <el-button @click="resetParams">重置</el-button>
              </el-form-item>
            </el-form>

            <el-table
                ref="multipleTableRef"
                max-height="500px"
                size="large"
                v-loading="pager.loading"
                :data="pager.lists">
              <el-table-column width="55">
                <template #default="{ row }">
                    <el-checkbox @click.stop="handleSelectionMethod($event,row,row.id)" v-model="row.checked"/>

                </template>
              </el-table-column>>
              <el-table-column label="商品ID" align="center" prop="id" min-width="60"/>
              <el-table-column label="商品名称" show-overflow-tooltip prop="taskName" width="400"/>
              <el-table-column label="商品价格" align="center" prop="productPrice" min-width="100"/>
              <el-table-column v-if="false" label="操作" width="100" fixed="right">
                <template #default="{ row }">
                  <el-button @click="nextTicket(row,row.id)" type="primary" size="small">替换下一单</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="flex justify-end mt-4">
              <el-pagination
                  v-model:current-page="pager.page"
                  v-model:page-size="pager.pageSize"
                  layout="total, sizes, prev, pager, next"
                  :small="true"
                  :total="pager.total"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-col>
      </el-row>

      <template #footer>

      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {getProductList, linkOrder} from "@/api/product";
import type {FormInstance} from 'element-plus'
import {ElMessage, ElTable} from 'element-plus'



const props = defineProps(['isTicket', 'title', 'ticketValue'])
const emit = defineEmits(['closeTicket'])
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<user[]>([])
const checkedGoods=ref<user[]>([])
const formRef = shallowRef<FormInstance>()

const rules = reactive({
  beginOrder: [{required: true, message: '开始连单必填', trigger: 'blur'}],
  goodsIds: [{required: true, message: '连单商品ID必传', trigger: 'blur'}],
  goods: [{required: true, message: '选择商品', trigger: 'blur'}],
})



let formData = reactive({
  id: '',
  isLink:0,
  username: '',
  balanceMoney: 0,
  nowOrderNum: 0,
  robOrderNum: 0,
  beginOrder: '',
  goodsIds: '',
  writingRatio: ''
})


const baseInfo = async () => {
  formData.id = props.ticketValue.id
  formData.username = props.ticketValue.username
  formData.balanceMoney = props.ticketValue.balanceMoney
  formData.nowOrderNum = props.ticketValue.nowOrderNum
  formData.robOrderNum = props.ticketValue.robOrderNum
  formData.isLink = props.ticketValue.isLink
  formData.writingRatio=props.ticketValue.writingRatio
  if (props.ticketValue.isLink === 1){
    formData.beginOrder = props.ticketValue.linkOrderNum
    formData.goodsIds= props.ticketValue.linkProducts
    let list = props.ticketValue.linkProducts.split(',')
    getUserChecked(list)
  }else{
    getLists(queryParams)
  }
}

const queryParams = reactive({
  minPrice: '',
  maxPrice: '',
  pageNo: 1,
  pageSize: 15
})


let pager = reactive({
  lists: [],
  loading: true,
  pageSize: 15,
  total: 0,
  page: 1,
})

interface user {
  createTime: string,
  id: number
  productContent: string,
  productImage: string,
  productPrice: any,
  shopName: string,
  taskName: string,
  typeId: number,
  updateTime: string,
}

const changeGoods=()=>{
  // if (formData.goods===''){
  //   checkedGoods.value = []
  // }
}


const getUserChecked = (array:any) =>{
  multipleSelection.value=[]
  getProductList(queryParams).then(res => {
    pager.loading = false
    pager.pageSize = res.pageSize
    pager.page = res.paegNo
    pager.total = res.count
    res.lists.forEach((val: any) => {
      const index =  array.findIndex((item:any)=> parseInt(item) === val.id)
      if (index === -1){
        val.checked = false
      }else{
        val.checked = true
      }
    })
    multipleSelection.value=array
    pager.lists = res.lists
  }).catch(err => {
    pager.loading = false
    pager.lists = []
  })
}



const getLists = (data: any) => {
  let goods =JSON.parse(<any> sessionStorage.getItem('goods')) ? JSON.parse(<any> sessionStorage.getItem('goods')) :[]
  getProductList(data).then(res => {
    pager.loading = false
    pager.pageSize = res.pageSize
    pager.page = res.paegNo
    pager.total = res.count
    res.lists.forEach((val: any) => {
      const index =  goods.findIndex((item:any)=> item === val.id)
      if (index === -1){
        val.checked = false
      }else{
        val.checked = true
      }
    })
    pager.lists = res.lists
  }).catch(err => {
    pager.loading = false
    pager.lists = []
  })
}

const handleCurrentChange = (data: any) => {
  pager.loading = true
  queryParams.pageNo = data
  // getLists(queryParams)
  getUserChecked(multipleSelection.value)
}

const handleSizeChange = (data: any) => {
  pager.loading = true
  queryParams.pageSize = data
  getUserChecked(multipleSelection.value)
}

const resetPage = () => {
  getLists(queryParams)
}

const resetParams = () => {
  queryParams.maxPrice = queryParams.minPrice = ''
  queryParams.pageNo = 1
  queryParams.pageSize = 10
  getLists(queryParams)
}

const handleClose = () => {
  formData.id = ''
  formData.username =''
  formData.beginOrder = ''
  formData.goodsIds = ''
  formData.writingRatio = ''
  emit('closeTicket', true)
  sessionStorage.removeItem('goods')
}

const handleSubmit = () => {
  if (formData.isLink===0){
    let form = {
      isLink:formData.isLink,
      id:formData.id
    }
    linkOrder(form).then(res=>{
      ElMessage({message: '操作成功', type: 'success',})
      handleClose()
    }).catch(err=>{
      ElMessage({message:err.msg, type: 'error',})
    })
  }else{
    if (formData.beginOrder === '') {
      ElMessage({message: '连单数必填', type: 'warning',})
    } else if (formData.goodsIds === '') {
      ElMessage({message: '商品为必选', type: 'warning',})
    } else {
      // formData.goodsIds +=','+formData.goods
      let form = {
        isLink:formData.isLink,
        linkOrderNum:formData.beginOrder,
        linkProducts:formData.goodsIds,
        writingRatio:formData.writingRatio,
        id:formData.id
      }
      linkOrder(form).then(res=>{
        ElMessage({message: '操作成功', type: 'success',})
        handleClose()
      }).catch(err=>{
        ElMessage({message:err.msg, type: 'error',})
      })
    }
  }

}

const nextTicket = (data: any,id:number) => {

    if (checkedGoods.value.includes(data.id)){
      ElMessage({message: '当前已选择', type: 'error',})
    }else{
      checkedGoods.value.push(data.id)
    }

    // formData.goods = checkedGoods.value.toString()
}

// 多选
const handleSelectionMethod = (e:any,val: any,id:any) => {
  if (e.target.tagName !== 'INPUT'){
    if (val.checked){
      const index = multipleSelection.value.findIndex((item:any)=> parseInt(item) === id)
      multipleSelection.value.splice(index,1)
    }else{
      multipleSelection.value.push(id)
    }
    sessionStorage.setItem('goods',JSON.stringify( [...new Set(multipleSelection.value)]))
    formData.goodsIds =[...new Set(multipleSelection.value)].toString()
  }
}


// getLists(queryParams)
baseInfo()
</script>

<style scoped lang="scss">

</style>