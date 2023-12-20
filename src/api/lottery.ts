import request from '@/utils/request'

/* 抽奖活动列表 */
export function lotteryDrawPage(params: any) {
    return request.get({ url: '/lotteryDraw/list', params })
}

/* 抽奖活动列表(不分页) */
export function lotteryDrawPageAll(params: any) {
    return request.get({ url: '/lotteryDraw/getAllDraw', params })
}

/* 新增抽奖活动 */
export function lotteryDrawAdd(params: any) {
    return request.post({ url: '/lotteryDraw/add', params })
}

/* 修改抽奖活动 */
export function lotteryDrawEdit(params: any) {
    return request.post({ url: '/lotteryDraw/edit', params })
}

/* 删除抽奖活动 */
export function lotteryDrawDel(params: any) {
    return request.post({ url: '/lotteryDraw/del', params })
}

/* 开启/关闭抽奖活动 */
export function lotteryDrawDisable(params: any) {
    return request.post({ url: '/lotteryDraw/disable', params })
}

/* 预中奖设置列表 */
export function lotteryPredictPage(params: any) {
    return request.get({ url: '/lotteryPredict/list', params })
}

/* 新增预中奖 */
export function lotteryPredictAdd(params: any) {
    return request.post({ url: '/lotteryPredict/add', params })
}

/* 删除预中奖 */
export function lotteryPredictDel(params: any) {
    return request.post({ url: '/lotteryPredict/del', params })
}

/* 修改预中奖 */
export function lotteryPredictEdit(params: any) {
    return request.post({ url: '/lotteryPredict/edit', params })
}

/* 活动奖品列表 */
export function lotteryPrizePage(params: any) {
    return request.get({ url: '/lotteryPrize/list', params })
}

/* 新增活动奖品 */
export function lotteryPrizeAdd(params: any) {
    return request.post({ url: '/lotteryPrize/add', params })
}

/* 修改活动奖品 */
export function lotteryPrizeEdit(params: any) {
    return request.post({ url: '/lotteryPrize/edit', params })
}

/* 删除活动奖品 */
export function lotteryPrizeDel(params: any) {
    return request.post({ url: '/lotteryPrize/del', params })
}

/* 中奖记录 */
export function lotteryLogList(params: any) {
    return request.get({ url: '/lotteryLog/list', params })
}