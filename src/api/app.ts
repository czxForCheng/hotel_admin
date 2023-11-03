import request from '@/utils/request'

// 配置
export function getConfig() {
    return request.get({ url: '/index/config' })
}

// 工作台主页
export function getWorkbench() {
    return request.get({ url: '/index/console' })
}

// 数据统计
export function statisticsData() {
    return request.get({ url: '/statistics/count/data' })
}

// 统计列表
export function countAgent() {
    return request.get({ url: '/statistics/count/agent' })
}