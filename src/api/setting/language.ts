import request from '@/utils/request'

// 系统语言列表查询
export function languageList(params?: any) {
    return request.get({ url: '/languageData/list', params })
}

// 新增系统语言
export function languageAdd(params?: any) {
    return request.post({ url: '/languageData/add', params })
}

// 新增系统语言
export function languageDel(params?: any) {
    return request.post({ url: '/languageData/del', params })
}

// 修改系统语言
export function languageEdit(params?: any) {
    return request.post({ url: '/languageData/edit', params })
}
