import request from '@/utils/request'

export const ShowSinglePage = params => {
  return request({
    url: '/article/single_page/show',
    method: 'get',
    params,
  })
}

export const AddSinglePage = params => {
  return request({
    url: '/article/single_page/add',
    method: 'post',
    params,
  })
}

export const EditStatusSinglePage = params => {
  return request({
    url: '/article/single_page/edit/status',
    method: 'put',
    params,
  })
}
