import request from '@/utils/request'

// 提现列表
export function withdrawalRecord(params: any) {
    return request.get({ url: '/withdrawalRecord/list', params })
}

// 提现审核
export function withdrawalAudit(params: any) {
    return request.post({ url: '/withdrawalRecord/withdrawal/audit', params })
}

// 待提现数量
export function processWithdrawal(params: any) {
    return request.get({ url: '/statistics/processWithdrawal', params })
}
