import request from '@/utils/request'

// 用户列表
export function getUserList(params: any) {
    return request.get({ url: '/userManage/list', params })
}

// 用户新增
export function userAdd(params: any) {
    return request.post({ url: '/userManage/add', params })
}

// 用户编辑
export function userEdit(params: any) {
    return request.post({ url: '/userManage/edit', params })
}

// 余额调整
export function adjustWallet(params: any) {
    return request.post({ url: '/userManage/addAmount', params })
}

// 生成邀请码
export function generateRandomCode(params: any) {
    return request.post({ url: '/userManage/generateRandomCode', params })
}

// 用户等级列表
export function getUserLevelList(params: any) {
    return request.get({ url: '/userLevel/list', params })
}

// 用户等级列表(无分页)
export function getUserLevelAllList() {
    return request.get({ url: '/userLevel/getAllUserLevel' })
}

// 用户等级新增
export function userLevelAdd(params: any) {
    return request.post({ url: '/userLevel/add', params })
}

// 用户等级删除
export function userLevelEdit(params: any) {
    return request.post({ url: '/userLevel/edit', params })
}

// 用户等级编辑
export function userLevelDel(params: any) {
    return request.post({ url: '/userLevel/del', params })
}

// 代理列表(没有分页)
export function getProxyList() {
    return request.get({ url: '/agentManage/firstAgentList' })
}

// 新增代理
export function adminAdd(params: any) {
    return request.post({ url: '/system/admin/add', params })
}

// 删除代理
export function adminDel(params: any) {
    return request.post({ url: '/system/admin/del', params })
}

// 编辑代理
export function adminEdit(params: any) {
    return request.post({ url: '/system/admin/edit', params })
}

// 当前管理员更新
export function adminInfo(params: any) {
    return request.post({ url: '/system/admin/upInfo', params })
}

// 代理状态切换
export function adminDisable(params: any) {
    return request.post({ url: '/system/admin/disable', params })
}