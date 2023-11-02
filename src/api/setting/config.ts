import request from '@/utils/request'

// 获取系统时区配置
export function getTime() {
    return request.get({ url: '/configuration/sel/time' })
}

// 系统时区配置
export function updateTime(params: any) {
    return request.post({ url: '/configuration/update/time', params })
}

// 获取系统配置信息
export function websiteInfoApi() {
    return request.get({ url: '/configuration/list' })
}

// 系统配置修改
export function websiteInfoEdit(params: any) {
    return request.post({ url: '/configuration/update/save', params })
}

