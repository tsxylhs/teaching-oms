import crud from './builder'
import request from '@/utils/request'

const API = {}
API.activity = crud('v1/activity')
API.option = crud('v1/option')
API.patient = crud('v1/patient')
API.upload = crud('v1/uploader')
API.user = crud('v1/users')
API.group = crud('v1/groups')
API.role = crud('v1/roles')
API.right = crud('v1/rights')
API.category = crud('v1/category')
API.item = crud('v1/item')
API.suppliers = crud('v1/suppliers')
API.category.treelist = function() {
  return request.get('v1/categorys/subhomework')
}
API.category.categoryOption = function() {
  return request.get('/v1/categoryoption')
}
API.item.listall = function() {
  return request.get('v1/items')
}
API.item.saleUpdate = function(params) {
  return request.put('v1/items', params)
}

API.item.saveStep2 = function(params) {
  return request.post('v1/item/step2', params)
}
API.item.saveStep3 = function(params) {
  return request.post('v1/item/step3', params)
}
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

API.user.changePassword = function(params) {
  return request.put('v1/password', params)
}

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
