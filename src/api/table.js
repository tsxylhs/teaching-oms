import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/teaching-oms/homework/list',
    method: 'get',
    params
  })
}
