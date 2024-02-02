import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { DashboardApiServices } from '../actions/dashboard-action'
import { logoutUserRequest } from './auth-reducer'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  statistics: null
}

export const getDashboardStatisticsRequest = createAsyncThunk('dashboardReducer/getDashboardStatisticsRequest', async (payload, thunkApi) => {
  const response = await DashboardApiServices.getDashboardStatistics(payload, thunkApi)

  return response
})

const dashboardReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Get Statistics case

    .addCase(getDashboardStatisticsRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getDashboardStatisticsRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.statistics = { ...action.payload.data?.data }
    })
    .addCase(getDashboardStatisticsRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.statistics = null
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default dashboardReducer
