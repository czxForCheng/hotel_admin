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

// 查询注册验证码开关
export function selectCode() {
    return request.get({ url: '/configuration/sel/ReCaptcha' })
}
// 开关注册验证码
export function setCode(params: any) {
    return request.post({ url: '/configuration/update/ReCaptcha', params })
}
// 查询提前任务数开关
export function selectTask() {
    return request.get({ url: '/configuration/sel/nowRobNum' })
}
// 开关提前任务数
export function setTask(params: any) {
    return request.post({ url: '/configuration/update/nowRobNum', params })
}

// 修改域名限制
export function setDomain(params: any) {
    return request.post({ url: '/configuration/update/domainLimit', params })
}

// 查询域名限制
export function getDomain() {
    return request.get({ url: '/configuration/sel/domainLimit' })
}

// 修改黑名单
export function setBlack(params: any) {
    return request.post({ url: '/configuration/update/blackList', params })
}

// 查询黑名单
export function getBlack() {
    return request.get({ url: '/configuration/sel/blackList' })
}
