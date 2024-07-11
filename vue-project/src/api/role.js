//获得所有角色
import request from '@/utils/request'
import axios from 'axios'
export const getRoleService = () => {
  return request.get('role/getAllRole')
}

//新增角色
export const addRoleService = (data) => {
  return request.post('role/addRole', data)
}

//删除角色
export const deleteRoleService = (id) => {
  return request.post('role/delRole', { roleName: id })
}

//获取角色权限
export const getRolePermissionService = (roleId) => {
  //   return request.post('role/getRolePermissionId', { roleId: roleId })
  return axios({
    method: 'post',
    url: 'https://113.56.219.99:50000/role/getRolePermissionId',
    params: {
      roleId: roleId
    }
  })
}

//修改权限
export const editRolePermissionService = (data) => {
  return request.post('role/editRolePermission', data)
}
