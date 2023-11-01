import request from '@/utils/request'

// 客服列表
export function getServiceList(params: any) {
    return request.get({ url: '/service/list', params })
}

// 新增客服
export function addService(params: any) {
    return request.post({ url: '/service/add', params })
}

// 删除客服
export function delService(params: any) {
    return request.post({ url: '/service/del', params })
}

// 修改客服
export function editService(params: any) {
    return request.post({ url: '/service/edit', params })
}



