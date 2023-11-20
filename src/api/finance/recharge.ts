import request from '@/utils/request'

// 充值列表
export function rechargeRecord(params: any) {
    return request.get({ url: '/rechargeRecord/list', params })
}

// 删除充值
export function rechargeDelete(params: any) {
    return request.post({ url: '/rechargeRecord/del', params })
}

