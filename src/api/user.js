import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/teaching-oms/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/teaching-oms/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/teaching-oms/user/logout',
    method: 'post'
  })
}
