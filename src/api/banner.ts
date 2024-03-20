import request from '@/utils/request'

// 轮播列表
export function bannerListApi(params?: any) {
    return request.get({ url: '/banner/list', params })
}

// 新增轮播
export function bannerAddApi(params?: any) {
    return request.post({ url: '/banner/add', params })
}

// 删除轮播
export function bannerRemoveApi(params?: any) {
    return request.post({ url: '/banner/remove', params })
}

// 修改轮播
export function bannerEditApi(params?: any) {
    return request.post({ url: '/banner/edit', params })
}
// 修改重置按钮（输入框）
export function modifyResetButton(params?: any) {
    return request.post({ url: '/userManage/resetInput', params })
}

