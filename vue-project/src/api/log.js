import request from '@/utils/request'

export const getLogService = () => {
  return request.get('statement/getAllStatement')
}
