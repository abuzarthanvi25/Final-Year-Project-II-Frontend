import { requestHeaders } from '@/utils/helpers'
import ApiResource from '../../services/api'
import ApiConstants from '../../services/api-constants'

async function getProfile(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.getUserProfile, requestHeaders(payload?.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function addFriend(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.addFriend, payload?.body, requestHeaders(payload?.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getAllFriends(payload, thunkAPI) {
    try {
      const response = await ApiResource.get(ApiConstants.getAllFriends, payload?.body, requestHeaders(payload?.token))
  
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }

async function updateProfile(payload, thunkAPI) {
  try {
    const response = await ApiResource.patch(ApiConstants.updateUserProfile, payload?.body, requestHeaders(payload?.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}


export const UserApiServices = {
    getProfile,
    addFriend,
    getAllFriends,
    updateProfile
}
