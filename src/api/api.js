import crud from './builder'
import request from '@/utils/request'

const API = {}
API.homework = crud('/homework')
API.grade=crud("/grade")
API.wxUser=crud("wxUser")
API.wxError=crud("errormessage")
API.app = {
  login: function(param) {
    return request.post('login/', param)
  },
  getInfo: function() {
    return request({
      url: 'login/info',
      method: 'get'
    })
  },
  logout: function() {
    return request({
      url: 'v1/logout',
      method: 'post'
    })
  },
  resetPassword: function(params) {
    return request.put('v1/password/reset', params)
  }
}

// API.user.changePassword = function(params) {
//   return request.put('v1/password', params)
// }

API.fs = {}
API.fs.filter = function(filter) {
  return request.get('v1/files', {
    params: filter
  })
}
API.fs.delete = function(id) {
  return request.delete('v1/files/' + id)
}
API.fs.getPatientId = function(id) {
  return request.get('v1/filespatient/' + id)
}
API.fs.filterPatient = function(param) {
  return request.post('v1/filespatient/' + param.id, param)
}
API.fs.upload = function(params) {
  return request.post('v1/files', params)
}

API.fs.save = function(params) {
  return request.post('v1/files/meta', params)
}
API.fs.rename = function(params) {
  return request.put('v1/files/rename', params)
}

function list(path) {
  return function(params) {
    return request.get(path, { params: params })
  }
}

export default API
