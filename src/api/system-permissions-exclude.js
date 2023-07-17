import request from '@/utils/request'

export const ModifyPassword = params => {
  return request({
    url: '/master/edit_password',
    method: 'put',
    params,
  })
}
