import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { UserApiServices } from '../actions/user-action'
import { logoutUserRequest } from './auth-reducer'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  profileDetails: null,
  friends: [],
}

export const getProfileDetailsRequest = createAsyncThunk('UserReducer/getProfileDetailsRequest', async (payload, thunkApi) => {
  const response = await UserApiServices.getProfile(payload, thunkApi)

  return response
})

export const updateProfileRequet = createAsyncThunk('UserReducer/updateProfileRequet', async (payload, thunkApi) => {
  const response = await UserApiServices.updateProfile(payload, thunkApi)

  return response
})

export const searchUsersRequeast = createAsyncThunk('UserReducer/searchUsersRequeast', async (payload, thunkApi) => {
  const response = await UserApiServices.searchUsers(payload, thunkApi)

  return response
})

export const addFriendRequest = createAsyncThunk('UserReducer/addFriendRequest', async (payload, thunkApi) => {
  const response = await UserApiServices.addFriend(payload, thunkApi)

  return response
})

export const getAllFriendsRequest = createAsyncThunk('UserReducer/getAllFriendsRequest', async (payload, thunkApi) => {
  const response = await UserApiServices.getAllFriends(payload, thunkApi)

  return response
})

const UserReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Get Profile Details cases

    .addCase(getProfileDetailsRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getProfileDetailsRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.profileDetails = { ...action.payload.data?.data?.user }
    })
    .addCase(getProfileDetailsRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.profileDetails = null
    })
    //NOTE - Get All Friends cases

    .addCase(getAllFriendsRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getAllFriendsRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.friends = [ ...action.payload.data?.data?.friends ]
    })
    .addCase(getAllFriendsRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.friends = null
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default UserReducer
