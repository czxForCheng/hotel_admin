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

// 删除首页文本
export function homeDelete(params: any) {
    return request.post({ url: `/help/home/del`, params })
}

// 首页头部文本列表
export function getHeaderPage(params: any) {
    return request.get({ url: '/homeHeadText/list', params })
}

// 新增首页头部文本
export function headerAdd(params: any) {
    return request.post({ url: '/homeHeadText/add', params })
}

// 修改首页头部文本
export function headerUpdate(params: any) {
    return request.post({ url: '/homeHeadText/edit', params })
}

// 删除首页头部文本
export function headerDelete(params: any) {
    return request.post({ url: `/homeHeadText/del`, params })
}


