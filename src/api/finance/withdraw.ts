import request from '@/utils/request'

// 提现列表
export function withdrawalRecord(params: any) {
    return request.get({ url: '/withdrawalRecord/list', params })
}

