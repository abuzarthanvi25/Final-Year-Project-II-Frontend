import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { ChatApiServices } from '../actions/chat-action'
import { logoutUserRequest } from './auth-reducer'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  allChatRooms: []
}

export const createChatRequest = createAsyncThunk('ChatReducer/createChatRequest', async (payload, thunkApi) => {
  const response = await ChatApiServices.createChat(payload, thunkApi)

  return response
})

export const deleteChatRequest = createAsyncThunk('ChatReducer/deleteChatRequest', async (payload, thunkApi) => {
  const response = await ChatApiServices.deleteChat(payload, thunkApi)

  return response
})

export const deleteMessageRequest = createAsyncThunk('ChatReducer/deleteMessageRequest', async (payload, thunkApi) => {
  const response = await ChatApiServices.deleteMessage(payload, thunkApi)

  return response
})

export const getChatsRequest = createAsyncThunk('ChatReducer/getChatsRequest', async (payload, thunkApi) => {
  const response = await ChatApiServices.getAllChats(payload, thunkApi)

  return response
})

const chatReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Login cases

    .addCase(getChatsRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getChatsRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.allChatRooms = [ ...action.payload.data?.data ]
    })
    .addCase(getChatsRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.allChatRooms = []
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default chatReducer
