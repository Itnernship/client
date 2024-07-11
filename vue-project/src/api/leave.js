import request from '@/utils/request'

//获取所有的请假信息
export const getLeaveService = () => {
  return request.get('leave/getAll')
}

//添加请假信息
export const addLeaveService = (data) => {
  return request.post('leave/add', data)
}

//删除请假信息
export const deleteLeaveService = (id) => {
  return request.post('leave/del', { id: id })
}

//批准请假请求
export const approveLeaveService = (value) => {
  return request.post('leave/access', value)
}
//驳回请假请求
export const rejectLeaveService = (value) => {
  return request.post('leave/deny', value)
}
