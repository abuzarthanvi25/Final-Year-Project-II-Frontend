import { requestHeaders } from '@/utils/helpers'
import ApiResource from '../../services/api'
import ApiConstants from '../../services/api-constants'

async function createCourse(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.createCourse, payload?.body, requestHeaders(payload?.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function updateCourse(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.updateCourse, payload?.body, requestHeaders(payload?.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getAllCourses(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.getAllCourses, requestHeaders(payload?.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}


export const CourseApiServices = {
    getAllCourses,
    createCourse,
    updateCourse,
}
