import request from '@/utils/request'

export const getGradeService = () => {
  return request.get('grade/getAllGrade')
}
