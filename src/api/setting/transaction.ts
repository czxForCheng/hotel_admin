import request from '@/utils/request'

/**
 * 基础配置信息
 * */
export function getBasic() {
    return request.get({ url: '/trading/basic/detail' })
}

/**
 * 提交基础配置信息
 * */
export function setBasic(params: any) {
    return request.post({ url: '/trading/basic/save', params })
}

/**
 * 其它配置信息
 * */
export function getResidual() {
    return request.get({ url: '/trading/residual/detail' })
}

/**
 * 提交其它配置信息
 * */
export function setResidual(params: any) {
    return request.post({ url: '/trading/residual/save', params })
}


