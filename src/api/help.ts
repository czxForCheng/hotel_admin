import request from '@/utils/request'

// 首页文本列表
export function getHomePage(params: any) {
    return request.get({ url: '/help/home/page', params })
}

// 新增首页文本
export function homeAdd(params: any) {
    return request.post({ url: '/help/home/create', params })
}

// 修改首页文本
export function homeUpdate(params: any) {
    return request.post({ url: '/help/home/update', params })
}


