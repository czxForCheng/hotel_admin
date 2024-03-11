<template>
  <div>
    <el-dialog
        v-model="dialogReasonVisible"
        title="查看详情"
        width="1000px"
        :before-close="handleClose"
    >
      <el-table size="large" v-loading="loading" :data="lists">
        <el-table-column label="账号" prop="username" min-width="120" />
        <el-table-column label="头像" min-width="80">
          <template #default="{ row }">
            <el-avatar :src="row.avatar" :size="24" />
          </template>
        </el-table-column>
        <el-table-column label="用户等级" prop="userLevel" min-width="150" />
        <el-table-column label="手机号码" prop="mobile" min-width="100" />
        <!-- <el-table-column label="性别" prop="sex" min-width="100" /> -->
        <el-table-column label="用户余额" prop="balanceMoney" min-width="100" />
        <el-table-column label="注册时间" prop="createTime" min-width="120" />
      </el-table>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleClose">关闭</el-button>
            </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import {usePaging} from "@/hooks/usePaging";
import {rankingDetails} from "@/api/member";
const queryParams=ref({})
const props=defineProps(['dialogReasonVisible','rankValue'])
const emit=defineEmits(['closeRank'])
const lists=ref([])
const loading=ref(false)
const { pager, getLists, resetPage, resetParams } = usePaging({
  fetchFun: rankingDetails,
  params: queryParams
})

const handleClose=()=>{
  lists.value=[]
  emit('closeRank',true)
}

watch(props,(newValue,oldValue)=>{
  lists.value=[]
  queryParams.value={lastLoginIp:props.rankValue.lastLoginIp}
  // getLists()

  if (props.dialogReasonVisible){
    loading.value=true
    rankingDetails(queryParams.value).then(res=>{
      lists.value=res.lists
      loading.value=false
    }).catch(err=>{loading.value=false})
  }else{
    loading.value=false
  }
})
</script>


<style scoped lang="scss">

</style>