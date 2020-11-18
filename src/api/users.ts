import { createAPI } from '@/utils/request'

// 列表
export function list(params: any): Promise<any> {
  return createAPI('/users', 'get', params)
}

// 单个
export function detail(id: string): Promise<any> {
  return createAPI(`/dev/v1_0/app/${id}`, 'get')
}

// 新增
export function add(body: any): Promise<any> {
  return createAPI('/dev/v1_0/app/${id}', 'post', null, body)
}

// 修改
export function edit(id: string, body: any): Promise<any> {
  return createAPI(`/dev/v1_0/app/${id}`, 'put', null, body)
}

// 删除
export function remove(id: string): Promise<any> {
  return createAPI(`/dev/v1_0/app/${id}`, 'delete')
}
