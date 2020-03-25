import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/teaching-oms/table/list',
    method: 'get',
    params
  })
}
