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
}
