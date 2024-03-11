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

// 重置抢单数量
export function userReset(params: any) {
    return request.post({ url: '/userManage/reset', params })
}

// 余额调整
export function adjustWallet(params: any) {
    return request.post({ url: '/userManage/addAmount', params })
}
// 冻结余额
export function frozenAmount(params: any) {
    return request.post({ url: '/userManage/frozenAmount', params })
}
// 会员详情
// export function userManageDetail(data: any) {
//     return request.get({ url: '/userManage/detail', params: {id:data} })
// }

export function userManageDetail(data :any){
    let res = request.get({
        url:`/userManage/detail`,
        params:{id:data}
    })

    return res
}



// usdt信息
export function usdtUpdate(params: any) {
    return request.post({ url: '/userManage/OSDT', params })
}

// 团队列表
export function userManageTeamList(params: any) {
    return request.get({ url: '/userManage/teamList', params })
}
// 封禁团队
export function disableTeam(params: any) {
    return request.post({ url: '/userManage/disableTeam', params })
}
// 启用团队
export function unDisableTeam(params: any) {
    return request.post({ url: '/userManage/unDisableTeam', params })
}
// 启用/封禁
export function disable(params: any) {
    return request.post({ url: '/userManage/disable', params })
}

// 账变列表
export function userManageBillList(params: any) {
    return request.get({ url: '/userManage/billList', params })
}

// 启用/禁用
export function userManageDisable(params: any) {
    return request.post({ url: '/userManage/disable', params })
}

// 是否禁止提现
export function userManageDisableWithdrawal(params: any) {
    return request.post({ url: '/userManage/disableWithdrawal', params })
}

// 删除
export function userManageDel(params: any) {
    return request.post({ url: '/userManage/del', params })
}

// 设为真/假人
export function userManageBeDummy(params: any) {
    return request.post({ url: '/userManage/beDummy', params })
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

// 代理列表(没有分页)
export function agentManage(params: any) {
    return request.get({ url: '/agentManage/list', params })
}

// 新增代理
export function proxyAdd(params: any) {
    return request.post({ url: '/agentManage/add', params })
}

// 删除代理
export function proxyDel(params: any) {
    return request.post({ url: '/agentManage/del', params })
}

// 编辑代理
export function proxyEdit(params: any) {
    return request.post({ url: '/agentManage/edit', params })
}

// 修改代理密码
export function proxyEditPwd(params: any) {
    return request.post({ url: '/agentManage/editPwd', params })
}

// 代理状态切换
export function proxyDisable(params: any) {
    return request.post({ url: '/agentManage/disable', params })
}

// 重置谷歌验证码
export function googleReset(params: any) {
    return request.post({ url: '/agentManage/resetGoogleCode', params })
}

// 获取谷歌验证码二维码
export function googleQrCode(params: any) {
    return request.post({ url: '/agentManage/createGoogleQrCode', params })
}

// 开启/关闭谷歌验证码
export function googleEdit(params: any) {
    return request.post({ url: '/agentManage/editGoogle', params })
}

// 获取一级代理下的二级代理
export function secondAgentList(params: any) {
    return request.get({ url: '/agentManage/secondAgentList', params })
}

// 修改登录密码
export function updatePwd(params: any) {
    return request.post({ url: '/userManage/updatePwd', params })
}
// 修改交易密码
export function updateTradingPwd(params: any) {
    return request.post({ url: '/userManage/updateTradingPwd', params })
}
// 总人数、在线人数
export function userManageNumApi(params: any) {
    return request.get({ url: '/userManage/getNum', params })
}
// ip排行榜
export function ipRanking(params: any) {
    return request.get({ url: '/userManage/rankList', params })
}
// 排行榜详情
export function rankingDetails(params: any) {
    return request.get({ url: '/userManage/listByIp', params })
}
