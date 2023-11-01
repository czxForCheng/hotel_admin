import request from '@/utils/request'

// 产品列表
export function getProductList(params: any) {
    return request.get({ url: '/product/list', params })
}

// 新增产品
export function addProduct(params: any) {
    return request.post({ url: '/product/add', params })
}

// 删除产品
export function delProduct(params: any) {
    return request.post({ url: '/product/del', params })
}

// 修改产品
export function editProduct(params: any) {
    return request.post({ url: '/product/edit', params })
}

// 产品分类列表(所有)
export function getProducCateAll() {
    return request.get({ url: '/productType/getAll' })
}

// 产品分类列表(分页)
export function getProducCateList(params: any) {
    return request.get({ url: '/productType/list', params })
}

// 新增产品分类
export function addProductCate(params: any) {
    return request.post({ url: '/productType/add', params })
}

// 删除产品分类
export function delProductCate(params: any) {
    return request.post({ url: '/productType/del', params })
}

// 修改产品分类
export function editProductCate(params: any) {
    return request.post({ url: '/productType/edit', params })
}

