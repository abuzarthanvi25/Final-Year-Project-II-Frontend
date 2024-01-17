import { requestHeaders } from '@/utils/helpers'
import ApiResource from '../../services/api'
import ApiConstants from '../../services/api-constants'

async function createNote(payload, thunkAPI) {
    try {
        const response = await ApiResource.post(ApiConstants.createNote, payload?.body, requestHeaders(payload?.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

async function getAllNotes(payload, thunkAPI) {
    try {
        if (!payload?.course_id) return
        const response = await ApiResource.get(`${ApiConstants.getNotes}/${payload?.course_id}`, requestHeaders(payload?.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

async function getNoteDetails(payload, thunkAPI) {
    try {
        if (!payload?.note_id) return
        const response = await ApiResource.get(`${ApiConstants.getNoteDetails}/${payload?.note_id}`, requestHeaders(payload?.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

async function deleteNote(payload, thunkAPI) {
    try {
        if (!payload?.note_id) return;
        const response = await ApiResource.delete(`${ApiConstants.deleteNote}/${payload?.note_id}`, requestHeaders(payload?.token))
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

async function updateNote(payload, thunkAPI) {
    try {
        if (!payload?.note_id) return;
        const response = await ApiResource.patch(`${ApiConstants.updateNote}/${payload?.note_id}`, payload?.body, requestHeaders(payload?.token))
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}


export const NoteApiServices = {
    createNote,
    getAllNotes,
    deleteNote,
    updateNote,
    getNoteDetails
}
