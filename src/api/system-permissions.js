import request from '@/utils/request'

export const ShowSystemMaster = params => {
  return request({
    url: '/master/show_system_master',
    method: 'get',
    params,
  })
}
