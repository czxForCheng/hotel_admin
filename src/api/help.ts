import request from '@/utils/request'

// 首页文本列表
export function getHomePage() {
    return request.get({ url: '/help/home/page' })
}

// 修改首页文本
export function homeUpdate(params: any) {
    return request.post({ url: '/help/home/update', params })
}


