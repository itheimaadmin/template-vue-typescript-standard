/**
 * 用户
 */
export interface User {
  /**
   * 账号
   */
  account: string
  /**
   * 头像
   */
  avatar: string
  /**
   * 注册时间
   */
  create_date: number
  /**
   * 是否屏蔽
   */
  disabled: boolean
  /**
   * 邮件
   */
  email: string
  /**
   * 姓名
   */
  fullName: string
  /**
   * 编号
   */
  id: number
  /**
   * 最近登录时间
   */
  last_date: number
  /**
   * 联系电话
   */
  mobile: string
  /**
   * 权限组id
   */
  permission_group_id: string
  /**
   * 权限组名称
   */
  permission_group_title: string
}
