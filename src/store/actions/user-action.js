import ApiResource from '../../services/api'
import ApiConstants from '../../services/api-constants'

async function getProfile(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.getUserProfile, payload?.body)

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function addFriend(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.addFriend, payload?.body)

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getAllFriends(payload, thunkAPI) {
    try {
      const response = await ApiResource.get(ApiConstants.getAllFriends, payload?.body)
  
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }

async function updateProfile(payload, thunkAPI) {
  try {
    const response = await ApiResource.patch(ApiConstants.updateUserProfile, payload?.body)

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
