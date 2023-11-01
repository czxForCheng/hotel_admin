import request from '@/utils/request'

// 充值列表
export function rechargeRecord(params: any) {
    return request.get({ url: '/rechargeRecord/list', params })
}

