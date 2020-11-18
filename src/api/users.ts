import { createAPI } from '@/utils/request'

// 用户列表
export function list(params: any): Promise<any> {
  return createAPI('/users', 'get', params)
}

// 用户添加
export function add(body: any): Promise<any> {
  return createAPI('/users', 'post', null, body)
}

// 用户修改
export function edit(id: number, body: any): Promise<any> {
  return createAPI(`/users/${id}`, 'put', null, body)
}

// 用户删除
export function remove(id: number): Promise<any> {
  return createAPI(`/users/${id}`, 'delete')
}

// 用户详情
export function detail(id: number): Promise<any> {
  return createAPI(`/users/${id}`, 'get')
}
