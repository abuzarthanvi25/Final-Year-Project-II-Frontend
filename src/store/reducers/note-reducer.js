import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { NoteApiServices } from '../actions/note-action'
import { logoutUserRequest } from './auth-reducer'

const loadingStates = {
  idle: false,
  pending: true
}

const initialState = {
  error: null,
  loading: loadingStates.idle,
  personalNotes: [],
  groupNotes: [],
}

export const getAllNotesRequest = createAsyncThunk('NoteReducer/getAllNotesRequest', async (payload, thunkApi) => {
  const response = await NoteApiServices.getAllNotes(payload, thunkApi)

  return response
})

export const getNoteDetailsRequest = createAsyncThunk('NoteReducer/getNoteDetailsRequest', async (payload, thunkApi) => {
  const response = await NoteApiServices.getNoteDetails(payload, thunkApi)

  return response
})

export const createNoteRequest = createAsyncThunk('NoteReducer/createNoteRequest', async (payload, thunkApi) => {
  const response = await NoteApiServices.createNote(payload, thunkApi)

  return response
})

export const updateNoteRequest = createAsyncThunk('NoteReducer/updateNoteRequest', async (payload, thunkApi) => {
  const response = await NoteApiServices.updateNote(payload, thunkApi)

  return response
})

export const summarizeNoteRequest = createAsyncThunk('NoteReducer/summarizeNoteRequest', async (payload, thunkApi) => {
  const response = await NoteApiServices.summarizeNote(payload, thunkApi)

  return response
})

export const deleteNoteRequest = createAsyncThunk('NoteReducer/deleteNoteRequest', async (payload, thunkApi) => {
  const response = await NoteApiServices.deleteNote(payload, thunkApi)

  return response
})

const NoteReducer = createReducer(initialState, builder => {
  builder

    //NOTE - Get Profile Details cases

    .addCase(getAllNotesRequest.pending, state => {
      state.error = null
      state.loading = loadingStates.pending
    })
    .addCase(getAllNotesRequest.fulfilled, (state, action) => {
      state.error = null
      state.loading = loadingStates.idle
      state.personalNotes = [ ...action.payload.data?.data?.notes ]
    })
    .addCase(getAllNotesRequest.rejected, (state, action) => {
      state.error = action.payload?.response?.data
      state.loading = loadingStates.idle
      state.profileDetails = null
    })

    //NOTE - Logout case

    .addCase(logoutUserRequest.fulfilled, () => {
      return initialState
    })
})

export default NoteReducer
