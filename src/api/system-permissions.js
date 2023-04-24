import request from '@/utils/request'

export const ShowSystemMaster = params => {
  return request({
    url: '/master/show_system_master',
    method: 'get',
    params,
  })
}

export const AddSystemMaster = params => {
  return request({
    url: '/master/create_system_master',
    method: 'post',
    params,
  })
}

export const EditSystemMaster = params => {
  return request({
    url: '/master/edit_system_master',
    method: 'post',
    params,
  })
}

