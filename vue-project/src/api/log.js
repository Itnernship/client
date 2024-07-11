import request from '@/utils/request'

//获得工作日志信息
export const getLogService = () => {
  return request.get('statement/getAllStatement')
}

//新增工作信息
export const addLogService = (data) => {
  return request.post('statement/addStatement', data)
}

//删除日志信息
export const deleteLogService = (id) => {
  return request.post('statement/delStatement', { id: id })
}
