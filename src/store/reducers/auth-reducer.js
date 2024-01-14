import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { AuthApiServices } from '../actions/auth-action'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  userDetails: null
}

export const loginUserRequest = createAsyncThunk('AuthReducer/loginUserRequest', async (payload, thunkApi) => {
  const response = await AuthApiServices.login(payload, thunkApi)

  return response
})

export const logoutUserRequest = createAsyncThunk('AuthReducer/logoutUserRequest', async () => {})

export const registerUserRequest = createAsyncThunk('AuthReducer/registerUserRequest', async (payload, thunkApi) => {
  const response = await AuthApiServices.register(payload, thunkApi)

  return response
})

const authReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Login cases

    .addCase(loginUserRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(loginUserRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.userDetails = { ...action.payload.data?.data }
    })
    .addCase(loginUserRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.userDetails = null
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default authReducer
