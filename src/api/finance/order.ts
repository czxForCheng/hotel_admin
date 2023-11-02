import request from '@/utils/request'

// 充值列表
export function orderList(params: any) {
    return request.get({ url: '/order/list', params })
}

// 取消订单
export function orderEdit(params: any) {
    return request.post({ url: '/order/edit', params })
}

// 取消订单 -- 调用删除接口
export function orderDel(params: any) {
    return request.post({ url: '/order/del', params })
}

// 强制付款
export function orderPay(params: any) {
    return request.get({ url: '/order/force', params })
}

// 资金流水
export function orderFlow(params: any) {
    return request.get({ url: '/log/flow', params })
}