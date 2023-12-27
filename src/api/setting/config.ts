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

// 语言回显
export function nowLanguage() {
    return request.get({ url: '/configuration/sel/language' })
}

// 修改语言
export function setLanguage(params: any) {
    return request.post({ url: '/configuration/update/language', params })
}
// 是否需要邮箱
export function setEmail(params: any) {
    return request.post({ url: '/configuration/update/mailbox', params })
}

// 查询邮箱信息
export function selectEmail() {
    return request.get({ url: '/configuration/sel/mailbox' })
}

// 修改域名限制
export function setDomain(params: any) {
    return request.post({ url: '/configuration/update/domainLimit', params })
}

// 查询域名限制
export function getDomain() {
    return request.get({ url: '/configuration/sel/domainLimit' })
}
