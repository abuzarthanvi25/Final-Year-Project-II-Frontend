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
    const body = {friend_id: payload?.friend_id};
    const response = await ApiResource.post(ApiConstants.addFriend, body, requestHeaders(payload?.token))

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

async function searchUsers(payload, thunkAPI) {
    try {
      const params = {searchQuery: payload?.searchQuery};
      const queryString = new URLSearchParams(params).toString()
      const response = await ApiResource.get(`${ApiConstants.searchUsers}?${queryString}`, requestHeaders(payload?.token))
  
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
    updateProfile,
    searchUsers
}
