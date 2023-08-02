import request from '@/utils/request'

export const ShowSinglePage = params => {
  return request({
    url: '/article/single_page/show',
    method: 'get',
    params,
  })
}
