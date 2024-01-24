import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { CourseApiServices } from '../actions/course-action'
import { logoutUserRequest } from './auth-reducer'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  courses: [],
  courseType: ""
}

export const getAllCoursesRequest = createAsyncThunk('CourseReducer/getAllCoursesRequest', async (payload, thunkApi) => {
  const response = await CourseApiServices.getAllCourses(payload, thunkApi)

  return response
})

export const addCourseRequest = createAsyncThunk('CourseReducer/addCourseRequest', async (payload, thunkApi) => {
  const response = await CourseApiServices.createCourse(payload, thunkApi)

  return response
})

export const updateCourseRequest = createAsyncThunk('CourseReducer/updateCourseRequest', async (payload, thunkApi) => {
  const response = await CourseApiServices.updateCourse(payload, thunkApi)

  return response
})

export const deleteCourseRequest = createAsyncThunk('CourseReducer/deleteCourseRequest', async (payload, thunkApi) => {
  const response = await CourseApiServices.deleteCourse(payload, thunkApi)

  return response
})

const CourseReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Get Profile Details cases

    .addCase(getAllCoursesRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getAllCoursesRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.courses = [ ...action.payload.data?.data?.courses ]
      state.courseType = action.payload.type
    })
    .addCase(getAllCoursesRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.courses = null
      state.courseType = ""
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default CourseReducer
