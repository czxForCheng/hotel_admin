<template>
  <div class="home">
    <div style="margin-bottom: 20px;">
      <el-card>
        <div class="title">商城统计</div>
        <div class="dataList">
          <div class="data-item" v-for="(item, index) in showData" :key="index">
            <p class="dataTitle">{{item.title}}</p>
            <p class="allNum">{{item.allNum}}</p>
            <p class="todayNum" >今日首充人数 <span class="todaySpan">{{item.todayNum}}</span></p>
            <p class="yesterdayNum">昨日首充人数 {{item.yesterday}}</p>
          </div>
        </div>
      </el-card>
    </div>
    <el-card>
      <div style="margin-bottom: 20px;">
        <el-form ref="formRef" class="mb-[-16px]" :model="queryParams" :inline="true">
          <el-form-item label="统计时间">
            <daterange-picker
                v-model:startTime="queryParams.startTime"
                v-model:endTime="queryParams.endTime"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetPage">查询</el-button>
            <el-button @click="resetParams">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table size="large" v-loading="pager.loading" :data="pager.lists">
        <el-table-column label="姓名" prop="name" min-width="120" />
        <el-table-column label="客服数量" prop="" min-width="100" />
        <el-table-column label="累计用户" prop="nickname" min-width="100" />
        <el-table-column label="团队余额" prop="username" min-width="120" />
        <el-table-column label="今日充值" prop="mobile" min-width="100" />
        <el-table-column label="累计充值" prop="channel" min-width="100" />
        <el-table-column label="手动扣款" prop="createTime" min-width="120" />
        <el-table-column label="今日提现" prop="channel" min-width="100" />
        <el-table-column label="累计提现" prop="createTime" min-width="120" />
      </el-table>
      <div class="flex justify-end mt-4">
        <pagination v-model="pager" @change="getLists" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup name="home">
  import { ref, reactive } from 'vue'
  import { usePaging } from '@/hooks/usePaging'
  import { getRoutePath } from '@/router'
  import { getUserList } from '@/api/consumer'
  import { ClientMap } from '@/enums/appEnums'
  let showData:any = reactive([])
  showData = [
    {
      title: '首充人数',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '用户总量(人)',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '订单总量',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '订单总金额',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '首充人数',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '用户总量(人)',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '订单总量',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '订单总金额',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '首充人数',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '用户总量(人)',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '订单总量',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    },
    {
      title: '订单总金额',
      allNum: 555,
      todayNum: 155,
      yesterday: 200
    }
  ]
  const queryParams = reactive({
    keyword: '',
    channel: '',
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
</script>

<style lang="scss" scoped>
  .title{
    padding-bottom: 20px;
    font-size: 18px;
  }
  .dataList{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .data-item{
      padding: 20px;
      width: calc(25% - 10px);
      margin-right: 10px;
      margin-bottom: 10px;
      background-color: #4073fa;
      font-size: 16px;
      color: #fff;
      &:nth-child(4n) {
        margin-right: 0px;
      }
      p.allNum, span.todaySpan{
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
</style>
