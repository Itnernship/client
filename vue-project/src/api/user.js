import request from '@/utils/request'
import axios from 'axios'

export const userRegisterService = ({ username, password }) => {
  return request.post('user/register', { username, password })
}

export const userLoginService = ({ username, password }) => {
  return request.post('user/login', { username, password })
}

//获取用户信息
export const userGetInfoService = ({ pagenum, pagesize }) => {
  // return request.post('user/list', par)
  return axios({
    method: 'post',
    url: 'https://113.56.219.99:50000/user/list',
    params: {
      currentPage: pagenum,
      size: pagesize
    }
  })
}

//删除用户
export const userDeleteService = ({ id }) => {
  console.log(id)

  return request.post('user/del', { id: id })
}

//获取所有用户权限
export const userGetAllRoleService = () => {
  return request.get('role/getAllRole')
}
//查询用户权限
export const userGetRole = (id) => {
  // return axios({
  //   method: 'post',
  //   url: 'https://113.56.219.99:50000/user/getPermission',
  //   params: {
  //     id: id
  //   }
  // })
  return request.post('user/getPermission', { id: id })
}

//编辑用户
export const userEditService = (value) => {
  return request.post('user/edit', value)
}

//添加用户
export const userAddService = (value) => {
  return request.post('user/addRole', value)
}
