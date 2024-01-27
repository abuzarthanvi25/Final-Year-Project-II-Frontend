import ApiResource from '../../services/api'
import ApiConstants from '../../services/api-constants'
import { requestHeaders } from '@/utils/helpers'

async function createChat(payload, thunkAPI) {
    try {
        const response = await ApiResource.post(ApiConstants.createChatRoom, payload?.body, requestHeaders(payload?.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

async function deleteChat(payload, thunkAPI) {
    try {
        if(!payload?.chat_room_id) return
        const response = await ApiResource.delete(`${ApiConstants.deleteChatRoom}/${payload?.chat_room_id}`, requestHeaders(payload?.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

async function deleteMessage(payload, thunkAPI) {
    try {
        if(!payload?.message_id) return
        const response = await ApiResource.delete(`${ApiConstants.deleteMessage}/${payload?.message_id}`, requestHeaders(payload?.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}

async function getAllChats(payload, thunkAPI) {
    try {
        const response = await ApiResource.get(ApiConstants.getChatRooms, requestHeaders(payload?.token))

        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
}


export const ChatApiServices = {
    createChat,
    getAllChats,
    deleteChat,
    deleteMessage
}
